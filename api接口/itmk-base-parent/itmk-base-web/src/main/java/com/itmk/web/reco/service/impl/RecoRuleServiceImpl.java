package com.itmk.web.reco.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.itmk.web.reco.dto.RecoWeightDecisionDto;
import com.itmk.web.reco.entity.RecoRule;
import com.itmk.web.reco.entity.RecoUserProfileDaily;
import com.itmk.web.reco.mapper.RecoRuleMapper;
import com.itmk.web.reco.service.RecoRuleService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

@Service
public class RecoRuleServiceImpl extends ServiceImpl<RecoRuleMapper, RecoRule> implements RecoRuleService {
    @Override
    public String validateRule(RecoRule rule) {
        if (rule.getRuleName() == null || rule.getRuleName().trim().isEmpty()) {
            return "规则名称不能为空";
        }
        if (rule.getScene() == null || rule.getScene().trim().isEmpty()) {
            return "场景不能为空";
        }
        if (rule.getCfWeight() == null || rule.getCtrWeight() == null || rule.getCvrWeight() == null) {
            return "权重不能为空";
        }
        if (rule.getCfWeight().compareTo(BigDecimal.ZERO) < 0
                || rule.getCtrWeight().compareTo(BigDecimal.ZERO) < 0
                || rule.getCvrWeight().compareTo(BigDecimal.ZERO) < 0) {
            return "权重不能为负数";
        }
        BigDecimal total = rule.getCfWeight().add(rule.getCtrWeight()).add(rule.getCvrWeight());
        if (total.subtract(BigDecimal.ONE).abs().compareTo(new BigDecimal("0.0001")) > 0) {
            return "权重和必须为1";
        }
        return null;
    }

    @Override
    public RecoWeightDecisionDto matchRule(RecoUserProfileDaily profile, String scene) {
        try {
            QueryWrapper<RecoRule> query = new QueryWrapper<>();
            query.lambda()
                    .eq(RecoRule::getEnabled, "1")
                    .eq(RecoRule::getScene, scene)
                    .orderByDesc(RecoRule::getPriority)
                    .orderByDesc(RecoRule::getRuleId);
            List<RecoRule> rules = this.list(query);
            if (rules == null || rules.isEmpty()) {
                return null;
            }
            for (RecoRule rule : rules) {
                if (matchOneRule(rule, profile)) {
                    RecoWeightDecisionDto dto = new RecoWeightDecisionDto();
                    dto.setRuleId(rule.getRuleId());
                    dto.setSource("RULE");
                    dto.setCfWeight(rule.getCfWeight());
                    dto.setCtrWeight(rule.getCtrWeight());
                    dto.setCvrWeight(rule.getCvrWeight());
                    return dto;
                }
            }
            return null;
        } catch (Exception e) {
            return null;
        }
    }

    private boolean matchOneRule(RecoRule rule, RecoUserProfileDaily profile) {
        if (profile == null) {
            return false;
        }
        if (rule.getMinUsageDays() != null && compareInt(profile.getUsageDurationDays(), rule.getMinUsageDays()) < 0) {
            return false;
        }
        if (rule.getMinOrderCount30d() != null && compareInt(profile.getConsumedOrderCount30d(), rule.getMinOrderCount30d()) < 0) {
            return false;
        }
        if (rule.getMinConsumeAmount30d() != null) {
            BigDecimal amount = profile.getConsumedAmount30d() == null ? BigDecimal.ZERO : profile.getConsumedAmount30d();
            if (amount.compareTo(rule.getMinConsumeAmount30d()) < 0) {
                return false;
            }
        }
        if (Objects.equals(rule.getHighValueOnly(), "1") && !Objects.equals(profile.getIsHighValueUser(), "1")) {
            return false;
        }
        return true;
    }

    private int compareInt(Integer actual, Integer target) {
        int current = actual == null ? 0 : actual;
        return Integer.compare(current, target);
    }
}
