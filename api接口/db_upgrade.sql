-- FusionRec 数据库升级脚本
-- 包含库存/SKU/支付/协同点餐等新功能所需的表结构

-- ============================================
-- 1. 库存管理模块
-- ============================================

-- 商品库存表
CREATE TABLE IF NOT EXISTS `sys_goods_stock` (
  `stock_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `goods_id` bigint(20) NOT NULL,
  `sku_id` bigint(20) DEFAULT NULL COMMENT 'SKU ID，null表示统一库存',
  `stock_quantity` int(11) NOT NULL DEFAULT 0 COMMENT '可用库存',
  `locked_quantity` int(11) NOT NULL DEFAULT 0 COMMENT '已锁定库存',
  `sold_quantity` int(11) NOT NULL DEFAULT 0 COMMENT '已售数量',
  `warning_threshold` int(11) DEFAULT 10 COMMENT '预警阈值',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`stock_id`),
  UNIQUE KEY `uk_goods_sku` (`goods_id`, `sku_id`),
  KEY `idx_goods_id` (`goods_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='商品库存表';

-- 库存变动日志
CREATE TABLE IF NOT EXISTS `sys_stock_log` (
  `log_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `goods_id` bigint(20) NOT NULL,
  `sku_id` bigint(20) DEFAULT NULL,
  `change_type` varchar(32) NOT NULL COMMENT 'lock/unlock/deduct/restore',
  `change_quantity` int(11) NOT NULL,
  `before_quantity` int(11) NOT NULL,
  `after_quantity` int(11) NOT NULL,
  `order_no` varchar(64) DEFAULT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`log_id`),
  KEY `idx_goods_id` (`goods_id`),
  KEY `idx_order_no` (`order_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='库存变动日志';

-- ============================================
-- 2. SKU规格系统
-- ============================================

-- SKU表（规格组合）
CREATE TABLE IF NOT EXISTS `sys_goods_sku` (
  `sku_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `goods_id` bigint(20) NOT NULL,
  `sku_code` varchar(64) NOT NULL COMMENT 'SKU编码',
  `sku_name` varchar(255) NOT NULL COMMENT 'SKU名称（如：大杯+珍珠）',
  `sku_image` varchar(255) DEFAULT NULL,
  `sku_price` decimal(10,2) NOT NULL COMMENT 'SKU售价',
  `sku_stock` int(11) DEFAULT 0,
  `status` varchar(2) DEFAULT '1' COMMENT '0-禁用 1-启用',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`sku_id`),
  UNIQUE KEY `uk_sku_code` (`sku_code`),
  KEY `idx_goods_id` (`goods_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='SKU表';

-- 规格名称表（如：容量、温度、甜度）
CREATE TABLE IF NOT EXISTS `sys_goods_spec` (
  `spec_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `goods_id` bigint(20) NOT NULL,
  `spec_name` varchar(64) NOT NULL COMMENT '规格名',
  `spec_order` int(11) DEFAULT 0 COMMENT '排序',
  `is_required` varchar(2) DEFAULT '1' COMMENT '是否必选',
  `select_type` varchar(16) DEFAULT 'single' COMMENT 'single-单选 multi-多选',
  PRIMARY KEY (`spec_id`),
  KEY `idx_goods_id` (`goods_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='规格名称表';

-- 规格值表（如：大杯、中杯、去冰、半糖）
CREATE TABLE IF NOT EXISTS `sys_goods_spec_value` (
  `value_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `spec_id` bigint(20) NOT NULL,
  `value_name` varchar(64) NOT NULL COMMENT '规格值',
  `value_image` varchar(255) DEFAULT NULL,
  `additional_price` decimal(10,2) DEFAULT 0.00 COMMENT '附加价格',
  `value_order` int(11) DEFAULT 0,
  PRIMARY KEY (`value_id`),
  KEY `idx_spec_id` (`spec_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='规格值表';

-- SKU与规格值关联表
CREATE TABLE IF NOT EXISTS `sys_sku_spec_value` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `sku_id` bigint(20) NOT NULL,
  `spec_id` bigint(20) NOT NULL,
  `value_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_sku_spec` (`sku_id`, `spec_id`),
  KEY `idx_sku_id` (`sku_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='SKU与规格值关联表';

-- 配料/加料表
CREATE TABLE IF NOT EXISTS `sys_goods_topping` (
  `topping_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `goods_id` bigint(20) NOT NULL COMMENT '所属商品',
  `topping_name` varchar(128) NOT NULL COMMENT '配料名',
  `topping_price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `topping_image` varchar(255) DEFAULT NULL,
  `max_quantity` int(11) DEFAULT 5 COMMENT '最大可选数量',
  `status` varchar(2) DEFAULT '1',
  PRIMARY KEY (`topping_id`),
  KEY `idx_goods_id` (`goods_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='配料表';

-- ============================================
-- 3. 口味与备注系统
-- ============================================

-- 口味标签表
CREATE TABLE IF NOT EXISTS `sys_taste_tag` (
  `tag_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(64) NOT NULL COMMENT '标签名',
  `tag_type` varchar(32) NOT NULL COMMENT 'taste-口味 allergy-过敏源 other-其他',
  `tag_icon` varchar(255) DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0,
  `status` varchar(2) DEFAULT '1',
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='口味标签表';

-- 订单备注表
CREATE TABLE IF NOT EXISTS `user_order_remark` (
  `remark_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `order_id` bigint(20) NOT NULL,
  `remark_type` varchar(32) NOT NULL COMMENT 'order-整单 detail-单品',
  `detail_id` bigint(20) DEFAULT NULL COMMENT '单品ID',
  `taste_tags` varchar(255) DEFAULT NULL COMMENT '口味标签ID，逗号分隔',
  `avoid_tags` varchar(255) DEFAULT NULL COMMENT '忌口标签ID，逗号分隔',
  `custom_remark` text COMMENT '自定义备注',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`remark_id`),
  KEY `idx_order_id` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='订单备注表';

-- 常用备注模板表
CREATE TABLE IF NOT EXISTS `sys_remark_template` (
  `template_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `template_content` varchar(255) NOT NULL,
  `template_type` varchar(32) DEFAULT 'common' COMMENT 'common-通用 shop-店铺',
  `shop_id` bigint(20) DEFAULT NULL,
  `use_count` int(11) DEFAULT 0,
  `sort_order` int(11) DEFAULT 0,
  PRIMARY KEY (`template_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='备注模板表';

-- ============================================
-- 4. 支付系统
-- ============================================

-- 支付订单表
CREATE TABLE IF NOT EXISTS `pay_order` (
  `pay_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `pay_no` varchar(64) NOT NULL COMMENT '支付单号',
  `order_no` varchar(64) NOT NULL COMMENT '业务订单号',
  `pay_amount` decimal(12,2) NOT NULL COMMENT '支付金额',
  `pay_type` varchar(32) NOT NULL COMMENT 'wechat/alipay/card/cash/balance',
  `pay_status` varchar(32) DEFAULT 'pending' COMMENT 'pending/success/failed/refunded',
  `third_pay_no` varchar(128) DEFAULT NULL COMMENT '第三方支付单号',
  `pay_time` datetime DEFAULT NULL,
  `expire_time` datetime DEFAULT NULL COMMENT '支付超时时间',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`pay_id`),
  UNIQUE KEY `uk_pay_no` (`pay_no`),
  KEY `idx_order_no` (`order_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='支付订单表';

-- 会员余额表
CREATE TABLE IF NOT EXISTS `user_balance` (
  `balance_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `openid` varchar(255) NOT NULL,
  `balance_amount` decimal(12,2) NOT NULL DEFAULT 0.00 COMMENT '余额',
  `frozen_amount` decimal(12,2) NOT NULL DEFAULT 0.00 COMMENT '冻结金额',
  `total_recharge` decimal(12,2) DEFAULT 0.00 COMMENT '累计充值',
  `total_consume` decimal(12,2) DEFAULT 0.00 COMMENT '累计消费',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`balance_id`),
  UNIQUE KEY `uk_openid` (`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='会员余额表';

-- 余额变动记录
CREATE TABLE IF NOT EXISTS `user_balance_log` (
  `log_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `openid` varchar(255) NOT NULL,
  `change_type` varchar(32) NOT NULL COMMENT 'recharge/consume/refund/freeze/unfreeze',
  `change_amount` decimal(12,2) NOT NULL,
  `before_amount` decimal(12,2) NOT NULL,
  `after_amount` decimal(12,2) NOT NULL,
  `order_no` varchar(64) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`log_id`),
  KEY `idx_openid` (`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='余额变动记录';

-- ============================================
-- 5. 多人协同点餐系统
-- ============================================

-- 共享购物车会话表
CREATE TABLE IF NOT EXISTS `shared_cart_session` (
  `session_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `session_code` varchar(32) NOT NULL COMMENT '共享码（如：A3B5）',
  `session_qr` varchar(255) DEFAULT NULL COMMENT '二维码图片',
  `owner_openid` varchar(255) NOT NULL COMMENT '创建人',
  `shop_id` bigint(20) DEFAULT NULL,
  `table_no` varchar(32) DEFAULT NULL COMMENT '桌号',
  `status` varchar(32) DEFAULT 'active' COMMENT 'active/locked/completed/cancelled',
  `member_count` int(11) DEFAULT 1,
  `expire_time` datetime DEFAULT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`session_id`),
  UNIQUE KEY `uk_session_code` (`session_code`),
  KEY `idx_owner_openid` (`owner_openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='共享购物车会话表';

-- 共享购物车成员表
CREATE TABLE IF NOT EXISTS `shared_cart_member` (
  `member_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `session_id` bigint(20) NOT NULL,
  `openid` varchar(255) NOT NULL,
  `nick_name` varchar(128) DEFAULT NULL,
  `avatar_url` varchar(255) DEFAULT NULL,
  `role` varchar(32) DEFAULT 'member' COMMENT 'owner/member',
  `join_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `last_active` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`member_id`),
  UNIQUE KEY `uk_session_member` (`session_id`, `openid`),
  KEY `idx_session_id` (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='共享购物车成员表';

-- 共享购物车商品表
CREATE TABLE IF NOT EXISTS `shared_cart_item` (
  `item_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `session_id` bigint(20) NOT NULL,
  `openid` varchar(255) NOT NULL COMMENT '添加人',
  `goods_id` bigint(20) NOT NULL,
  `sku_id` bigint(20) DEFAULT NULL,
  `sku_name` varchar(255) DEFAULT NULL,
  `goods_name` varchar(255) NOT NULL,
  `goods_image` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `unit_price` decimal(10,2) NOT NULL,
  `topping_ids` varchar(255) DEFAULT NULL COMMENT '配料ID',
  `topping_price` decimal(10,2) DEFAULT 0.00,
  `remark` varchar(255) DEFAULT NULL,
  `is_checked` varchar(2) DEFAULT '1' COMMENT '是否选中',
  `add_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`item_id`),
  KEY `idx_session_id` (`session_id`),
  KEY `idx_openid` (`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='共享购物车商品表';

-- 购物车操作日志（用于实时同步）
CREATE TABLE IF NOT EXISTS `shared_cart_log` (
  `log_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `session_id` bigint(20) NOT NULL,
  `openid` varchar(255) NOT NULL,
  `action` varchar(32) NOT NULL COMMENT 'add/update/delete/check/uncheck',
  `item_id` bigint(20) DEFAULT NULL,
  `action_data` json DEFAULT NULL COMMENT '操作数据',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`log_id`),
  KEY `idx_session_id` (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='购物车操作日志';

-- ============================================
-- 6. 插入基础数据
-- ============================================

-- 插入口味标签
INSERT INTO `sys_taste_tag` (`tag_id`, `tag_name`, `tag_type`, `sort_order`) VALUES
(1, '多冰', 'taste', 1),
(2, '少冰', 'taste', 2),
(3, '去冰', 'taste', 3),
(4, '多甜', 'taste', 4),
(5, '少甜', 'taste', 5),
(6, '标准糖', 'taste', 6),
(7, '无糖', 'taste', 7),
(11, '花生', 'allergy', 1),
(12, '海鲜', 'allergy', 2),
(13, '麸质', 'allergy', 3),
(14, '乳糖', 'allergy', 4),
(15, '鸡蛋', 'allergy', 5)
ON DUPLICATE KEY UPDATE tag_name=VALUES(tag_name);

-- 插入备注模板
INSERT INTO `sys_remark_template` (`template_id`, `template_content`, `template_type`, `sort_order`) VALUES
(1, '少辣', 'common', 1),
(2, '不要葱', 'common', 2),
(3, '多加酱', 'common', 3),
(4, '打包带走', 'common', 4),
(5, '堂食', 'common', 5)
ON DUPLICATE KEY UPDATE template_content=VALUES(template_content);

-- 为现有商品添加库存记录
INSERT INTO `sys_goods_stock` (`goods_id`, `stock_quantity`, `locked_quantity`, `sold_quantity`)
SELECT `goods_id`, 100, 0, 0 FROM `sys_goods`
WHERE `goods_id` NOT IN (SELECT `goods_id` FROM `sys_goods_stock`);

-- 为现有用户添加余额记录
INSERT INTO `user_balance` (`openid`, `balance_amount`)
SELECT `openid`, 0 FROM `wx_user`
WHERE `openid` NOT IN (SELECT `openid` FROM `user_balance`);
