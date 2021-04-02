package com.bootx.controller.admin;

import com.bootx.common.Result;
import com.bootx.entity.App;
import com.bootx.entity.AppAd;
import com.bootx.entity.AppConfig;
import com.bootx.service.AppService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@RestController("apiAdminAppController")
@RequestMapping("/api/admin/app")
public class AppController {

    @Resource
    private AppService appService;

    @PostMapping("/base")
    public Result base(HttpServletRequest request){
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

    @PostMapping("/baseUpdate")
    public Result baseUpdate(HttpServletRequest request,String appName,String appId,String appSecret,String logo,Integer status){
        App app = appService.get1(request);
        if(app==null){
            return Result.error("非法访问");
        }
        if(!StringUtils.equals(appId, app.getAppId())){
            return Result.error("不允许修改appId");
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
        return Result.success(app.getAppAd());
    }

    @PostMapping("/adsUpdate")
    public Result adsUpdate(HttpServletRequest request, @RequestBody Map<String, AppAd> ads){
        App app = appService.get1(request);
        if(app==null){
            return Result.error("非法访问");
        }
        // app.setAppAds(ads);
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
}
