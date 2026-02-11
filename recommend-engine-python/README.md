# Recommend Engine Python

Offline recommendation pipeline for the order system.

## Algorithms

- CF: item co-occurrence score from user implicit interactions.
- CTR: smoothed click-through rate from `reco_event_log`.
- CVR: smoothed conversion rate from click/order events.

## Output tables

- `reco_result` (algo-level score)
- `reco_blend_result` (blended score)
- `reco_job` (job record)

## Install

```bash
pip install -r requirements.txt
```

## Run

```bash
python pipelines/run_offline.py
```

Optional environment variables:

- `RECO_DB_HOST` default `127.0.0.1`
- `RECO_DB_PORT` default `3306`
- `RECO_DB_USER` default `root`
- `RECO_DB_PASSWORD` default `root`
- `RECO_DB_NAME` default `order-system`
- `RECO_SCENE` default `home_hot`
- `RECO_TOPN` default `50`
