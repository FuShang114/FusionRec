package com.itmk.web.goods_comment.entity;

import lombok.Data;

/**
 * @Author java实战基地
 * @Version 2383404558
 */
@Data
public class CommentParm {
    private Integer currentPage; //当前页
    private Integer pageSize;//每页查询的条数
}
