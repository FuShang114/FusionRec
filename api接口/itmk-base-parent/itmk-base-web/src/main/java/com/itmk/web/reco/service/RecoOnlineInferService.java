package com.itmk.web.reco.service;

import com.itmk.web.reco.dto.RecoOnlineScoreDto;

import java.math.BigDecimal;
import java.util.List;

public interface RecoOnlineInferService {
    boolean available();
    List<RecoOnlineScoreDto> infer(String openid, String scene, List<Long> goodsIds, BigDecimal cfWeight, BigDecimal ctrWeight, BigDecimal cvrWeight);
}
