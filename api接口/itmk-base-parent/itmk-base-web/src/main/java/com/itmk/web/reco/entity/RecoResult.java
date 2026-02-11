package com.itmk.web.reco.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
@TableName("reco_result")
public class RecoResult {
    @TableId(type = IdType.AUTO)
    private Long id;
    private String openid;
    private Long goodsId;
    private String algoType;
    private BigDecimal score;
    private Integer rankNo;
    private String bizScene;
    private String modelVersion;
    private Date dt;
    private Date createTime;
}
