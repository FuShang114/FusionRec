package com.itmk.web.user_order.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.itmk.web.user_order.entity.OrderParm;
import com.itmk.web.user_order.entity.SunList;
import com.itmk.web.user_order.entity.UserOrder;
import com.itmk.web.user_order.entity.WxOrderParm;

import java.util.List;

/**
 * @Author java实战基地
 * @Version 2383404558
 */
public interface UserOrderService extends IService<UserOrder> {
    void splaceOrder(OrderParm parm);
    IPage<UserOrder> getOrderList(WxOrderParm parm);
    IPage<UserOrder> getPcOrderList(WxOrderParm parm);
    //按天查询
    List<SunList> getDays();
    //按月查询
    List<SunList> getMonths();
    //按年查询
    List<SunList> getYears();
}
