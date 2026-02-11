package com.itmk.web.user_order.entity;

import lombok.Data;

/**
 * @Author java实战基地
 * @Version 2383404558
 */
@Data
public class WxOrderParm {
    private String openid;
    private String type;
    private Long currentPage;
    private Long pageSize;
    private String userName;
}
