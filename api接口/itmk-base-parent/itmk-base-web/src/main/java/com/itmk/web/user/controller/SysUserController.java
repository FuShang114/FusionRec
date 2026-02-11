package com.itmk.web.user.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.google.code.kaptcha.impl.DefaultKaptcha;
import com.itmk.utils.ResultUtils;
import com.itmk.utils.ResultVo;
import com.itmk.web.user.entity.LoginPms;
import com.itmk.web.user.entity.LoginVos;
import com.itmk.web.user.entity.SysUser;
import com.itmk.web.user.entity.UserPageParm;
import com.itmk.web.user.service.SysUserService;
import com.itmk.web.wxapi.entity.LoginParm;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sun.misc.BASE64Encoder;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

/**
 * @Author java实战基地
 * @Version 2383404558
 */
@RestController
@RequestMapping("/api/user")
public class SysUserController {
    @Autowired
    private SysUserService sysUserService;
    @Autowired
    private DefaultKaptcha defaultKaptcha;

    //新增
    @PostMapping
    public ResultVo add(@RequestBody SysUser user) {
        //判断账户是否重复
        QueryWrapper<SysUser> query = new QueryWrapper<>();
        query.lambda().eq(SysUser::getUsername,user.getUsername()).eq(SysUser::getPassword,user.getPassword());
        SysUser one = sysUserService.getOne(query);
        if(one != null){
            return ResultUtils.error("用户账户和密码重复!");
        }
        if (sysUserService.save(user)) {
            return ResultUtils.success("新增成功!");
        }
        return ResultUtils.error("新增失败!");
    }

    //编辑
    @PutMapping
    public ResultVo edit(@RequestBody SysUser user) {
        if (sysUserService.updateById(user)) {
            return ResultUtils.success("编辑成功!");
        }
        return ResultUtils.error("编辑失败!");
    }

    //删除
    @DeleteMapping("/{userId}")
    public ResultVo delete(@PathVariable("userId") Long userId) {
        if (sysUserService.removeById(userId)) {
            return ResultUtils.success("删除成功!");
        }
        return ResultUtils.error("删除失败!");
    }

    //列表
    @GetMapping("/list")
    public ResultVo list(UserPageParm parm) {
        //构造分页
        IPage<SysUser> page = new Page<>(parm.getCurrentPage(), parm.getPageSize());
        //构造查询条件
        QueryWrapper<SysUser> query = new QueryWrapper<>();
        query.lambda().like(StringUtils.isNotEmpty(parm.getName()), SysUser::getName, parm.getName())
                .like(StringUtils.isNotEmpty(parm.getPhone()), SysUser::getPhone, parm.getPhone())
                .orderByAsc(SysUser::getName);
        IPage<SysUser> list = sysUserService.page(page, query);
        return ResultUtils.success("查询成功", list);
    }

    //生成验证码
    @PostMapping("/image")
    public ResultVo imageCode(HttpServletRequest request) {
        //生成验证码  6321
        String text = defaultKaptcha.createText();
        //把生成的验证码存到session里面
        HttpSession session = request.getSession();
        session.setAttribute("userCode", text);
        //生成图片,转换为base64
        BufferedImage bufferedImage = defaultKaptcha.createImage(text);
        ByteArrayOutputStream outputStream = null;
        try {
            outputStream = new ByteArrayOutputStream();
            ImageIO.write(bufferedImage, "jpg", outputStream);
            BASE64Encoder encoder = new BASE64Encoder();
            String base64 = encoder.encode(outputStream.toByteArray());
            String captchaBase64 = "data:image/jpeg;base64," + base64.replaceAll("\r\n", "");
            ResultVo result = new ResultVo("生成成功", 200, captchaBase64);
            return result;
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (outputStream != null) {
                    outputStream.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    //登录接口
    @PostMapping("/login")
    public ResultVo login(@RequestBody LoginPms parm, HttpServletRequest request) {
        //验证码验证
        HttpSession session = request.getSession();
        //从sesion里面获取session
        String userCode = (String) session.getAttribute("userCode");
        //code从前端传递过来的
        String code = parm.getCode();
        if (StringUtils.isEmpty(userCode)) {
            return ResultUtils.error("验证码过期!");
        }
        //对比验证码
        if (!userCode.equals(code)) {
            return ResultUtils.error("验证码错误!");
        }
        //用户查询
        QueryWrapper<SysUser> query = new QueryWrapper<>();
        query.lambda().eq(SysUser::getUsername, parm.getUsername())
                .eq(SysUser::getPassword, parm.getPassword());
        SysUser one = sysUserService.getOne(query);
        if (one == null) {
            return ResultUtils.error("用户名或者密码错误!");
        }

        LoginVos vo = new LoginVos();
        vo.setUserId(one.getUserId());
        vo.setNickName(one.getName());
        return ResultUtils.success("登录成功!", vo);
    }

}
