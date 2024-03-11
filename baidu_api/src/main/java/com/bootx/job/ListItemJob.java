package com.bootx.job;

import com.bootx.pojo.FileListPojo;
import com.bootx.service.BaiDuAccessTokenService;
import com.bootx.service.FileListService;
import com.bootx.util.BaiDuUtils;
import jakarta.annotation.Resource;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * @author black
 */
@Component
public class ListItemJob {

    @Resource
    private BaiDuAccessTokenService baiDuAccessTokenService;

    @Resource
    private FileListService fileListService;

    @Scheduled(fixedRate = 1000*60*60*20)
    public void run0(){
        String token = baiDuAccessTokenService.getToken();
        FileListPojo fileListPojo = BaiDuUtils.fileList(token, "/", null);
        fileListService.batchCreate(fileListPojo, null);
        fileListPojo.getList().forEach(list -> {
            fileListService.batchSaveChildren(list,token);
        });
    }
}
