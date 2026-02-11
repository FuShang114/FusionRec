package com.itmk.web.reco.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
@TableName("reco_rule_hit_log")
public class RecoRuleHitLog {
    @TableId(type = IdType.AUTO)
    private Long id;
    private String openid;
    private Long ruleId;
    private String scene;
    private BigDecimal cfWeight;
    private BigDecimal ctrWeight;
    private BigDecimal cvrWeight;
    private Date requestTime;
    private Date createTime;
}
