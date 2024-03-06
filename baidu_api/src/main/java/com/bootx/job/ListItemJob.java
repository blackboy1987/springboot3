package com.bootx.job;

import com.bootx.entity.FileList;
import com.bootx.pojo.FileListPojo;
import com.bootx.service.BaiDuAccessTokenService;
import com.bootx.service.FileListService;
import com.bootx.util.BaiDuUtils;
import com.bootx.util.JsonUtils;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author black
 */
@Component
public class ListItemJob {

    @Resource
    private BaiDuAccessTokenService baiDuAccessTokenService;

    @Resource
    private FileListService fileListService;

    @Value("${fsId}")
    private Long fsId;

    //@Scheduled(fixedRate = 1000*60*60*24*20)
    public void run(){
        String token = baiDuAccessTokenService.getToken();
        FileListPojo fileListPojo = BaiDuUtils.fileList(token, "/");
        System.out.println(JsonUtils.toJson(fileListPojo));
        List<FileListPojo.ListDTO> list = fileListPojo.getList();
        for (FileListPojo.ListDTO listDTO : list) {
            fileListService.create(listDTO,null);
        }
    }

    //@Scheduled(fixedRate = 1000*60*60*24*20)
    public void run1(){
        FileList parent = fileListService.findByFsId(fsId);
        if(parent != null){
            String token = baiDuAccessTokenService.getToken();
            FileListPojo fileListPojo = BaiDuUtils.fileList(token, parent.getPath());
            List<FileListPojo.ListDTO> list = fileListPojo.getList();
            for (FileListPojo.ListDTO listDTO : list) {
                FileList fileList = fileListService.create(listDTO, parent);
                if(fileList.getCategory()==6){
                    fileListService.saveChildren(fileList,token);
                }
            }
        }
    }
}
