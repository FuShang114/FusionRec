package com.itmk.web.reco.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.itmk.web.reco.entity.RecoEngineConfig;
import com.itmk.web.reco.mapper.RecoEngineConfigMapper;
import com.itmk.web.reco.service.RecoEngineConfigService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;

@Service
public class RecoEngineConfigServiceImpl extends ServiceImpl<RecoEngineConfigMapper, RecoEngineConfig> implements RecoEngineConfigService {
    @Override
    public RecoEngineConfig getOrInitByScene(String scene) {
        QueryWrapper<RecoEngineConfig> query = new QueryWrapper<>();
        query.lambda().eq(RecoEngineConfig::getScene, scene);
        RecoEngineConfig one = this.getOne(query);
        if (one != null) {
            return one;
        }
        RecoEngineConfig config = new RecoEngineConfig();
        config.setScene(scene);
        config.setEnabled("1");
        config.setCfWeight(new BigDecimal("0.3300"));
        config.setCtrWeight(new BigDecimal("0.3300"));
        config.setCvrWeight(new BigDecimal("0.3400"));
        Date now = new Date();
        config.setCreateTime(now);
        config.setUpdateTime(now);
        this.save(config);
        return config;
    }

    @Override
    public String validateWeights(RecoEngineConfig config) {
        if (config.getCfWeight() == null || config.getCtrWeight() == null || config.getCvrWeight() == null) {
            return "权重不能为空";
        }
        if (config.getCfWeight().compareTo(BigDecimal.ZERO) < 0
                || config.getCtrWeight().compareTo(BigDecimal.ZERO) < 0
                || config.getCvrWeight().compareTo(BigDecimal.ZERO) < 0) {
            return "权重不能为负数";
        }
        BigDecimal total = config.getCfWeight().add(config.getCtrWeight()).add(config.getCvrWeight());
        if (total.subtract(BigDecimal.ONE).abs().compareTo(new BigDecimal("0.0001")) > 0) {
            return "权重和必须为1";
        }
        return null;
    }
}
