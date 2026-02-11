package com.itmk.web.user_order.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.itmk.web.user_order.entity.*;
import com.itmk.web.user_order.mapper.UserOrderMapper;
import com.itmk.web.user_order.service.UserOrderService;
import com.itmk.web.user_order_detail.entity.UserOrderDetail;
import com.itmk.web.user_order_detail.service.UserOrderDetailService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @Author java实战基地
 * @Version 2383404558
 */
@Service
public class UserOrderServiceImpl extends ServiceImpl<UserOrderMapper, UserOrder> implements UserOrderService {
    @Autowired
    private UserOrderDetailService userOrderDetailService;

    @Override
    @Transactional
    public void splaceOrder(OrderParm parm) {
        //操作订单主表
        UserOrder order = new UserOrder();
        BeanUtils.copyProperties(parm, order);
        order.setCreateTime(new Date());
        order.setStatus("0");
        int ls = this.baseMapper.insert(order);
        //操作子表：订单对应的商品
        if (ls > 0) {
            List<ParmDetail> details = parm.getDetails();
            List<UserOrderDetail> list = new ArrayList<>();
            if (details.size() > 0) {
                for (int i = 0; i < details.size(); i++) {
                    UserOrderDetail detail = new UserOrderDetail();
                    BeanUtils.copyProperties(details.get(i), detail);
                    //设置关联的主表
                    detail.setOrderId(order.getOrderId());
                    list.add(detail);
                }
            }
            //批量插入
            userOrderDetailService.saveBatch(list);
        }
    }

    @Override
    public IPage<UserOrder> getOrderList(WxOrderParm parm) {
        //查询条件
        QueryWrapper<UserOrder> query = new QueryWrapper<>();
        query.lambda().eq(UserOrder::getOpenid,parm.getOpenid())
                .eq(StringUtils.isNotEmpty(parm.getType()),UserOrder::getStatus,parm.getType())
        .orderByDesc(UserOrder::getCreateTime);
        //构造分页对象
        IPage<UserOrder> page = new Page<>(parm.getCurrentPage(),parm.getPageSize());
        //查询订单主表
        IPage<UserOrder> order = this.baseMapper.selectPage(page, query);
        //查询子表
        if(order.getRecords().size() > 0){
            for(int i=0;i<order.getRecords().size();i++){
                QueryWrapper<UserOrderDetail> queryWrapper = new QueryWrapper<>();
                queryWrapper.lambda().eq(UserOrderDetail::getOrderId,order.getRecords().get(i).getOrderId());
                List<UserOrderDetail> list = userOrderDetailService.list(queryWrapper);
                //设置订单对应的商品
                order.getRecords().get(i).setGoodsList(list);
            }
        }
        return order;
    }

    @Override
    public IPage<UserOrder> getPcOrderList(WxOrderParm parm) {
        //查询条件
        QueryWrapper<UserOrder> query = new QueryWrapper<>();
        query.lambda().eq(StringUtils.isNotEmpty(parm.getType()),UserOrder::getStatus,parm.getType())
        .like(StringUtils.isNotEmpty(parm.getUserName()),UserOrder::getUserName,parm.getUserName())
        .orderByDesc(UserOrder::getCreateTime);
        //构造分页对象
        IPage<UserOrder> page = new Page<>(parm.getCurrentPage(),parm.getPageSize());
        //查询订单主表
        IPage<UserOrder> order = this.baseMapper.selectPage(page, query);
        //查询子表
        if(order.getRecords().size() > 0){
            for(int i=0;i<order.getRecords().size();i++){
                QueryWrapper<UserOrderDetail> queryWrapper = new QueryWrapper<>();
                queryWrapper.lambda().eq(UserOrderDetail::getOrderId,order.getRecords().get(i).getOrderId());
                List<UserOrderDetail> list = userOrderDetailService.list(queryWrapper);
                //设置订单对应的商品
                order.getRecords().get(i).setGoodsList(list);
            }
        }
        return order;
    }

    @Override
    public List<SunList> getDays() {
        return this.baseMapper.getDays();
    }

    @Override
    public List<SunList> getMonths() {
        return this.baseMapper.getMonths();
    }

    @Override
    public List<SunList> getYears() {
        return this.baseMapper.getYears();
    }
}
