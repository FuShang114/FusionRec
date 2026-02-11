from contextlib import contextmanager

import pymysql

from config.settings import DB_CONFIG


@contextmanager
def get_conn():
    conn = pymysql.connect(**DB_CONFIG)
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


def fetch_all(conn, sql, args=None):
    with conn.cursor() as cur:
        cur.execute(sql, args or [])
        return cur.fetchall()


def execute_many(conn, sql, rows):
    if not rows:
        return 0
    with conn.cursor() as cur:
        count = cur.executemany(sql, rows)
    return count


def execute_one(conn, sql, args=None):
    with conn.cursor() as cur:
        return cur.execute(sql, args or [])
