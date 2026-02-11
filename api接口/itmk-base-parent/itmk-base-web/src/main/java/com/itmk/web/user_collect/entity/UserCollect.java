package com.itmk.web.user_collect.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @Author java实战基地
 * @Version 2383404558
 */
@Data
@TableName("user_collect")
public class UserCollect {
    @TableId(type = IdType.AUTO)
    private Long collectId;
    private String openid;
    @TableField(exist = false)
    private String goodsName;
    @TableField(exist = false)
    private String goodsImage;
    private Long goodsId;
}
