package com.itmk.web.reco.dto;

import lombok.Data;

import java.util.Date;

@Data
public class RecoEventItemDto {
    private String openid;
    private Long goodsId;
    private String eventType;
    private String scene;
    private Date eventTime;
    private String extJson;
}
