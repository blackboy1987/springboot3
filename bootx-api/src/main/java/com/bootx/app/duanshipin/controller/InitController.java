package com.bootx.app.duanshipin.controller;

import com.bootx.app.duanshipin.service.ShortVideoChannelService;
import com.bootx.app.duanshipin.service.ShortVideoService;
import com.bootx.common.Result;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController("shortVideoInitController")
@RequestMapping("/api/short_video/init")
public class InitController {

    @Resource
    private ShortVideoService shortVideoService;

    @Resource
    private ShortVideoChannelService shortVideoChannelService;


    @GetMapping
    public Result category(Integer start, Integer end,String categoryId){
        shortVideoService.sync(start,end,categoryId);

        return Result.error("ok");

    }
}
