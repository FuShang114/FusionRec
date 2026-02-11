def build_ctr_scores(goods_ids, ctr_stats, alpha=1.0, beta=20.0):
    # Bayesian smoothing: (click + alpha) / (expose + alpha + beta)
    out = {}
    for gid in goods_ids:
        stat = ctr_stats.get(gid, {"expose": 0, "click": 0})
        expose = float(stat["expose"])
        click = float(stat["click"])
        out[gid] = (click + alpha) / (expose + alpha + beta)
    return out
