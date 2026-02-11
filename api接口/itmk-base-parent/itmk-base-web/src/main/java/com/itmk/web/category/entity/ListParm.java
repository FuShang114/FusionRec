package com.itmk.web.category.entity;

import lombok.Data;

/**
 * @Author java实战基地
 * @Version 2383404558
 */
@Data
public class ListParm {
    private Integer currentPage; //当前页
    private Integer pageSize;//每页查询的条数
    private String categoryName;
}
