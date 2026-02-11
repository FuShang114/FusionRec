package com.itmk.web.user_order.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.itmk.web.user_order.entity.SunList;
import com.itmk.web.user_order.entity.UserOrder;

import java.util.List;


/**
 * @Author java实战基地
 * @Version 2383404558
 */
public interface UserOrderMapper extends BaseMapper<UserOrder> {
    //按天查询
    List<SunList> getDays();
    //按月查询
    List<SunList> getMonths();
    //按年查询
    List<SunList> getYears();

}
