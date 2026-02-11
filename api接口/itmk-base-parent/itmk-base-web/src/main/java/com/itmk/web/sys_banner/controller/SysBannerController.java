package com.itmk.web.sys_banner.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.itmk.utils.ResultUtils;
import com.itmk.utils.ResultVo;
import com.itmk.web.sys_banner.entity.BannerParm;
import com.itmk.web.sys_banner.entity.SysBanner;
import com.itmk.web.sys_banner.service.SysBannerService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @Author java实战基地
 * @Version 2383404558
 */
@RestController
@RequestMapping("/api/banner")
public class SysBannerController {
    @Autowired
    private SysBannerService sysBannerService;

    //新增
    @PostMapping
    public ResultVo add(@RequestBody SysBanner sysBanner){
        if(sysBannerService.save(sysBanner)){
            return ResultUtils.success("新增成功!");
        }
        return ResultUtils.error("新增失败!");
    }

    //编辑
    @PutMapping
    public ResultVo edit(@RequestBody SysBanner sysBanner){
        if(sysBannerService.updateById(sysBanner)){
            return ResultUtils.success("编辑成功!");
        }
        return ResultUtils.error("编辑失败!");
    }

    //删除
    @DeleteMapping("/{banId}")
    public ResultVo delete(@PathVariable("banId") Long banId){
        if(sysBannerService.removeById(banId)){
            return ResultUtils.success("删除成功!");
        }
        return ResultUtils.error("删除失败!");
    }

    //列表
    @GetMapping("/list")
    public ResultVo list(BannerParm parm){
        //构造分页对象
        IPage<SysBanner> page = new Page<>(parm.getCurrentPage(),parm.getPageSize());
        //构造查询条件
        QueryWrapper<SysBanner> query = new QueryWrapper<>();
        query.lambda().like(StringUtils.isNotEmpty(parm.getTitle()),SysBanner::getTitle,parm.getTitle());
        IPage<SysBanner> list = sysBannerService.page(page, query);
        return ResultUtils.success("查询成功",list);
    }

}
