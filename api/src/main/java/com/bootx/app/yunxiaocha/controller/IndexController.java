package com.bootx.app.yunxiaocha.controller;

import com.bootx.app.yunxiaocha.pojo.Data;
import com.bootx.common.Result;
import com.bootx.entity.App;
import com.bootx.member.entity.Member;
import com.bootx.member.service.MemberService;
import com.bootx.service.AppService;
import com.bootx.util.DateUtils;
import com.bootx.util.JWTUtils;
import com.bootx.util.JsonUtils;
import com.bootx.util.WebUtils;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.type.TypeReference;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/api/yunxiaocha")
public class IndexController {

    @Resource
    private AppService appService;

    @Resource
    private MemberService memberService;

    @GetMapping("/getConfig")
    public Result getConfig(){
        return Result.success(new Data());
    }


    @GetMapping("/login")
    public Result login(String code,HttpServletRequest request,Long scene){
        Map<String,Object> data = new HashMap<>();
        String url = "https://api.weixin.qq.com/sns/jscode2session";
        App app = appService.get(request);
        if(app==null){
            return Result.error(-1,"非法请求");
        }
        Map<String,String> params = new HashMap<>();
        params.put("appid",app.getAppId());
        params.put("secret",app.getAppSecret());
        params.put("js_code",code);
        params.put("grant_type","authorization_code");
        Map<String,String> result = JsonUtils.toObject(WebUtils.get1(url, params), new TypeReference<Map<String, String>>() {});

        Member member = memberService.create(result,app,scene);
        Map<String,Object> data1 = memberService.getData(member);
        data.putAll(data1);;
        data.put("token", JWTUtils.create(member.getId()+"",data1));
        return Result.success(data);
    }

    @GetMapping("/reserveDates")
    public Result reserveDates(String code,HttpServletRequest request){
        Map<String,Object> data = new HashMap<>();
        String url = "https://api.weixin.qq.com/sns/jscode2session";
        App app = appService.get(request);
        if(app==null){
            return Result.error(-1,"非法请求");
        }
        Member member = memberService.get(request);
        if(member==null){
            return Result.error(-1,"请先登录");
        }
        data.put("dates",getDatas(7));
        data.put("myDates", Collections.emptyList());
        data.put("activeDays",7);
        data.put("maxPeopleCount",1);
        data.put("minorMaxCount",1);
        return Result.success(data);
    }

    private List<Map<String,Object>> getDatas(int i) {
        List<Map<String,Object>> list = new ArrayList<>();
        for (int j = 1; j <= i; j++) {
            Date date = DateUtils.getNextDay(j);
            Map<String,Object> map = new HashMap<>();
            map.put("weekday",dateToWeek(date));
            map.put("date",DateUtils.formatDateToString(date,"yyyy-MM-dd HH:mm:ss"));
            map.put("title","营业");
            map.put("enabled",true);
            map.put("timeRange",getTimeRange(date));
            list.add(map);
        }

        return list;
    }

    private List<Map<String,Object>> getTimeRange(Date date) {
        List<Map<String,Object>> list = new ArrayList<>();
        for (int i = 10; i < 20; i++) {
            Map<String,Object> map = new HashMap<>();
            map.put("range",i+" 点");
            map.put("remains",1);
            map.put("enabled",true);
            map.put("peopleNumber",1);
            map.put("minorNumber",1);
            map.put("remark","已预约");
            list.add(map);
        }


        return list;
    }


    public static String dateToWeek(Date date) {
        String[] weekDays = { "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" };
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        int w = cal.get(Calendar.DAY_OF_WEEK) - 1;
        if (w < 0)
            w = 0;
        return weekDays[w];
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
            return new Result(1, "", data);
        }

        public static Result error(Integer code, String msg) {
            return new Result(code, msg, null);
        }
    }
}
