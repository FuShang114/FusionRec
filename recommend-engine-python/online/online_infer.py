import json
from collections import defaultdict

from data.extract import (
    append_collect_feedback,
    append_order_feedback,
    get_ctr_stats,
    get_cvr_stats,
    get_user_item_events,
)
from db.mysql_client import get_conn
from models.cf import score_candidates_for_user, train_item_similarity
from models.ctr import build_ctr_scores
from models.cvr import build_cvr_scores


def infer(openid, scene, goods_ids_json, cf_weight, ctr_weight, cvr_weight):
    goods_ids = json.loads(goods_ids_json or "[]")
    if not goods_ids:
        return "[]"

    with get_conn() as conn:
        user_item = get_user_item_events(conn)
        user_item = append_collect_feedback(conn, user_item)
        user_item = append_order_feedback(conn, user_item)
        sim, user_items = train_item_similarity(user_item)
        cf_scores = score_candidates_for_user(openid, sim, user_items, goods_ids)
        ctr_scores = build_ctr_scores(goods_ids, get_ctr_stats(conn))
        cvr_scores = build_cvr_scores(goods_ids, get_cvr_stats(conn))

    result = []
    for gid in goods_ids:
        cf = float(cf_scores.get(gid, 0.0))
        ctr = float(ctr_scores.get(gid, 0.0))
        cvr = float(cvr_scores.get(gid, 0.0))
        blend = float(cf_weight) * cf + float(ctr_weight) * ctr + float(cvr_weight) * cvr
        result.append({
            "goodsId": int(gid),
            "cfScore": cf,
            "ctrScore": ctr,
            "cvrScore": cvr,
            "blendScore": blend,
        })
    result.sort(key=lambda x: x["blendScore"], reverse=True)
    return json.dumps(result, ensure_ascii=False)
