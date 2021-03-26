package com.bootx.controller.admin;

import com.bootx.common.Result;
import com.bootx.controller.BaseController;
import com.bootx.entity.Admin;
import com.bootx.entity.App;
import com.bootx.entity.BaseEntity;
import com.bootx.entity.RewardType;
import com.bootx.member.entity.Member;
import com.bootx.member.entity.PointLog;
import com.bootx.member.service.MemberService;
import com.bootx.service.AdminService;
import com.bootx.service.AppService;
import com.bootx.util.*;
import com.fasterxml.jackson.core.type.TypeReference;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController("apiRegisterController")
@RequestMapping("/register")
public class RegisterController extends BaseController {

    @Resource
    private AppService appService;
    @Resource
    private AdminService adminService;

    @PostMapping("/checkUsername")
    public Result checkUsername(String username){
        return Result.success(appService.usernameExists(username));
    }


    @PostMapping("/checkAppId")
    public Result checkAppId(String appId){
        return Result.success(appService.appCodeExists(appId));
    }

    @PostMapping("/checkAppName")
    public Result checkAppName(String appName){
        return Result.success(appService.appNameExists(appName));
    }

    @PostMapping("/checkAppSecret")
    public Result checkAppSecret(String appSecret){
        return Result.success(appService.appSecretExists(appSecret));
    }


    @PostMapping("/submit")
    public Result login(String appId,String appSecret,String appName,String username,String password,HttpServletRequest request) {
        if (!isValid(Member.class, "password", password, BaseEntity.Save.class)
                || !isValid(Member.class, "appId", appId, BaseEntity.Save.class)
                || !isValid(Member.class, "appSecret", appSecret, BaseEntity.Save.class)
                || !isValid(Member.class, "appName", appName, BaseEntity.Save.class)
        ) {
            return Result.error("参数校验错误");
        }

        Admin admin = adminService.get(request);
        if(admin==null){
            return Result.error("登录信息已过期，请重新登录");
        }
        if(admin.getApp()!=null){
            return Result.error("一个用户只能拥有一个小程序");
        }

        if (appService.appIdExists(appId)) {
            return Result.error("请填写appId");
        }
        if (appService.appSecretExists(appSecret)) {
            return Result.error("请填写appSecret");
        }
        if (appService.appNameExists(appName)) {
            return Result.error("请填写appName");
        }
        if (appService.usernameExists(username)) {
            return Result.error("请填写username");
        }
        App app = new App();
        app.setAdmin(admin);
        app.setAppId(appId);
        app.setAppSecret(appSecret);
        app.setAppName(appName);
        app.setAppCode(CodeUtils.getCode(12));
        while (appService.appCodeExists(app.getAppCode())){
            app.setAppCode(CodeUtils.getCode(12));
        }
        app.setAppToken(app.getAppId()+"-"+app.getAppSecret()+"-"+app.getAppCode()+"-"+System.currentTimeMillis());
        while (appService.appTokenExists(app.getAppCode())){
            app.setAppToken(app.getAppToken());
        }
        app.setStatus(0);
        app.setExpireDate(DateUtils.getNextDay(7));
        appService.save(app);
        return Result.success("ok");
    }



}
