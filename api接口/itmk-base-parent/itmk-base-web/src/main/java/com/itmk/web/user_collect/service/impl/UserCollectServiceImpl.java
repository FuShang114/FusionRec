package com.itmk.web.user_collect.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.itmk.web.user_collect.entity.UserCollect;
import com.itmk.web.user_collect.mapper.UserCollectMapper;
import com.itmk.web.user_collect.service.UserCollectService;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author java实战基地
 * @Version 2383404558
 */
@Service
public class UserCollectServiceImpl extends ServiceImpl<UserCollectMapper, UserCollect> implements UserCollectService {
    @Override
    public List<UserCollect> getList(String openid) {
        return this.baseMapper.getList(openid);
    }
}
