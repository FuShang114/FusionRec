package com.itmk.web.reco.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class RecoOnlineScoreDto {
    private Long goodsId;
    private BigDecimal cfScore;
    private BigDecimal ctrScore;
    private BigDecimal cvrScore;
    private BigDecimal blendScore;
}
