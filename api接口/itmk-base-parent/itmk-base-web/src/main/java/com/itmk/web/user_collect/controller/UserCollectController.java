package com.itmk.web.user_collect.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.itmk.utils.ResultUtils;
import com.itmk.utils.ResultVo;
import com.itmk.web.user_collect.entity.UserCollect;
import com.itmk.web.user_collect.service.UserCollectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @Author java实战基地
 * @Version 2383404558
 */
@RestController
@RequestMapping("/wxapi/collect")
public class UserCollectController {
    @Autowired
    private UserCollectService userCollectService;

    //收藏
    @PostMapping("/addCollect")
    public ResultVo addCollect(@RequestBody UserCollect userCollect){
        //查询是否收藏
        QueryWrapper<UserCollect> query = new QueryWrapper<>();
        query.lambda().eq(UserCollect::getGoodsId,userCollect.getGoodsId())
                .eq(UserCollect::getOpenid,userCollect.getOpenid());
        UserCollect one = userCollectService.getOne(query);
        if(one != null){
            return ResultUtils.error("您已经收藏该商品!");
        }
        if(userCollectService.save(userCollect)){
            return ResultUtils.success("收藏成功!");
        }
        return ResultUtils.error("收藏失败!");
    }

    @GetMapping("/list")
    public ResultVo getList(String openid){
        List<UserCollect> list = userCollectService.getList(openid);
        return ResultUtils.success("查询成功!",list);
    }
    @GetMapping("/hasCollect")
    public ResultVo hasCollect(UserCollect userCollect){
        QueryWrapper<UserCollect> query = new QueryWrapper<>();
        query.lambda().eq(UserCollect::getOpenid,userCollect.getOpenid())
        .eq(UserCollect::getGoodsId,userCollect.getGoodsId());
        UserCollect list = userCollectService.getOne(query);
        if(list != null){
            return ResultUtils.success("查询成功!","1");
        }else{
            return ResultUtils.success("查询成功!","0");
        }
    }

    //取消收藏
    @PostMapping("/cancelCollect")
    public ResultVo cancelCollect(@RequestBody UserCollect userCollect){
        //查询是否收藏
        QueryWrapper<UserCollect> query = new QueryWrapper<>();
        query.lambda().eq(UserCollect::getGoodsId,userCollect.getGoodsId())
                .eq(UserCollect::getOpenid,userCollect.getOpenid());
        if(userCollectService.remove(query)){
            return ResultUtils.success("取消收藏成功!");
        }else{
            return ResultUtils.error("取消收藏失败!");
        }
    }

    //删除收藏
    @PostMapping("/deleteCollect")
    public ResultVo deleteCollect(@RequestBody UserCollect userCollect){

        if(userCollectService.removeById(userCollect.getCollectId())){
            return ResultUtils.success("删除收藏成功!");
        }else{
            return ResultUtils.error("删除收藏失败!");
        }
    }
}
