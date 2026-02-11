package com.itmk.web.reco.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.itmk.web.reco.entity.RecoEngineConfig;

public interface RecoEngineConfigService extends IService<RecoEngineConfig> {
    RecoEngineConfig getOrInitByScene(String scene);
    String validateWeights(RecoEngineConfig config);
}
