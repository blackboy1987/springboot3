package com.bootx.app.daka;

import com.bootx.common.Result;
import com.bootx.entity.AdConfig;
import com.bootx.entity.App;
import com.bootx.entity.AppAd;
import com.bootx.entity.AppConfig;
import com.bootx.service.AppService;
import com.bootx.service.RedisService;
import com.bootx.util.WebUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

@RestController("daKaIndexController")
@RequestMapping("/api/daka")
public class IndexController {

    @Resource
    private AppService appService;
    @Resource
    private RedisService redisService;

    @PostMapping("/config")
    public Result category(HttpServletRequest request){
        App app = appService.get(request);
        if(app==null){
            return Result.error("非法访问");
        }
        Map<String,Object> data = new HashMap<>();
        AdConfig adConfig = new AdConfig();
        adConfig.setBannerId("adunit-090ca0df5b0c4b32");
        adConfig.setRewardedVideoAdId("adunit-371bd79d00078a90");
        adConfig.setInterstitialAdId("adunit-bd3d4cbec78fdf97");
        adConfig.setVideoAdId("adunit-33c30621be64ff71");
        adConfig.setVideoFrontAdId("adunit-ef4637cc787de087");
        adConfig.setGridAdId("adunit-f26ade6249502c6a");
        adConfig.setNativeAdId("adunit-e93eada4f72d2341");
        data.put("ads",adConfig);
        data.put("logo",app.getLogo());
        data.put("name",app.getAppName());
        AppConfig appConfig = app.getAppConfig();
        if(appConfig==null){
            data.put("config",new DaKaConfig());
        }else{
            data.put("config",app.getAppConfig());
        }

        return Result.success(data);
    }

    @PostMapping
    public Result post(HttpServletRequest request){

        String action = request.getParameter("do");

        App app = appService.get(request);
        if(app==null){
            return Result.error("非法访问");
        }
        Map<String,Object> data = new HashMap<>();
        AdConfig adConfig = new AdConfig();
        adConfig.setBannerId("adunit-090ca0df5b0c4b32");
        adConfig.setRewardedVideoAdId("adunit-371bd79d00078a90");
        adConfig.setInterstitialAdId("adunit-bd3d4cbec78fdf97");
        adConfig.setVideoAdId("adunit-33c30621be64ff71");
        adConfig.setVideoFrontAdId("adunit-ef4637cc787de087");
        adConfig.setGridAdId("adunit-f26ade6249502c6a");
        adConfig.setNativeAdId("adunit-e93eada4f72d2341");
        data.put("ads",adConfig);
        data.put("logo",app.getLogo());
        data.put("name",app.getAppName());
        AppConfig appConfig = app.getAppConfig();
        if(appConfig==null){
            data.put("config",new DaKaConfig());
        }else{
            data.put("config",app.getAppConfig());
        }
        return Result.success(data);
    }
    @GetMapping
    public Result get(HttpServletRequest request){
        String action = request.getParameter("do");
        App app = appService.get(request);
        if(app==null){
            return Result.error("非法访问");
        }
        Map<String,Object> data = new HashMap<>();
        AdConfig adConfig = new AdConfig();
        adConfig.setBannerId("adunit-090ca0df5b0c4b32");
        adConfig.setRewardedVideoAdId("adunit-371bd79d00078a90");
        adConfig.setInterstitialAdId("adunit-bd3d4cbec78fdf97");
        adConfig.setVideoAdId("adunit-33c30621be64ff71");
        adConfig.setVideoFrontAdId("adunit-ef4637cc787de087");
        adConfig.setGridAdId("adunit-f26ade6249502c6a");
        adConfig.setNativeAdId("adunit-e93eada4f72d2341");
        data.put("ads",adConfig);
        data.put("logo",app.getLogo());
        data.put("name",app.getAppName());
        AppConfig appConfig = app.getAppConfig();
        if(appConfig==null){
            data.put("config",new DaKaConfig());
        }else{
            data.put("config",app.getAppConfig());
        }
        return Result.success(data);
    }

}
