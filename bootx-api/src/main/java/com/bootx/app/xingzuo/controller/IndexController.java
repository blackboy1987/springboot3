package com.bootx.app.xingzuo.controller;

import com.bootx.entity.AdConfig;
import com.bootx.entity.App;
import com.bootx.entity.AppAd;
import com.bootx.member.entity.Member;
import com.bootx.member.service.MemberService;
import com.bootx.service.AppService;
import com.bootx.util.JWTUtils;
import com.bootx.util.JsonUtils;
import com.bootx.util.WebUtils;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.type.TypeReference;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.Serializable;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

@RestController("apiXingZuoController")
@RequestMapping("/api/xingzuo")
public class IndexController {

    private static final String baseUrl="https://api.xzw.com/";

    @Resource
    private AppService appService;
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
        data.put("detail",appAd.get("detail"));

        return Result.success(data);
    }

    @GetMapping("/com/json/fortune")
    public String fortune(HttpServletRequest request){
        Map<String,Object> params = getPara(request);
        params.put("ld","-1");
        params.put("token","Mh8tGmSoW3fyH642Y+Eb3E");
        params.put("vc","xcx");
        String result = WebUtils.get(baseUrl + "com/json/fortune", params);
        return result;
    }

    @PostMapping("/common/session/sign_in")
    public Result signIn(HttpServletRequest request,String code){
        App app = appService.get(request);
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
        data.putAll(data1);
        data.put("code",200);
        data.put("token", JWTUtils.create(member.getId()+"",data1));
        return Result.success(data);
    }










    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Result implements Serializable {

        private Integer code;
        private Object data;
        private String message;

        public Integer getCode() {
            return code;
        }

        public void setCode(Integer code) {
            this.code = code;
        }

        public Object getData() {
            return data;
        }

        public void setData(Object data) {
            this.data = data;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        /**
         * 构造方法
         */
        public Result() {
        }

        public Result(Integer code, String message, Object data) {
            this.code = code;
            this.message = message;
            this.data = data;
        }

        public static Result success(Object data) {
            return new Result(0, "", data);
        }

        public static Result error(String msg) {
            return new Result(-1,msg, null);
        }
    }

    private Map<String, Object> getPara(HttpServletRequest request) {
        Map<String,Object> params = new HashMap<>();
        Enumeration<String> parameterNames = request.getParameterNames();
        while (parameterNames.hasMoreElements()){
            String key = parameterNames.nextElement();
            params.put(key,request.getParameter(key));
        }
        return params;
    }
}
