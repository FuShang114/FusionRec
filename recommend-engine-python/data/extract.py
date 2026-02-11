from collections import defaultdict

import numpy as np
import pandas as pd

from db.mysql_client import fetch_all


def get_active_goods(conn):
    sql = """
    select goods_id
    from sys_goods
    where status = '1'
    """
    rows = fetch_all(conn, sql)
    return [int(r[0]) for r in rows]


def get_user_item_events(conn):
    # build implicit feedback with simple event weights
    event_weight = {
        "expose": 0.2,
        "click": 1.0,
        "collect": 2.5,
        "cart": 2.0,
        "order": 3.0,
        "pay": 3.5,
    }
    user_item = defaultdict(float)
    now_rows = fetch_all(
        conn,
        """
        select openid, goods_id, event_type, event_time
        from reco_event_log
        where event_time >= date_sub(now(), interval 90 day)
        """,
    )
    for openid, goods_id, event_type, event_time in now_rows:
        key = (openid, int(goods_id))
        # 时间衰减：近期行为权重更高
        decay = 1.0
        if event_time is not None:
            try:
                delta_days = max((pd.Timestamp.now() - pd.Timestamp(event_time)).days, 0)
                decay = float(np.exp(-0.03 * delta_days))
            except Exception:
                decay = 1.0
        user_item[key] += event_weight.get(str(event_type), 0.5) * decay
    return user_item


def append_collect_feedback(conn, user_item):
    sql = """
    select openid, goods_id
    from user_collect
    """
    rows = fetch_all(conn, sql)
    for openid, goods_id in rows:
        user_item[(openid, int(goods_id))] += 2.5
    return user_item


def append_order_feedback(conn, user_item):
    sql = """
    select uo.openid, uod.goods_id, uod.num
    from user_order uo
    join user_order_detail uod on uo.order_id = uod.order_id
    where uo.create_time >= date_sub(now(), interval 180 day)
    """
    rows = fetch_all(conn, sql)
    for openid, goods_id, num in rows:
        user_item[(openid, int(goods_id))] += 3.0 + float(num or 1) * 0.3
    return user_item


def get_ctr_stats(conn):
    sql = """
    select goods_id,
           sum(case when event_type = 'expose' then 1 else 0 end) as expose_cnt,
           sum(case when event_type = 'click' then 1 else 0 end) as click_cnt
    from reco_event_log
    where event_time >= date_sub(now(), interval 30 day)
    group by goods_id
    """
    rows = fetch_all(conn, sql)
    stats = {}
    for goods_id, expose_cnt, click_cnt in rows:
        stats[int(goods_id)] = {
            "expose": int(expose_cnt or 0),
            "click": int(click_cnt or 0),
        }
    return stats


def get_cvr_stats(conn):
    sql = """
    select goods_id,
           sum(case when event_type = 'click' then 1 else 0 end) as click_cnt,
           sum(case when event_type in ('order', 'pay') then 1 else 0 end) as conv_cnt
    from reco_event_log
    where event_time >= date_sub(now(), interval 30 day)
    group by goods_id
    """
    rows = fetch_all(conn, sql)
    stats = {}
    for goods_id, click_cnt, conv_cnt in rows:
        stats[int(goods_id)] = {
            "click": int(click_cnt or 0),
            "conv": int(conv_cnt or 0),
        }
    return stats


def get_all_openids(conn):
    sql = """
    select distinct openid from wx_user
    """
    rows = fetch_all(conn, sql)
    return [r[0] for r in rows]


def get_default_weights(conn, scene):
    sql = """
    select cf_weight, ctr_weight, cvr_weight
    from reco_engine_config
    where scene = %s
    limit 1
    """
    rows = fetch_all(conn, sql, [scene])
    if not rows:
        return 0.33, 0.33, 0.34
    cf, ctr, cvr = rows[0]
    return float(cf), float(ctr), float(cvr)


def get_cf_dimension_weights(conn, scene):
    sql = """
    select attr_weight, consume_weight, rating_weight, dish_weight
    from reco_train_config
    where scene = %s
    limit 1
    """
    rows = fetch_all(conn, sql, [scene])
    if not rows:
        return 0.2, 0.3, 0.3, 0.2
    w1, w2, w3, w4 = rows[0]
    return float(w1), float(w2), float(w3), float(w4)


def build_cf_feature_pack(conn, active_goods):
    # 1) 用户画像(属性集合)
    profile_rows = fetch_all(
        conn,
        """
        select openid, usage_duration_days, consumed_order_count_30d, consumed_amount_30d, is_high_value_user
        from reco_user_profile_daily
        where dt = (select max(dt) from reco_user_profile_daily)
        """,
    )
    profile_df = pd.DataFrame(
        profile_rows,
        columns=["openid", "usage_days", "order_30d", "amount_30d", "is_high_value"],
    )
    if profile_df.empty:
        profile_df = pd.DataFrame(columns=["openid", "usage_days", "order_30d", "amount_30d", "is_high_value"])
    profile_df = profile_df.drop_duplicates(subset=["openid"]).fillna(0)

    def usage_bucket(x):
        x = int(x)
        if x < 7:
            return "usage_new"
        if x < 30:
            return "usage_mid"
        return "usage_old"

    def amount_bucket(x):
        x = float(x)
        if x < 100:
            return "amount_low"
        if x < 400:
            return "amount_mid"
        return "amount_high"

    attr_sets = {}
    for _, row in profile_df.iterrows():
        tags = {
            usage_bucket(row["usage_days"]),
            amount_bucket(row["amount_30d"]),
            "high_value" if str(row["is_high_value"]) == "1" else "normal_value",
            "order_active" if int(row["order_30d"]) >= 5 else "order_light",
        }
        attr_sets[str(row["openid"])] = tags

    # 2) 消费行为向量（订单数量）
    consume_rows = fetch_all(
        conn,
        """
        select uo.openid, uod.goods_id, sum(uod.num) as buy_num
        from user_order uo
        join user_order_detail uod on uo.order_id = uod.order_id
        where uo.create_time >= date_sub(now(), interval 180 day)
        group by uo.openid, uod.goods_id
        """,
    )
    consume_df = pd.DataFrame(consume_rows, columns=["openid", "goods_id", "buy_num"])
    if consume_df.empty:
        consume_df = pd.DataFrame(columns=["openid", "goods_id", "buy_num"])
    consume_df["goods_id"] = consume_df["goods_id"].astype(int, errors="ignore")
    consume_df["buy_num"] = pd.to_numeric(consume_df["buy_num"], errors="coerce").fillna(0)
    consume_pivot = consume_df.pivot_table(index="openid", columns="goods_id", values="buy_num", aggfunc="sum", fill_value=0)
    for gid in active_goods:
        if gid not in consume_pivot.columns:
            consume_pivot[gid] = 0
    consume_pivot = consume_pivot[sorted(consume_pivot.columns)]

    consume_vectors = {str(uid): consume_pivot.loc[uid].to_numpy(dtype=float) for uid in consume_pivot.index}

    # 3) 评分反馈向量（基于事件反馈构建隐式评分）
    rating_rows = fetch_all(
        conn,
        """
        select openid, goods_id,
               avg(case event_type
                     when 'pay' then 5
                     when 'order' then 4
                     when 'collect' then 4
                     when 'click' then 3
                     else 1 end) as rating_score
        from reco_event_log
        where event_time >= date_sub(now(), interval 90 day)
        group by openid, goods_id
        """,
    )
    rating_df = pd.DataFrame(rating_rows, columns=["openid", "goods_id", "rating_score"])
    if rating_df.empty:
        rating_df = pd.DataFrame(columns=["openid", "goods_id", "rating_score"])
    rating_df["goods_id"] = rating_df["goods_id"].astype(int, errors="ignore")
    rating_df["rating_score"] = pd.to_numeric(rating_df["rating_score"], errors="coerce").fillna(0)
    rating_pivot = rating_df.pivot_table(index="openid", columns="goods_id", values="rating_score", aggfunc="mean", fill_value=0)
    for gid in active_goods:
        if gid not in rating_pivot.columns:
            rating_pivot[gid] = 0
    rating_pivot = rating_pivot[sorted(rating_pivot.columns)]
    rating_vectors = {str(uid): rating_pivot.loc[uid].to_numpy(dtype=float) for uid in rating_pivot.index}

    # 4) 菜品偏好集合（常购分类）
    dish_rows = fetch_all(
        conn,
        """
        select uo.openid, sg.category_id, sum(uod.num) as buy_num
        from user_order uo
        join user_order_detail uod on uo.order_id = uod.order_id
        join sys_goods sg on sg.goods_id = uod.goods_id
        where uo.create_time >= date_sub(now(), interval 180 day)
        group by uo.openid, sg.category_id
        having buy_num >= 2
        """,
    )
    dish_df = pd.DataFrame(dish_rows, columns=["openid", "category_id", "buy_num"])
    if dish_df.empty:
        dish_df = pd.DataFrame(columns=["openid", "category_id", "buy_num"])
    dish_pref_sets = defaultdict(set)
    for _, row in dish_df.iterrows():
        dish_pref_sets[str(row["openid"])].add(int(row["category_id"]))

    # 对齐所有用户
    users = set(attr_sets.keys()) | set(consume_vectors.keys()) | set(rating_vectors.keys()) | set(dish_pref_sets.keys())
    zero_consume = np.zeros(len(active_goods), dtype=float)
    zero_rating = np.zeros(len(active_goods), dtype=float)
    pack = {
        "users": sorted(users),
        "attr_sets": {u: attr_sets.get(u, set()) for u in users},
        "consume_vectors": {u: consume_vectors.get(u, zero_consume.copy()) for u in users},
        "rating_vectors": {u: rating_vectors.get(u, zero_rating.copy()) for u in users},
        "dish_pref_sets": {u: dish_pref_sets.get(u, set()) for u in users},
    }
    return pack
