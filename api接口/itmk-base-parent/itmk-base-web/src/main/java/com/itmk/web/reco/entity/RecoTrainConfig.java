package com.itmk.web.reco.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
@TableName("reco_train_config")
public class RecoTrainConfig {
    @TableId(type = IdType.AUTO)
    private Long id;
    private String scene;
    private String enabled;
    private String trainFrequency;
    private BigDecimal attrWeight;
    private BigDecimal consumeWeight;
    private BigDecimal ratingWeight;
    private BigDecimal dishWeight;
    private String cronExpr;
    private Date nextRunTime;
    private String remark;
    private Date createTime;
    private Date updateTime;
}
