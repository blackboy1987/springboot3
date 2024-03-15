package com.bootx.job;

import com.bootx.service.BaiDuAccessTokenService;
import com.bootx.service.FileListService;
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
        fileListService.create("/shortVideo");
    }
}
