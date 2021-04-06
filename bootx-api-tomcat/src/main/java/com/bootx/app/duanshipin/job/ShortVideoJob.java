package com.bootx.app.duanshipin.job;

import com.bootx.app.duanshipin.service.ShortVideoService;
import com.bootx.service.RedisService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Scheduled;

import javax.annotation.Resource;

@Configuration
public class ShortVideoJob {

    @Resource
    private ShortVideoService shortVideoService;

    @Resource
    private RedisService redisService;


    // @Scheduled(cron = "0 0/1 * * * ?")
    public void run (){
        Integer pageInt = 1;
        Integer count = 10;
        new Thread(()->{
            shortVideoService.sync(pageInt,count+ pageInt,"");
        }).start();
    }

    // @Scheduled(cron = "0 0/5 * * * ?")
    public void run1 (){
        // redisService.remove("videoId");
        long start = System.currentTimeMillis();
        String videoId = redisService.get("videoId");
        if(StringUtils.isBlank(videoId)){
            videoId="49158821";
        }
        for (int i=0;i<3000;i++) {
            shortVideoService.sync1(Long.valueOf(videoId)+i);
        }
        System.out.println((System.currentTimeMillis()-start)/1000);
    }

}
