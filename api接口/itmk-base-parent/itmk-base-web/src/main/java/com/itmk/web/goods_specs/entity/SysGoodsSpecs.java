package com.itmk.web.goods_specs.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.math.BigDecimal;

/**
 * @Author java实战基地
 * @Version 2383404558
 */
@Data
@TableName("sys_goods_specs")
public class SysGoodsSpecs {
    @TableId(type = IdType.AUTO)
    private Long specsId;
    private Long goodsId;
    private String specsName;
    private BigDecimal goodsPrice;
    private Integer orderNum;
}
