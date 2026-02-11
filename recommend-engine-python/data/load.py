from datetime import datetime

from db.mysql_client import execute_many, execute_one


def _delete_today_algo(conn, algo_type, scene):
    sql = """
    delete from reco_result
    where algo_type = %s
      and biz_scene = %s
      and date(dt) = curdate()
    """
    execute_one(conn, sql, [algo_type, scene])


def _delete_today_blend(conn, scene):
    sql = """
    delete from reco_blend_result
    where biz_scene = %s
      and date(dt) = curdate()
    """
    execute_one(conn, sql, [scene])


def save_algo_scores(conn, algo_type, scene, version, score_rows):
    _delete_today_algo(conn, algo_type, scene)
    now = datetime.now()
    sql = """
    insert into reco_result(
      openid, goods_id, algo_type, score, rank_no, biz_scene, model_version, dt, create_time
    ) values (%s,%s,%s,%s,%s,%s,%s,%s,%s)
    """
    rows = []
    for openid, goods_id, score, rank_no in score_rows:
        rows.append((openid, goods_id, algo_type, float(score), int(rank_no), scene, version, now, now))
    return execute_many(conn, sql, rows)


def save_blend_scores(conn, scene, version, score_rows):
    _delete_today_blend(conn, scene)
    now = datetime.now()
    sql = """
    insert into reco_blend_result(
      openid, goods_id, score, rank_no, biz_scene, model_version, dt, create_time
    ) values (%s,%s,%s,%s,%s,%s,%s,%s)
    """
    rows = []
    for openid, goods_id, score, rank_no in score_rows:
        rows.append((openid, goods_id, float(score), int(rank_no), scene, version, now, now))
    return execute_many(conn, sql, rows)


def create_job(conn, algo_type, message=""):
    now = datetime.now()
    sql = """
    insert into reco_job(
      job_type, algo_type, status, message, start_time, create_time, update_time
    ) values ('score', %s, 'RUNNING', %s, %s, %s, %s)
    """
    execute_one(conn, sql, [algo_type, message, now, now, now])
    with conn.cursor() as cur:
        cur.execute("select last_insert_id()")
        return int(cur.fetchone()[0])


def finish_job(conn, job_id, status, sample_size=0, model_version=None, message=""):
    now = datetime.now()
    sql = """
    update reco_job
    set status=%s,
        sample_size=%s,
        model_version=%s,
        message=%s,
        end_time=%s,
        update_time=%s
    where job_id=%s
    """
    execute_one(conn, sql, [status, int(sample_size), model_version, message, now, now, int(job_id)])
