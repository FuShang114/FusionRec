import os


DB_CONFIG = {
    "host": os.getenv("RECO_DB_HOST", "127.0.0.1"),
    "port": int(os.getenv("RECO_DB_PORT", "3306")),
    "user": os.getenv("RECO_DB_USER", "root"),
    "password": os.getenv("RECO_DB_PASSWORD", "root"),
    "database": os.getenv("RECO_DB_NAME", "order-system"),
    "charset": "utf8mb4",
    "autocommit": False,
}

SCENE = os.getenv("RECO_SCENE", "home_hot")
TOPN = int(os.getenv("RECO_TOPN", "50"))
