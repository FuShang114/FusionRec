package com.itmk.web.reco.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.itmk.web.reco.entity.RecoTrainConfig;
import com.itmk.web.reco.mapper.RecoTrainConfigMapper;
import com.itmk.web.reco.service.RecoTrainConfigService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;

@Service
public class RecoTrainConfigServiceImpl extends ServiceImpl<RecoTrainConfigMapper, RecoTrainConfig> implements RecoTrainConfigService {
    @Override
    public RecoTrainConfig getOrInitByScene(String scene) {
        QueryWrapper<RecoTrainConfig> query = new QueryWrapper<>();
        query.lambda().eq(RecoTrainConfig::getScene, scene);
        RecoTrainConfig config = this.getOne(query);
        if (config != null) {
            return config;
        }
        Date now = new Date();
        RecoTrainConfig init = new RecoTrainConfig();
        init.setScene(scene);
        init.setEnabled("1");
        init.setTrainFrequency("DAILY");
        init.setAttrWeight(new BigDecimal("0.2000"));
        init.setConsumeWeight(new BigDecimal("0.3000"));
        init.setRatingWeight(new BigDecimal("0.3000"));
        init.setDishWeight(new BigDecimal("0.2000"));
        init.setCronExpr("0 0 2 * * ?");
        init.setNextRunTime(null);
        init.setRemark("");
        init.setCreateTime(now);
        init.setUpdateTime(now);
        this.save(init);
        return init;
    }
}
