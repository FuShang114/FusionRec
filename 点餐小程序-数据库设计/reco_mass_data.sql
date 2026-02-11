/*
  推荐系统压测数据脚本（MySQL 8+）
  作用：
  1) 批量插入测试用户（openid: reco_u_0001 ~ reco_u_0500）
  2) 生成用户画像日表数据
  3) 生成大量推荐事件日志（expose/click/collect/order/pay）
  4) 补充部分收藏数据

  执行前请确认：
  - 已执行 reco_schema.sql
  - 当前数据库为 order-system
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 1) 批量插入 500 个测试用户
WITH RECURSIVE u AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM u WHERE n < 500
)
INSERT INTO wx_user(openid, nick_name, avatar_url)
SELECT
  CONCAT('reco_u_', LPAD(n, 4, '0')) AS openid,
  CONCAT('RecoUser', LPAD(n, 4, '0')) AS nick_name,
  '/images/default-avatar.png' AS avatar_url
FROM u
ON DUPLICATE KEY UPDATE
  nick_name = VALUES(nick_name),
  avatar_url = VALUES(avatar_url);

-- 2) 写入用户画像（当天）
WITH RECURSIVE u AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM u WHERE n < 500
)
INSERT INTO reco_user_profile_daily(
  openid, dt, usage_duration_days, consumed_order_count_30d, consumed_amount_30d,
  avg_order_amount_30d, is_high_value_user, create_time, update_time
)
SELECT
  CONCAT('reco_u_', LPAD(n, 4, '0')) AS openid,
  CURDATE() AS dt,
  5 + (n % 120) AS usage_duration_days,
  (n % 25) AS consumed_order_count_30d,
  (n % 25) * (20 + (n % 10)) AS consumed_amount_30d,
  (20 + (n % 10)) AS avg_order_amount_30d,
  CASE WHEN (n % 7) IN (0, 1) THEN '1' ELSE '0' END AS is_high_value_user,
  NOW(),
  NOW()
FROM u
ON DUPLICATE KEY UPDATE
  usage_duration_days = VALUES(usage_duration_days),
  consumed_order_count_30d = VALUES(consumed_order_count_30d),
  consumed_amount_30d = VALUES(consumed_amount_30d),
  avg_order_amount_30d = VALUES(avg_order_amount_30d),
  is_high_value_user = VALUES(is_high_value_user),
  update_time = NOW();

-- 3) 生成推荐事件日志（约 2~4 万条，取决于启用商品数量）
WITH RECURSIVE
u AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM u WHERE n < 500
),
e AS (
  SELECT 1 AS m
  UNION ALL
  SELECT m + 1 FROM e WHERE m < 20
),
g AS (
  SELECT goods_id FROM sys_goods WHERE status = '1'
)
INSERT INTO reco_event_log(openid, goods_id, event_type, scene, event_time, ext_json)
SELECT
  CONCAT('reco_u_', LPAD(u.n, 4, '0')) AS openid,
  g.goods_id,
  CASE ((u.n + e.m + g.goods_id) % 10)
    WHEN 0 THEN 'pay'
    WHEN 1 THEN 'order'
    WHEN 2 THEN 'collect'
    WHEN 3 THEN 'click'
    WHEN 4 THEN 'click'
    WHEN 5 THEN 'expose'
    WHEN 6 THEN 'expose'
    WHEN 7 THEN 'expose'
    WHEN 8 THEN 'expose'
    ELSE 'expose'
  END AS event_type,
  'home_hot' AS scene,
  DATE_SUB(NOW(), INTERVAL ((u.n + e.m + g.goods_id) % 30) DAY) AS event_time,
  JSON_OBJECT('seed', CONCAT(u.n, '-', e.m, '-', g.goods_id)) AS ext_json
FROM u
JOIN e
JOIN g
WHERE ((u.n + e.m + g.goods_id) % 3) = 0;

-- 4) 补充收藏表（每人若干收藏）
WITH RECURSIVE
u AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM u WHERE n < 500
),
g AS (
  SELECT goods_id FROM sys_goods WHERE status = '1'
)
INSERT INTO user_collect(openid, goods_id)
SELECT
  CONCAT('reco_u_', LPAD(u.n, 4, '0')) AS openid,
  g.goods_id
FROM u
JOIN g
WHERE ((u.n + g.goods_id) % 9) = 0;

SET FOREIGN_KEY_CHECKS = 1;

-- 建议执行后：
-- 1) 在后台点击“手动触发训练”
-- 2) 用以下 openid 在“推荐效果预览”里测试：
--    reco_u_0001, reco_u_0008, reco_u_0015, reco_u_0128, reco_u_0256, reco_u_0500
