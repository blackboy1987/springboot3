package com.bootx.controller.admin;

import com.bootx.common.Result;
import com.bootx.entity.App;
import com.bootx.service.AppService;
import com.bootx.util.UploadUtils;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.UUID;

@RestController("fileController")
@RequestMapping("/admin/api/file")
public class FileController {

    private final String[] extensions = new String[]{
            "png","jpg"
    };

    @Resource
    private AppService appService;

    @PostMapping("/upload")
    public Result upload(HttpServletRequest request, MultipartFile file,String name,String appId) throws IOException {
        App app = appService.get(request);
        if(app==null||app.getIsExpired()){
            return Result.error("非法访问");
        }
        if(file==null){
            return Result.error("文件不存在");
        }
        String extension = FilenameUtils.getExtension(file.getOriginalFilename());
        if(!checkFileType(file.getOriginalFilename())){
            return Result.error("仅允许上传png和jpg图片");
        }
        if(StringUtils.isBlank(name)){
            return Result.error("参数错误");
        }
        File tempFile = new File(FileUtils.getTempDirectory(), UUID.randomUUID() + ".tmp");
        file.transferTo(tempFile);
        String path = app.getAppId()+"/"+name+"."+extension;
        if(StringUtils.isNotBlank(appId)){
            path = appId+"/"+name+"."+extension;
        }
        UploadUtils.upload(tempFile,path);
        return Result.success(UploadUtils.getUrl(path));
    }

    private boolean checkFileType(String name) {
        String extension = FilenameUtils.getExtension(name);
        return ArrayUtils.contains(extensions,extension);
    }

}
