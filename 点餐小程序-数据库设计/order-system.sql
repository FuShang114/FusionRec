/*
 Navicat Premium Data Transfer

 Source Server         : 本地连接
 Source Server Type    : MySQL
 Source Server Version : 50723
 Source Host           : localhost:3306
 Source Schema         : order-system

 Target Server Type    : MySQL
 Target Server Version : 50723
 File Encoding         : 65001

 Date: 22/03/2023 00:21:41
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for goods_comment
-- ----------------------------
DROP TABLE IF EXISTS `goods_comment`;
CREATE TABLE `goods_comment`  (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `openid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '小程序openid',
  `goods_id` int(11) NULL DEFAULT NULL COMMENT '商品id',
  `comment_text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '评论',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`comment_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goods_comment
-- ----------------------------
INSERT INTO `goods_comment` VALUES (3, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', 1, '好吃', '2023-03-20 09:49:45');
INSERT INTO `goods_comment` VALUES (4, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', 4, '好吃', '2023-03-20 09:49:45');
INSERT INTO `goods_comment` VALUES (5, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', 1, '好吃', '2023-03-20 11:31:03');
INSERT INTO `goods_comment` VALUES (6, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', 4, '好吃', '2023-03-20 11:31:03');
INSERT INTO `goods_comment` VALUES (7, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', 1, '好吃', '2023-03-20 11:31:06');
INSERT INTO `goods_comment` VALUES (8, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', 4, '好吃', '2023-03-20 11:31:06');

-- ----------------------------
-- Table structure for sys_banner
-- ----------------------------
DROP TABLE IF EXISTS `sys_banner`;
CREATE TABLE `sys_banner`  (
  `ban_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '广告id',
  `goods_id` int(11) NULL DEFAULT NULL COMMENT '菜品id',
  `title` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '标题',
  `images` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '图片',
  `status` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT ' 0:下架  1：上架',
  `order_num` int(11) NULL DEFAULT NULL COMMENT '序号',
  PRIMARY KEY (`ban_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_banner
-- ----------------------------
INSERT INTO `sys_banner` VALUES (1, 1, '小锅米线优惠', 'http://192.168.31.70:8089/images/0afc9b7b-5ed8-4c9b-ae5f-3a0f17ef4929.png', '1', 1);
INSERT INTO `sys_banner` VALUES (3, 2, '小炒肉优惠', 'http://192.168.31.70:8089/images/bb841a67-4510-4ebc-b729-e03c275aaa14.png', '1', 2);

-- ----------------------------
-- Table structure for sys_category
-- ----------------------------
DROP TABLE IF EXISTS `sys_category`;
CREATE TABLE `sys_category`  (
  `category_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '分类id',
  `category_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '分类名称',
  `order_num` int(11) NULL DEFAULT NULL COMMENT '序号',
  PRIMARY KEY (`category_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_category
-- ----------------------------
INSERT INTO `sys_category` VALUES (1, '推荐', 1);
INSERT INTO `sys_category` VALUES (2, '包子', 4);
INSERT INTO `sys_category` VALUES (3, '米线', 2);
INSERT INTO `sys_category` VALUES (4, '面条', 3);
INSERT INTO `sys_category` VALUES (5, '抄手汤圆', 5);
INSERT INTO `sys_category` VALUES (6, '特殊小吃', 6);
INSERT INTO `sys_category` VALUES (7, '饮料', 7);
INSERT INTO `sys_category` VALUES (8, '炒饭', 8);
INSERT INTO `sys_category` VALUES (9, '盖饭', 9);

-- ----------------------------
-- Table structure for sys_goods
-- ----------------------------
DROP TABLE IF EXISTS `sys_goods`;
CREATE TABLE `sys_goods`  (
  `goods_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '菜品id',
  `category_id` int(11) NULL DEFAULT NULL COMMENT '分类id',
  `goods_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '菜品名称',
  `goods_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '图片路径',
  `goods_desc` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL COMMENT '菜品详情',
  `status` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT '0' COMMENT '0:默认 1：热推菜品',
  `goods_unit` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '单位',
  `order_num` int(11) NULL DEFAULT NULL COMMENT '序号',
  PRIMARY KEY (`goods_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 32 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_goods
-- ----------------------------
INSERT INTO `sys_goods` VALUES (1, 1, '招牌小锅米线', 'http://192.168.31.70:8089/images/a35e4257-9e9a-43f8-b077-a7664064ce12.png', '<p>非常美味！111</p>', '1', '/份', 1);
INSERT INTO `sys_goods` VALUES (2, 1, '招牌卤面', 'http://192.168.31.70:8089/images/a35e4257-9e9a-43f8-b077-a7664064ce12.png,http://192.168.31.70:8089/images/4ce37be7-14e2-44b5-b025-cd191795fb4c.png', '<p>美味的!</p>', '1', '/份', 2);
INSERT INTO `sys_goods` VALUES (3, 1, '焖肉米线', 'http://192.168.31.70:8089/images/a35e4257-9e9a-43f8-b077-a7664064ce12.png,http://192.168.31.70:8089/images/4ce37be7-14e2-44b5-b025-cd191795fb4c.png,http://192.168.31.70:8089/images/521e63ab-3664-46ef-a114-9499be3bc691.png', '<p>很美味!</p>', '1', '/份', 3);
INSERT INTO `sys_goods` VALUES (4, 1, '红油抄手', 'http://192.168.31.70:8089/images/e941d1f8-ed8e-4f8b-a381-e0170deb2ba0.png', '<p>美味的！</p>', '1', '/份', 4);
INSERT INTO `sys_goods` VALUES (5, 1, '小炒肉盖饭', 'http://192.168.31.70:8089/images/f5430355-442e-42a7-96cd-40b4a99b40c1.png,http://192.168.31.70:8089/images/f5430355-442e-42a7-96cd-40b4a99b40c1.png', '<p>美味的!</p>', '1', '/份', 5);
INSERT INTO `sys_goods` VALUES (6, 1, '红烧牛肉面', 'http://192.168.31.70:8089/images/8cc79d2b-8f83-4c69-a003-e01ec3317367.png,http://192.168.31.70:8089/images/8cc79d2b-8f83-4c69-a003-e01ec3317367.png', '<p><br></p>', '1', '/份', 6);
INSERT INTO `sys_goods` VALUES (7, 1, '炸洋芋', 'http://192.168.31.70:8089/images/b671da28-9191-4ee8-918c-df1e345bb41d.png', '<p>好吃</p>', '1', '/份', 7);
INSERT INTO `sys_goods` VALUES (8, 4, '杂酱面', 'http://192.168.31.70:8089/images/b671da28-9191-4ee8-918c-df1e345bb41d.png,http://192.168.31.70:8089/images/0f60b7a5-daa9-482b-ae64-00679b43eceb.png', '<p>好吃</p>', '1', '/份', 8);
INSERT INTO `sys_goods` VALUES (9, 4, '焖肉汤面', 'http://192.168.31.70:8089/images/4744c00f-c891-4f5e-993c-cb798585136b.png', '<p>好吃</p>', '0', '/份', 9);
INSERT INTO `sys_goods` VALUES (10, 4, '招牌卤面', 'http://192.168.31.70:8089/images/5241e071-831a-4d88-9d8c-61d3354154d7.png', '<p>非常美味</p><p><br></p>', '0', '/份', 10);
INSERT INTO `sys_goods` VALUES (11, 4, '红烧肥肠面', 'http://192.168.31.70:8089/images/51be3ac8-f85e-4f7f-be03-a37e5c28239f.png,http://192.168.31.70:8089/images/51be3ac8-f85e-4f7f-be03-a37e5c28239f.png', '<p><br></p>', '0', '/份', 11);
INSERT INTO `sys_goods` VALUES (12, 4, '原汤土鸡面', 'http://192.168.31.70:8089/images/2646c401-a98b-49d8-a7b8-4682381219c7.png', '<p>好吃</p>', '0', '/份', 12);
INSERT INTO `sys_goods` VALUES (13, 3, '焖肉米线', 'http://192.168.31.70:8089/images/8a6ae339-d96f-4edf-a055-53eb2d44e122.png', '<p>好吃</p>', '0', '/份', 13);
INSERT INTO `sys_goods` VALUES (14, 3, '杂酱米线', 'http://192.168.31.70:8089/images/c63e981a-4265-4a63-bbf2-2996ef704658.png', '<p>好吃</p>', '0', '/份', 14);
INSERT INTO `sys_goods` VALUES (15, 3, '豆花米线', 'http://192.168.31.70:8089/images/1f18542c-6bf3-494d-8616-4c1d70f9619a.png', '<p>好吃</p>', '0', '/份', 15);
INSERT INTO `sys_goods` VALUES (16, 3, '土鸡米线', 'http://192.168.31.70:8089/images/02406e31-7ca5-40a1-8786-d0fd5a336bc7.png', '<p>好吃</p>', '0', '/份', 16);
INSERT INTO `sys_goods` VALUES (17, 3, '卤米线', 'http://192.168.31.70:8089/images/ef6d8061-7619-47cf-9bcd-132f4b9c385b.png', '<p>好吃</p>', '0', '/份', 17);
INSERT INTO `sys_goods` VALUES (18, 2, '小龙包', 'http://192.168.31.70:8089/images/2ea83b82-5032-46fd-a1fb-c952793082a0.png', '<p><br></p>', '0', '/笼', 18);
INSERT INTO `sys_goods` VALUES (19, 2, '鸡汁汤包', 'http://192.168.31.70:8089/images/75cb0f8c-75f6-4037-9ac0-b75ab87f720f.png', '<p>好吃</p>', '0', '/笼', 19);
INSERT INTO `sys_goods` VALUES (20, 5, '大馅水饺', 'http://192.168.31.70:8089/images/0548a0b2-de10-4e02-bfee-00ed25533047.png', '<p><br></p>', '0', '/份', 20);
INSERT INTO `sys_goods` VALUES (21, 5, '抄手', 'http://192.168.31.70:8089/images/e4ea0360-4e56-4f3c-bb0b-412ea4178f29.png', '<p>好吃</p>', '0', '/份', 21);
INSERT INTO `sys_goods` VALUES (22, 5, '包心汤圆', 'http://192.168.31.70:8089/images/bc560e41-314e-4d25-ab75-e4a179d8031d.png', '<p>好吃</p>', '0', '/份', 22);
INSERT INTO `sys_goods` VALUES (23, 6, '炸洋芋', 'http://192.168.31.70:8089/images/541362be-5fdb-48a6-9e54-45dd1010bf7c.png', '<p>好吃</p>', '0', '/份', 23);
INSERT INTO `sys_goods` VALUES (24, 6, '八宝粥', 'http://192.168.31.70:8089/images/b4b06740-7356-4d6d-b536-a9bccab8d313.png', '<p>好吃</p>', '0', '/份', 24);
INSERT INTO `sys_goods` VALUES (25, 6, '卤鸡蛋', 'http://192.168.31.70:8089/images/f97afd45-1a30-4d82-988f-7c5ab12bb2e0.png', '<p>好吃</p>', '0', '/个', 25);
INSERT INTO `sys_goods` VALUES (26, 6, '小米粥', 'http://192.168.31.70:8089/images/80030766-39ca-488c-a6a6-48d7e50d2a22.png', '<p>好吃</p>', '0', '/份', 26);
INSERT INTO `sys_goods` VALUES (27, 7, '冰红茶', 'http://192.168.31.70:8089/images/825620d7-b847-4400-8591-454d4b5d7118.png', '<p>好喝</p>', '0', '/份', 27);
INSERT INTO `sys_goods` VALUES (28, 7, '茉莉花茶', 'http://192.168.31.70:8089/images/b54327e4-7f76-4adf-9dfb-8d74a4f6f0d4.png', '<p>好喝</p>', '0', '/瓶', 28);
INSERT INTO `sys_goods` VALUES (29, 7, '可乐', 'http://192.168.31.70:8089/images/b3b5e873-82f0-4b3c-aaa6-f49b0217e02f.png', '<p>好吃</p>', '0', '/瓶', 29);
INSERT INTO `sys_goods` VALUES (30, 8, '牛肉炒饭', 'http://192.168.31.70:8089/images/52b363e5-9da3-447c-8abf-772840571abe.png', '<p>好吃</p>', '0', '/份', 30);
INSERT INTO `sys_goods` VALUES (31, 8, '鸡蛋炒饭', 'http://192.168.31.70:8089/images/2a677d1f-c151-4c58-806a-130d8b278b61.png', '<p>好吃</p>', '0', '/份', 31);

-- ----------------------------
-- Table structure for sys_goods_specs
-- ----------------------------
DROP TABLE IF EXISTS `sys_goods_specs`;
CREATE TABLE `sys_goods_specs`  (
  `specs_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '规格id',
  `goods_id` int(11) NULL DEFAULT NULL COMMENT '菜品id',
  `specs_name` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '规格名称',
  `goods_price` decimal(10, 2) NULL DEFAULT NULL COMMENT '价格',
  `order_num` int(11) NULL DEFAULT NULL COMMENT '序号',
  PRIMARY KEY (`specs_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 131 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_goods_specs
-- ----------------------------
INSERT INTO `sys_goods_specs` VALUES (33, 2, '小', 10.00, 1);
INSERT INTO `sys_goods_specs` VALUES (34, 2, '中', 15.00, 2);
INSERT INTO `sys_goods_specs` VALUES (35, 2, '大', 66.00, 3);
INSERT INTO `sys_goods_specs` VALUES (36, 3, '原味', 10.00, 1);
INSERT INTO `sys_goods_specs` VALUES (37, 3, '微辣', 12.00, 2);
INSERT INTO `sys_goods_specs` VALUES (38, 3, '特辣', 15.00, 3);
INSERT INTO `sys_goods_specs` VALUES (39, 4, '小', 10.00, 1);
INSERT INTO `sys_goods_specs` VALUES (40, 4, '大', 15.00, 2);
INSERT INTO `sys_goods_specs` VALUES (43, 5, '菜饭合装', 15.00, 1);
INSERT INTO `sys_goods_specs` VALUES (44, 5, '菜饭分装', 16.00, 2);
INSERT INTO `sys_goods_specs` VALUES (49, 6, '汤面', 15.00, 1);
INSERT INTO `sys_goods_specs` VALUES (50, 6, '卤面', 15.00, 2);
INSERT INTO `sys_goods_specs` VALUES (51, 7, '小', 5.00, 1);
INSERT INTO `sys_goods_specs` VALUES (52, 7, '大', 10.00, 2);
INSERT INTO `sys_goods_specs` VALUES (55, 8, '汤面', 10.00, 1);
INSERT INTO `sys_goods_specs` VALUES (56, 8, '卤面', 12.00, 2);
INSERT INTO `sys_goods_specs` VALUES (57, 9, '小', 12.00, 1);
INSERT INTO `sys_goods_specs` VALUES (58, 9, '大', 15.00, 2);
INSERT INTO `sys_goods_specs` VALUES (63, 11, '小', 12.00, 1);
INSERT INTO `sys_goods_specs` VALUES (64, 11, '大', 15.00, 2);
INSERT INTO `sys_goods_specs` VALUES (65, 12, '小', 12.00, 1);
INSERT INTO `sys_goods_specs` VALUES (66, 12, '大', 15.00, 2);
INSERT INTO `sys_goods_specs` VALUES (69, 13, '小', 12.00, 1);
INSERT INTO `sys_goods_specs` VALUES (70, 13, '大', 15.00, 2);
INSERT INTO `sys_goods_specs` VALUES (71, 14, '小', 10.00, 1);
INSERT INTO `sys_goods_specs` VALUES (72, 14, '大', 12.00, 2);
INSERT INTO `sys_goods_specs` VALUES (73, 15, '小', 10.00, 1);
INSERT INTO `sys_goods_specs` VALUES (74, 15, '大', 15.00, 2);
INSERT INTO `sys_goods_specs` VALUES (75, 16, '小', 10.00, 1);
INSERT INTO `sys_goods_specs` VALUES (76, 16, '大', 12.00, 2);
INSERT INTO `sys_goods_specs` VALUES (77, 17, '小', 10.00, 1);
INSERT INTO `sys_goods_specs` VALUES (78, 17, '大', 12.00, 2);
INSERT INTO `sys_goods_specs` VALUES (81, 18, '猪肉馅', 15.00, 1);
INSERT INTO `sys_goods_specs` VALUES (82, 18, '牛肉馅', 20.00, 2);
INSERT INTO `sys_goods_specs` VALUES (83, 19, '原味', 15.00, 15);
INSERT INTO `sys_goods_specs` VALUES (86, 20, '清汤', 15.00, 1);
INSERT INTO `sys_goods_specs` VALUES (87, 20, '酸辣', 15.00, 2);
INSERT INTO `sys_goods_specs` VALUES (88, 21, '清汤', 12.00, 1);
INSERT INTO `sys_goods_specs` VALUES (89, 21, '红油', 13.00, 2);
INSERT INTO `sys_goods_specs` VALUES (90, 22, '小', 10.00, 1);
INSERT INTO `sys_goods_specs` VALUES (91, 22, '大', 15.00, 2);
INSERT INTO `sys_goods_specs` VALUES (92, 23, '小', 5.00, 1);
INSERT INTO `sys_goods_specs` VALUES (93, 23, '大', 10.00, 2);
INSERT INTO `sys_goods_specs` VALUES (94, 24, '小', 10.00, 1);
INSERT INTO `sys_goods_specs` VALUES (95, 24, '大', 15.00, 2);
INSERT INTO `sys_goods_specs` VALUES (96, 25, '卤味', 1.50, 1);
INSERT INTO `sys_goods_specs` VALUES (97, 26, '原味', 5.00, 1);
INSERT INTO `sys_goods_specs` VALUES (98, 26, '白糖', 5.00, 2);
INSERT INTO `sys_goods_specs` VALUES (99, 27, '原味', 5.00, 1);
INSERT INTO `sys_goods_specs` VALUES (100, 28, '原味', 4.50, 1);
INSERT INTO `sys_goods_specs` VALUES (101, 29, '原味', 4.50, 1);
INSERT INTO `sys_goods_specs` VALUES (102, 30, '小米辣味', 15.00, 1);
INSERT INTO `sys_goods_specs` VALUES (103, 30, '酸菜味', 15.00, 2);
INSERT INTO `sys_goods_specs` VALUES (112, 31, '原味', 14.00, 1);
INSERT INTO `sys_goods_specs` VALUES (122, 10, '小', 12.00, 1);
INSERT INTO `sys_goods_specs` VALUES (123, 10, '中', 15.00, 2);
INSERT INTO `sys_goods_specs` VALUES (124, 10, '大', 25.00, 3);
INSERT INTO `sys_goods_specs` VALUES (128, 1, '小', 10.00, 1);
INSERT INTO `sys_goods_specs` VALUES (129, 1, '中', 12.00, 2);
INSERT INTO `sys_goods_specs` VALUES (130, 1, '大', 18.00, 3);

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '登录账户',
  `password` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '登录密码',
  `phone` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '电话',
  `email` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '邮箱',
  `sex` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '0：男 1：女',
  `name` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '姓名',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES (1, 'zs', '123', '1545646446', '1546464@qq.com', '0', '张三');
INSERT INTO `sys_user` VALUES (2, 'ls', '123', '154645646546', '', '0', '李四');

-- ----------------------------
-- Table structure for user_address
-- ----------------------------
DROP TABLE IF EXISTS `user_address`;
CREATE TABLE `user_address`  (
  `address_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `openid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '小程序openid',
  `user_name` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '收货人的姓名',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '电话',
  `area` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '区域',
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '详细地址',
  `status` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT '0' COMMENT '是否默认 1：是 0：否',
  PRIMARY KEY (`address_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_address
-- ----------------------------
INSERT INTO `user_address` VALUES (1, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '张三000', '145646546', '北京市/北京市/东城区', '北京', '0');
INSERT INTO `user_address` VALUES (2, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '张三222', '145646546', '吉林省/长春市/南关区', '长春', '0');
INSERT INTO `user_address` VALUES (3, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '张三111', '14564654699', '广东省/广州市/荔湾区', '长春111', '1');
INSERT INTO `user_address` VALUES (4, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '李四', '1464646456', '天津市/天津市/和平区', '天津市', '0');

-- ----------------------------
-- Table structure for user_collect
-- ----------------------------
DROP TABLE IF EXISTS `user_collect`;
CREATE TABLE `user_collect`  (
  `collect_id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '小程序openid',
  `goods_id` int(11) NULL DEFAULT NULL COMMENT '商品id',
  PRIMARY KEY (`collect_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_collect
-- ----------------------------
INSERT INTO `user_collect` VALUES (3, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', 3);
INSERT INTO `user_collect` VALUES (6, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', 4);

-- ----------------------------
-- Table structure for user_order
-- ----------------------------
DROP TABLE IF EXISTS `user_order`;
CREATE TABLE `user_order`  (
  `order_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `openid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT 'openid',
  `user_name` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '姓名',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '电话',
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '配送地址',
  `price` decimal(10, 2) NULL DEFAULT NULL COMMENT '价格',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `status` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '订单状态：0： 待发货  1： 已发货 2： 已收货 3：取消',
  PRIMARY KEY (`order_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 40 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_order
-- ----------------------------
INSERT INTO `user_order` VALUES (1, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '李四', '14564654699', '广东省/广州市/荔湾区,长春111', 20.00, '2023-03-06 14:26:49', '2');
INSERT INTO `user_order` VALUES (2, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '张三111', '14564654699', '广东省/广州市/荔湾区,长春111', 20.00, '2023-03-07 14:28:50', '2');
INSERT INTO `user_order` VALUES (3, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '张三111', '14564654699', '广东省/广州市/荔湾区,长春111', 10.00, '2023-03-08 14:39:20', '2');
INSERT INTO `user_order` VALUES (4, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '李四', '14564654699', '广东省/广州市/荔湾区,长春111', 20.00, '2023-03-10 14:26:49', '2');
INSERT INTO `user_order` VALUES (5, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '李四', '14564654699', '广东省/广州市/荔湾区,长春111', 20.00, '2023-03-10 14:26:49', '2');
INSERT INTO `user_order` VALUES (6, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '李四', '14564654699', '广东省/广州市/荔湾区,长春111', 20.00, '2023-03-19 14:26:49', '2');
INSERT INTO `user_order` VALUES (7, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '张三111', '14564654699', '广东省/广州市/荔湾区,长春111', 20.00, '2023-03-18 14:28:50', '2');
INSERT INTO `user_order` VALUES (8, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '张三111', '14564654699', '广东省/广州市/荔湾区,长春111', 20.00, '2023-03-17 14:28:50', '2');
INSERT INTO `user_order` VALUES (9, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '张三111', '14564654699', '广东省/广州市/荔湾区,长春111', 20.00, '2023-03-16 14:28:50', '2');
INSERT INTO `user_order` VALUES (10, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '张三111', '14564654699', '广东省/广州市/荔湾区,长春111', 20.00, '2023-03-15 14:28:50', '2');
INSERT INTO `user_order` VALUES (11, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '张三111', '14564654699', '广东省/广州市/荔湾区,长春111', 20.00, '2023-03-14 14:28:50', '2');
INSERT INTO `user_order` VALUES (12, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '张三111', '14564654699', '广东省/广州市/荔湾区,长春111', 20.00, '2023-03-13 14:28:50', '2');
INSERT INTO `user_order` VALUES (13, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '张三111', '14564654699', '广东省/广州市/荔湾区,长春111', 20.00, '2023-03-07 14:28:50', '2');
INSERT INTO `user_order` VALUES (14, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '李四', '14564654699', '广东省/广州市/荔湾区,长春111', 20.00, '2023-03-06 14:26:49', '2');
INSERT INTO `user_order` VALUES (15, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '张三111', '14564654699', '广东省/广州市/荔湾区,长春111', 20.00, '2022-03-07 14:28:50', '2');
INSERT INTO `user_order` VALUES (16, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '张三111', '14564654699', '广东省/广州市/荔湾区,长春111', 10.00, '2022-12-30 14:39:20', '2');
INSERT INTO `user_order` VALUES (17, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '李四', '14564654699', '广东省/广州市/荔湾区,长春111', 20.00, '2022-11-17 14:26:49', '2');
INSERT INTO `user_order` VALUES (18, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '李四', '14564654699', '广东省/广州市/荔湾区,长春111', 20.00, '2021-02-01 14:26:49', '2');
INSERT INTO `user_order` VALUES (19, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '李四', '14564654699', '广东省/广州市/荔湾区,长春111', 20.00, '2023-03-19 14:26:49', '2');
INSERT INTO `user_order` VALUES (20, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '张三111', '14564654699', '广东省/广州市/荔湾区,长春111', 20.00, '2023-03-18 14:28:50', '2');
INSERT INTO `user_order` VALUES (21, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '张三111', '14564654699', '广东省/广州市/荔湾区,长春111', 20.00, '2023-03-17 14:28:50', '2');
INSERT INTO `user_order` VALUES (22, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '张三111', '14564654699', '广东省/广州市/荔湾区,长春111', 20.00, '2023-03-16 14:28:50', '2');
INSERT INTO `user_order` VALUES (23, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '张三111', '14564654699', '广东省/广州市/荔湾区,长春111', 20.00, '2022-07-15 14:28:50', '2');
INSERT INTO `user_order` VALUES (24, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '张三111', '14564654699', '广东省/广州市/荔湾区,长春111', 20.00, '2021-06-14 14:28:50', '2');
INSERT INTO `user_order` VALUES (25, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '张三111', '14564654699', '广东省/广州市/荔湾区,长春111', 20.00, '2023-03-13 14:28:50', '2');
INSERT INTO `user_order` VALUES (26, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '张三111', '14564654699', '广东省/广州市/荔湾区,长春111', 20.00, '2023-03-07 14:28:50', '2');
INSERT INTO `user_order` VALUES (27, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '张三111', '14564654699', '广东省/广州市/荔湾区,长春111', 15.00, '2023-03-21 15:07:36', '2');
INSERT INTO `user_order` VALUES (28, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '张三222', '145646546', '吉林省/长春市/南关区,长春', 40.00, '2023-03-21 15:59:22', '2');
INSERT INTO `user_order` VALUES (29, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '张三111', '14564654699', '广东省/广州市/荔湾区,长春111', 10.00, '2023-03-21 16:00:34', '3');
INSERT INTO `user_order` VALUES (30, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '张三111', '14564654699', '广东省/广州市/荔湾区,长春111', 40.00, '2023-03-21 16:05:55', '3');
INSERT INTO `user_order` VALUES (31, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '张三111', '14564654699', '广东省/广州市/荔湾区,长春111', 10.00, '2023-03-21 16:21:51', '3');
INSERT INTO `user_order` VALUES (32, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '张三111', '14564654699', '广东省/广州市/荔湾区,长春111', 10.00, '2023-03-21 16:32:38', '0');
INSERT INTO `user_order` VALUES (33, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '张三111', '14564654699', '广东省/广州市/荔湾区,长春111', 10.00, '2023-03-21 16:32:51', '0');
INSERT INTO `user_order` VALUES (34, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '张三111', '14564654699', '广东省/广州市/荔湾区,长春111', 10.00, '2023-03-21 16:34:05', '0');
INSERT INTO `user_order` VALUES (35, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '张三111', '14564654699', '广东省/广州市/荔湾区,长春111', 20.00, '2023-03-21 19:11:37', '0');
INSERT INTO `user_order` VALUES (36, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '张三111', '14564654699', '广东省/广州市/荔湾区,长春111', 20.00, '2023-03-21 20:51:33', '0');
INSERT INTO `user_order` VALUES (37, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '张三111', '14564654699', '广东省/广州市/荔湾区,长春111', 25.00, '2023-03-21 20:53:25', '0');
INSERT INTO `user_order` VALUES (38, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '张三111', '14564654699', '广东省/广州市/荔湾区,长春111', 10.00, '2023-03-21 20:59:03', '0');
INSERT INTO `user_order` VALUES (39, 'ok-u55Yewi_iD6ghDCVkzD0A-hwo', '张三111', '14564654699', '广东省/广州市/荔湾区,长春111', 30.00, '2023-03-21 23:23:35', '0');

-- ----------------------------
-- Table structure for user_order_detail
-- ----------------------------
DROP TABLE IF EXISTS `user_order_detail`;
CREATE TABLE `user_order_detail`  (
  `detail_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `order_id` int(11) NULL DEFAULT NULL COMMENT '订单表',
  `goods_id` int(11) NULL DEFAULT NULL COMMENT '商品id',
  `goods_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '商品图片',
  `goods_name` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '商品名称',
  `goods_unit` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '单位',
  `price` decimal(10, 2) NULL DEFAULT NULL COMMENT '价格',
  `num` int(11) NULL DEFAULT NULL COMMENT '数量',
  `specs_name` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '规格',
  PRIMARY KEY (`detail_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 40 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_order_detail
-- ----------------------------
INSERT INTO `user_order_detail` VALUES (1, 1, 1, 'http://192.168.31.70:8089/images/a35e4257-9e9a-43f8-b077-a7664064ce12.png', '招牌小锅米线', '/份', 10.00, 1, '小');
INSERT INTO `user_order_detail` VALUES (2, 1, 4, 'http://192.168.31.70:8089/images/e941d1f8-ed8e-4f8b-a381-e0170deb2ba0.png', '红油抄手', '/份', 10.00, 1, '小');
INSERT INTO `user_order_detail` VALUES (3, 2, 2, 'http://192.168.31.70:8089/images/a35e4257-9e9a-43f8-b077-a7664064ce12.png', '招牌卤面', '/份', 10.00, 2, '小');
INSERT INTO `user_order_detail` VALUES (4, 3, 4, 'http://192.168.31.70:8089/images/e941d1f8-ed8e-4f8b-a381-e0170deb2ba0.png', '红油抄手', '/份', 10.00, 1, '小');
INSERT INTO `user_order_detail` VALUES (5, 27, 5, 'http://192.168.31.70:8089/images/f5430355-442e-42a7-96cd-40b4a99b40c1.png', '小炒肉盖饭', '/份', 15.00, 1, '菜饭合装');
INSERT INTO `user_order_detail` VALUES (6, 4, 1, 'http://192.168.31.70:8089/images/a35e4257-9e9a-43f8-b077-a7664064ce12.png', '招牌小锅米线', '/份', 10.00, 1, '小');
INSERT INTO `user_order_detail` VALUES (7, 5, 4, 'http://192.168.31.70:8089/images/e941d1f8-ed8e-4f8b-a381-e0170deb2ba0.png', '红油抄手', '/份', 10.00, 1, '小');
INSERT INTO `user_order_detail` VALUES (8, 6, 2, 'http://192.168.31.70:8089/images/a35e4257-9e9a-43f8-b077-a7664064ce12.png', '招牌卤面', '/份', 10.00, 2, '小');
INSERT INTO `user_order_detail` VALUES (9, 7, 4, 'http://192.168.31.70:8089/images/e941d1f8-ed8e-4f8b-a381-e0170deb2ba0.png', '红油抄手', '/份', 10.00, 1, '小');
INSERT INTO `user_order_detail` VALUES (10, 27, 5, 'http://192.168.31.70:8089/images/f5430355-442e-42a7-96cd-40b4a99b40c1.png', '小炒肉盖饭', '/份', 15.00, 1, '菜饭合装');
INSERT INTO `user_order_detail` VALUES (11, 8, 1, 'http://192.168.31.70:8089/images/a35e4257-9e9a-43f8-b077-a7664064ce12.png', '招牌小锅米线', '/份', 10.00, 1, '小');
INSERT INTO `user_order_detail` VALUES (12, 9, 4, 'http://192.168.31.70:8089/images/e941d1f8-ed8e-4f8b-a381-e0170deb2ba0.png', '红油抄手', '/份', 10.00, 1, '小');
INSERT INTO `user_order_detail` VALUES (13, 10, 2, 'http://192.168.31.70:8089/images/a35e4257-9e9a-43f8-b077-a7664064ce12.png', '招牌卤面', '/份', 10.00, 2, '小');
INSERT INTO `user_order_detail` VALUES (14, 11, 4, 'http://192.168.31.70:8089/images/e941d1f8-ed8e-4f8b-a381-e0170deb2ba0.png', '红油抄手', '/份', 10.00, 1, '小');
INSERT INTO `user_order_detail` VALUES (15, 12, 5, 'http://192.168.31.70:8089/images/f5430355-442e-42a7-96cd-40b4a99b40c1.png', '小炒肉盖饭', '/份', 15.00, 1, '菜饭合装');
INSERT INTO `user_order_detail` VALUES (16, 13, 1, 'http://192.168.31.70:8089/images/a35e4257-9e9a-43f8-b077-a7664064ce12.png', '招牌小锅米线', '/份', 10.00, 1, '小');
INSERT INTO `user_order_detail` VALUES (17, 14, 4, 'http://192.168.31.70:8089/images/e941d1f8-ed8e-4f8b-a381-e0170deb2ba0.png', '红油抄手', '/份', 10.00, 1, '小');
INSERT INTO `user_order_detail` VALUES (18, 15, 2, 'http://192.168.31.70:8089/images/a35e4257-9e9a-43f8-b077-a7664064ce12.png', '招牌卤面', '/份', 10.00, 2, '小');
INSERT INTO `user_order_detail` VALUES (19, 16, 4, 'http://192.168.31.70:8089/images/e941d1f8-ed8e-4f8b-a381-e0170deb2ba0.png', '红油抄手', '/份', 10.00, 1, '小');
INSERT INTO `user_order_detail` VALUES (20, 17, 5, 'http://192.168.31.70:8089/images/f5430355-442e-42a7-96cd-40b4a99b40c1.png', '小炒肉盖饭', '/份', 15.00, 1, '菜饭合装');
INSERT INTO `user_order_detail` VALUES (21, 28, 1, 'http://192.168.31.70:8089/images/a35e4257-9e9a-43f8-b077-a7664064ce12.png', '招牌小锅米线', '/份', 10.00, 1, '小');
INSERT INTO `user_order_detail` VALUES (22, 28, 2, 'http://192.168.31.70:8089/images/a35e4257-9e9a-43f8-b077-a7664064ce12.png', '招牌卤面', '/份', 15.00, 2, '中');
INSERT INTO `user_order_detail` VALUES (23, 29, 2, 'http://192.168.31.70:8089/images/a35e4257-9e9a-43f8-b077-a7664064ce12.png', '招牌卤面', '/份', 10.00, 1, '小');
INSERT INTO `user_order_detail` VALUES (24, 30, 1, 'http://192.168.31.70:8089/images/a35e4257-9e9a-43f8-b077-a7664064ce12.png', '招牌小锅米线', '/份', 10.00, 1, '小');
INSERT INTO `user_order_detail` VALUES (25, 30, 2, 'http://192.168.31.70:8089/images/a35e4257-9e9a-43f8-b077-a7664064ce12.png', '招牌卤面', '/份', 15.00, 2, '中');
INSERT INTO `user_order_detail` VALUES (26, 31, 8, 'http://192.168.31.70:8089/images/b671da28-9191-4ee8-918c-df1e345bb41d.png', '杂酱面', '/份', 10.00, 1, '汤面');
INSERT INTO `user_order_detail` VALUES (27, 32, 3, 'http://192.168.31.70:8089/images/a35e4257-9e9a-43f8-b077-a7664064ce12.png', '焖肉米线', '/份', 10.00, 1, '原味');
INSERT INTO `user_order_detail` VALUES (28, 33, 1, 'http://192.168.31.70:8089/images/a35e4257-9e9a-43f8-b077-a7664064ce12.png', '招牌小锅米线', '/份', 10.00, 1, '小');
INSERT INTO `user_order_detail` VALUES (29, 34, 1, 'http://192.168.31.70:8089/images/a35e4257-9e9a-43f8-b077-a7664064ce12.png', '招牌小锅米线', '/份', 10.00, 1, '小');
INSERT INTO `user_order_detail` VALUES (30, 35, 1, 'http://192.168.31.70:8089/images/a35e4257-9e9a-43f8-b077-a7664064ce12.png', '招牌小锅米线', '/份', 10.00, 1, '小');
INSERT INTO `user_order_detail` VALUES (31, 35, 2, 'http://192.168.31.70:8089/images/a35e4257-9e9a-43f8-b077-a7664064ce12.png', '招牌卤面', '/份', 10.00, 1, '小');
INSERT INTO `user_order_detail` VALUES (32, 36, 1, 'http://192.168.31.70:8089/images/a35e4257-9e9a-43f8-b077-a7664064ce12.png', '招牌小锅米线', '/份', 10.00, 1, '小');
INSERT INTO `user_order_detail` VALUES (33, 36, 4, 'http://192.168.31.70:8089/images/e941d1f8-ed8e-4f8b-a381-e0170deb2ba0.png', '红油抄手', '/份', 10.00, 1, '小');
INSERT INTO `user_order_detail` VALUES (34, 37, 1, 'http://192.168.31.70:8089/images/a35e4257-9e9a-43f8-b077-a7664064ce12.png', '招牌小锅米线', '/份', 10.00, 1, '小');
INSERT INTO `user_order_detail` VALUES (35, 37, 5, 'http://192.168.31.70:8089/images/f5430355-442e-42a7-96cd-40b4a99b40c1.png', '小炒肉盖饭', '/份', 15.00, 1, '菜饭合装');
INSERT INTO `user_order_detail` VALUES (36, 38, 1, 'http://192.168.31.70:8089/images/a35e4257-9e9a-43f8-b077-a7664064ce12.png', '招牌小锅米线', '/份', 10.00, 1, '小');
INSERT INTO `user_order_detail` VALUES (37, 39, 1, 'http://192.168.31.70:8089/images/a35e4257-9e9a-43f8-b077-a7664064ce12.png', '招牌小锅米线', '/份', 10.00, 1, '小');
INSERT INTO `user_order_detail` VALUES (38, 39, 2, 'http://192.168.31.70:8089/images/a35e4257-9e9a-43f8-b077-a7664064ce12.png', '招牌卤面', '/份', 10.00, 1, '小');
INSERT INTO `user_order_detail` VALUES (39, 39, 4, 'http://192.168.31.70:8089/images/e941d1f8-ed8e-4f8b-a381-e0170deb2ba0.png', '红油抄手', '/份', 10.00, 1, '小');

-- ----------------------------
-- Table structure for wx_user
-- ----------------------------
DROP TABLE IF EXISTS `wx_user`;
CREATE TABLE `wx_user`  (
  `openid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '主键',
  `nick_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '昵称',
  `avatar_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '头像地址',
  PRIMARY KEY (`openid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of wx_user
-- ----------------------------
INSERT INTO `wx_user` VALUES ('ok-u55Yewi_iD6ghDCVkzD0A-hwo', '春', '/images/dd435342-3f7d-4bd5-9f38-0bac33a9cc97.jpeg');

SET FOREIGN_KEY_CHECKS = 1;
