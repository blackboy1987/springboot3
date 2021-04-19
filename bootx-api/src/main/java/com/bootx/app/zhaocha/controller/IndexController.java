package com.bootx.app.zhaocha.controller;

import com.bootx.app.zhaocha.entity.Level;
import com.bootx.app.zhaocha.entity.Rank;
import com.bootx.app.zhaocha.service.LevelService;
import com.bootx.app.zhaocha.service.RankService;
import com.bootx.entity.App;
import com.bootx.entity.AppConfig;
import com.bootx.member.entity.Member;
import com.bootx.member.service.MemberService;
import com.bootx.service.AppService;
import com.bootx.service.RedisService;
import com.bootx.util.JWTUtils;
import com.bootx.util.JsonUtils;
import com.bootx.util.WebUtils;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.type.TypeReference;
import org.apache.commons.lang3.StringUtils;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.Serializable;
import java.util.*;

@RestController("apiZhaoChaIndexController")
@RequestMapping("/api/zhaocha")
public class IndexController {

    @Resource
    private JdbcTemplate jdbcTemplate;

    @Resource
    private AppService appService;

    @Resource
    private MemberService memberService;
    @Resource
    private RedisService redisService;
    @Resource
    private LevelService levelService;
    @Resource
    private RankService rankService;

    /**
     * get请求
     * @param request
     * @return
     */
    @GetMapping
    public Result get(HttpServletRequest request){
        App app = appService.get(request);
        if(app==null){
            return Result.error(-1,"非法请求");
        }
        return doPara(request);
    }

    /**
     * post请求
     * @param request
     * @return
     */
    @PostMapping
    public Result post(HttpServletRequest request){
        App app = appService.get(request);
        if(app==null){
            return Result.error(-1,"非法请求");
        }
        return doPara(request);
    }

    private Result doPara(HttpServletRequest request) {
        String doPara = request.getParameter("do");
        App app = appService.get(request);
        System.out.println("======================"+doPara);
        // 小程序配置
        if(StringUtils.equals(doPara,"config")){
            return Result.success(getConfig(app));
        }
        if(StringUtils.equals(doPara,"login")){
            return Result.success(login(getPara(request),app));
        }
        if(StringUtils.equals(doPara,"send")){
            return Result.success(send(getPara(request),app,request));
        }
        if(StringUtils.equals(doPara,"start_game")){
            return Result.success(startGame(getPara(request),app,request));
        }
        if(StringUtils.equals(doPara,"user_authorization")){
            return Result.success(userAuthorization(getPara(request),app));
        }
        if(StringUtils.equals(doPara,"game_win")){
            return Result.success(gameWin(getPara(request),app,request));
        }
        if(StringUtils.equals(doPara,"use_gold_reminder")){
            return Result.success(useGoldReminder(getPara(request),app));
        }
        if(StringUtils.equals(doPara,"residue_time")){
            return residueTime(getPara(request),app, request);
        }


        return Result.error(-1,"非法请求");

    }

    private Map<String,Object> useGoldReminder(Map<String, Object> para, App app) {
        Map<String,Object> data = new HashMap<>();




        return data;
    }

    private Map<String,Object> gameWin(Map<String, Object> para, App app,HttpServletRequest request) {
        AppConfig appConfig = app.getAppConfig();
        String reward = appConfig.getConfig().get("reward")+"";
        Map<String,Object> data = new HashMap<>();
        Member member = memberService.get(request);
        member.setLevel(member.getLevel()+1);
        member.setTicket(member.getTicket()-1);
        // 获取到当前所处会员等级得id和级别id
        Map<String, String> config = member.getConfig();

        Level currentLevel = levelService.findByLevel(member.getLevel());
        Rank currentRank = rankService.findByRank(member.getRank());
        Rank nextRank = rankService.findByRank(currentRank.getRank()+1);
        if(currentLevel.getRankUp()>0){
            currentRank = nextRank;
            config.put("rank",nextRank.getRank()+"");
            nextRank = rankService.findByRank(currentRank.getRank()+1);
        }
        memberService.update(member);

        data.put("will_title","还差"+(nextRank.getLevel()-member.getLevel())+"升级到"+nextRank.getName());
        data.put("rank",currentRank.getName());
        data.put("rank_up",currentLevel.getRankUp());
        data.put("addgold","addgold");
        data.put("gold",member.getGold());
        data.put("sign_alert","sign_alert");
        data.put("rank_img",currentRank.getImg());
        data.put("rank_name_img",currentRank.getRankImg());
        // data.put("reward","0.05");


        return data;
    }

    private Map<String,Object> userAuthorization(Map<String, Object> para, App app) {
        Map<String,Object> data = new HashMap<>();




        return data;
    }

    private Map<String,Object> send(Map<String, Object> para, App app,HttpServletRequest request) {
        Map<String,Object> data = new HashMap<>();
        //ticket 减1



        return data;
    }

    private Map<String,Object> getConfig(App app) {
        try{
            return JsonUtils.toObject(redisService.get("app_config_" + app.getId()), new TypeReference<Map<String,Object>>() {
            });
        }catch (Exception e){
            Map<String, Object> config = app.getAppConfig().getConfig();
            config.putIfAbsent("share_title",app.getAppName());
            defaultConfig(config);
            app.getAppConfig().setConfig(config);
            // appService.update(app);
            redisService.set("app_config_" + app.getId(),JsonUtils.toJson(config));
            return config;
        }
    }

    private Map<String,Object> startGame(Map<String, Object> para, App app,HttpServletRequest request) {
        Map<String,Object> data = new HashMap<>();
        Member member = memberService.get(request);
        Integer level = 1;

        try{
            level = Integer.parseInt(member.getConfig().get("level"));
            level = level+1;
        }catch (Exception e){
            member.getConfig().put("level","1");
        }
        String s = redisService.get("zhaocha_levle_" + level);
        try {
            List<Level.Layer> layers = JsonUtils.toObject(s, new TypeReference<List<Level.Layer>>() {
            });
            data.put("status",1);
            data.put("question",layers);
            data.put("value",level);
        }catch (Exception e){
            Level level1 = levelService.findByLevel(level);
            List<Level.Layer> layers = level1.getContent();
            layers.forEach(item->item.setUrl("https://img.i-gomall.com"+item.getUrl()));
            data.put("question",layers);
            data.put("status",1);
            data.put("value",level);
            redisService.set("zhaocha_levle_" + level,JsonUtils.toJson(layers));
        }

        return data;

    }

    private Result residueTime(Map<String, Object> para, App app,HttpServletRequest request) {
        Member member = memberService.get(request);
        Map<String, String> config = member.getConfig();
        Map<String,Object> data = new HashMap<>();
        if(app == null || !member.getAppId().equals(app.getId())){
            data.put("msg","请重新登录");
            return Result.success(data);
        }

        data.put("residue_time",100);
        data.put("value",100);
        data.put("money",member.getBalance());
        data.put("ticket",member.getTicket());
        data.put("gold",member.getGold());
        data.put("service_flag",true);
        data.put("share_flag",true);
        data.put("help_flag",true);
        data.putAll(getRankTips(member));
        data.put("rank",member.getRank());
        return Result.success(data);

    }



    private Map<String,Object> login(Map<String,Object> params,App app) {
        Map<String,Object> data = new HashMap<>();
        String url = "https://api.weixin.qq.com/sns/jscode2session";
        Map<String,String> params1 = new HashMap<>();
        params1.put("appid",app.getAppId());
        params1.put("secret",app.getAppSecret());
        params1.put("js_code",params.get("code")+"");
        params1.put("grant_type","authorization_code");
        Map<String,String> result = JsonUtils.toObject(WebUtils.get1(url, params1), new TypeReference<Map<String, String>>() {});
        Long scene = null;
        try {
            String inviter_id = params.get("inviter_id")+"";
            scene = Long.parseLong(inviter_id);
        }catch (Exception e){
            e.printStackTrace();
        }
        Map<String,String> memberDefaultConfig = memberDefaultConfig(app);
        Member member = memberService.create(result,app,scene,memberDefaultConfig);
        Map<String, String> config = member.getConfig();
        Map<String,Object> data1 = memberService.getData(member);
        data.put("uid",member.getId());
        data.put("customs",0);
        data.put("token", JWTUtils.create(member.getId()+"",data1));
        data.put("ticket",member.getTicket());
        data.put("value",100);
        data.put("first_login",true);
        data.put("service_flag",true);
        data.put("noticeCard",true);
        data.put("open_sound",true);
        data.put("nickname",member.getNickName());
        data.put("avatarurl",member.getAvatarUrl());
        data.put("gold",member.getGold());
        data.put("is_add",true);
        data.put("money",member.getBalance());
        data.put("value_name","完成关卡2");
        data.put("rank",member.getRank());
        data.putAll(getRankTips(member));
        data.put("is_userinfo",member.getIsAuth());
        data.put("sign_alert",1);
        return data;
    }

    private Map<String, String> memberDefaultConfig(App app) {
        Map<String, String> config = new HashMap<>();
        config.put("level","0");
        config.put("rank","1");
        config.put("gold","0");
        config.put("ticket",app.getAppConfig().get("ticket_max")+"");
        return config;
    }


    private Map<String, Object> defaultConfig(Map<String, Object> config){
        config.putIfAbsent("ticket_max", 7);

        config.putIfAbsent("ticket_time",600);
        config.putIfAbsent("is_share",0);
        config.putIfAbsent("game_time",100);
        config.putIfAbsent("down_time",20);
        config.putIfAbsent("share_img","https://bz.wmwi.cn/attachment/images/179/2021/04/l4bA7R225E5R14I45RaY4SsiB122SR.png");
        config.putIfAbsent("service_img","https://bz.wmwi.cn/attachment/yf_zhaocha_resource/images/service_img.png");
        config.putIfAbsent("service_title","点击领取");
        config.putIfAbsent("use_gold",10);
        config.putIfAbsent("ad_show",0);
        config.putIfAbsent("moregame", Collections.emptyList());
        config.putIfAbsent("leftMoreGame",Collections.emptyList());
        config.putIfAbsent("rightMoreGame",Collections.emptyList());
        config.putIfAbsent("rank_list",jdbcTemplate.queryForList("select rank,img,name,title,rankImg FROM zhaocha_rank order by rank desc"));
        config.putIfAbsent("share_long_time",Collections.emptyList());
        config.putIfAbsent("share_sys",Collections.emptyList());
        config.putIfAbsent("share_lt_time_title",Collections.emptyList());
        Map<String,String> adunit = new HashMap<>();
        adunit.put("banner","adunit-a4adb65f38865163");
        adunit.put("chaping","adunit-3284d2cf6538ce36");
        adunit.put("video","adunit-6c9d16daebe9ca88");
        config.putIfAbsent("adunit",adunit);
        config.putIfAbsent("close_service",0);
        config.putIfAbsent("hook",0);
        config.putIfAbsent("color1","");
        config.putIfAbsent("color2","");
        Map<String,Object> rewards = new HashMap<>();
        rewards.put("open",0);
        rewards.put("unit","元");
        rewards.put("max_unit",30);
        rewards.put("img","https://bz.wmwi.cn/attachment/");
        rewards.put("msg","满30元开启");



        config.putIfAbsent("goldRewards","2:1,4:1");
        config.putIfAbsent("rewards",rewards);
        /**
         * 1: 骗审
         * 2：审核通过
         */
        config.putIfAbsent("yf_show",2);
        config.putIfAbsent("yf_show_image","https://bz.wmwi.cn/attachment/images/179/2021/04/y1lnStJ30LT89lzN2jlcj4GNXtj00l.png");

        return config;
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


    private Map<String, Object> getRankTips(Member member) {
        Map<String, String> config = member.getConfig();
        Map<String,Object> data = new HashMap<>();
        try {
            Rank currentRank = rankService.findByRank(member.getRank());
            Rank nextRank = rankService.findByRank(member.getRank()+1);
            data.put("will_title","还差"+(nextRank.getLevel()-member.getLevel())+"升级到"+nextRank.getName());
            data.put("rank_img",currentRank.getImg());
            data.put("rank_name_img",currentRank.getRankImg());
            data.put("value_name",currentRank.getName());
        }catch (Exception ignored){
            Rank currentRank = rankService.findByRank(member.getRank());
            Rank nextRank = rankService.findByRank(member.getRank());
            data.put("will_title","还差"+(nextRank.getLevel()-member.getLevel())+"升级到"+nextRank.getName());
            data.put("rank_img",currentRank.getImg());
            data.put("rank_name_img",currentRank.getRankImg());
            data.put("value_name",currentRank.getName());
        }

        return data;
    }


    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Result implements Serializable {

        private Integer code;
        private Object data;
        private String msg;

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

        public String getMsg() {
            return msg;
        }

        public void setMsg(String msg) {
            this.msg = msg;
        }

        /**
         * 构造方法
         */
        public Result() {
        }

        public Result(Integer code, String msg, Object data) {
            this.code = code;
            this.msg = msg;
            this.data = data;
        }

        public static Result success(Object data) {
            return new Result(200, "", data);
        }

        public static Result error(Integer code, String msg) {
            return new Result(code, msg, null);
        }
    }
}
