package com.itmk.web.user_order.entity;

import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * @Author java实战基地
 * @Version 2383404558
 */
@Data
public class Echarts {
    private List<String> names = new ArrayList<>();
    private List<BigDecimal> values = new ArrayList<>();
}
