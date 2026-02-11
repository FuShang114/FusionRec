package com.itmk.web.reco.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.itmk.web.reco.dto.RecoWeightDecisionDto;
import com.itmk.web.reco.entity.RecoRuleHitLog;

public interface RecoRuleHitLogService extends IService<RecoRuleHitLog> {
    void logHit(String openid, String scene, RecoWeightDecisionDto decision);
}
