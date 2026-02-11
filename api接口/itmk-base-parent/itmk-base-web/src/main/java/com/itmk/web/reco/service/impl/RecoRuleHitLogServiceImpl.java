package com.itmk.web.reco.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.itmk.web.reco.dto.RecoWeightDecisionDto;
import com.itmk.web.reco.entity.RecoRuleHitLog;
import com.itmk.web.reco.mapper.RecoRuleHitLogMapper;
import com.itmk.web.reco.service.RecoRuleHitLogService;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class RecoRuleHitLogServiceImpl extends ServiceImpl<RecoRuleHitLogMapper, RecoRuleHitLog> implements RecoRuleHitLogService {
    @Override
    public void logHit(String openid, String scene, RecoWeightDecisionDto decision) {
        if (openid == null || decision == null) {
            return;
        }
        RecoRuleHitLog log = new RecoRuleHitLog();
        log.setOpenid(openid);
        log.setScene(scene);
        log.setRuleId(decision.getRuleId());
        log.setCfWeight(decision.getCfWeight());
        log.setCtrWeight(decision.getCtrWeight());
        log.setCvrWeight(decision.getCvrWeight());
        Date now = new Date();
        log.setRequestTime(now);
        log.setCreateTime(now);
        this.save(log);
    }
}
