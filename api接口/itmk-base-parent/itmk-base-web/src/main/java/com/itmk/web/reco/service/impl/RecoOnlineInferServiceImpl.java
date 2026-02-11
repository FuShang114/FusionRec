package com.itmk.web.reco.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import com.itmk.web.reco.dto.RecoOnlineScoreDto;
import com.itmk.web.reco.jni.RecoJniBridge;
import com.itmk.web.reco.service.RecoOnlineInferService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class RecoOnlineInferServiceImpl implements RecoOnlineInferService {
    private final RecoJniBridge bridge = new RecoJniBridge();

    @Override
    public boolean available() {
        return RecoJniBridge.isLoaded();
    }

    @Override
    public List<RecoOnlineScoreDto> infer(String openid, String scene, List<Long> goodsIds, BigDecimal cfWeight, BigDecimal ctrWeight, BigDecimal cvrWeight) {
        if (!available() || openid == null || openid.trim().isEmpty() || goodsIds == null || goodsIds.isEmpty()) {
            return new ArrayList<>();
        }
        String goodsJson = JSON.toJSONString(goodsIds);
        String result = bridge.infer(openid, scene, goodsJson, cfWeight.doubleValue(), ctrWeight.doubleValue(), cvrWeight.doubleValue());
        if (result == null || result.trim().isEmpty()) {
            return new ArrayList<>();
        }
        return JSON.parseObject(result, new TypeReference<List<RecoOnlineScoreDto>>() {
        });
    }
}
