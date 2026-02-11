package com.itmk.web.reco.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
@TableName("reco_user_profile_daily")
public class RecoUserProfileDaily {
    @TableId(type = IdType.AUTO)
    private Long id;
    private String openid;
    private Date dt;
    private Integer usageDurationDays;
    @TableField("consumed_order_count_30d")
    private Integer consumedOrderCount30d;
    @TableField("consumed_amount_30d")
    private BigDecimal consumedAmount30d;
    @TableField("avg_order_amount_30d")
    private BigDecimal avgOrderAmount30d;
    private String isHighValueUser;
    private Date createTime;
    private Date updateTime;
}
