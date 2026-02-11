package com.itmk.web.user.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @Author java实战基地
 * @Version 2383404558
 */
@Data
@TableName("sys_user")
public class SysUser {
    @TableId(type= IdType.AUTO)
    private Long userId;
    private String username;
    private String password;
    private String phone;
    private String email;
    private String sex;
    private String name;
}
