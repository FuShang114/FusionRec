package com.itmk.web.goods.entity;


import com.itmk.web.goods_specs.entity.SysGoodsSpecs;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/**
 * @Author java实战基地
 * @Version 2383404558
 */
@Data
public class GoodsParm {
    private Long goodsId;
    private Long categoryId;
    private String goodsName;
    private String goodsImage;
    private String goodsDesc;
    private String status;
    private String goodsUnit;
    private String orderNum;
    private List<SysGoodsSpecs> specs = new ArrayList<>();
}