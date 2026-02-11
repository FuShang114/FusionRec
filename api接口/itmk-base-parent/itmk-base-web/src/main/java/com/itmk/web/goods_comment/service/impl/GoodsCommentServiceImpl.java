package com.itmk.web.goods_comment.service.impl;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.itmk.web.goods_comment.entity.CommentParm;
import com.itmk.web.goods_comment.entity.GoodsComment;
import com.itmk.web.goods_comment.mapper.GoodsCommentMapper;
import com.itmk.web.goods_comment.service.GoodsCommentService;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author java实战基地
 * @Version 2383404558
 */
@Service
public class GoodsCommentServiceImpl extends ServiceImpl<GoodsCommentMapper, GoodsComment> implements GoodsCommentService {
    @Override
    public List<GoodsComment> commentList(Long goodsId) {
        return this.baseMapper.commentList(goodsId);
    }

    @Override
    public IPage<GoodsComment> getList(CommentParm parm) {
        //构造分页对象
        Page<GoodsComment> page = new Page<>(parm.getCurrentPage(),parm.getPageSize());
        return this.baseMapper.getList(page);
    }
}
