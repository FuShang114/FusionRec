package com.itmk.web.goods_comment.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.itmk.web.goods_comment.entity.CommentParm;
import com.itmk.web.goods_comment.entity.GoodsComment;
import java.util.List;

/**
 * @Author java实战基地
 * @Version 2383404558
 */
public interface GoodsCommentService extends IService<GoodsComment> {
    List<GoodsComment> commentList(Long goodsId);
    IPage<GoodsComment> getList(CommentParm parm);
}
