package com.itmk.web.goods.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.itmk.web.goods.entity.GoodsParm;
import com.itmk.web.goods.entity.SysGoods;

/**
 * @Author java实战基地
 * @Version 2383404558
 */
public interface SysGoodsService extends IService<SysGoods> {
    //保存
    void saveGoods(GoodsParm parm);
    //编辑
    void editGoods(GoodsParm parm);
    //删除
    void deleteGoods(Long goodsId);
}
