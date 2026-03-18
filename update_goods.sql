-- 更新商品数据为餐饮类

-- 清空现有商品数据
DELETE FROM sys_goods;
DELETE FROM sys_category;

-- 插入餐饮分类
INSERT INTO sys_category (category_id, category_name, order_num) VALUES
(1, '奶茶果茶', 1),
(2, '咖啡系列', 2),
(3, '甜品烘焙', 3),
(4, '轻食简餐', 4),
(5, '小吃零食', 5);

-- 插入餐饮类商品
INSERT INTO sys_goods (goods_id, goods_name, category_id, goods_price, goods_image, goods_desc, status, order_num) VALUES
(1, '珍珠奶茶', 1, 15.00, 'https://img.yzcdn.cn/vant/cat.jpeg', '香浓奶茶配Q弹珍珠，经典口味', '1', 1000),
(2, '芝士奶盖茶', 1, 18.00, 'https://img.yzcdn.cn/vant/apple-1.jpg', '浓郁芝士配清香茶底', '1', 900),
(3, '水果茶', 1, 22.00, 'https://img.yzcdn.cn/vant/apple-2.jpg', '新鲜水果现切现做', '1', 800),
(4, '拿铁咖啡', 2, 25.00, 'https://img.yzcdn.cn/vant/ipad.jpeg', '现磨咖啡豆配鲜奶', '1', 700),
(5, '美式咖啡', 2, 20.00, 'https://img.yzcdn.cn/vant/computer.jpeg', '经典美式，提神醒脑', '1', 600),
(6, '抹茶拿铁', 2, 24.00, 'https://img.yzcdn.cn/vant/cat.jpeg', '日式抹茶配鲜奶', '1', 500),
(7, '草莓蛋糕', 3, 35.00, 'https://img.yzcdn.cn/vant/apple-1.jpg', '新鲜草莓配奶油', '1', 400),
(8, '提拉米苏', 3, 38.00, 'https://img.yzcdn.cn/vant/apple-2.jpg', '意式经典甜品', '1', 300),
(9, '三明治', 4, 28.00, 'https://img.yzcdn.cn/vant/ipad.jpeg', '健康轻食，营养均衡', '1', 200),
(10, '沙拉', 4, 32.00, 'https://img.yzcdn.cn/vant/computer.jpeg', '新鲜蔬菜，低脂健康', '1', 100);

-- 更新库存数据
DELETE FROM sys_goods_stock;
INSERT INTO sys_goods_stock (goods_id, stock_quantity) VALUES
(1, 100),
(2, 80),
(3, 60),
(4, 100),
(5, 100),
(6, 80),
(7, 50),
(8, 40),
(9, 30),
(10, 30);
