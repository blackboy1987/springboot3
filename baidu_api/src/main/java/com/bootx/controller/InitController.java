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
        FileListPojo fileListPojo = BaiDuUtils.fileList(token, dir);
        for (FileListPojo.ListDTO listDTO : fileListPojo.getList()) {
            if(listDTO.getCategory()==6){
                FileList fileList = fileListService.findByFsId(listDTO.getFsId());
                if(fileList==null){
                    fileList = new FileList();
                }
                fileList.setParent(fileListService.find(1L));
                fileList.setFsId(listDTO.getFsId());
                fileList.setFileName(listDTO.getServerFilename());
                fileList.setCategory(listDTO.getCategory());
                fileList.setPath(listDTO.getPath());
                fileList.setLocalMTime(listDTO.getLocalMtime());
                fileList.setLocalCTime(listDTO.getLocalCtime());
                fileList.setServerCTime(listDTO.getServerCtime());
                fileList.setServerMTime(listDTO.getServerMtime());
                fileList.setTreePath(null);
                fileList.setGrade(null);
                fileList.setChildren(new HashSet<>());
                if(fileList.isNew()){
                    fileListService.save(fileList);
                }else{
                    fileListService.update(fileList);
                }
                saveChildren(fileList,token);
            }
        }

        return Result.success(fileListPojo);
    }

    private void saveChildren(FileList fileList,String token) {
        FileListPojo fileListPojo = BaiDuUtils.fileList(token, fileList.getPath());
        for (FileListPojo.ListDTO listDTO : fileListPojo.getList()) {
            FileList child = fileListService.findByFsId(listDTO.getFsId());
            if(child==null){
                child = new FileList();
            }
            child.setParent(fileList);
            child.setFsId(listDTO.getFsId());
            child.setFileName(listDTO.getServerFilename());
            child.setCategory(listDTO.getCategory());
            child.setPath(listDTO.getPath());
            child.setLocalMTime(listDTO.getLocalMtime());
            child.setLocalCTime(listDTO.getLocalCtime());
            child.setServerCTime(listDTO.getServerCtime());
            child.setServerMTime(listDTO.getServerMtime());
            child.setTreePath(null);
            child.setGrade(null);
            if(child.getCategory()!=6){
                try {
                    String order = child.getFileName()
                            .replaceAll(".mp4", "")
                            .replaceAll("视频", ",")
                            .replaceAll("-", "")
                            .replaceAll("完", "")
                            .replaceAll("第", "")
                            .replaceAll("52短剧网(52duanju.com)-mp4juepinyishen", "")
                            .replaceAll("52短剧网(52duanju.com)", "")
                            .replaceAll("-", "");
                    Pattern pattern = Pattern.compile("[^0-9]");
                    Matcher matcher = pattern.matcher(order);
                    order = matcher.replaceAll("");
                    child.setOrder(Integer.valueOf(order));
                }catch (Exception e){
                    System.out.println(child.getId());
                }
            }
            child.setChildren(new HashSet<>());
            if(child.isNew()){
                fileListService.save(child);
            }else{
                fileListService.update(child);
            }

            if(child.getCategory()==6){
                saveChildren(child,token);
            }
        }



    }
}
