package com.itmk.web.goods_comment.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

/**
 * @Author java实战基地
 * @Version 2383404558
 */
@Data
@TableName("goods_comment")
public class GoodsComment {
    @TableId(type = IdType.AUTO)
    private Long commentId;
    private Long goodsId;
    @TableField(exist = false)
    private Long orderId;
    private String openid;
    private String commentText;
    @TableField(exist = false)
    private String nickName;
    @TableField(exist = false)
    private String avatarUrl;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Date createTime;
    @TableField(exist = false)
    private String goodsName;
    @TableField(exist = false)
    private String goodsImage;
}
