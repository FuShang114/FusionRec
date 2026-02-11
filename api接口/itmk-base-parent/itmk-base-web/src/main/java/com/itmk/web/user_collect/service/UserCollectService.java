package com.itmk.web.user_collect.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.itmk.web.user_collect.entity.UserCollect;


import java.util.List;

/**
 * @Author java实战基地
 * @Version 2383404558
 */
public interface UserCollectService extends IService<UserCollect> {
    List<UserCollect> getList(String openid);
}
