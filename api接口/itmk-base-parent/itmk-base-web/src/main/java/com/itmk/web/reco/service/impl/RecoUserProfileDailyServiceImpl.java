package com.itmk.web.reco.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.itmk.web.reco.entity.RecoUserProfileDaily;
import com.itmk.web.reco.mapper.RecoUserProfileDailyMapper;
import com.itmk.web.reco.service.RecoUserProfileDailyService;
import org.springframework.stereotype.Service;

@Service
public class RecoUserProfileDailyServiceImpl extends ServiceImpl<RecoUserProfileDailyMapper, RecoUserProfileDaily> implements RecoUserProfileDailyService {
    @Override
    public RecoUserProfileDaily getLatestByOpenid(String openid) {
        QueryWrapper<RecoUserProfileDaily> query = new QueryWrapper<>();
        query.lambda()
                .eq(RecoUserProfileDaily::getOpenid, openid)
                .orderByDesc(RecoUserProfileDaily::getDt)
                .last("limit 1");
        return this.getOne(query);
    }
}
