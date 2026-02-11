from collections import defaultdict
from math import sqrt

import numpy as np


def train_item_similarity(user_item_scores):
    user_items = defaultdict(dict)
    for (openid, goods_id), score in user_item_scores.items():
        user_items[openid][goods_id] = score

    co = defaultdict(float)
    item_norm = defaultdict(float)
    for _openid, items in user_items.items():
        goods = list(items.items())
        for i, score_i in goods:
            item_norm[i] += score_i * score_i
        for i, score_i in goods:
            for j, score_j in goods:
                if i == j:
                    continue
                co[(i, j)] += score_i * score_j

    sim = defaultdict(float)
    for (i, j), cij in co.items():
        den = sqrt(item_norm[i]) * sqrt(item_norm[j])
        if den > 0:
            sim[(i, j)] = cij / den
    return sim, user_items


def score_candidates_for_user(openid, sim, user_items, all_goods):
    seen = set(user_items.get(openid, {}).keys())
    scores = defaultdict(float)
    profile = user_items.get(openid, {})
    for hist_item, hist_score in profile.items():
        for cand in all_goods:
            if cand in seen:
                continue
            scores[cand] += sim.get((hist_item, cand), 0.0) * hist_score
    # if user has no history, return zeros for candidates
    if not scores:
        for cand in all_goods:
            if cand not in seen:
                scores[cand] = 0.0
    return scores


def jaccard_similarity(set_a, set_b):
    a = set(set_a or [])
    b = set(set_b or [])
    if not a and not b:
        return 0.0
    inter = len(a & b)
    union = len(a | b)
    return float(inter) / float(union) if union > 0 else 0.0


def cosine_similarity(vec_a, vec_b):
    a = np.asarray(vec_a, dtype=float)
    b = np.asarray(vec_b, dtype=float)
    na = np.linalg.norm(a)
    nb = np.linalg.norm(b)
    if na == 0 or nb == 0:
        return 0.0
    return float(np.dot(a, b) / (na * nb))


def pearson_similarity(ratings_a, ratings_b):
    a = np.asarray(ratings_a, dtype=float)
    b = np.asarray(ratings_b, dtype=float)
    if a.size == 0 or b.size == 0:
        return 0.0
    if np.std(a) == 0 or np.std(b) == 0:
        return 0.0
    corr = np.corrcoef(a, b)[0, 1]
    if np.isnan(corr):
        return 0.0
    # map [-1,1] -> [0,1]
    return float((corr + 1.0) / 2.0)


def train_user_similarity_multidim(feature_pack, dim_weights):
    users = feature_pack["users"]
    attr_sets = feature_pack["attr_sets"]
    consume_vectors = feature_pack["consume_vectors"]
    rating_vectors = feature_pack["rating_vectors"]
    dish_pref_sets = feature_pack["dish_pref_sets"]
    w1, w2, w3, w4 = dim_weights

    n = len(users)
    if n == 0:
        return {}

    # NumPy batch for consume cosine
    consume_matrix = np.vstack([consume_vectors[u] for u in users]) if n > 0 else np.zeros((0, 0))
    dot = np.matmul(consume_matrix, consume_matrix.T) if consume_matrix.size else np.zeros((n, n))
    norms = np.linalg.norm(consume_matrix, axis=1) if consume_matrix.size else np.zeros(n)
    den = np.outer(norms, norms)
    consume_sim = np.divide(dot, den, out=np.zeros_like(dot), where=den != 0)

    # NumPy batch for rating Pearson
    rating_matrix = np.vstack([rating_vectors[u] for u in users]) if n > 0 else np.zeros((0, 0))
    if rating_matrix.shape[1] > 1:
        rating_corr = np.corrcoef(rating_matrix)
        rating_corr = np.nan_to_num(rating_corr, nan=0.0)
        rating_sim = (rating_corr + 1.0) / 2.0
    else:
        rating_sim = np.zeros((n, n))

    user_sim = defaultdict(float)
    for i in range(n):
        for j in range(n):
            if i == j:
                continue
            ui = users[i]
            uj = users[j]
            sim_attr = jaccard_similarity(attr_sets.get(ui), attr_sets.get(uj))
            sim_consume = float(consume_sim[i, j])
            sim_rating = float(rating_sim[i, j])
            sim_dish = jaccard_similarity(dish_pref_sets.get(ui), dish_pref_sets.get(uj))
            sim_total = w1 * sim_attr + w2 * sim_consume + w3 * sim_rating + w4 * sim_dish
            user_sim[(ui, uj)] = max(sim_total, 0.0)
    return user_sim


def score_candidates_topk_multidim(openid, user_sim, user_items, all_goods, k=10):
    seen = set(user_items.get(openid, {}).keys())
    sims = [(other, s) for (u, other), s in user_sim.items() if u == openid and s > 0]
    sims.sort(key=lambda x: x[1], reverse=True)
    neighbors = sims[:k]

    scores = defaultdict(float)
    for other, sim_val in neighbors:
        for gid, pref in user_items.get(other, {}).items():
            if gid in seen:
                continue
            scores[gid] += sim_val * pref

    if not scores:
        for gid in all_goods:
            if gid not in seen:
                scores[gid] = 0.0
    return scores
