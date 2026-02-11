package com.itmk.web.goods.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.itmk.web.goods.entity.GoodsParm;
import com.itmk.web.goods.entity.SysGoods;
import com.itmk.web.goods.mapper.SysGoodsMapper;
import com.itmk.web.goods.service.SysGoodsService;
import com.itmk.web.goods_specs.entity.SysGoodsSpecs;
import com.itmk.web.goods_specs.service.SysGoodsSpecsService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @Author java实战基地
 * @Version 2383404558
 */
@Service
public class SysGoodsServiceImpl extends ServiceImpl<SysGoodsMapper, SysGoods> implements SysGoodsService {
    @Autowired
    private SysGoodsSpecsService sysGoodsSpecsService;

    @Override
    @Transactional
    public void saveGoods(GoodsParm parm) {
        //1、保存菜品
        SysGoods goods = new SysGoods();
        BeanUtils.copyProperties(parm,goods);
        int insert = this.baseMapper.insert(goods);
        //2、保存规格、价格
        if(insert > 0){
            List<SysGoodsSpecs> specs = parm.getSpecs();
            for (int i = 0; i < specs.size(); i++) {
                //设置菜品id
                specs.get(i).setGoodsId(goods.getGoodsId());
            }
            //批量插入
            sysGoodsSpecsService.saveBatch(specs);
        }
    }

    @Override
    @Transactional
    public void editGoods(GoodsParm parm) {
        //1、保存菜品
        SysGoods goods = new SysGoods();
        BeanUtils.copyProperties(parm,goods);
        int insert = this.baseMapper.updateById(goods);
        //2、删除菜品原来的规格
        QueryWrapper<SysGoodsSpecs> query = new QueryWrapper<>();
        query.lambda().eq(SysGoodsSpecs::getGoodsId,parm.getGoodsId());
        sysGoodsSpecsService.remove(query);
        //3、保存规格、价格
        if(insert > 0){
            List<SysGoodsSpecs> specs = parm.getSpecs();
            for (int i = 0; i < specs.size(); i++) {
                //设置菜品id
                specs.get(i).setGoodsId(goods.getGoodsId());
            }
            //批量插入
            sysGoodsSpecsService.saveBatch(specs);
        }
    }

    @Override
    @Transactional
    public void deleteGoods(Long goodsId) {
        //删除菜品
        int i = this.baseMapper.deleteById(goodsId);
        //删除规格
        if(i >0){
            QueryWrapper<SysGoodsSpecs> query = new QueryWrapper<>();
            query.lambda().eq(SysGoodsSpecs::getGoodsId,goodsId);
            sysGoodsSpecsService.remove(query);
        }
    }
}
