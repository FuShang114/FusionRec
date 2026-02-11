package com.itmk.web.goods_comment.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.itmk.utils.ResultUtils;
import com.itmk.utils.ResultVo;
import com.itmk.web.goods_comment.entity.CommentParm;
import com.itmk.web.goods_comment.entity.GoodsComment;
import com.itmk.web.goods_comment.service.GoodsCommentService;
import com.itmk.web.user_order_detail.entity.UserOrderDetail;
import com.itmk.web.user_order_detail.service.UserOrderDetailService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @Author java实战基地
 * @Version 2383404558
 */
@RestController
@RequestMapping("/wxapi/comment")
public class GoodsCommentController {
    @Autowired
    private GoodsCommentService goodsCommentService;
    @Resource
    private UserOrderDetailService userOrderDetailService;
    //新增评论
    @PostMapping("/addComment")
    public ResultVo addComment(@RequestBody GoodsComment goodsComment){
        //根据订单id查询商品
        QueryWrapper<UserOrderDetail> query = new QueryWrapper<>();
        query.lambda().eq(UserOrderDetail::getOrderId,goodsComment.getOrderId());
        List<UserOrderDetail> list = userOrderDetailService.list(query);
        List<GoodsComment> goodsCommentList = new ArrayList<>();
        if(list.size() >0){
            for (int i=0;i<list.size();i++){
                GoodsComment goodsC = new GoodsComment();
                BeanUtils.copyProperties(goodsComment,goodsC);
                goodsC.setCreateTime(new Date());
                goodsC.setGoodsId(list.get(i).getGoodsId());
                goodsCommentList.add(goodsC);
            }
        }
        //批量插入
        goodsCommentService.saveBatch(goodsCommentList);
        return ResultUtils.success("评论成功!");
    }

    //小程序评论列表
    @GetMapping("/commentList")
    public ResultVo commentList(Long goodsId){
        List<GoodsComment> list = goodsCommentService.commentList(goodsId);
        return ResultUtils.success("查询成功",list);
    }
    //pc列表查询
    @GetMapping("/pcCommentList")
    public ResultVo pcCommentList(CommentParm parm){
        IPage<GoodsComment> list = goodsCommentService.getList(parm);
        return ResultUtils.success("查询成功",list);
    }

    //删除
    @DeleteMapping("/{commentId}")
    public ResultVo delete(@PathVariable("commentId") Long commentId){
        goodsCommentService.removeById(commentId);
        return ResultUtils.success("删除成功!");
    }
}
