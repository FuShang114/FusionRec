-- 创建业务表并填充测试数据

-- 商品分类表
CREATE TABLE IF NOT EXISTS `sys_category` (
  `category_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(128) NOT NULL,
  `order_num` int(11) DEFAULT 0,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 商品表
CREATE TABLE IF NOT EXISTS `sys_goods` (
  `goods_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `goods_name` varchar(255) NOT NULL,
  `category_id` bigint(20) NOT NULL,
  `goods_price` decimal(10,2) NOT NULL,
  `goods_image` varchar(255) DEFAULT NULL,
  `goods_desc` text DEFAULT NULL,
  `status` varchar(2) DEFAULT '1' COMMENT '0-下架 1-上架',
  `order_num` int(11) DEFAULT 0,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`goods_id`),
  KEY `idx_category_id` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 商品规格表
CREATE TABLE IF NOT EXISTS `sys_goods_specs` (
  `specs_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `goods_id` bigint(20) NOT NULL,
  `specs_name` varchar(128) NOT NULL,
  `specs_price` decimal(10,2) NOT NULL,
  `order_num` int(11) DEFAULT 0,
  PRIMARY KEY (`specs_id`),
  KEY `idx_goods_id` (`goods_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 用户表
CREATE TABLE IF NOT EXISTS `sys_user` (
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(128) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `status` varchar(2) DEFAULT '1',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 微信小程序用户表
CREATE TABLE IF NOT EXISTS `wx_user` (
  `openid` varchar(255) NOT NULL,
  `unionid` varchar(255) DEFAULT NULL,
  `nick_name` varchar(128) DEFAULT NULL,
  `avatar_url` varchar(255) DEFAULT NULL,
  `gender` int(11) DEFAULT 0,
  `country` varchar(64) DEFAULT NULL,
  `province` varchar(64) DEFAULT NULL,
  `city` varchar(64) DEFAULT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 订单表
CREATE TABLE IF NOT EXISTS `user_order` (
  `order_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `openid` varchar(255) NOT NULL,
  `order_no` varchar(64) NOT NULL,
  `total_price` decimal(12,2) NOT NULL,
  `status` varchar(16) DEFAULT 'pending' COMMENT 'pending/paid/shipped/completed/cancelled',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `pay_time` datetime DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `idx_openid` (`openid`),
  KEY `idx_order_no` (`order_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 订单详情表
CREATE TABLE IF NOT EXISTS `user_order_detail` (
  `detail_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `order_id` bigint(20) NOT NULL,
  `goods_id` bigint(20) NOT NULL,
  `goods_name` varchar(255) NOT NULL,
  `goods_price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total_price` decimal(12,2) NOT NULL,
  PRIMARY KEY (`detail_id`),
  KEY `idx_order_id` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 用户地址表
CREATE TABLE IF NOT EXISTS `user_address` (
  `address_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `openid` varchar(255) NOT NULL,
  `contact_name` varchar(128) NOT NULL,
  `contact_phone` varchar(20) NOT NULL,
  `address` varchar(255) NOT NULL,
  `is_default` varchar(2) DEFAULT '0',
  PRIMARY KEY (`address_id`),
  KEY `idx_openid` (`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 轮播图表
CREATE TABLE IF NOT EXISTS `sys_banner` (
  `banner_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `banner_title` varchar(128) NOT NULL,
  `banner_image` varchar(255) NOT NULL,
  `goods_id` bigint(20) DEFAULT NULL,
  `order_num` int(11) DEFAULT 0,
  `status` varchar(2) DEFAULT '1',
  PRIMARY KEY (`banner_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 用户收藏表
CREATE TABLE IF NOT EXISTS `user_collect` (
  `collect_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `openid` varchar(255) NOT NULL,
  `goods_id` bigint(20) NOT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`collect_id`),
  UNIQUE KEY `uk_openid_goods` (`openid`, `goods_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 商品评论表
CREATE TABLE IF NOT EXISTS `goods_comment` (
  `comment_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `openid` varchar(255) NOT NULL,
  `goods_id` bigint(20) NOT NULL,
  `content` text NOT NULL,
  `rating` int(11) DEFAULT 5,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  KEY `idx_goods_id` (`goods_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ==================== 插入测试数据 ====================

-- 插入分类
INSERT INTO `sys_category` (`category_id`, `category_name`, `order_num`) VALUES
(1, '数码电子', 1),
(2, '服装鞋包', 2),
(3, '食品饮料', 3),
(4, '家居生活', 4),
(5, '美妆护肤', 5);

-- 插入商品（20个商品）
INSERT INTO `sys_goods` (`goods_id`, `goods_name`, `category_id`, `goods_price`, `goods_image`, `goods_desc`, `status`, `order_num`) VALUES
(1, 'iPhone 15 Pro Max', 1, 9999.00, 'https://example.com/iphone15.jpg', '苹果最新旗舰手机', '1', 100),
(2, 'MacBook Pro 16寸', 1, 19999.00, 'https://example.com/macbook.jpg', '专业级笔记本电脑', '1', 80),
(3, 'AirPods Pro 2', 1, 1899.00, 'https://example.com/airpods.jpg', '主动降噪耳机', '1', 200),
(4, 'iPad Air 5', 1, 4799.00, 'https://example.com/ipad.jpg', '轻薄平板电脑', '1', 150),
(5, '小米14 Pro', 1, 4999.00, 'https://example.com/mi14.jpg', '徕卡影像旗舰', '1', 120),
(6, '华为Mate 60 Pro', 1, 6999.00, 'https://example.com/mate60.jpg', '卫星通信手机', '1', 90),
(7, '纯棉T恤', 2, 99.00, 'https://example.com/tshirt.jpg', '舒适透气', '1', 500),
(8, '牛仔裤', 2, 299.00, 'https://example.com/jeans.jpg', '经典款式', '1', 400),
(9, '运动鞋', 2, 599.00, 'https://example.com/shoes.jpg', '轻便舒适', '1', 300),
(10, '双肩包', 2, 199.00, 'https://example.com/bag.jpg', '大容量', '1', 250),
(11, '可口可乐', 3, 3.50, 'https://example.com/coke.jpg', '经典口味', '1', 1000),
(12, '薯片', 3, 8.50, 'https://example.com/chips.jpg', '酥脆美味', '1', 800),
(13, '巧克力', 3, 25.00, 'https://example.com/chocolate.jpg', '丝滑口感', '1', 600),
(14, '坚果礼盒', 3, 128.00, 'https://example.com/nuts.jpg', '健康零食', '1', 400),
(15, '智能台灯', 4, 199.00, 'https://example.com/lamp.jpg', '护眼照明', '1', 200),
(16, '收纳盒', 4, 49.00, 'https://example.com/box.jpg', '整理收纳', '1', 350),
(17, '四件套', 4, 299.00, 'https://example.com/bedding.jpg', '舒适睡眠', '1', 180),
(18, '保温杯', 4, 89.00, 'https://example.com/cup.jpg', '持久保温', '1', 450),
(19, '面膜', 5, 79.00, 'https://example.com/mask.jpg', '补水保湿', '1', 550),
(20, '口红', 5, 199.00, 'https://example.com/lipstick.jpg', '显色持久', '1', 380);

-- 插入商品规格
INSERT INTO `sys_goods_specs` (`specs_id`, `goods_id`, `specs_name`, `specs_price`, `order_num`) VALUES
(1, 1, '256GB 黑色', 9999.00, 1),
(2, 1, '512GB 白色', 11999.00, 2),
(3, 2, 'M3 Pro 18GB+512GB', 19999.00, 1),
(4, 3, '标准版', 1899.00, 1),
(5, 7, '白色 M', 99.00, 1),
(6, 7, '黑色 L', 99.00, 2);

-- 插入轮播图
INSERT INTO `sys_banner` (`banner_id`, `banner_title`, `banner_image`, `goods_id`, `order_num`, `status`) VALUES
(1, 'iPhone 15 新品上市', 'https://example.com/banner1.jpg', 1, 1, '1'),
(2, 'MacBook Pro 专业之选', 'https://example.com/banner2.jpg', 2, 2, '1'),
(3, '夏季服装特惠', 'https://example.com/banner3.jpg', 7, 3, '1');

-- 插入测试用户
INSERT INTO `sys_user` (`user_id`, `username`, `password`, `phone`, `status`) VALUES
(1, 'admin', 'e10adc3949ba59abbe56e057f20f883e', '13800138000', '1');

-- 插入微信用户（10个测试用户）
INSERT INTO `wx_user` (`openid`, `nick_name`, `avatar_url`, `gender`, `create_time`) VALUES
('user_001', '小明', 'https://example.com/avatar1.jpg', 1, '2024-01-01 10:00:00'),
('user_002', '小红', 'https://example.com/avatar2.jpg', 2, '2024-01-02 11:00:00'),
('user_003', '张三', 'https://example.com/avatar3.jpg', 1, '2024-01-03 12:00:00'),
('user_004', '李四', 'https://example.com/avatar4.jpg', 1, '2024-01-04 13:00:00'),
('user_005', '王五', 'https://example.com/avatar5.jpg', 1, '2024-01-05 14:00:00'),
('user_006', '赵六', 'https://example.com/avatar6.jpg', 2, '2024-01-06 15:00:00'),
('user_007', '孙七', 'https://example.com/avatar7.jpg', 1, '2024-01-07 16:00:00'),
('user_008', '周八', 'https://example.com/avatar8.jpg', 2, '2024-01-08 17:00:00'),
('user_009', '吴九', 'https://example.com/avatar9.jpg', 1, '2024-01-09 18:00:00'),
('user_010', '郑十', 'https://example.com/avatar10.jpg', 1, '2024-01-10 19:00:00');

-- 插入推荐引擎配置
INSERT INTO `reco_engine_config` (`config_id`, `scene`, `enabled`, `cf_weight`, `ctr_weight`, `cvr_weight`, `create_time`, `update_time`) VALUES
(1, 'home_hot', '1', 0.3300, 0.3300, 0.3400, NOW(), NOW());

-- 插入推荐事件数据（模拟曝光、点击、加购、下单行为）
INSERT INTO `reco_event_log` (`openid`, `goods_id`, `event_type`, `scene`, `event_time`, `ext_json`) VALUES
-- 用户1的行为
('user_001', 1, 'expose', 'home_hot', '2024-03-01 10:00:00', NULL),
('user_001', 1, 'click', 'home_hot', '2024-03-01 10:00:05', NULL),
('user_001', 1, 'cart', 'home_hot', '2024-03-01 10:01:00', NULL),
('user_001', 1, 'order', 'home_hot', '2024-03-01 10:05:00', NULL),
('user_001', 2, 'expose', 'home_hot', '2024-03-01 10:10:00', NULL),
('user_001', 2, 'click', 'home_hot', '2024-03-01 10:10:03', NULL),
('user_001', 3, 'expose', 'home_hot', '2024-03-01 10:15:00', NULL),
('user_001', 7, 'expose', 'home_hot', '2024-03-02 09:00:00', NULL),
('user_001', 7, 'click', 'home_hot', '2024-03-02 09:00:10', NULL),
('user_001', 7, 'order', 'home_hot', '2024-03-02 09:30:00', NULL),

-- 用户2的行为
('user_002', 1, 'expose', 'home_hot', '2024-03-01 11:00:00', NULL),
('user_002', 1, 'click', 'home_hot', '2024-03-01 11:00:02', NULL),
('user_002', 3, 'expose', 'home_hot', '2024-03-01 11:05:00', NULL),
('user_002', 3, 'click', 'home_hot', '2024-03-01 11:05:05', NULL),
('user_002', 3, 'cart', 'home_hot', '2024-03-01 11:06:00', NULL),
('user_002', 19, 'expose', 'home_hot', '2024-03-02 14:00:00', NULL),
('user_002', 19, 'click', 'home_hot', '2024-03-02 14:00:08', NULL),
('user_002', 19, 'order', 'home_hot', '2024-03-02 14:20:00', NULL),

-- 用户3的行为
('user_003', 5, 'expose', 'home_hot', '2024-03-01 12:00:00', NULL),
('user_003', 5, 'click', 'home_hot', '2024-03-01 12:00:03', NULL),
('user_003', 5, 'order', 'home_hot', '2024-03-01 12:15:00', NULL),
('user_003', 6, 'expose', 'home_hot', '2024-03-02 13:00:00', NULL),
('user_003', 6, 'click', 'home_hot', '2024-03-02 13:00:05', NULL),

-- 用户4的行为
('user_004', 2, 'expose', 'home_hot', '2024-03-01 15:00:00', NULL),
('user_004', 2, 'click', 'home_hot', '2024-03-01 15:00:04', NULL),
('user_004', 2, 'cart', 'home_hot', '2024-03-01 15:02:00', NULL),
('user_004', 4, 'expose', 'home_hot', '2024-03-02 16:00:00', NULL),
('user_004', 4, 'click', 'home_hot', '2024-03-02 16:00:06', NULL),

-- 用户5的行为
('user_005', 8, 'expose', 'home_hot', '2024-03-01 09:00:00', NULL),
('user_005', 8, 'click', 'home_hot', '2024-03-01 09:00:02', NULL),
('user_005', 8, 'order', 'home_hot', '2024-03-01 09:20:00', NULL),
('user_005', 9, 'expose', 'home_hot', '2024-03-02 10:00:00', NULL),
('user_005', 9, 'click', 'home_hot', '2024-03-02 10:00:04', NULL),

-- 更多曝光数据（用于生成推荐）
('user_006', 1, 'expose', 'home_hot', '2024-03-03 10:00:00', NULL),
('user_006', 2, 'expose', 'home_hot', '2024-03-03 10:05:00', NULL),
('user_006', 3, 'expose', 'home_hot', '2024-03-03 10:10:00', NULL),
('user_007', 1, 'expose', 'home_hot', '2024-03-03 11:00:00', NULL),
('user_007', 5, 'expose', 'home_hot', '2024-03-03 11:05:00', NULL),
('user_007', 6, 'expose', 'home_hot', '2024-03-03 11:10:00', NULL),
('user_008', 2, 'expose', 'home_hot', '2024-03-03 12:00:00', NULL),
('user_008', 4, 'expose', 'home_hot', '2024-03-03 12:05:00', NULL),
('user_009', 3, 'expose', 'home_hot', '2024-03-03 13:00:00', NULL),
('user_009', 7, 'expose', 'home_hot', '2024-03-03 13:05:00', NULL),
('user_010', 1, 'expose', 'home_hot', '2024-03-03 14:00:00', NULL),
('user_010', 2, 'expose', 'home_hot', '2024-03-03 14:05:00', NULL),
('user_010', 3, 'expose', 'home_hot', '2024-03-03 14:10:00', NULL);

-- 插入订单数据
INSERT INTO `user_order` (`order_id`, `openid`, `order_no`, `total_price`, `status`, `create_time`, `pay_time`) VALUES
(1, 'user_001', 'ORDER202403010001', 9999.00, 'completed', '2024-03-01 10:05:00', '2024-03-01 10:06:00'),
(2, 'user_001', 'ORDER202403020001', 99.00, 'completed', '2024-03-02 09:30:00', '2024-03-02 09:31:00'),
(3, 'user_002', 'ORDER202403020002', 79.00, 'completed', '2024-03-02 14:20:00', '2024-03-02 14:21:00'),
(4, 'user_003', 'ORDER202403010002', 4999.00, 'completed', '2024-03-01 12:15:00', '2024-03-01 12:16:00'),
(5, 'user_005', 'ORDER202403010003', 299.00, 'completed', '2024-03-01 09:20:00', '2024-03-01 09:21:00');

-- 插入订单详情
INSERT INTO `user_order_detail` (`detail_id`, `order_id`, `goods_id`, `goods_name`, `goods_price`, `quantity`, `total_price`) VALUES
(1, 1, 1, 'iPhone 15 Pro Max', 9999.00, 1, 9999.00),
(2, 2, 7, '纯棉T恤', 99.00, 1, 99.00),
(3, 3, 19, '面膜', 79.00, 1, 79.00),
(4, 4, 5, '小米14 Pro', 4999.00, 1, 4999.00),
(5, 5, 8, '牛仔裤', 299.00, 1, 299.00);

-- 插入用户收藏
INSERT INTO `user_collect` (`openid`, `goods_id`, `create_time`) VALUES
('user_001', 2, '2024-03-01 10:30:00'),
('user_001', 3, '2024-03-01 10:35:00'),
('user_002', 1, '2024-03-01 11:30:00'),
('user_003', 6, '2024-03-02 13:30:00');

-- 插入商品评论
INSERT INTO `goods_comment` (`openid`, `goods_id`, `content`, `rating`, `create_time`) VALUES
('user_001', 1, '手机很好用，拍照效果很棒！', 5, '2024-03-05 10:00:00'),
('user_002', 19, '面膜很补水，会回购', 5, '2024-03-05 15:00:00'),
('user_003', 5, '性价比很高，推荐购买', 5, '2024-03-06 12:00:00'),
('user_005', 8, '版型很好，穿着舒适', 4, '2024-03-06 09:00:00');

-- 插入用户画像数据
INSERT INTO `reco_user_profile_daily` (`openid`, `dt`, `usage_duration_days`, `consumed_order_count_30d`, `consumed_amount_30d`, `avg_order_amount_30d`, `is_high_value_user`, `create_time`, `update_time`) VALUES
('user_001', '2024-03-10', 10, 2, 10098.00, 5049.00, '1', NOW(), NOW()),
('user_002', '2024-03-10', 8, 1, 79.00, 79.00, '0', NOW(), NOW()),
('user_003', '2024-03-10', 5, 1, 4999.00, 4999.00, '1', NOW(), NOW()),
('user_004', '2024-03-10', 3, 0, 0.00, 0.00, '0', NOW(), NOW()),
('user_005', '2024-03-10', 7, 1, 299.00, 299.00, '0', NOW(), NOW());
