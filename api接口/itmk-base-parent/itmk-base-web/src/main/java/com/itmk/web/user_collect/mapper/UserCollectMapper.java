package com.itmk.web.user_collect.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.itmk.web.user_collect.entity.UserCollect;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @Author java实战基地
 * @Version 2383404558
 */
public interface UserCollectMapper extends BaseMapper<UserCollect> {
    List<UserCollect> getList(@Param("openid") String openid);
}
