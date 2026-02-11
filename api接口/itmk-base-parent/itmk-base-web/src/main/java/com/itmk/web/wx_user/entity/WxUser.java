package com.itmk.web.wx_user.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @Author java实战基地
 * @Version 2383404558
 */
@Data
@TableName("wx_user")
public class WxUser {
    @TableId
    private String openid;
    private String nickName;
    private String avatarUrl;
}
