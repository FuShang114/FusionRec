package com.itmk.web.reco.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.itmk.web.reco.entity.RecoTrainConfig;

public interface RecoTrainConfigService extends IService<RecoTrainConfig> {
    RecoTrainConfig getOrInitByScene(String scene);
}
