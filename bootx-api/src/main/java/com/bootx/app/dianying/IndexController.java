package com.bootx.app.dianying;

import com.bootx.app.dianying.entity.Movie;
import com.bootx.app.dianying.pojo.Demo;
import com.bootx.app.dianying.pojo.getOnlineMvById.GetOnlineMvById;
import com.bootx.app.dianying.pojo.getOnlineMvById.Items;
import com.bootx.entity.*;
import com.bootx.member.entity.Member;
import com.bootx.member.service.MemberService;
import com.bootx.service.AppService;
import com.bootx.service.RedisService;
import com.bootx.service.SubscriptionRecordService;
import com.bootx.service.SubscriptionTemplateService;
import com.bootx.util.*;
import com.bootx.util.wechat.BaseResponse;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.type.TypeReference;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.Serializable;
import java.util.*;

@RestController("apiV3IndexController")
@RequestMapping("/api/v3")
public class IndexController {

    @Autowired
    private AppService appService;

    @Autowired
    private MemberService memberService;

    @Resource
    private SubscriptionTemplateService subscriptionTemplateService;

    @Resource
    private SubscriptionRecordService subscriptionRecordService;

    @Resource
    private RedisService redisService;

    private static final String[] otherService = {
            "App.Art.GetArtId",
            "App.Mov.HotKeywords","App.Mov.SearchVod","App.Mov.GetLevelId","App.Mov.GetConfig",
            "App.Mov.GetOnlineMvById","App.Mov.SetMovById","App.Mov.GetCategory","App.Mov.GetSyLevelAll",
            "App.Mov.GetHomeLevelAll","App.Mov.HotKeywords","App.Mov.SearchVod",
            "App.Topic.GetTopicAll","App.Topic.GetTopicId",
            "App.User.WxRegister","App.User.PidNum","App.User.WxLogin",
            "App.Ulog.SetSubscribe","App.Ulog.GetLog",
            "App.Code.WxPoster",
            "App.JX.VipJX"
    };

    /**
     * 搜索
     * @param request
     * @param wd
     * @return
     */
    @GetMapping("/api.php/provide/search")
    public String search(HttpServletRequest request,String wd){
        String service = request.getParameter("service");
        App app = appService.get(request);
        if(app==null){
            return JsonUtils.toJson(Result.error(406,"非法访问"));
        }
        Map<String,String> params = new HashMap<>();
        params.put("wd",wd);

        String result = WebUtils.get1("https://oss.1259416862.shanghai.mysql.ttqbaby.com/api.php/provide/search/",params);
        String data = parseResult(result,service,app);
        return data;
    }


    @GetMapping("/wxApi/public")
    public String categories(HttpServletRequest request){
        String service = request.getParameter("service");
        App app = appService.get(request);
        if(app==null){
            return JsonUtils.toJson(Result.error(406,"非法访问"));
        }
        Map<String,String> params = new HashMap<>();
        Enumeration<String> parameterNames = request.getParameterNames();
        while (parameterNames.hasMoreElements()){
            String key = parameterNames.nextElement();
            if(!StringUtils.equalsAnyIgnoreCase("token",key)&&!StringUtils.equalsAnyIgnoreCase("appCode",key)&&!StringUtils.equalsAnyIgnoreCase("appToken",key)&&!StringUtils.equalsAnyIgnoreCase("tmpIds",key)){
                params.put(key,request.getParameter(key));
            }
        }

        // 一键登录，自行处理
        if(StringUtils.equalsAnyIgnoreCase("App.User.WxRegister",service)){
            return login(params,app);
        }
        // 订阅
        if(StringUtils.equalsAnyIgnoreCase("App.Ulog.SetSubscribe",service)){
            return setSubscribes(request,app);
        }

        String result = WebUtils.get1("https://dl.yulu123.xyz/wxApi/public/",params);
        String data = parseResult(result,service,app);
        return data;
    }

    /**
     * 消息订阅
     * @param request
     * @param app
     * @return
     */
    private String setSubscribes(HttpServletRequest request, App app) {
        // 视频id
        String vod_id = request.getParameter("vod_id");
        // 当前账号
        Member member = memberService.get(request);
        // 订阅的条数
        String ulog_nid = request.getParameter("ulog_nid");
        // 视频所属分类
        String type_id = request.getParameter("type_id");
        /**
         * 订阅的模板id,多个用逗号隔开
         */
        String tmpIds = request.getParameter("tmpIds");
        Long count = 0L;
        if(StringUtils.isNotBlank(tmpIds)&&app!=null&&member!=null&&member.getAppId()==app.getId()){
            List<SubscriptionTemplate> subscriptionTemplates =  subscriptionTemplateService.findListByAppAndSubscriptionTemplateIds(app,tmpIds.split(","));
            for (SubscriptionTemplate subscriptionTemplate:subscriptionTemplates) {
                // 判断当天该模板该用户订阅的次数
                count = subscriptionRecordService.count(app,member,subscriptionTemplate);
                if(count>=90){
                    continue;
                }
                SubscriptionRecord subscriptionRecord = new SubscriptionRecord();
                subscriptionRecord.setApp(app);
                subscriptionRecord.setStatus(0);
                subscriptionRecord.setMember(member);
                subscriptionRecord.setPage("/pages/detail/detail?id="+vod_id);
                subscriptionRecord.setSubscriptionTemplate(subscriptionTemplate);
                Map<String, SubscriptionTemplate.Value> param = subscriptionTemplate.getParam();
                Map<String, SubscriptionTemplate.Value> param1 = new HashMap<>();
                for (String key: param.keySet()) {
                    SubscriptionTemplate.Value value = param.get(key);
                    String s = redisService.get("movie_" + vod_id);
                    Items items = JsonUtils.toObject(s, Items.class);
                    if(StringUtils.equals(value.getValue(),"type_id")){
                        param1.put(key,new SubscriptionTemplate.Value(items.getVod_class()));
                    }else if(StringUtils.equals(value.getValue(),"vod_id")){
                        param1.put(key,new SubscriptionTemplate.Value(items.getVod_name()));
                    }
                }
                subscriptionRecord.setParam(param1);
                subscriptionRecordService.save(subscriptionRecord);
                count = count+1;
            }
        }

        Map<String,Object> map = new HashMap<>();
        map.put("code",200);
        map.put("msg","订阅成功");
        map.put("send_num",count);
        return JsonUtils.toJson(Result.success(map));
    }

    /**
     * 登录
     * @param params1
     * @param app
     * @return
     */
    private String login(Map<String,String> params1,App app) {
        Map<String,Object> data = new HashMap<>();
        String url = "https://api.weixin.qq.com/sns/jscode2session";
        Map<String,String> params = new HashMap<>();
        params.put("appid",app.getAppId());
        params.put("secret",app.getAppSecret());
        params.put("js_code",params1.get("user"));
        params.put("grant_type","authorization_code");
        Map<String,String> result = JsonUtils.toObject(WebUtils.get1(url, params), new TypeReference<Map<String, String>>() {});
        result.putAll(params1);

        Map<String,String> config = new HashMap<>();
        Member member = memberService.create(result,app,null,config);
        Map<String,Object> data1 = new HashMap<>(result);
        data1 = memberService.getData(member);
        data.put("userInfo",data1);
        data.put("code",200);
        data.put("token", JWTUtils.create(member.getId()+"",data1));
        return JsonUtils.toJson(Result.success(data));
    }

    private String parseResult(String result,String service,App app) {
        if(StringUtils.equalsAnyIgnoreCase("App.Mov.GetConfig",service)){
            return getConfig(result,app);
        }
        if(StringUtils.equalsAnyIgnoreCase("App.Mov.GetOnlineMvById",service)){
            GetOnlineMvById getOnlineMvById = JsonUtils.toObject(result, GetOnlineMvById.class);
            if(getOnlineMvById.getData()!=null&&getOnlineMvById.getData().getItems()!=null&&getOnlineMvById.getData().getItems().size()>0){
                Items items = getOnlineMvById.getData().getItems().get(0);
                redisService.set("movie_"+items.getVod_id(),JsonUtils.toJson(items));
            }
        }

        return result;
    }

    private String getConfig(String result,App app) {
        AppAd appAd = app.getAppAd();
        String danMu = app.getAppConfig().getConfig().get("danMu")+"";
        Demo demo = JsonUtils.toObject(result,Demo.class);
        demo.getData().setAdmin(app.getAppName());
        AdConfig indexAdConfig = appAd.get("index");
        if(indexAdConfig!=null){
            demo.getData().getIndex().getWxAdId().setYsId(indexAdConfig.getNativeAdId());
            demo.getData().getIndex().getWxAdId().setCpId(indexAdConfig.getInterstitialAdId());
        }

        AdConfig detailAdConfig = appAd.get("detail");
        if(detailAdConfig!=null){
            demo.getData().getDetail().getWxAdId().setYsId(detailAdConfig.getNativeAdId());
            demo.getData().getDetail().getWxAdId().setCpId(detailAdConfig.getInterstitialAdId());
            demo.getData().getDetail().getWxAdId().setJlspId(detailAdConfig.getRewardedVideoAdId());
        }
        AdConfig fenLeiAdConfig = appAd.get("fenLei");
        if(fenLeiAdConfig!=null){
            demo.getData().getFeilei().getWxAdId().setYsId(fenLeiAdConfig.getNativeAdId());
            demo.getData().getFeilei().getWxAdId().setCpId(fenLeiAdConfig.getInterstitialAdId());
        }
        // demo.getData().getFeilei().getWxAdId().setJlspId("adunit-d06d530e38aaba45");
        AdConfig topicAdConfig = appAd.get("topic");
        if(topicAdConfig!=null){
            demo.getData().getTopic().getWxAdId().setYsId(topicAdConfig.getNativeAdId());
            demo.getData().getTopic().getWxAdId().setCpId(topicAdConfig.getInterstitialAdId());
        }
        //  demo.getData().getTopic().getWxAdId().setJlspId("adunit-d06d530e38aaba45");
        AdConfig playAdConfig = appAd.get("play");
        if(playAdConfig!=null){
            demo.getData().getPlay().getWxAdId().setYsId(playAdConfig.getNativeAdId());
            demo.getData().getPlay().getWxAdId().setCpId(playAdConfig.getInterstitialAdId());
            demo.getData().getPlay().getWxAdId().setJlspId(playAdConfig.getRewardedVideoAdId());
            demo.getData().getPlay().getWxAdId().setSpqtId(playAdConfig.getVideoFrontAdId());
        }
        try{
            demo.getData().getPlay().setDanmuList(JsonUtils.toObject(danMu, new TypeReference<List<Demo.DataDTO.PlayDTO.DanMu>>() {
            }));
        }catch (Exception e){
            e.printStackTrace();
        }
        if(demo.getData().getPlay().getDanmuList()==null||demo.getData().getPlay().getDanmuList().isEmpty()){
            String danMuList = "[{\"text\":\"请勿相信视频内广告\",\"color\":\"#ff0000\",\"time\":1},{\"text\":\"本软件永久免费,为避免小程序被封,请联系客服!\",\"color\":\"#ff00ff\",\"time\":3}]";
            List<Demo.DataDTO.PlayDTO.DanMu> danMus = JsonUtils.toObject(danMuList, new TypeReference<List<Demo.DataDTO.PlayDTO.DanMu>>() {
            });
            demo.getData().getPlay().setDanmuList(danMus);
            app.getAppConfig().getConfig().put("danMu",JsonUtils.toJson(danMus));
        }
        AdConfig woDeAdConfig = appAd.get("woDe");
        if(woDeAdConfig!=null){
            demo.getData().getWode().getWxAdId().setYsId(woDeAdConfig.getNativeAdId());
        }
        // demo.getData().getWode().getWxAdId().setCpId("adunit-d73c982ac406d17a");
        // demo.getData().getWode().getWxAdId().setJlspId("adunit-d06d530e38aaba45");
        //demo.getData().getWode().getWxAdId().setSpqtId("adunit-03083c87b390182a");
        AdConfig otherAdConfig = appAd.get("other");
        if(otherAdConfig!=null){
            demo.getData().getOther().getWxAdId().setYsId(otherAdConfig.getNativeAdId());
            demo.getData().getOther().getWxAdId().setCpId(otherAdConfig.getInterstitialAdId());
        }
        //demo.getData().getOther().getWxAdId().setJlspId("adunit-d06d530e38aaba45");
        // demo.getData().getOther().getWxAdId().setSpqtId("adunit-03083c87b390182a");
        demo.getData().getSite().getKefu().setUrl(app.getLogo());
        demo.getData().setWxverify(app.getStatus()==2);

        List<SubscriptionTemplate> subscriptionTemplates = subscriptionTemplateService.findListByAppAndSubscriptionTemplateIds(app,null);
        if(subscriptionTemplates!=null&&subscriptionTemplates.size()>0){
            Iterator<SubscriptionTemplate> iterator = subscriptionTemplates.iterator();
            SubscriptionTemplate next = iterator.next();
            demo.getData().getSite().getMessage().setTmpIds(next.getTemplateId());
        }
        return JsonUtils.toJson(demo);
    }

    @GetMapping("/movie/{douBanId}/photos")
    public Result photos(@PathVariable Long douBanId, Integer start, Integer count, HttpServletRequest request){
        List<String> list;
        String s = redisService.get("photos_" + douBanId);
        try {
            list = JsonUtils.toObject(s, new TypeReference<List<String>>() {
            });
        }catch (Exception e){
            list = DouBanUtils.photo(douBanId);
            redisService.set("photos_" + douBanId,JsonUtils.toJson(list));
        }
        Map<String,Object> data = new HashMap<>();
        List<PhotoImage> photos = new ArrayList<>();
        list.stream().forEach(item->{
            PhotoImage photoImage = new PhotoImage();
            photoImage.getLarge().setUrl(item);
            photoImage.getSmall().setUrl(item);
            photos.add(photoImage);
        });
        data.put("photos",photos);
        return Result.success(data);


    }

    @GetMapping("/tv/{douBanId}/photos")
    public Result tv(@PathVariable Long douBanId, Integer start, Integer count, HttpServletRequest request){
        List<String> list;
        String s = redisService.get("photos_" + douBanId);
        try {
            list = JsonUtils.toObject(s, new TypeReference<List<String>>() {
            });
        }catch (Exception e){
            list = DouBanUtils.photo(douBanId);
            redisService.set("photos_" + douBanId,JsonUtils.toJson(list));
        }
        Map<String,Object> data = new HashMap<>();
        List<PhotoImage> photos = new ArrayList<>();
        list.stream().forEach(item->{
            PhotoImage photoImage = new PhotoImage();
            photoImage.getLarge().setUrl(item);
            photoImage.getSmall().setUrl(item);
            photos.add(photoImage);
        });
        data.put("photos",photos);
        return Result.success(data);


    }


    @GetMapping("/info/{douBanId}")
    public Map<String,Object> movie(@PathVariable Long douBanId, Integer start, Integer couSetSubscribent, HttpServletRequest request){
        Map<String,Object> data= new HashMap<>();
        Movie movie;
        String s = redisService.get("douBan_" + douBanId);
        try {
            movie = JsonUtils.toObject(s, Movie.class);
        }catch (Exception e){
            movie = DouBanUtils.movie(douBanId);
            redisService.set("douBan_" + douBanId,JsonUtils.toJson(movie));
        }

        Map<String,Object> rating = new HashMap<>();
        rating.put("value",movie.getScore());
        data.put("rating",rating);


        Map<String,Object> pic = new HashMap<>();
        pic.put("normal",movie.getImage());
        data.put("pic",pic);

        List<String> durations = new ArrayList<>();
        durations.add(movie.getTimeLength());
        data.put("durations",durations);

        data.put("genres",movie.getCategories());

        return data;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Result implements Serializable {

        @JsonProperty("Code")
        private Integer code;
        @JsonProperty("Data")
        private Object data;
        @JsonProperty("msg")
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
