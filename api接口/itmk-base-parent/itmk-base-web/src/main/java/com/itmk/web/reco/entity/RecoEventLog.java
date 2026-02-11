package com.itmk.web.reco.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.util.Date;

@Data
@TableName("reco_event_log")
public class RecoEventLog {
    @TableId(type = IdType.AUTO)
    private Long eventId;
    private String openid;
    private Long goodsId;
    private String eventType;
    private String scene;
    private Date eventTime;
    private String extJson;
}
