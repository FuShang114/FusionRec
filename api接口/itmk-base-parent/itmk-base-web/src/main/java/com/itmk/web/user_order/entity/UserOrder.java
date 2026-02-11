package com.itmk.web.user_order.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.itmk.web.user_order_detail.entity.UserOrderDetail;
import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @Author java实战基地
 * @Version 2383404558
 */
@Data
@TableName("user_order")
public class UserOrder {
    @TableId(type = IdType.AUTO)
    private Long orderId;
    private String openid;
    private String userName;
    private String phone;
    private String address;
    private BigDecimal price;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Date createTime;
    private String status;
    //排除字段
    @TableField(exist = false)
    private List<UserOrderDetail> goodsList = new ArrayList<>();
}

