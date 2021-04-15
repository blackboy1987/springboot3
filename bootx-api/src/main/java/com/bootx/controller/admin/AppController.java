package com.bootx.controller.admin;

import com.bootx.common.Result;
import com.bootx.entity.*;
import com.bootx.service.AdminService;
import com.bootx.service.AppService;
import com.bootx.util.CodeUtils;
import com.bootx.util.JsonUtils;
import com.fasterxml.jackson.core.type.TypeReference;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

@RestController("apiAdminAppController")
@RequestMapping("/admin/api/app")
public class AppController {

    @Resource
    private AppService appService;

    @Resource
    private AdminService adminService;

    @PostMapping("/base")
    public Result base(HttpServletRequest request){
        Admin admin = adminService.get(request);
        if(admin==null){
            return Result.error("非法访问");
        }
        App app = admin.getApp();
        if(app==null){
            return Result.error("非法访问");
        }
        Map<String,Object> data = new HashMap<>();
        data.put("appName", app.getAppName());
        data.put("logo", app.getLogo());
        data.put("appId", app.getAppId());
        data.put("appSecret", app.getAppSecret());
        data.put("status", app.getStatus());
        Set<SubscriptionTemplate> subscriptionTemplates = app.getSubscriptionTemplates();
        if(subscriptionTemplates!=null&&subscriptionTemplates.size()>0){
            Iterator<SubscriptionTemplate> iterator = subscriptionTemplates.iterator();
            SubscriptionTemplate next = iterator.next();
            data.put("templateId", next.getTemplateId());
            Map<String, SubscriptionTemplate.Value> params = new HashMap<>();

            params.put("thing1",new SubscriptionTemplate.Value("vod_id"));
            params.put("thing2",new SubscriptionTemplate.Value("type_id"));
            data.put("templateParams", JsonUtils.toJson(params));
        }
        return Result.success(data);
    }

    @PostMapping("/info")
    public Result info(HttpServletRequest request){
        Admin admin = adminService.get(request);
        if(admin==null){
            return Result.error("非法访问");
        }
        App app = admin.getApp();
        if(app==null){
            return Result.error("非法访问");
        }
        Map<String,Object> data = new HashMap<>();
        data.put("appName", app.getAppName());
        data.put("logo", app.getLogo());
        data.put("appCode", app.getAppCode());
        data.put("appToken", app.getAppToken());
        data.put("status", app.getStatus());
        return Result.success(data);
    }


    @PostMapping("/baseUpdate")
    public Result baseUpdate(HttpServletRequest request,String appName,String appId,String appSecret,String logo,Integer status){
        Admin admin = adminService.get(request);
        if(admin==null){
            return Result.error("非法访问");
        }
        App app = admin.getApp();
        if(app==null){
            return Result.error("非法访问");
        }
        if(!StringUtils.equals(appId, app.getAppId())){
            return Result.error("不允许修改appId");
        }
        if(StringUtils.equals(appId,app.getAppId())||StringUtils.equals(appSecret,app.getAppSecret())){
            // 重新生成appCode和appToken
            String code = CodeUtils.getCode(12);
            String token = CodeUtils.getToken(code);
            app.setAppCode(code);
            app.setAppToken(token);
        }


        app.setAppSecret(appSecret);
        app.setLogo(logo);
        app.setAppName(appName);
        app.setStatus(status);
        appService.update(app);

        return Result.success("操作成功");
    }


    @PostMapping("/ads")
    public Result ads(HttpServletRequest request){
        App app = appService.get1(request);
        if(app==null){
            return Result.error("非法访问");
        }
        return Result.success(app.getAppAd().getAds());
    }

    @PostMapping("/adsUpdate")
    public Result adsUpdate(HttpServletRequest request, String ads){
        Admin admin = adminService.get(request);
        if(admin==null){
            return Result.error("非法访问");
        }
        App app = admin.getApp();
        if(app==null){
            return Result.error("非法访问");
        }
        Map<String, AdConfig> adConfigs = JsonUtils.toObject(ads, new TypeReference<Map<String, AdConfig>>() {
        });
        AppAd appAd = app.getAppAd();
        appAd.setAds(adConfigs);
        appService.update(app);
        return Result.success("操作成功");
    }


    @PostMapping("/config")
    public Result config(HttpServletRequest request){
        App app = appService.get1(request);
        if(app==null){
            return Result.error("非法访问");
        }
        AppConfig appConfig = app.getAppConfig();
        return Result.success(appConfig.getConfig());
    }

    @PostMapping("/configUpdate")
    public Result configUpdate(HttpServletRequest request, @RequestBody Map<String, String> config){
        App app = appService.get1(request);
        if(app==null){
            return Result.error("非法访问");
        }
        AppConfig appConfig = app.getAppConfig();
        appConfig.setConfig(config);
        appService.update(app);
        return Result.success("操作成功");
    }

    @PostMapping("/save")
    public Result save(HttpServletRequest request){
        App app = appService.get1(request);
        if(app==null){
            return Result.error("非法访问");
        }
        Map<String,Object> data = new HashMap<>();
        data.put("appName", app.getAppName());
        data.put("logo", app.getLogo());
        data.put("appId", app.getAppId());
        data.put("appSecret", app.getAppSecret());
        data.put("status", app.getStatus());
        return Result.success(data);
    }

    /**
     * 修改登录密码
     * @param request
     * @param oldPassword
     * @param password
     * @param rePassword
     * @return
     */
    @PostMapping("/updatePassword")
    public Result updatePassword(HttpServletRequest request,String oldPassword,String password,String rePassword){
        Admin admin = adminService.get(request);
        if(admin==null){
            return Result.error("非法访问");
        }
        App app = admin.getApp();
        if(app==null){
            return Result.error("非法访问");
        }
        if(StringUtils.isBlank(oldPassword)){
            return Result.error("请输入原始密码");
        }
        if(StringUtils.isBlank(password)){
            return Result.error("请输入新密码");
        }
        if(!StringUtils.equals(password,rePassword)){
            return Result.error("两次输入的密码不一致");
        }
        if(admin.isValidCredentials(password)){
            return Result.error("原始密码输入不正确");
        }
        admin.setPassword(password);
        adminService.update(admin);

        return Result.success("操作成功");
    }
}
