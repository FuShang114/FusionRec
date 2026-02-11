package com.itmk.web.goods.entity;


import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.itmk.web.goods_specs.entity.SysGoodsSpecs;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/**
 * @Author java实战基地
 * @Version 2383404558
 */
@Data
@TableName("sys_goods")
public class SysGoods {
    @TableId(type = IdType.AUTO)
    private Long goodsId;
    private Long categoryId;
    private String goodsName;
    private String goodsImage;
    private String goodsDesc;
    private String status;
    private String goodsUnit;
    private String orderNum;
    //表明specs字段不在sys_goods表里面，需要排除
    @TableField(exist = false)
    List<SysGoodsSpecs> specs = new ArrayList<>();
}