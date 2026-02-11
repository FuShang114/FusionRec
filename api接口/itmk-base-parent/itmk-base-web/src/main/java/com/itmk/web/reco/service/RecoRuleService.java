package com.itmk.web.reco.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.itmk.web.reco.dto.RecoWeightDecisionDto;
import com.itmk.web.reco.entity.RecoRule;
import com.itmk.web.reco.entity.RecoUserProfileDaily;

public interface RecoRuleService extends IService<RecoRule> {
    String validateRule(RecoRule rule);
    RecoWeightDecisionDto matchRule(RecoUserProfileDaily profile, String scene);
}
