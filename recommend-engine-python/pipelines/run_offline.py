import os
import sys
import traceback
from datetime import datetime

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

from config.settings import SCENE, TOPN
from data.extract import (
    append_collect_feedback,
    append_order_feedback,
    build_cf_feature_pack,
    get_cf_dimension_weights,
    get_active_goods,
    get_all_openids,
    get_ctr_stats,
    get_cvr_stats,
    get_default_weights,
    get_user_item_events,
)
from data.load import create_job, finish_job, save_algo_scores, save_blend_scores
from db.mysql_client import get_conn
from models.cf import score_candidates_topk_multidim, train_user_similarity_multidim
from models.ctr import build_ctr_scores
from models.cvr import build_cvr_scores


def rank_topn(score_dict, topn):
    rows = sorted(score_dict.items(), key=lambda x: x[1], reverse=True)[:topn]
    return [(gid, score, idx + 1) for idx, (gid, score) in enumerate(rows)]


def main():
    version = datetime.now().strftime("%Y%m%d%H%M%S")
    with get_conn() as conn:
        env_job_id = os.getenv("RECO_JOB_ID")
        if env_job_id and env_job_id.strip():
            job_id = int(env_job_id)
        else:
            job_id = create_job(conn, "BLEND", "offline scoring start")
        try:
            goods_ids = get_active_goods(conn)
            openids = get_all_openids(conn)
            if not goods_ids or not openids:
                finish_job(conn, job_id, "FAILED", 0, version, "no goods or users")
                print("no goods or users")
                return

            user_item = get_user_item_events(conn)
            user_item = append_collect_feedback(conn, user_item)
            user_item = append_order_feedback(conn, user_item)
            user_items = {}
            for (openid, gid), score in user_item.items():
                user_items.setdefault(openid, {})
                user_items[openid][gid] = score

            cf_pack = build_cf_feature_pack(conn, goods_ids)
            cf_weights = get_cf_dimension_weights(conn, SCENE)
            user_sim = train_user_similarity_multidim(cf_pack, cf_weights)
            ctr_scores = build_ctr_scores(goods_ids, get_ctr_stats(conn))
            cvr_scores = build_cvr_scores(goods_ids, get_cvr_stats(conn))
            w_cf, w_ctr, w_cvr = get_default_weights(conn, SCENE)

            cf_rows = []
            ctr_rows = []
            cvr_rows = []
            blend_rows = []

            for openid in openids:
                cf_score_map = score_candidates_topk_multidim(openid, user_sim, user_items, goods_ids, k=10)
                ctr_score_map = {gid: ctr_scores.get(gid, 0.0) for gid in goods_ids}
                cvr_score_map = {gid: cvr_scores.get(gid, 0.0) for gid in goods_ids}

                for gid, score, rank_no in rank_topn(cf_score_map, TOPN):
                    cf_rows.append((openid, gid, score, rank_no))
                for gid, score, rank_no in rank_topn(ctr_score_map, TOPN):
                    ctr_rows.append((openid, gid, score, rank_no))
                for gid, score, rank_no in rank_topn(cvr_score_map, TOPN):
                    cvr_rows.append((openid, gid, score, rank_no))

                blend_score_map = {}
                for gid in goods_ids:
                    blend_score_map[gid] = (
                        w_cf * cf_score_map.get(gid, 0.0)
                        + w_ctr * ctr_score_map.get(gid, 0.0)
                        + w_cvr * cvr_score_map.get(gid, 0.0)
                    )
                for gid, score, rank_no in rank_topn(blend_score_map, TOPN):
                    blend_rows.append((openid, gid, score, rank_no))

            save_algo_scores(conn, "CF", SCENE, version, cf_rows)
            save_algo_scores(conn, "CTR", SCENE, version, ctr_rows)
            save_algo_scores(conn, "CVR", SCENE, version, cvr_rows)
            save_blend_scores(conn, SCENE, version, blend_rows)

            finish_job(
                conn,
                job_id,
                "SUCCESS",
                sample_size=len(blend_rows),
                model_version=version,
                message="offline scoring success",
            )
            print(f"success version={version} blend_rows={len(blend_rows)}")
        except Exception as ex:
            finish_job(conn, job_id, "FAILED", 0, version, str(ex)[:250])
            traceback.print_exc()
            raise


if __name__ == "__main__":
    main()
