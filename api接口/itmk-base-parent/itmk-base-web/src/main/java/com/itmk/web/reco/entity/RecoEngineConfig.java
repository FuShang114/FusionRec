package com.itmk.web.reco.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
@TableName("reco_engine_config")
public class RecoEngineConfig {
    @TableId(type = IdType.AUTO)
    private Long configId;
    private String scene;
    private String enabled;
    private BigDecimal cfWeight;
    private BigDecimal ctrWeight;
    private BigDecimal cvrWeight;
    private Date createTime;
    private Date updateTime;
}
