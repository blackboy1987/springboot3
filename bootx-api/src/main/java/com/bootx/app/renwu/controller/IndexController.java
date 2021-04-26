package com.bootx.app.renwu.controller;

import com.bootx.app.renwu.service.WorkService;
import com.bootx.common.Pageable;
import com.bootx.common.Result;
import com.bootx.entity.AdConfig;
import com.bootx.entity.AppAd;
import com.bootx.entity.App;
import com.bootx.member.entity.Member;
import com.bootx.member.service.MemberService;
import com.bootx.service.AppService;
import com.bootx.util.JWTUtils;
import com.bootx.util.JsonUtils;
import com.bootx.util.WebUtils;
import com.fasterxml.jackson.core.type.TypeReference;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

@RestController("renwuIndexController")
@RequestMapping("/api/renwu")
public class IndexController {


    @Resource
    private AppService appService;
    @Resource
    private WorkService workService;
    @Resource
    private MemberService memberService;

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


    @PostMapping("/login")
    public Result category(HttpServletRequest request,String code){
        com.bootx.entity.App app = appService.get(request);
        if(app==null){
            return Result.error("非法访问");
        }
        Map<String,Object> data = new HashMap<>();
        String url = "https://api.weixin.qq.com/sns/jscode2session";
        Map<String,String> params = new HashMap<>();
        params.put("appid",app.getAppId());
        params.put("secret",app.getAppSecret());
        params.put("js_code",code);
        params.put("grant_type","authorization_code");
        Map<String,String> result = JsonUtils.toObject(WebUtils.get1(url, params), new TypeReference<Map<String, String>>() {});

        Map<String,String> config = new HashMap<>();
        Member member = memberService.create(result,app,null,config);
        Map<String,Object> data1 = memberService.getData(member);
        data.put("userInfo",data1);
        data.put("code",200);
        data.put("token", JWTUtils.create(member.getId()+"",data1));
        return Result.success(data);
    }

    @PostMapping("/list")
    public Result list(HttpServletRequest request, Pageable pageable,Integer type){
        com.bootx.entity.App app = appService.get(request);
        if(app==null){
            return Result.error("非法访问");
        }
        return Result.success(workService.findPage(pageable));
    }



    @PostMapping("/entry/wxapp/{method}")
    public String method(HttpServletRequest request){
        Enumeration<String> names = request.getParameterNames();
        Map<String,Object> params = new HashMap<>();
        while (names.hasMoreElements()){
            String name = names.nextElement();
            String value = request.getParameter(name);
            params.put(name,value);
        }
        return WebUtils.post("https://www.zhonganping.com/app/index.php",params);
    }
}
