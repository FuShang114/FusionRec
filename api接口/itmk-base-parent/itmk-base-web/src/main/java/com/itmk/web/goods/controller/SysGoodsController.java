package com.itmk.web.goods.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.itmk.utils.ResultUtils;
import com.itmk.utils.ResultVo;
import com.itmk.web.category.entity.SelectType;
import com.itmk.web.category.entity.SysCategory;
import com.itmk.web.goods.entity.GoodsParm;
import com.itmk.web.goods.entity.ListParm;
import com.itmk.web.goods.entity.SysGoods;
import com.itmk.web.goods.service.SysGoodsService;
import com.itmk.web.goods_specs.entity.SysGoodsSpecs;
import com.itmk.web.goods_specs.service.SysGoodsSpecsService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * @Author java实战基地
 * @Version 2383404558
 */
@RestController
@RequestMapping("/api/goods")
public class SysGoodsController {
    @Autowired
    private SysGoodsService sysGoodsService;
    @Autowired
    private SysGoodsSpecsService sysGoodsSpecsService;

    //新增
    @PostMapping
    public ResultVo add(@RequestBody GoodsParm parm){
        sysGoodsService.saveGoods(parm);
        return ResultUtils.success("新增成功!");
    }

    //编辑
    @PutMapping
    public ResultVo edit(@RequestBody GoodsParm parm){
        sysGoodsService.editGoods(parm);
        return ResultUtils.success("编辑成功!");
    }
    //删除
    @DeleteMapping("/{goodsId}")
    public ResultVo delete(@PathVariable("goodsId") Long goodsId){
        sysGoodsService.deleteGoods(goodsId);
        return ResultUtils.success("删除成功!");
    }
    //列表
    @GetMapping("/list")
    public ResultVo getList(ListParm parm){
        //构造分页对象
        IPage<SysGoods> page = new Page<>(parm.getCurrentPage(),parm.getPageSize());
        //构造查询条件
        QueryWrapper<SysGoods> query = new QueryWrapper<>();
        query.lambda().like(StringUtils.isNotEmpty(parm.getGoodsName()),SysGoods::getGoodsName,parm.getGoodsName())
                .orderByDesc(SysGoods::getOrderNum);
        IPage<SysGoods> list = sysGoodsService.page(page, query);
        if(list.getRecords().size() > 0){
            for (int i = 0; i < list.getRecords().size(); i++) {
            QueryWrapper<SysGoodsSpecs> queryWrapper = new QueryWrapper<>();
            queryWrapper.lambda().eq(SysGoodsSpecs::getGoodsId,list.getRecords().get(i).getGoodsId())
                    .orderByAsc(SysGoodsSpecs::getOrderNum);
                List<SysGoodsSpecs> specs = sysGoodsSpecsService.list(queryWrapper);
                list.getRecords().get(i).setSpecs(specs);
            }
        }
        return ResultUtils.success("查询成功",list);
    }

    //列表
    @GetMapping("/getSelectList")
    public ResultVo getSelectList(){
        List<SysGoods> list = sysGoodsService.list();
        //组装为前端下拉选择器需要的数据格式
        List<SelectType> selectList = new ArrayList<>();
        Optional.ofNullable(list).orElse(new ArrayList<>())
                .stream()
                .forEach(item ->{
                    SelectType type = new SelectType();
                    type.setLabel(item.getGoodsName());
                    type.setValue(item.getGoodsId());
                    selectList.add(type);
                });
        return ResultUtils.success("查询成功!",selectList);
    }
}
