package com.bootx.app.daka.controller;

import com.bootx.app.daka.common.DaKaConfig;
import com.bootx.app.daka.entity.ClickRecord;
import com.bootx.app.daka.entity.ProductCategory;
import com.bootx.app.daka.service.ClickRecordService;
import com.bootx.app.daka.service.OrderService;
import com.bootx.app.daka.service.ProductCategoryService;
import com.bootx.app.daka.service.ProductService;
import com.bootx.common.Result;
import com.bootx.entity.AdConfig;
import com.bootx.entity.App;
import com.bootx.entity.AppConfig;
import com.bootx.entity.BaseEntity;
import com.bootx.member.entity.Member;
import com.bootx.member.entity.PointLog;
import com.bootx.member.service.MemberService;
import com.bootx.service.AppService;
import com.bootx.service.RedisService;
import com.bootx.util.DateUtils;
import com.bootx.util.JWTUtils;
import com.bootx.util.JsonUtils;
import com.bootx.util.WebUtils;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.core.type.TypeReference;
import org.apache.commons.lang3.StringUtils;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.*;

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
    @Resource
    private ProductCategoryService productCategoryService;
    @Resource
    private ProductService productService;
    @Resource
    private OrderService orderService;

    @PostMapping("/config")
    public Result config(HttpServletRequest request){
        App app = appService.get(request);
        if(app==null){
            return Result.error("非法访问");
        }
        Map<String,Object> data = new HashMap<>();
        AdConfig adConfig = new AdConfig();
        adConfig.setBannerId("adunit-5b0f059b101f9db3");
        adConfig.setRewardedVideoAdId("adunit-47ed54439d22d0ec");
        adConfig.setInterstitialAdId("adunit-9a5a00c59d1ecaa4");
        adConfig.setVideoAdId("adunit-8ee7c94a4a1e3c35");
        adConfig.setVideoFrontAdId("adunit-c8b28705e1687108");
        adConfig.setGridAdId("adunit-a122e02d80caa68e");
        adConfig.setNativeAdId("adunit-a122e02d80caa68e");
        data.put("ads",adConfig);
        data.put("logo",app.getLogo());
        data.put("name",app.getAppName());
        data.put("status",app.getStatus());
        AppConfig appConfig = app.getAppConfig();
        if(appConfig==null||appConfig.getConfig()==null||appConfig.getConfig().size()==0){
            data.put("config",new DaKaConfig());
            app.setAppConfig(JsonUtils.toObject(JsonUtils.toJson(new DaKaConfig()),AppConfig.class));
        }else{
            data.put("config",app.getAppConfig());
        }
        // 订阅的模板

        data.put("profit_subscribe_id","profit_subscribe_id");
        Date beginDate = DateUtils.getBeginDay(new Date());
        Date endDate = DateUtils.getEndDay(new Date());
        // 今日打卡人数（all_num）
        String sql="SELECT count(id) FROM member WHERE updateDate is NOT NULL AND point>0 and appId="+app.getId()+" AND updateDate>='"+DateUtils.formatDateToString(beginDate,"yyyy-MM-dd HH:mm:ss")+"' AND updateDate<='"+DateUtils.formatDateToString(endDate,"yyyy-MM-dd HH:mm:ss")+"'";
        System.out.println(sql);

        data.put("allNum",jdbcTemplate.queryForObject(sql,Integer.class));
        // 今日打卡的用户（按照打卡时间逆序排列）
        data.put("clockUsers",jdbcTemplate.queryForList("SELECT avatarUrl FROM member WHERE updateDate is NOT NULL AND point>0 and appId="+app.getId()+" AND updateDate>='"+DateUtils.formatDateToString(beginDate,"yyyy-MM-dd HH:mm:ss")+"' AND updateDate<='"+DateUtils.formatDateToString(endDate,"yyyy-MM-dd HH:mm:ss")+"' ORDER BY updateDate DESC LIMIT 5"));
        return Result.success(data);
    }

    @GetMapping
    @JsonView({BaseEntity.ListView.class})
    public Result get(HttpServletRequest request){
        // 今日榜单
        Date beginDate = DateUtils.getBeginDay(new Date());
        Date endDate = DateUtils.getEndDay(new Date());
        String action = request.getParameter("action");
        System.out.println("===================="+action);
        App app = appService.get(request);
        if(app==null&&!StringUtils.equalsAnyIgnoreCase("login",action)){
            return Result.error("非法访问");
        }
        Member member = memberService.get(request);
        Map<String,Object> data = new HashMap<>();
        if(StringUtils.equalsAnyIgnoreCase("friend",action)){
            List<Map<String, Object>> list = jdbcTemplate.queryForList("select nickName,avatarUrl,(SELECT count(id) from clickrecord where memberId="+member.getId()+" AND createdDate>='"+DateUtils.formatDateToString(beginDate,"yyyy-MM-dd HH:mm:ss")+"' AND createdDate<='"+DateUtils.formatDateToString(endDate,"yyyy-MM-dd HH:mm:ss")+"') todayCount,(SELECT count(id) from clickrecord where memberId="+member.getId()+") allCount from member where parent_id="+member.getId());
            data.put("list",list);
        }else if(StringUtils.equalsAnyIgnoreCase("login",action)){
            data.put("userInfo",login(request,app));
        }else if(StringUtils.equalsAnyIgnoreCase("home",action)){
            return config(request);
        }else if(StringUtils.equalsAnyIgnoreCase("sign",action)){
            data.putAll(sign(request,app));
        }else if(StringUtils.equalsAnyIgnoreCase("all",action)){
            // 总榜
            data.put("rank",jdbcTemplate.queryForList("SELECT avatarUrl,nickName,point FROM member where point>0 ORDER BY point DESC"));
        }else if(StringUtils.equalsAnyIgnoreCase("today",action)){
            // 今日榜单
            Date today = new Date();
            data.put("rank",jdbcTemplate.queryForList("SELECT avatarUrl,nickName,point FROM member where point>0 and updateDate>='"+ DateUtils.formatDateToString(today,"yyyy-MM-dd 00:00:00") +"' and updateDate<='"+DateUtils.formatDateToString(today,"yyyy-MM-dd 23:59:59")+"' ORDER BY point DESC "));
        }else if(StringUtils.equalsAnyIgnoreCase("my",action)){
            // 我的
            data.putAll(my(request,app));
        }else if(StringUtils.equalsAnyIgnoreCase("log",action)){
            // 我的
            data.putAll(log(request,app));
        }else if(StringUtils.equalsAnyIgnoreCase("rank",action)){
            data.put("list",clickRecordService.rank(app,beginDate,endDate));
        }else if(StringUtils.equalsAnyIgnoreCase("rank1",action)){
            // 总榜单
            data.put("list",clickRecordService.rank(app,null,null));
        }else if(StringUtils.equalsAnyIgnoreCase("exemption",action)){
            // 免责申明
            List<Map<String,Object>> list = new ArrayList<>();
            Map<String,Object> map = new HashMap<>();
            map.put("content","打卡小程序");
            list.add(map);
            data.put("rule",list);
        }else if(StringUtils.equalsAnyIgnoreCase("program",action)){
            // 更多小程序
            List<Map<String,Object>> list = new ArrayList<>();
            for (int i = 0; i < 5; i++) {
                Map<String,Object> map = new HashMap<>();
                map.put("appId","appId");
                map.put("path","path");
                map.put("icon","icon");
                map.put("name","name");

                list.add(map);
            }
            data.put("program",list);
        }else if(StringUtils.equalsAnyIgnoreCase("shop",action)){
            Map<String,Object> map = new HashMap<>();
            map.put("list",productCategoryService.findList(app));
            data.putAll(map);
        }else if(StringUtils.equalsAnyIgnoreCase("shopDetails",action)){
            Map<String,Object> map = new HashMap<>();
            map.put("product",productService.find(Long.parseLong(request.getParameter("id"))));
            data.putAll(map);
        }else if(StringUtils.equalsAnyIgnoreCase("order",action)){
            Map<String,Object> map = new HashMap<>();
            map.put("orders",orderService.findList(app,member));
            data.putAll(map);
        }
        return Result.success(data);
    }

    private Map<String,Object> log(HttpServletRequest request, App app) {

        /**
         * 页码
         */
        String p = request.getParameter("p");
        if(StringUtils.isBlank(p)){
            p = "1";
        }

        /**
         * 1: 自己
         * 2：一级
         * 3：二级
         */
        String level = request.getParameter("level");
        /**
         * 1:今天
         * 2：昨天
         */
        String today = request.getParameter("today");
        Map<String,Object> data = new HashMap<>();
        Member member = memberService.get(request);
        if(member==null|| app == null || member.getAppId().compareTo(app.getId())!=0){
            data.put("code",-1);
            data.put("msg","非法访问");
            return data;
        }
        Date now = new Date();

        if(!StringUtils.equalsAnyIgnoreCase("1",today)){
            now = DateUtils.getNextDay(-1);
        }
        Date beginDate = DateUtils.getBeginDay(now);
        Date endDate = DateUtils.getEndDay(now);


        if(StringUtils.equalsAnyIgnoreCase(level,"2")){
            // 一级
            data.put("list",clickRecordService.page1(member,beginDate,endDate,Integer.parseInt(p)));
        }else if(StringUtils.equalsAnyIgnoreCase(level,"3")){
            // 二级
            data.put("list",clickRecordService.page2(member,beginDate,endDate,Integer.parseInt(p)));
        }else{
            // 自己
            data.put("list",clickRecordService.page(member,beginDate,endDate,Integer.parseInt(p)));
        }
        data.put("all_num",clickRecordService.count0(app,beginDate,endDate));
        data.put("my_num",clickRecordService.count(member,beginDate,endDate));
        data.put("one_num",clickRecordService.count1(member,beginDate,endDate));
        data.put("two_num",clickRecordService.count2(member,beginDate,endDate));
        return data;
    }


    // 打卡
    private Map<String,Object> my(HttpServletRequest request, App app) {
        Map<String,Object> data = new HashMap<>();
        Member member = memberService.get(request);
        if(member==null|| app == null || member.getAppId().compareTo(app.getId())!=0){
            data.put("code",-1);
            data.put("msg","非法访问");
            return data;
        }
        // 累计打卡天数
        data.put("all_nun",clickRecordService.allNum(member));


        return data;
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
        long signPoint = 15L;
        String clickRule = "";
        AppConfig appConfig = app.getAppConfig();
        if(appConfig!=null&&appConfig.get("signPoint")!=null){
            try {
                signPoint = Long.parseLong(appConfig.get("signPoint")+"");
            }catch (Exception e){
                signPoint = new DaKaConfig().getSignPoint();
            }
            try {
                clickRule = appConfig.get("clickRule")+"";
            }catch (Exception e){
                clickRule = new DaKaConfig().getClickRule();
            }
        }
        DaKaConfig.ClickRule currentClickRule = DaKaConfig.getCurrentClickRule(clickRule);
        if(currentClickRule==null){
            data.put("status",2);
            data.put("info","当前时间段不允许打卡");
            return data;
        }
        Integer count = jdbcTemplate.queryForObject("SELECT count(id)FROM clickrecord WHERE memberId = "+member.getId()+" AND appId="+app.getId()+" AND createdDate >= '"+DateUtils.formatDateToString(currentClickRule.getBeginDate(),"yyyy-MM-dd HH:mm:ss")+"' AND createdDate <= '"+DateUtils.formatDateToString(currentClickRule.getEndDate(),"yyyy-MM-dd HH:mm:ss")+"'", Integer.class);
        if(currentClickRule.getCount()<=count){
            data.put("status",2);
            data.put("info","今日打卡次数已满，请明天再来");
            return data;
        }


        // 增加打开记录
        ClickRecord clickRecord = new ClickRecord();
        clickRecord.setMemberId(member.getId());
        clickRecord.setPoint(signPoint);
        clickRecord.setAppId(app.getId());
        clickRecordService.save(clickRecord);
        member.setUpdateDate(new Date());
        memberService.addPoint(member,clickRecord.getPoint(), PointLog.Type.sign,"打卡奖励");
        memberService.update(member);
        data.put("bd_img","https://bootx-xiaochengxu.oss-cn-hangzhou.aliyuncs.com/daka/1.jpg?x-oss-process=style/60");
        data.put("status",1);
        data.put("signPoint",signPoint);
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
        data.put("surplus",30);

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

    @PostMapping("/today")
    public Result today(HttpServletRequest request){
        Member member = memberService.get(request);
        if(member==null){
            return Result.error("非法访问");
        }
        Map<String,Object> data = new HashMap<>();
        Date beginDate = DateUtils.getBeginDay(new Date());
        Date endDate = DateUtils.getEndDay(new Date());
        data.put("todayPoint",jdbcTemplate.queryForObject("SELECT SUM(point) FROM clickrecord WHERE memberId="+member.getId()+" AND createdDate>='"+DateUtils.formatDateToString(beginDate,"yyyy-MM-dd HH:mm:ss")+"' AND createdDate<='"+DateUtils.formatDateToString(endDate,"yyyy-MM-dd HH:mm:ss")+"'",Long.class));
        return Result.success(data);
    }

}
