package com.itmk.web.reco.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.itmk.web.reco.entity.RecoUserProfileDaily;

public interface RecoUserProfileDailyService extends IService<RecoUserProfileDaily> {
    RecoUserProfileDaily getLatestByOpenid(String openid);
}

