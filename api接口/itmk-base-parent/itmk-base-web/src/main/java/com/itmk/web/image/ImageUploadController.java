package com.itmk.web.image;

import com.itmk.utils.ResultUtils;
import com.itmk.utils.ResultVo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.UUID;

/**
 * @Author java实战基地
 * @Version 2383404558
 */
@RestController
@RequestMapping("/api/upload")
public class ImageUploadController {
    //图片上传的路径
    @Value("${web.uploadpath}")
    private String webUploadpath;

    @RequestMapping("/uploadImage")
    public ResultVo uploadImage(@RequestParam("file") MultipartFile file){
        String Url = "";
        String fileName = file.getOriginalFilename();
        //获取文件扩展名
        String fileExtenionName = fileName.substring(fileName.indexOf("."));
        //新的文件名
        String newName = UUID.randomUUID().toString()+fileExtenionName;
        String path = webUploadpath;
        File fileDir = new File(path);
        if(!fileDir.exists()){
            fileDir.mkdirs();
            //设置权限
            fileDir.setWritable(true);
        }
        File targetFile = new File(path,newName);
        try{
            file.transferTo(targetFile);
            Url = "/" + targetFile.getName();
        }catch (Exception e){
            return  null;
        }
        return ResultUtils.success("成功", "/images" + Url);
    }
}
