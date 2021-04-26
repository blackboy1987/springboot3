package com.bootx.app.pince.controller;

import com.bootx.common.Result;
import com.bootx.entity.AdConfig;
import com.bootx.entity.App;
import com.bootx.entity.AppAd;
import com.bootx.service.AppService;
import com.bootx.service.RedisService;
import com.bootx.util.DateUtils;
import com.bootx.util.JsonUtils;
import com.bootx.util.WebUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

@RestController("pinceIndexController")
@RequestMapping("/api/pince")
public class IndexController {

    private static final String apiUrl="https://pingtas.qq.com/pingd";

    private static final String url1="https://qc1.qq.itwlw.com";

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
        data.put("name",app.getAppName());
        AppAd appAd = new AppAd();
        Map<String, AdConfig> ads = new HashMap<>();
        AdConfig adConfig = new AdConfig();
        adConfig.setBannerId("adunit-090ca0df5b0c4b32");
        adConfig.setRewardedVideoAdId("adunit-371bd79d00078a90");
        adConfig.setInterstitialAdId("adunit-bd3d4cbec78fdf97");
        adConfig.setVideoAdId("adunit-33c30621be64ff71");
        adConfig.setVideoFrontAdId("adunit-ef4637cc787de087");
        adConfig.setGridAdId("adunit-f26ade6249502c6a");
        adConfig.setNativeAdId("adunit-e93eada4f72d2341");
        ads.put("index",adConfig);

        AdConfig adConfig1 = new AdConfig();
        adConfig1.setBannerId("adunit-090ca0df5b0c4b32");
        adConfig1.setRewardedVideoAdId("adunit-371bd79d00078a90");
        adConfig1.setInterstitialAdId("adunit-bd3d4cbec78fdf97");
        adConfig1.setVideoAdId("adunit-33c30621be64ff71");
        adConfig1.setVideoFrontAdId("adunit-ef4637cc787de087");
        adConfig1.setGridAdId("adunit-f26ade6249502c6a");
        adConfig1.setNativeAdId("adunit-e93eada4f72d2341");
        ads.put("detail",adConfig1);

        appAd.setAds(ads);
        data.put("indexAd",appAd.get("index"));
        data.put("detailAd",appAd.get("detail"));
        data.put("logo",app.getLogo());

        return Result.success(data);
    }

    @RequestMapping(value = "/index.php/App/Index/{method}", method = {RequestMethod.GET,RequestMethod.POST})
    public Object IndexMethod(HttpServletRequest request,@PathVariable String method){
        App app = appService.get(request);
        if(app==null){
            return Result.error("非法访问");
        }
        Enumeration<String> names = request.getParameterNames();
        Map<String,Object> params = new HashMap<>();
        while (names.hasMoreElements()){
            String name = names.nextElement();
            String value = request.getParameter(name);
            params.put(name,value);
        }

        return WebUtils.get(url1+"/index.php/App/Index/"+method,params);
    }

    @RequestMapping(value = "/index.php/App/index/{method}", method = {RequestMethod.GET,RequestMethod.POST})
    public Object indexMethod(HttpServletRequest request,@PathVariable String method){
        App app = appService.get(request);
        if(app==null){
            return Result.error("非法访问");
        }
        Enumeration<String> names = request.getParameterNames();
        Map<String,Object> params = new HashMap<>();
        while (names.hasMoreElements()){
            String name = names.nextElement();
            String value = request.getParameter(name);
            params.put(name,value);
        }

        return WebUtils.get(url1+"/index.php/App/index/"+method,params);
    }

    @RequestMapping(value = "/index.php/Wetest/Entry/{method}", method = {RequestMethod.POST})
    public Object getresult(HttpServletRequest request, @PathVariable String method){
        App app = appService.get(request);
        if(app==null){
            return Result.error("非法访问");
        }
        Enumeration<String> names = request.getParameterNames();
        Map<String,Object> params = new HashMap<>();
        while (names.hasMoreElements()){
            String name = names.nextElement();
            String value = request.getParameter(name);
            params.put(name,value);
        }
        return WebUtils.get(url1+"/index.php/Wetest/Entry/"+method,params);
    }
}
