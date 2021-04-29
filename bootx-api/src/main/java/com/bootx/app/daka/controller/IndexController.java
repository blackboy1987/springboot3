package com.bootx.app.daka.controller;

import com.bootx.app.daka.common.DaKaConfig;
import com.bootx.app.daka.entity.ClickRecord;
import com.bootx.app.daka.service.ClickRecordService;
import com.bootx.common.Result;
import com.bootx.entity.AdConfig;
import com.bootx.entity.App;
import com.bootx.entity.AppConfig;
import com.bootx.member.entity.Member;
import com.bootx.member.service.MemberService;
import com.bootx.service.AppService;
import com.bootx.service.RedisService;
import com.bootx.util.JWTUtils;
import com.bootx.util.JsonUtils;
import com.bootx.util.WebUtils;
import com.fasterxml.jackson.core.type.TypeReference;
import org.apache.commons.lang3.StringUtils;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController("daKaIndexController")
@RequestMapping("/api/daka")
public class IndexController {

    @Resource
    private AppService appService;
    @Resource
    private RedisService redisService;
    @Resource
    private JdbcTemplate jdbcTemplate;
    @Resource
    private MemberService memberService;
    @Resource
    private ClickRecordService clickRecordService;

    @PostMapping("/config")
    public Result config(HttpServletRequest request){
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
            app.setAppConfig(JsonUtils.toObject(JsonUtils.toJson(new DaKaConfig()),AppConfig.class));
        }else{
            data.put("config",app.getAppConfig());
        }
        // 订阅的模板
        data.put("profit_subscribe_id","profit_subscribe_id");
        // 今日打卡人数（all_num）
        data.put("allNum",jdbcTemplate.queryForObject("SELECT count(id) FROM member ORDER BY updateDate DESC LIMIT 5",Integer.class));
        // 今日打卡的用户（按照打卡时间逆序排列）
        data.put("clockUsers",jdbcTemplate.queryForList("SELECT avatarUrl FROM member ORDER BY updateDate DESC LIMIT 5"));
        return Result.success(data);
    }

    @PostMapping
    public Result post(HttpServletRequest request){

        String action = request.getParameter("action");
        App app = appService.get(request);
        if(app==null){
            return Result.error("非法访问");
        }

        Member member = memberService.get(request);
        Map<String,Object> data = new HashMap<>();
        if(StringUtils.equalsAnyIgnoreCase("friend",action)){
            List<Map<String, Object>> list = jdbcTemplate.queryForList("select nickName,avatarUrl from member where parent_id=?", member.getId());
            data.put("list",list);
        }
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
        String action = request.getParameter("action");
        App app = appService.get(request);
        if(app==null&&!StringUtils.equalsAnyIgnoreCase("login",action)){
            return Result.error("非法访问");
        }
        Member member = memberService.get(request);
        Map<String,Object> data = new HashMap<>();
        if(StringUtils.equalsAnyIgnoreCase("friend",action)){
            List<Map<String, Object>> list = jdbcTemplate.queryForList("select nickName,avatarUrl from member where parent_id=?", member.getId());
            data.put("list",list);
        }else if(StringUtils.equalsAnyIgnoreCase("login",action)){
            data.put("userInfo",login(request,app));
        }else if(StringUtils.equalsAnyIgnoreCase("home",action)){
            return config(request);
        }else if(StringUtils.equalsAnyIgnoreCase("sign",action)){
            data.putAll(sign(request,app));
        }else if(StringUtils.equalsAnyIgnoreCase("all",action)){
            // 总榜
            data.put("rank",jdbcTemplate.queryForList("SELECT avatarUrl,nickName,point FROM member ORDER BY point DESC"));
        }else if(StringUtils.equalsAnyIgnoreCase("today",action)){
            // 今日榜单
            data.put("rank",jdbcTemplate.queryForList("SELECT avatarUrl,nickName,point FROM member ORDER BY point DESC"));
        }
        return Result.success(data);
    }

    // 打卡
    private Map<String,Object> sign(HttpServletRequest request, App app) {
        Map<String,Object> data = new HashMap<>();
        Member member = memberService.get(request);
        if(member==null|| app == null || member.getAppId().compareTo(app.getId())!=0){
            data.put("code",-1);
            data.put("msg","非法访问");
            return data;
        }
        // 增加打开记录
        ClickRecord clickRecord = new ClickRecord();
        clickRecord.setMemberId(member.getId());
        clickRecordService.save(clickRecord);
        member.setUpdateDate(new Date());
        memberService.update(member);



        data.put("bd_img","https://bootx-xiaochengxu.oss-cn-hangzhou.aliyuncs.com/daka/2020-08-12%20122424.jpg?x-oss-process=style/60");
        data.put("status",2);
        data.put("info","打卡成功");
        return data;
    }

    public Map<String,Object> login(HttpServletRequest request,App app) {
        Map<String,Object> data = new HashMap<>();
        Member member = memberService.get(request);
        if(member==null|| app == null || member.getAppId().compareTo(app.getId())!=0){
            data.put("code",-1);
            data.put("msg","非法访问");
            return data;
        }
        String parentId = request.getParameter("parentId");
        String nickName = request.getParameter("nickName");
        String gender = request.getParameter("gender");
        String city = request.getParameter("city");
        String province = request.getParameter("province");
        String country = request.getParameter("country");
        String avatarUrl = request.getParameter("avatarUrl");
        member.setNickName(nickName);
        try {
            member.setGender(Integer.parseInt(gender));
        }catch (Exception ignored){}
        member.setCity(city);
        member.setProvince(province);
        member.setCountry(country);
        member.setAvatarUrl(avatarUrl);
        member.setIsAuth(true);
        if(StringUtils.isNotBlank(parentId)){
            try {
                member.setParent(memberService.find(Long.parseLong(parentId)));
            }catch (Exception ignored){}
        }
        memberService.update(member);
        return memberService.getData(member);
    }

    public Map<String,Object> home(HttpServletRequest request,App app) {
        Map<String,Object> data = new HashMap<>();
        Member member = memberService.get(request);
        if(member==null|| app == null || member.getAppId().compareTo(app.getId())!=0){
            data.put("code",-1);
            data.put("msg","非法访问");
            return data;
        }
        // 当前账号的打卡信息
        // 剩余打卡次数
        data.put("surplus",3);

        return data;
    }



    /**
     * 登录
     * @param request
     * @return
     */
    @GetMapping("/login")
    public Result login(HttpServletRequest request) {

        App app = appService.get(request);
        if(app==null){
            return Result.error("非法访问");
        }

        Map<String,Object> data = new HashMap<>();
        String url = "https://api.weixin.qq.com/sns/jscode2session";
        Map<String,String> params = new HashMap<>();
        params.put("appid",app.getAppId());
        params.put("secret",app.getAppSecret());
        params.put("js_code",request.getParameter("code"));
        params.put("grant_type","authorization_code");
        Map<String,String> result = JsonUtils.toObject(WebUtils.get1(url, params), new TypeReference<Map<String, String>>() {});

        Map<String,String> config = new HashMap<>();
        Long parentId = null;
        try {
            parentId = Long.valueOf(request.getParameter("parentId"));
        }catch (Exception ignored){

        }
        Member member = memberService.create(result,app,parentId,config);
        Map<String,Object> data1 = memberService.getData(member);
        data.putAll(data1);
        data.put("token", JWTUtils.create(member.getId()+"",data1));
        return Result.success(data);
    }

}
