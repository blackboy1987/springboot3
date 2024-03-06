package com.bootx.controller;

import com.bootx.common.Result;
import com.bootx.entity.FileList;
import com.bootx.pojo.BaiDuAccessToken;
import com.bootx.pojo.FileListPojo;
import com.bootx.service.BaiDuAccessTokenService;
import com.bootx.service.FileListService;
import com.bootx.util.BaiDuUtils;
import jakarta.annotation.Resource;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author black
 */
@RestController
@RequestMapping("/init")
public class InitController {

    @Resource
    private BaiDuAccessTokenService baiDuAccessTokenService;

    @Resource
    private FileListService fileListService;

    @GetMapping("/getToken")
    public Result getToken(){
        BaiDuAccessToken token = BaiDuUtils.getToken();
        com.bootx.entity.BaiDuAccessToken baiDuAccessToken = new com.bootx.entity.BaiDuAccessToken();
        BeanUtils.copyProperties(token,baiDuAccessToken);
        baiDuAccessTokenService.save(baiDuAccessToken);
        return Result.success();
    }
    @GetMapping("/all")
    public Result all(){
        return Result.success(baiDuAccessTokenService.findAll());
    }

    @GetMapping("/refreshToken")
    public Result refreshToken(){
        List<com.bootx.entity.BaiDuAccessToken> all = baiDuAccessTokenService.findAll();
        com.bootx.entity.BaiDuAccessToken baiDuAccessToken1 = all.get(all.size() - 1);
        BaiDuAccessToken token = BaiDuUtils.refreshToken(baiDuAccessToken1.getRefreshToken());
        if(StringUtils.isBlank(token.getAccessToken())){
            return Result.error(token.getError()+":"+token.getErrorDescription());
        }
        com.bootx.entity.BaiDuAccessToken baiDuAccessToken = new com.bootx.entity.BaiDuAccessToken();
        BeanUtils.copyProperties(token,baiDuAccessToken);
        baiDuAccessTokenService.save(baiDuAccessToken);
        return Result.success(baiDuAccessToken);
    }


    @GetMapping("/file")
    public Result file(String dir) {
        String token = baiDuAccessTokenService.getToken();
        FileListPojo fileListPojo = BaiDuUtils.fileList(token, "/shortVideo");
        for (FileListPojo.ListDTO listDTO : fileListPojo.getList()) {
            if(listDTO.getCategory()==6){
                FileList fileList = fileListService.create(listDTO, fileListService.find(1L));
                fileListService.saveChildren(fileList,token);
            }
        }

        return Result.success(fileListPojo);
    }
}
