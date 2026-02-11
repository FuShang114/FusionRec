package com.itmk.web.category.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.itmk.web.goods.entity.SysGoods;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/**
 * @Author java实战基地
 * @Version 2383404558
 */
@Data
@TableName("sys_category")
public class SysCategory {
    @TableId(type= IdType.AUTO)
    private Long categoryId;
    private String categoryName;
    private Integer orderNum;
    @TableField(exist = false)
    private List<SysGoods> goods = new ArrayList<>();
}
