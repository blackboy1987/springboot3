package com.bootx.controller.admin;

import com.bootx.common.Result;
import com.bootx.controller.BaseController;
import com.bootx.entity.Admin;
import com.bootx.entity.App;
import com.bootx.entity.BaseEntity;
import com.bootx.member.entity.Member;
import com.bootx.service.AdminService;
import com.bootx.service.AppService;
import com.bootx.util.*;
import com.fasterxml.jackson.core.type.TypeReference;
import org.apache.commons.lang3.StringUtils;
import org.jsoup.internal.StringUtil;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

@RestController("apiLoginController")
@RequestMapping("/admin/api/login")
public class LoginController extends BaseController {

    @Resource
    private AdminService adminService;

    @PostMapping("/submit")
    private Map<String,Object> login(String mobile,String captcha,String type) {
        Map<String,Object> data = new HashMap<>();
        data.put("type",type);
        if(StringUtils.isBlank(mobile)||StringUtils.isBlank(captcha)){
            data.put("status","error");
            data.put("msg","请输入手机号或验证码");
            return data;
        }
        String code = EhCacheUtils.getSmsCodeCache("login_" + mobile);
        if(!StringUtils.equalsAnyIgnoreCase(code,captcha)){
            data.put("status","error");
            data.put("msg","验证码输入不正确");
            return data;
        }

        EhCacheUtils.removeSmsCodeCache("login_" + mobile);
        Admin admin = adminService.findByMobile(mobile);
        if(admin==null){
            data.put("status","error");
            data.put("msg","用户不存在");
        }else if(admin.getStatus()!=2){
            data.put("status","error");
            data.put("msg","账号信息未审核或审核不通过，请联系管理员");
        }else{
            data.put("status","ok");
            data.put("msg","");
            data.put("currentAuthority",admin.getIsAdmin()?"admin":"custom");
            Map<String,Object> data1 = adminService.getData(admin);
            data.put("token", JWTUtils.create(admin.getId()+"",data1));
        }
        return data;


    }


    @PostMapping("/outLogin")
    private Map<String,Object> outLogin() {
        Map<String,Object> data = new HashMap<>();
        return data;


    }


    @PostMapping("/captcha")
    private Result captcha(String mobile) {
        Admin admin = adminService.findByMobile(mobile);
        if(admin==null){
            return Result.error("用户不存在");
        }
        String code = CodeUtils.getCode(6);
        String send = SmsUtils.send(mobile, code);
        EhCacheUtils.setSmsCodeCache("login_"+mobile,code);
        Map<String, Object> map = JsonUtils.toObject(send, new TypeReference<Map<String, Object>>() {
        });
        System.out.println(EhCacheUtils.getSmsCodeCache("login_"+mobile));
        return Result.success(map.get("msg"));
    }



}
