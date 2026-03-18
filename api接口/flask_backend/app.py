#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
FusionRec Flask 后端 API 服务
提供商品、订单、支付、共享购物车等接口
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql
import json
import random
import string
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

# 数据库配置
DB_CONFIG = {
    'host': 'localhost',
    'port': 3306,
    'user': 'root',
    'password': '',
    'database': 'order_system',
    'charset': 'utf8mb4'
}

def get_db():
    """获取数据库连接"""
    return pymysql.connect(**DB_CONFIG)

def success(data=None, msg='success'):
    """成功响应"""
    return jsonify({'code': 200, 'msg': msg, 'data': data})

def error(msg='error', code=500):
    """错误响应"""
    return jsonify({'code': code, 'msg': msg, 'data': None})

# ==================== 商品相关接口 ====================

@app.route('/api/goods/list', methods=['GET'])
def get_goods_list():
    """获取商品列表"""
    try:
        db = get_db()
        with db.cursor(pymysql.cursors.DictCursor) as cursor:
            cursor.execute("""
                SELECT g.*, s.stock_quantity 
                FROM sys_goods g
                LEFT JOIN sys_goods_stock s ON g.goods_id = s.goods_id
                WHERE g.status = '1'
                ORDER BY g.order_num DESC
            """)
            goods = cursor.fetchall()
            return success({'list': goods, 'total': len(goods)})
    except Exception as e:
        return error(str(e))

@app.route('/api/goods/<int:goods_id>', methods=['GET'])
def get_goods_detail(goods_id):
    """获取商品详情"""
    try:
        db = get_db()
        with db.cursor(pymysql.cursors.DictCursor) as cursor:
            cursor.execute("""
                SELECT g.*, s.stock_quantity 
                FROM sys_goods g
                LEFT JOIN sys_goods_stock s ON g.goods_id = s.goods_id
                WHERE g.goods_id = %s
            """, (goods_id,))
            goods = cursor.fetchone()
            if goods:
                return success(goods)
            return error('商品不存在', 404)
    except Exception as e:
        return error(str(e))

@app.route('/api/category/list', methods=['GET'])
def get_category_list():
    """获取分类列表"""
    try:
        db = get_db()
        with db.cursor(pymysql.cursors.DictCursor) as cursor:
            cursor.execute("SELECT * FROM sys_category ORDER BY order_num")
            categories = cursor.fetchall()
            return success(categories)
    except Exception as e:
        return error(str(e))

# ==================== SKU相关接口 ====================

@app.route('/api/sku/goods/<int:goods_id>', methods=['GET'])
def get_goods_sku(goods_id):
    """获取商品SKU列表"""
    try:
        db = get_db()
        with db.cursor(pymysql.cursors.DictCursor) as cursor:
            # 获取规格
            cursor.execute("""
                SELECT s.*, GROUP_CONCAT(
                    JSON_OBJECT(
                        'valueId', v.value_id,
                        'valueName', v.value_name,
                        'additionalPrice', v.additional_price
                    )
                ) as spec_values
                FROM sys_goods_spec s
                LEFT JOIN sys_goods_spec_value v ON s.spec_id = v.spec_id
                WHERE s.goods_id = %s
                GROUP BY s.spec_id
            """, (goods_id,))
            specs = cursor.fetchall()
            
            # 获取SKU
            cursor.execute("""
                SELECT sku.*, GROUP_CONCAT(
                    JSON_OBJECT(
                        'specId', ssv.spec_id,
                        'valueId', ssv.value_id
                    )
                ) as sku_spec_values
                FROM sys_goods_sku sku
                LEFT JOIN sys_sku_spec_value ssv ON sku.sku_id = ssv.sku_id
                WHERE sku.goods_id = %s AND sku.status = '1'
                GROUP BY sku.sku_id
            """, (goods_id,))
            skus = cursor.fetchall()
            
            return success({'specs': specs, 'skus': skus})
    except Exception as e:
        return error(str(e))

@app.route('/api/sku/topping/<int:goods_id>', methods=['GET'])
def get_topping_list(goods_id):
    """获取配料列表"""
    try:
        db = get_db()
        with db.cursor(pymysql.cursors.DictCursor) as cursor:
            cursor.execute("""
                SELECT * FROM sys_goods_topping 
                WHERE goods_id = %s AND status = '1'
            """, (goods_id,))
            toppings = cursor.fetchall()
            return success(toppings)
    except Exception as e:
        return error(str(e))

# ==================== 库存相关接口 ====================

@app.route('/api/stock/goods/<int:goods_id>', methods=['GET'])
def get_goods_stock(goods_id):
    """获取商品库存"""
    try:
        db = get_db()
        with db.cursor(pymysql.cursors.DictCursor) as cursor:
            cursor.execute("""
                SELECT * FROM sys_goods_stock WHERE goods_id = %s
            """, (goods_id,))
            stock = cursor.fetchone()
            return success(stock or {'stock_quantity': 0})
    except Exception as e:
        return error(str(e))

# ==================== 口味标签接口 ====================

@app.route('/api/taste/tags', methods=['GET'])
def get_taste_tags():
    """获取口味标签"""
    try:
        db = get_db()
        with db.cursor(pymysql.cursors.DictCursor) as cursor:
            cursor.execute("""
                SELECT * FROM sys_taste_tag WHERE status = '1' ORDER BY sort_order
            """)
            tags = cursor.fetchall()
            return success(tags)
    except Exception as e:
        return error(str(e))

@app.route('/api/remark/templates', methods=['GET'])
def get_remark_templates():
    """获取备注模板"""
    try:
        db = get_db()
        with db.cursor(pymysql.cursors.DictCursor) as cursor:
            cursor.execute("""
                SELECT * FROM sys_remark_template 
                WHERE template_type = 'common' ORDER BY sort_order
            """)
            templates = cursor.fetchall()
            return success(templates)
    except Exception as e:
        return error(str(e))

# ==================== 订单相关接口 ====================

@app.route('/api/order/create', methods=['POST'])
def create_order():
    """创建订单"""
    try:
        data = request.json
        order_no = 'ORDER' + datetime.now().strftime('%Y%m%d%H%M%S') + ''.join(random.choices(string.digits, k=4))
        
        db = get_db()
        with db.cursor() as cursor:
            # 插入订单
            cursor.execute("""
                INSERT INTO user_order (openid, order_no, total_price, status, create_time)
                VALUES (%s, %s, %s, 'pending', NOW())
            """, (data.get('openid', 'user_001'), order_no, data['totalAmount']))
            
            order_id = cursor.lastrowid
            
            # 插入订单详情
            for item in data['items']:
                cursor.execute("""
                    INSERT INTO user_order_detail (order_id, goods_id, goods_name, goods_price, quantity, total_price)
                    VALUES (%s, %s, %s, %s, %s, %s)
                """, (order_id, item['goodsId'], item['goodsName'], item['price'], item['quantity'], 
                      item['price'] * item['quantity']))
            
            db.commit()
            return success({'orderId': order_id, 'orderNo': order_no})
    except Exception as e:
        return error(str(e))

@app.route('/api/order/list', methods=['GET'])
def get_order_list():
    """获取订单列表"""
    try:
        openid = request.args.get('openid', 'user_001')
        status = request.args.get('status')
        
        db = get_db()
        with db.cursor(pymysql.cursors.DictCursor) as cursor:
            sql = """
                SELECT o.*, 
                    (SELECT goods_name FROM user_order_detail WHERE order_id = o.order_id LIMIT 1) as first_goods_name,
                    (SELECT COUNT(*) FROM user_order_detail WHERE order_id = o.order_id) as item_count
                FROM user_order o
                WHERE o.openid = %s
            """
            params = [openid]
            
            if status and status != 'all':
                sql += " AND o.status = %s"
                params.append(status)
            
            sql += " ORDER BY o.create_time DESC"
            
            cursor.execute(sql, params)
            orders = cursor.fetchall()
            return success(orders)
    except Exception as e:
        return error(str(e))

# ==================== 支付相关接口 ====================

@app.route('/api/pay/create', methods=['POST'])
def create_pay():
    """创建支付订单"""
    try:
        data = request.json
        pay_no = 'PAY' + datetime.now().strftime('%Y%m%d%H%M%S') + ''.join(random.choices(string.digits, k=4))
        
        db = get_db()
        with db.cursor() as cursor:
            cursor.execute("""
                INSERT INTO pay_order (pay_no, order_no, pay_amount, pay_type, pay_status, expire_time, create_time)
                VALUES (%s, %s, %s, %s, 'pending', DATE_ADD(NOW(), INTERVAL 15 MINUTE), NOW())
            """, (pay_no, data['orderNo'], data['amount'], data.get('payType', 'wechat')))
            
            db.commit()
            return success({'payNo': pay_no})
    except Exception as e:
        return error(str(e))

@app.route('/api/pay/wechat', methods=['POST'])
def wechat_pay():
    """微信支付"""
    # 模拟微信支付
    return success({'payStatus': 'pending', 'payNo': 'PAY' + ''.join(random.choices(string.digits, k=16))})

@app.route('/api/pay/alipay', methods=['POST'])
def alipay():
    """支付宝支付"""
    # 模拟支付宝支付
    return success({'payStatus': 'pending', 'payNo': 'PAY' + ''.join(random.choices(string.digits, k=16))})

@app.route('/api/pay/balance', methods=['POST'])
def balance_pay():
    """余额支付"""
    try:
        data = request.json
        openid = data.get('openid', 'user_001')
        amount = data['amount']
        
        db = get_db()
        with db.cursor(pymysql.cursors.DictCursor) as cursor:
            # 检查余额
            cursor.execute("SELECT * FROM user_balance WHERE openid = %s", (openid,))
            balance = cursor.fetchone()
            
            if not balance or balance['balance_amount'] < amount:
                return error('余额不足', 400)
            
            # 扣减余额
            cursor.execute("""
                UPDATE user_balance 
                SET balance_amount = balance_amount - %s,
                    total_consume = total_consume + %s
                WHERE openid = %s
            """, (amount, amount, openid))
            
            # 记录变动
            cursor.execute("""
                INSERT INTO user_balance_log (openid, change_type, change_amount, before_amount, after_amount, order_no, create_time)
                VALUES (%s, 'consume', %s, %s, %s, %s, NOW())
            """, (openid, amount, balance['balance_amount'], balance['balance_amount'] - amount, data['orderNo']))
            
            db.commit()
            return success({'payStatus': 'success'})
    except Exception as e:
        return error(str(e))

@app.route('/api/pay/status/<pay_no>', methods=['GET'])
def get_pay_status(pay_no):
    """查询支付状态"""
    try:
        db = get_db()
        with db.cursor(pymysql.cursors.DictCursor) as cursor:
            cursor.execute("SELECT * FROM pay_order WHERE pay_no = %s", (pay_no,))
            pay = cursor.fetchone()
            
            if pay:
                # 模拟支付成功（实际应该查询第三方支付）
                if pay['pay_status'] == 'pending' and random.random() > 0.5:
                    cursor.execute("UPDATE pay_order SET pay_status = 'success', pay_time = NOW() WHERE pay_no = %s", (pay_no,))
                    db.commit()
                    pay['pay_status'] = 'success'
                
                return success({'payStatus': pay['pay_status']})
            return error('支付单不存在', 404)
    except Exception as e:
        return error(str(e))

@app.route('/api/user/balance', methods=['GET'])
def get_user_balance():
    """获取用户余额"""
    try:
        openid = request.args.get('openid', 'user_001')
        
        db = get_db()
        with db.cursor(pymysql.cursors.DictCursor) as cursor:
            cursor.execute("SELECT * FROM user_balance WHERE openid = %s", (openid,))
            balance = cursor.fetchone()
            
            if balance:
                # 获取最近记录
                cursor.execute("""
                    SELECT * FROM user_balance_log 
                    WHERE openid = %s ORDER BY create_time DESC LIMIT 10
                """, (openid,))
                records = cursor.fetchall()
                balance['records'] = records
                
                return success(balance)
            
            # 创建余额记录
            cursor.execute("INSERT INTO user_balance (openid) VALUES (%s)", (openid,))
            db.commit()
            return success({'openid': openid, 'balance_amount': 0, 'records': []})
    except Exception as e:
        return error(str(e))

@app.route('/api/user/balance/recharge', methods=['POST'])
def recharge_balance():
    """余额充值"""
    try:
        data = request.json
        openid = data.get('openid', 'user_001')
        amount = data['amount']
        
        db = get_db()
        with db.cursor(pymysql.cursors.DictCursor) as cursor:
            cursor.execute("SELECT * FROM user_balance WHERE openid = %s", (openid,))
            balance = cursor.fetchone()
            
            if balance:
                before_amount = balance['balance_amount']
                cursor.execute("""
                    UPDATE user_balance 
                    SET balance_amount = balance_amount + %s,
                        total_recharge = total_recharge + %s
                    WHERE openid = %s
                """, (amount, amount, openid))
            else:
                before_amount = 0
                cursor.execute("""
                    INSERT INTO user_balance (openid, balance_amount, total_recharge)
                    VALUES (%s, %s, %s)
                """, (openid, amount, amount))
            
            # 记录变动
            cursor.execute("""
                INSERT INTO user_balance_log (openid, change_type, change_amount, before_amount, after_amount, create_time)
                VALUES (%s, 'recharge', %s, %s, %s, NOW())
            """, (openid, amount, before_amount, before_amount + amount))
            
            db.commit()
            return success({'balance': before_amount + amount})
    except Exception as e:
        return error(str(e))

# ==================== 共享购物车接口 ====================

def generate_session_code():
    """生成4位共享码"""
    chars = string.ascii_uppercase + string.digits
    return ''.join(random.choices(chars, k=4))

@app.route('/api/shared-cart/create', methods=['POST'])
def create_shared_cart():
    """创建共享购物车"""
    try:
        data = request.json
        openid = data.get('openid', 'user_001')
        
        db = get_db()
        with db.cursor(pymysql.cursors.DictCursor) as cursor:
            # 生成唯一共享码
            while True:
                session_code = generate_session_code()
                cursor.execute("SELECT 1 FROM shared_cart_session WHERE session_code = %s", (session_code,))
                if not cursor.fetchone():
                    break
            
            # 创建会话
            cursor.execute("""
                INSERT INTO shared_cart_session (session_code, owner_openid, table_no, status, expire_time, create_time)
                VALUES (%s, %s, %s, 'active', DATE_ADD(NOW(), INTERVAL 2 HOUR), NOW())
            """, (session_code, openid, data.get('tableNo', '')))
            
            session_id = cursor.lastrowid
            
            # 添加创建者为成员
            cursor.execute("""
                INSERT INTO shared_cart_member (session_id, openid, role, join_time)
                VALUES (%s, %s, 'owner', NOW())
            """, (session_id, openid))
            
            db.commit()
            return success({'sessionCode': session_code, 'sessionId': session_id})
    except Exception as e:
        return error(str(e))

@app.route('/api/shared-cart/join', methods=['POST'])
def join_shared_cart():
    """加入共享购物车"""
    try:
        data = request.json
        openid = data.get('openid', 'user_002')
        session_code = data['sessionCode']
        
        db = get_db()
        with db.cursor(pymysql.cursors.DictCursor) as cursor:
            # 获取会话
            cursor.execute("""
                SELECT * FROM shared_cart_session 
                WHERE session_code = %s AND status = 'active' AND expire_time > NOW()
            """, (session_code,))
            session = cursor.fetchone()
            
            if not session:
                return error('共享码无效或已过期', 400)
            
            # 检查是否已在会话中
            cursor.execute("""
                SELECT 1 FROM shared_cart_member 
                WHERE session_id = %s AND openid = %s
            """, (session['session_id'], openid))
            
            if not cursor.fetchone():
                # 添加成员
                cursor.execute("""
                    INSERT INTO shared_cart_member (session_id, openid, role, join_time)
                    VALUES (%s, %s, 'member', NOW())
                """, (session['session_id'], openid))
                
                # 更新成员数
                cursor.execute("""
                    UPDATE shared_cart_session 
                    SET member_count = member_count + 1
                    WHERE session_id = %s
                """, (session['session_id'],))
                
                db.commit()
            
            return success({'sessionCode': session_code})
    except Exception as e:
        return error(str(e))

@app.route('/api/shared-cart/<session_code>', methods=['GET'])
def get_shared_cart_detail(session_code):
    """获取共享购物车详情"""
    try:
        db = get_db()
        with db.cursor(pymysql.cursors.DictCursor) as cursor:
            # 获取会话信息
            cursor.execute("""
                SELECT * FROM shared_cart_session WHERE session_code = %s
            """, (session_code,))
            session = cursor.fetchone()
            
            if not session:
                return error('共享购物车不存在', 404)
            
            # 获取成员列表
            cursor.execute("""
                SELECT * FROM shared_cart_member WHERE session_id = %s
            """, (session['session_id'],))
            members = cursor.fetchall()
            
            # 获取购物车商品
            cursor.execute("""
                SELECT * FROM shared_cart_item WHERE session_id = %s ORDER BY add_time DESC
            """, (session['session_id'],))
            items = cursor.fetchall()
            
            return success({
                'sessionCode': session['session_code'],
                'tableNo': session['table_no'],
                'ownerOpenid': session['owner_openid'],
                'members': members,
                'items': items
            })
    except Exception as e:
        return error(str(e))

@app.route('/api/shared-cart/add', methods=['POST'])
def add_shared_cart_item():
    """添加商品到共享购物车"""
    try:
        data = request.json
        openid = data.get('openid', 'user_001')
        
        db = get_db()
        with db.cursor(pymysql.cursors.DictCursor) as cursor:
            # 获取会话ID
            cursor.execute("""
                SELECT session_id FROM shared_cart_session WHERE session_code = %s
            """, (data['sessionCode'],))
            session = cursor.fetchone()
            
            if not session:
                return error('共享购物车不存在', 404)
            
            # 添加商品
            cursor.execute("""
                INSERT INTO shared_cart_item 
                (session_id, openid, goods_id, sku_id, sku_name, goods_name, goods_image, 
                 quantity, unit_price, topping_ids, topping_price, remark, is_checked)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, '1')
            """, (
                session['session_id'], openid, data['goodsId'], data.get('skuId'),
                data.get('skuName'), data['goodsName'], data.get('goodsImage'),
                data['quantity'], data['price'], 
                ','.join(map(str, data.get('toppings', []))) if data.get('toppings') else None,
                data.get('toppingPrice', 0), data.get('remark')
            ))
            
            db.commit()
            return success({'itemId': cursor.lastrowid})
    except Exception as e:
        return error(str(e))

@app.route('/api/shared-cart/item/<int:item_id>', methods=['PUT', 'DELETE'])
def update_shared_cart_item(item_id):
    """更新/删除共享购物车商品"""
    try:
        db = get_db()
        with db.cursor() as cursor:
            if request.method == 'DELETE':
                cursor.execute("DELETE FROM shared_cart_item WHERE item_id = %s", (item_id,))
            else:
                data = request.json
                cursor.execute("""
                    UPDATE shared_cart_item 
                    SET quantity = %s, update_time = NOW()
                    WHERE item_id = %s
                """, (data['quantity'], item_id))
            
            db.commit()
            return success()
    except Exception as e:
        return error(str(e))

@app.route('/api/shared-cart/item/<int:item_id>/check', methods=['PUT'])
def check_shared_cart_item(item_id):
    """选中/取消选中商品"""
    try:
        checked = request.args.get('checked', 'true') == 'true'
        
        db = get_db()
        with db.cursor() as cursor:
            cursor.execute("""
                UPDATE shared_cart_item 
                SET is_checked = %s, update_time = NOW()
                WHERE item_id = %s
            """, ('1' if checked else '0', item_id))
            
            db.commit()
            return success()
    except Exception as e:
        return error(str(e))

@app.route('/api/shared-cart/<session_code>/confirm', methods=['POST'])
def confirm_shared_cart_order(session_code):
    """确认下单"""
    try:
        data = request.json
        
        db = get_db()
        with db.cursor(pymysql.cursors.DictCursor) as cursor:
            # 获取会话
            cursor.execute("""
                SELECT * FROM shared_cart_session WHERE session_code = %s
            """, (session_code,))
            session = cursor.fetchone()
            
            if not session:
                return error('共享购物车不存在', 404)
            
            # 创建订单
            order_no = 'ORDER' + datetime.now().strftime('%Y%m%d%H%M%S') + ''.join(random.choices(string.digits, k=4))
            total_price = sum(item['unitPrice'] * item['quantity'] for item in data['items'])
            
            cursor.execute("""
                INSERT INTO user_order (openid, order_no, total_price, status, create_time)
                VALUES (%s, %s, %s, 'pending', NOW())
            """, (session['owner_openid'], order_no, total_price))
            
            order_id = cursor.lastrowid
            
            # 插入订单详情
            for item in data['items']:
                cursor.execute("""
                    INSERT INTO user_order_detail (order_id, goods_id, goods_name, goods_price, quantity, total_price)
                    VALUES (%s, %s, %s, %s, %s, %s)
                """, (order_id, item['goodsId'], item['goodsName'], item['unitPrice'], 
                      item['quantity'], item['unitPrice'] * item['quantity']))
            
            # 更新会话状态
            cursor.execute("""
                UPDATE shared_cart_session SET status = 'completed' WHERE session_id = %s
            """, (session['session_id'],))
            
            db.commit()
            return success({'orderNo': order_no, 'orderId': order_id})
    except Exception as e:
        return error(str(e))

@app.route('/api/shared-cart/<session_code>/split', methods=['GET'])
def get_shared_cart_split(session_code):
    """获取共享购物车分摊明细"""
    try:
        db = get_db()
        with db.cursor(pymysql.cursors.DictCursor) as cursor:
            # 获取会话
            cursor.execute("""
                SELECT session_id FROM shared_cart_session WHERE session_code = %s
            """, (session_code,))
            session = cursor.fetchone()
            
            if not session:
                return error('共享购物车不存在', 404)
            
            # 获取购物车商品（已选中的）
            cursor.execute("""
                SELECT openid, unit_price, quantity 
                FROM shared_cart_item 
                WHERE session_id = %s AND is_checked = '1'
            """, (session['session_id'],))
            items = cursor.fetchall()
            
            # 计算每个用户的分摊金额
            split_map = {}
            for item in items:
                openid = item['openid']
                amount = item['unit_price'] * item['quantity']
                if openid in split_map:
                    split_map[openid] += amount
                else:
                    split_map[openid] = amount
            
            # 转换为列表
            splits = [{'openid': k, 'amount': v} for k, v in split_map.items()]
            
            return success({'splits': splits})
    except Exception as e:
        return error(str(e))

# ==================== 启动服务 ====================

if __name__ == '__main__':
    print("Starting FusionRec Flask Backend...")
    print("API文档: http://localhost:8081")
    app.run(host='0.0.0.0', port=8081, debug=True)
