package com.itmk.web.wxapi.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.itmk.utils.ResultUtils;
import com.itmk.utils.ResultVo;
import com.itmk.web.goods.entity.SysGoods;
import com.itmk.web.goods.service.SysGoodsService;
import com.itmk.web.goods_specs.entity.SysGoodsSpecs;
import com.itmk.web.goods_specs.service.SysGoodsSpecsService;
import com.itmk.web.sys_banner.entity.SysBanner;
import com.itmk.web.sys_banner.service.SysBannerService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.BeanUtils;
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
@RequestMapping("/api/home")
public class HomeController {
    @Autowired
    private SysBannerService sysBannerService;
    @Autowired
    private SysGoodsService sysGoodsService;
    @Autowired
    private SysGoodsSpecsService sysGoodsSpecsService;

    //首页轮播图
    @GetMapping("/getSwipperList")
    public ResultVo getSwipperList(){
        QueryWrapper<SysBanner> query = new QueryWrapper<>();
        query.lambda().eq(SysBanner::getStatus,"1");
        List<SysBanner> list = sysBannerService.list(query);
        if(list.size() > 0){
            for (int i=0;i<list.size();i++){
                if(StringUtils.isNotEmpty(list.get(i).getGoodsId().toString())){
                    //查询商品
                    SysGoods goods = sysGoodsService.getById(list.get(i).getGoodsId());
                    list.get(i).setSysGoods(goods);
                    //查询价格
                QueryWrapper<SysGoodsSpecs> queryWrapper = new QueryWrapper<>();
                queryWrapper.lambda().eq(SysGoodsSpecs::getGoodsId,list.get(i).getGoodsId())
                        .orderByAsc(SysGoodsSpecs::getOrderNum);
                List<SysGoodsSpecs> specs = sysGoodsSpecsService.list(queryWrapper);
                list.get(i).getSysGoods().setSpecs(specs);
                }
            }
        }
        return ResultUtils.success("查询成功",list);
    }

    //首页热推
    @GetMapping("/getHotList")
    public ResultVo getHotList(){
        QueryWrapper<SysGoods> query = new QueryWrapper<>();
        query.lambda().eq(SysGoods::getStatus,"1")
                .orderByAsc(SysGoods::getOrderNum);
        List<SysGoods> list = sysGoodsService.list(query);
        if(list.size() > 0){
            for (int i = 0; i < list.size(); i++) {
                //查询价格
                QueryWrapper<SysGoodsSpecs> queryWrapper = new QueryWrapper<>();
                queryWrapper.lambda().eq(SysGoodsSpecs::getGoodsId,list.get(i).getGoodsId())
                        .orderByAsc(SysGoodsSpecs::getOrderNum);
                List<SysGoodsSpecs> specs = sysGoodsSpecsService.list(queryWrapper);
                list.get(i).setSpecs(specs);
            }
        }
        return ResultUtils.success("查询成功",list);
    }
}
