package com.itmk.web.reco.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
@TableName("reco_job")
public class RecoJob {
    @TableId(type = IdType.AUTO)
    private Long jobId;
    private String jobType;
    private String algoType;
    private String status;
    private Long sampleSize;
    private BigDecimal auc;
    private BigDecimal logloss;
    private BigDecimal recallAtK;
    private String modelVersion;
    private String logPath;
    private String message;
    private Date startTime;
    private Date endTime;
    private Date createTime;
    private Date updateTime;
}
