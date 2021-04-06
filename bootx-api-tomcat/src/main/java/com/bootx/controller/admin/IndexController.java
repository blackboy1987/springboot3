package com.bootx.controller.admin;

import com.bootx.common.Result;
import com.bootx.controller.BaseController;
import com.bootx.entity.Admin;
import com.bootx.entity.App;
import com.bootx.service.AdminService;
import com.bootx.service.AppService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController("apiAdminIndexController")
@RequestMapping("/admin/api")
public class IndexController extends BaseController {

    @Resource
    private AppService appService;
    @Resource
    private AdminService adminService;

    @PostMapping("/currentUser")
    private Result currentUser(HttpServletRequest request) {
        Admin admin = adminService.get(request);
        if(admin==null){
            return Result.error("非法访问");
        }
        Map<String,Object> data = new HashMap<>();
        App app = admin.getApp();
        if(app!=null){
            data.put("id",admin.getId());
            data.put("username",admin.getUsername());
            data.put("appName", app.getAppName());
            data.put("logo", app.getLogo());
        }else{
            data.put("id",0);
            data.put("appName", "未申请");
            data.put("logo", "");
        }

        return Result.success(data);
    }

    @PostMapping("/appCode")
    private Result appCode(HttpServletRequest request) {
        Admin admin = adminService.get(request);
        if(admin==null){
            return Result.error("非法访问");
        }
        Map<String,Object> data = new HashMap<>();
        if(admin.getApp()==null){
            data.put("code",-1);
        }else{
            data.put("appCode",admin.getApp().getAppCode());
            data.put("code",0);
        }

        return Result.success(data);
    }

    @PostMapping("/appToken")
    private Result appToken(String password,HttpServletRequest request) {
        Admin admin = adminService.get(request);
        if(admin==null){
            return Result.error("非法访问");
        }
        App app = admin.getApp();
        if(app==null){
            return Result.error("非法访问");
        }

        Map<String,Object> data = new HashMap<>();
        if(!admin.isValidCredentials(password)){
            return Result.error("密码输入不正确");
        }
        app.setAppToken(app.getAppId()+"-"+app.getAppSecret()+"-"+app.getAppCode()+"-"+System.currentTimeMillis());
        while (appService.appTokenExists(app.getAppCode())){
            app.setAppToken(app.getAppToken());
        }
        data.put("appToken",app.getAppToken());
        appService.update(app);
        return Result.success(data);
    }
}
