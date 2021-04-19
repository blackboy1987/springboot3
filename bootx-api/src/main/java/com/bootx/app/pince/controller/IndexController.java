package com.bootx.app.pince.controller;

import com.bootx.common.Result;
import com.bootx.entity.AdConfig;
import com.bootx.entity.App;
import com.bootx.entity.AppAd;
import com.bootx.service.AppService;
import com.bootx.util.JsonUtils;
import com.bootx.util.WebUtils;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController("pinceIndexController")
@RequestMapping("/api/pince")
public class IndexController {

    private static final String url="https://api.xzw.com/com/json/";

    @Resource
    private AppService appService;

    @PostMapping("/config")
    public Result category(HttpServletRequest request){
        App app = appService.get(request);
        if(app==null){
            return Result.error("非法访问");
        }
        Map<String,Object> data = new HashMap<>();
        data.put("name",app.getAppName());
        AppAd appAd = new AppAd();
        Map<String, AdConfig> ads = new HashMap<>();
        AdConfig adConfig = new AdConfig();
        adConfig.setBannerId("adunit-4813ca1eefbf6332");
        adConfig.setGridAdId("adunit-a85526b59a3e4fc6");
        adConfig.setInterstitialAdId("adunit-aaaa125d434975d9");
        adConfig.setNativeAdId("adunit-670041da19853877");
        adConfig.setRewardedVideoAdId("adunit-2b255eac86508a8a");
        adConfig.setVideoAdId("adunit-4305a9dcb9e86fd4");
        adConfig.setVideoFrontAdId("adunit-f16e0fcee13d3f3a");
        ads.put("index",adConfig);

        AdConfig adConfig1 = new AdConfig();
        adConfig1.setBannerId("adunit-4813ca1eefbf6332");
        adConfig1.setGridAdId("adunit-a85526b59a3e4fc6");
        adConfig1.setInterstitialAdId("adunit-aaaa125d434975d9");
        adConfig1.setNativeAdId("adunit-670041da19853877");
        adConfig1.setRewardedVideoAdId("adunit-2b255eac86508a8a");
        adConfig1.setVideoAdId("adunit-4305a9dcb9e86fd4");
        adConfig1.setVideoFrontAdId("adunit-f16e0fcee13d3f3a");
        ads.put("detail",adConfig1);

        appAd.setAds(ads);
        data.put("indexAd",appAd.get("index"));
        data.put("detailAd",appAd.get("detail"));

        return Result.success(data);
    }

    @GetMapping("/fortune")
    public Object fortune(HttpServletRequest request,Integer id){
        App app = appService.get(request);
        if(app==null){
            return Result.error("非法访问");
        }
        String s = WebUtils.get(url+"fortune?id="+id+"&ld=-1&vc=xcx&token=Mh8tGmSoW3fyH642Y+Eb3E", null);
        return s;
    }
}
