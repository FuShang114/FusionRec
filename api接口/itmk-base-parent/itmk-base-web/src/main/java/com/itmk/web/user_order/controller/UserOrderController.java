package com.itmk.web.user_order.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.itmk.utils.ResultUtils;
import com.itmk.utils.ResultVo;
import com.itmk.web.user_order.entity.*;
import com.itmk.web.user_order.service.UserOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @Author java实战基地
 * @Version 2383404558
 */
@RestController
@RequestMapping("/wxapi/order")
public class UserOrderController {
    @Autowired
    private UserOrderService userOrderService;

    //下的
    @PostMapping("/splaceOrder")
    public ResultVo splaceOrder(@RequestBody OrderParm parm){
        userOrderService.splaceOrder(parm);
        return ResultUtils.success("提交成功!");
    }

    //查询订单
    @GetMapping("/getOrderList")
    public ResultVo getOrderList(WxOrderParm parm){
        IPage<UserOrder> orderList = userOrderService.getOrderList(parm);
        return ResultUtils.success("查询成功!",orderList);
    }

    //查询pc订单
    @GetMapping("/getPcOrderList")
    public ResultVo getPcOrderList(WxOrderParm parm){
        IPage<UserOrder> orderList = userOrderService.getPcOrderList(parm);
        return ResultUtils.success("查询成功!",orderList);
    }

    //发货
    @PutMapping("/sendOrder")
    public ResultVo sendOrder(@RequestBody SendParm parm){
        //判断订单是否被取消
        QueryWrapper<UserOrder> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda().eq(UserOrder::getOrderId,parm.getOrderId()).eq(UserOrder::getStatus,"3");
        UserOrder one = userOrderService.getOne(queryWrapper);
        if(one != null){
            return ResultUtils.error("订单已被取消，不能发货!");
        }
        //更新条件
        LambdaUpdateWrapper<UserOrder> query = new LambdaUpdateWrapper<>();
        query.eq(UserOrder::getOrderId,parm.getOrderId())
                .set(UserOrder::getStatus,"1");
        if(userOrderService.update(query)){
            return ResultUtils.success("更新成功!");
        }
        return ResultUtils.error("更新失败!");
    }
    //取消订单
    @PostMapping("/cancelOrder")
    public ResultVo cancelOrder(@RequestBody SendParm parm){
        //如果已发货，不能取消
        QueryWrapper<UserOrder> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda().eq(UserOrder::getOrderId,parm.getOrderId()).eq(UserOrder::getStatus,"1");
        UserOrder one = userOrderService.getOne(queryWrapper);
        if(one != null){
            return ResultUtils.error("订单已发货，不能取消!");
        }
        //更新条件
        LambdaUpdateWrapper<UserOrder> query = new LambdaUpdateWrapper<>();
        query.eq(UserOrder::getOrderId,parm.getOrderId())
                .set(UserOrder::getStatus,"3");
        if(userOrderService.update(query)){
            return ResultUtils.success("取消成功!");
        }
        return ResultUtils.error("取消失败!");
    }

     //确定收货
    @PostMapping("/confirmOrder")
    public ResultVo confirmOrder(@RequestBody SendParm parm){
        //更新条件
        LambdaUpdateWrapper<UserOrder> query = new LambdaUpdateWrapper<>();
        query.eq(UserOrder::getOrderId,parm.getOrderId())
                .set(UserOrder::getStatus,"2");
        if(userOrderService.update(query)){
            return ResultUtils.success("收货成功!");
        }
        return ResultUtils.error("收货失败!");
    }
    //首页统计 0:日 1：月 2：年
    @GetMapping("/getTotal")
    public ResultVo getTotal(String type){
        List<SunList> list = null;
        switch (type){
            case "1":
                list = userOrderService.getMonths();
                break;
            case "2":
                list = userOrderService.getYears();
                break;
            default:
                list = userOrderService.getDays();
        }
        Echarts echarts = new Echarts();
        if(list!= null && list.size() >0){
            for (int i=0;i<list.size();i++){
                echarts.getNames().add(list.get(i).getDays());
                echarts.getValues().add(list.get(i).getPrice());
            }
        }
        return ResultUtils.success("查询成功",echarts);
    }
}
