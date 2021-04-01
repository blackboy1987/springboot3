package com.bootx.app.zhaocha.controller;

import com.bootx.app.zhaocha.Result;
import com.bootx.entity.App;
import com.bootx.member.entity.Member;
import com.bootx.member.service.MemberService;
import com.bootx.service.AppService;
import com.bootx.util.JWTUtils;
import com.bootx.util.JsonUtils;
import com.bootx.util.WebUtils;
import com.fasterxml.jackson.core.type.TypeReference;
import org.apache.commons.lang3.StringUtils;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

@RestController("apiZhaoChaIndexController")
@RequestMapping("/api/zhaocha")
public class IndexController {

    private static final String BASE_URL = "https://www.love2021.cn/app/index.php";

    @Resource
    private JdbcTemplate jdbcTemplate;

    @Resource
    private AppService appService;

    @Resource
    private MemberService memberService;

    @GetMapping
    public Object get(HttpServletRequest request){
        App app = appService.get(request);
        if(app==null){
            return JsonUtils.toJson(Result.error("非法请求"));
        }
        return doPara(request);
    }

    @PostMapping
    public Object post(HttpServletRequest request){
        App app = appService.get(request);
        if(app==null){
            return JsonUtils.toJson(Result.error("非法请求"));
        }
        return doPara(request);
    }

    private Object doPara(HttpServletRequest request) {
        String doPara = request.getParameter("do");

        if(StringUtils.equalsAnyIgnoreCase("config",doPara)){
            return WebUtils.get(BASE_URL,getPara(request));
        }
        if(StringUtils.equalsAnyIgnoreCase("residue_time",doPara)){
            return residueTime(request);
        }
        if(StringUtils.equalsAnyIgnoreCase("login",doPara)){
            return login(request.getParameter("code"),request);
        }
        if(StringUtils.equalsAnyIgnoreCase("start_game",doPara)){
            return startGame(request);
        }
        if(StringUtils.equalsAnyIgnoreCase("config",doPara)){
            return WebUtils.get(BASE_URL,getPara(request));
        }
        return WebUtils.get(BASE_URL,getPara(request));
    }

    private Result startGame(HttpServletRequest request) {
        Map<String,Object> data = new HashMap<>();
        String question = jdbcTemplate.queryForObject("select content from zhaocha.ims_yf_zhaocha_level where id = 100;", String.class);
        data.put("question",question);
        return Result.success(data);

    }

    private String residueTime(HttpServletRequest request) {
        App app = appService.get(request);
        Member member = memberService.get(request);
        Map<String,Object> data = new HashMap<>();
        if(member==null||app==null|| !member.getAppId().equals(app.getId())){
            data.put("msg","请重新登录");
            return JsonUtils.toJson(Result.success(data));
        }

        data.put("residue_time",100);
        data.put("value",100);
        data.put("money",member.getBalance());
        data.put("ticket",5);
        data.put("gold",10);
        data.put("service_flag",true);
        data.put("share_flag",true);
        data.put("help_flag",true);
        data.put("rank_img","https://www.love2021.cn/attachment//aaa_zhaocha_resource/images//rank/rank17.png");
        data.put("rank_name_img","超强王者");
        data.put("value_name","完成关卡2");
        data.put("rank",17);
        data.put("will_title","倔犟寒铁");
        return JsonUtils.toJson(Result.success(data));

    }

    private String login(String code, HttpServletRequest request) {
        Map<String,Object> data = new HashMap<>();
        String url = "https://api.weixin.qq.com/sns/jscode2session";
        App app = appService.get(request);
        System.out.println(JsonUtils.toJson(app));
        if(app==null){
            return JsonUtils.toJson(Result.error("非法请求"));
        }
        Map<String,String> params = new HashMap<>();
        params.put("appid",app.getAppId());
        params.put("secret",app.getAppSecret());
        params.put("js_code",code);
        params.put("grant_type","authorization_code");
        System.out.println(JsonUtils.toJson(app));
        Map<String,String> result = JsonUtils.toObject(WebUtils.get1(url, params), new TypeReference<Map<String, String>>() {});
        Long scene = null;
        try {
            String inviter_id = request.getParameter("inviter_id");
            scene = Long.parseLong(inviter_id);
        }catch (Exception e){
            e.printStackTrace();
        }
        System.out.println(JsonUtils.toJson(app));
        System.out.println(JsonUtils.toJson(appService.find(app.getId())));
        Member member = memberService.create(result,app,scene);
        Map<String,Object> data1 = memberService.getData(member);
        data.put("user_info",data1);
        data.put("openId",member.getOpenId());
        data.put("uid",member.getId());
        data.put("residue_time",100);
        data.put("value",100);
        data.put("money",member.getBalance());
        data.put("ticket",5);
        data.put("gold",10);
        data.put("service_flag",true);
        data.put("share_flag",true);
        data.put("help_flag",true);
        data.put("rank_img","https://www.love2021.cn/attachment//aaa_zhaocha_resource/images//rank/rank17.png");
        data.put("rank_name_img","超强王者");
        data.put("value_name","完成关卡2");
        data.put("rank",17);
        data.put("will_title","倔犟寒铁");
        data.put("code",200);
        data.put("token", JWTUtils.create(member.getId()+"",data1));
        return JsonUtils.toJson(data);
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
