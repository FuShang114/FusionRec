package com.itmk.web.reco.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
@TableName("reco_rule")
public class RecoRule {
    @TableId(type = IdType.AUTO)
    private Long ruleId;
    private String ruleName;
    private String scene;
    private String enabled;
    private Integer priority;
    private Integer minUsageDays;
    @TableField("min_order_count_30d")
    private Integer minOrderCount30d;
    @TableField("min_consume_amount_30d")
    private BigDecimal minConsumeAmount30d;
    private String highValueOnly;
    private BigDecimal cfWeight;
    private BigDecimal ctrWeight;
    private BigDecimal cvrWeight;
    private String remark;
    private Date createTime;
    private Date updateTime;
}
