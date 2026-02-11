def build_cvr_scores(goods_ids, cvr_stats, alpha=1.0, beta=10.0):
    # Bayesian smoothing: (conv + alpha) / (click + alpha + beta)
    out = {}
    for gid in goods_ids:
        stat = cvr_stats.get(gid, {"click": 0, "conv": 0})
        click = float(stat["click"])
        conv = float(stat["conv"])
        out[gid] = (conv + alpha) / (click + alpha + beta)
    return out
