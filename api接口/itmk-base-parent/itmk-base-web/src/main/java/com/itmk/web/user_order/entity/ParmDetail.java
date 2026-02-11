package com.itmk.web.user_order.entity;

import lombok.Data;

import java.math.BigDecimal;

/**
 * @Author java实战基地
 * @Version 2383404558
 */
@Data
public class ParmDetail {
    private Long goodsId;
    private String goodsImage;
    private String goodsName;
    private String goodsUnit;
    private String specsName;
    private BigDecimal price;
    private Integer num;
}