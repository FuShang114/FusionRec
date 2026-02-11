package com.itmk.web.reco.dto;

import com.itmk.web.goods_specs.entity.SysGoodsSpecs;
import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
public class RecoListItemDto {
    private Long goodsId;
    private String goodsName;
    private String goodsImage;
    private String goodsDesc;
    private String goodsUnit;
    private BigDecimal score;
    private Integer rankNo;
    private List<SysGoodsSpecs> specs = new ArrayList<>();
}
