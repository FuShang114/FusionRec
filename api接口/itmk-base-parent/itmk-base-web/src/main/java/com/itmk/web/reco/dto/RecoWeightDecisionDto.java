package com.itmk.web.reco.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class RecoWeightDecisionDto {
    private Long ruleId;
    private String source;
    private BigDecimal cfWeight;
    private BigDecimal ctrWeight;
    private BigDecimal cvrWeight;
}
