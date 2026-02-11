package com.itmk.web.wxapi.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.itmk.utils.ResultUtils;
import com.itmk.utils.ResultVo;
import com.itmk.web.category.entity.SysCategory;
import com.itmk.web.category.service.SysCategoryService;
import com.itmk.web.goods.entity.SysGoods;
import com.itmk.web.goods.service.SysGoodsService;
import com.itmk.web.goods_specs.entity.SysGoodsSpecs;
import com.itmk.web.goods_specs.service.SysGoodsSpecsService;
import com.itmk.web.sys_banner.entity.SysBanner;
import com.itmk.web.sys_banner.service.SysBannerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @Author java实战基地
 * @Version 2383404558
 */
@RestController
@RequestMapping("/wxapi/category")
public class WxCategoryController {
    @Autowired
    private SysGoodsService sysGoodsService;
    @Autowired
    private SysCategoryService sysCategoryService;
    @Autowired
    private SysGoodsSpecsService sysGoodsSpecsService;

    //分类数据
    @GetMapping("/getCategoryList")
    public ResultVo getCategoryList() {
        QueryWrapper<SysCategory> query = new QueryWrapper<>();
        query.lambda().orderByAsc(SysCategory::getOrderNum);
        List<SysCategory> list = sysCategoryService.list(query);
        if (list.size() > 0) {
            for (int i = 0; i < list.size(); i++) {
                //查询分类下面的菜品
                QueryWrapper<SysGoods> queryWrapper = new QueryWrapper<>();
                queryWrapper.lambda().eq(SysGoods::getCategoryId, list.get(i).getCategoryId())
                        .orderByAsc(SysGoods::getOrderNum);
                List<SysGoods> goods = sysGoodsService.list(queryWrapper);
                list.get(i).setGoods(goods);
                if (goods.size() > 0) {
                    for (int j = 0; j < goods.size(); j++) {
                        //查询价格
                        QueryWrapper<SysGoodsSpecs> queryWrapperPrice = new QueryWrapper<>();
                        queryWrapperPrice.lambda().eq(SysGoodsSpecs::getGoodsId, goods.get(j).getGoodsId())
                                .orderByAsc(SysGoodsSpecs::getOrderNum);
                        List<SysGoodsSpecs> specs = sysGoodsSpecsService.list(queryWrapperPrice);
                        goods.get(j).setSpecs(specs);
                    }
                }
            }
        }
        return ResultUtils.success("查询成功", list);
    }
}
