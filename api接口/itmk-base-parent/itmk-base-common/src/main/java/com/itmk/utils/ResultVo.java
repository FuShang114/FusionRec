package com.itmk.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @Author java实战基地
 * @Version 2383404558
 */
@Data //自动生成get和set方法
@AllArgsConstructor
@NoArgsConstructor
public class ResultVo<T> {
    private String msg;
    private int code;
    private T data;

    public ResultVo(String msg, int code, Object data) {
        this.msg = msg;
        this.code = code;
        this.data = (T) data;
    }
}