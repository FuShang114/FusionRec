package com.itmk.web.goods_comment.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.itmk.web.goods_comment.entity.GoodsComment;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @Author java实战基地
 * @Version 2383404558
 */
public interface GoodsCommentMapper extends BaseMapper<GoodsComment> {
    List<GoodsComment> commentList(@Param("goodsId") Long goodsId);
    IPage<GoodsComment> getList(Page<GoodsComment> page);
}
