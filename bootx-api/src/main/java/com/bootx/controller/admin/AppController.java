package com.bootx.controller.admin;

import com.bootx.app.daka.service.ProductCategoryService;
import com.bootx.app.daka.service.ProductService;
import com.bootx.common.Page;
import com.bootx.common.Pageable;
import com.bootx.common.Result;
import com.bootx.entity.*;
import com.bootx.member.entity.MemberRank;
import com.bootx.member.service.MemberRankService;
import com.bootx.member.service.MemberService;
import com.bootx.service.AdminService;
import com.bootx.service.AppService;
import com.bootx.service.SubscriptionTemplateService;
import com.bootx.util.CodeUtils;
import com.bootx.util.JsonUtils;
import com.fasterxml.jackson.annotation.JsonValue;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.core.type.TypeReference;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
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
    private MemberService memberService;
    @Resource
    private ProductService productService;
    @Resource
    private AdminService adminService;

    @Resource
    private SubscriptionTemplateService subscriptionTemplateService;
    @Resource
    private MemberRankService memberRankService;
    @Resource
    private ProductCategoryService productCategoryService;

    @PostMapping("/list")
    @JsonView(BaseEntity.PageView.class)
    public Result list(HttpServletRequest request, Pageable pageable){
        Admin admin = adminService.get(request);
        if(admin==null){
            return Result.error("非法访问");
        }
        Page<App> page = appService.findPage(admin,pageable);
        return Result.success(page);
    }


    @PostMapping("/resetPass")
    @JsonView(BaseEntity.PageView.class)
    public Result resetPass(HttpServletRequest request, Long id){
        Admin admin = adminService.get(request);
        if(admin==null||!admin.getIsAdmin()){
            return Result.error("非法访问");
        }
        App app = appService.find(id);
        Admin admin1 = app.getAdmin();
        if(admin1!=null){
            admin1.setPassword("123456");
            adminService.update(admin1);
            return Result.success();
        }
        return Result.error("系统错误");
    }



    @PostMapping("/base")
    public Result base(HttpServletRequest request,Long id){
        Admin admin = adminService.get(request);
        if(admin==null){
            return Result.error("非法访问");
        }
        App app = admin.getApp();
        if(id!=null){
            if(!admin.getIsAdmin()){
                return Result.error("非法访问");
            }
            app = appService.find(id);
        }
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
    public Result info(HttpServletRequest request,Long id){
        Admin admin = adminService.get(request);
        if(admin==null){
            return Result.error("非法访问");
        }
        App app = admin.getApp();
        if(id!=null){
            if(!admin.getIsAdmin()){
                return Result.error("非法访问");
            }
            app = appService.find(id);
        }
        if(app==null){
            return Result.error("非法访问");
        }
        Map<String,Object> data = new HashMap<>();
        data.put("appName", app.getAppName());
        data.put("logo", app.getLogo());
        data.put("appCode", app.getAppCode());
        data.put("appToken", app.getAppToken());
        data.put("status", app.getStatus());
        data.put("expireDate", app.getExpireDate());
        return Result.success(data);
    }


    @PostMapping("/baseUpdate")
    public Result baseUpdate(Long id,HttpServletRequest request,String appLogo,String appName,String appId,String appSecret,String logo,Integer status,String templateId){
        Admin admin = adminService.get(request);
        if(admin==null){
            return Result.error("非法访问");
        }
        App app = admin.getApp();
        if(id!=null){
            if(!admin.getIsAdmin()){
                return Result.error("非法访问");
            }
            app = appService.find(id);
        }
        if(app==null){
            return Result.error("非法访问");
        }
        if(StringUtils.isNotBlank(appId)){
            app.setAppId(appId);
        }

        if(!StringUtils.equals(appId,app.getAppId())||!StringUtils.equals(appSecret,app.getAppSecret())){
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
        // app.setAppLogo(appLogo);
        appService.update(app);
        // 订阅模板的更新
        SubscriptionTemplate subscriptionTemplate = subscriptionTemplateService.find(1L);
        if(subscriptionTemplate!=null){
            SubscriptionTemplate subscriptionTemplate1 = new SubscriptionTemplate();
            subscriptionTemplate1.setTemplateId(templateId);
            subscriptionTemplate1.setParam(subscriptionTemplate.getParam());
            subscriptionTemplate1.setApp(app);
            subscriptionTemplateService.save(subscriptionTemplate1);
        }
        // 默认的会员等级问题
        MemberRank defaultMemberRank = memberRankService.findDefault(app);
        if(defaultMemberRank==null){
            defaultMemberRank = new MemberRank();
            defaultMemberRank.setApp(app);
            defaultMemberRank.setIsDefault(true);
            defaultMemberRank.setName("默认");
            defaultMemberRank.setAmount(BigDecimal.ONE);
            defaultMemberRank.setPoint(0L);
            defaultMemberRank.setIsSpecial(false);
            memberRankService.save(defaultMemberRank);
        }


        return Result.success("操作成功");
    }


    @PostMapping("/ads")
    public Result ads(HttpServletRequest request,Long id){
        Admin admin = adminService.get(request);
        if(admin==null){
            return Result.error("非法访问");
        }
        App app = admin.getApp();
        if(id!=null){
            if(!admin.getIsAdmin()){
                return Result.error("非法访问");
            }
            app = appService.find(id);
        }
        if(app==null){
            return Result.error("非法访问");
        }
        return Result.success(app.getAppAd().getAds());
    }

    @PostMapping("/adsUpdate")
    public Result adsUpdate(HttpServletRequest request, String ads,Long id){
        Admin admin = adminService.get(request);
        if(admin==null){
            return Result.error("非法访问");
        }
        App app = admin.getApp();
        if(id!=null){
            if(!admin.getIsAdmin()){
                return Result.error("非法访问");
            }
            app = appService.find(id);
        }
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
        // appConfig.setConfig(config);
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

    @PostMapping("/get")
    public Result get(HttpServletRequest request,String type,Long id){
        Admin admin = adminService.get(request);
        if(admin==null){
            return Result.error("非法访问");
        }
        App app = appService.find(id);
        if(app==null){
            return Result.error("非法访问");
        }
        if(!admin.getIsAdmin()&&app.getAdmin()!=admin){
            return Result.error("非法访问");
        }

        Map<String,Object> data = new HashMap<>();
        AppConfig appConfig = app.getAppConfig();
        if(appConfig==null){
            appConfig = new AppConfig();
        }
        if(StringUtils.equals("base",type)){
            data.put("appName", app.getAppName());
            data.put("logo", app.getLogo());
            data.put("appId", app.getAppId());
            data.put("appSecret", app.getAppSecret());
            data.put("status", app.getStatus());
        }else if(StringUtils.equals("ad",type)){
            data.putAll(app.getAppAd().getAds());
        }else if(StringUtils.equals("share",type)){
            data.put("shareText",appConfig.get("shareText"));
            data.put("shareImage",appConfig.get("shareImage"));
        }
        return Result.success(data);
    }

    @PostMapping("/shareUpdate")
    public Result shareUpdate(HttpServletRequest request,Long id, String shareText,String shareImage){
        Admin admin = adminService.get(request);
        if(admin==null){
            return Result.error("非法访问");
        }
        App app = appService.find(id);
        if(app==null){
            return Result.error("非法访问");
        }
        if(!admin.getIsAdmin()&&app.getAdmin()!=admin){
            return Result.error("非法访问");
        }
        AppConfig appConfig = app.getAppConfig();
        if(appConfig == null){
            appConfig = new AppConfig();
            appConfig.setApp(app);
            appConfig.setConfig(new HashMap<>());
        }
        appConfig.getConfig().put("shareText",shareText);
        appConfig.getConfig().put("shareImage",shareImage);
        app.setAppConfig(appConfig);
        appService.update(app);
        return Result.success("操作成功");
    }


    @PostMapping("/members")
    @JsonView(BaseEntity.PageView.class)
    public Result members(HttpServletRequest request,String type,Long id,Integer current,Integer pageSize){
        Admin admin = adminService.get(request);
        if(admin==null){
            return Result.error("非法访问");
        }
        App app = appService.find(id);
        if(app==null){
            return Result.error("非法访问");
        }
        if(!admin.getIsAdmin()&&app.getAdmin()!=admin){
            return Result.error("非法访问");
        }
        return Result.success(memberService.findPage(new Pageable(current,pageSize),app));
    }

    @PostMapping("/products")
    @JsonView(BaseEntity.PageView.class)
    public Result products(HttpServletRequest request,Long id,Integer current,Integer pageSize){
        Admin admin = adminService.get(request);
        if(admin==null){
            return Result.error("非法访问");
        }
        App app = appService.find(id);
        if(app==null){
            return Result.error("非法访问");
        }
        if(!admin.getIsAdmin()&&app.getAdmin()!=admin){
            return Result.error("非法访问");
        }
        return Result.success(productService.findPage(app,new Pageable(current,pageSize)));
    }


    @PostMapping("/productCategories")
    @JsonView(BaseEntity.PageView.class)
    public Result productCategories(HttpServletRequest request,Long id){
        Admin admin = adminService.get(request);
        if(admin==null){
            return Result.error("非法访问");
        }
        App app = appService.find(id);
        if(app==null){
            return Result.error("非法访问");
        }
        if(!admin.getIsAdmin()&&app.getAdmin()!=admin){
            return Result.error("非法访问");
        }
        return Result.success(productCategoryService.findList(app));
    }


    @PostMapping("/other")
    public Result other(HttpServletRequest request,Long id){
        Admin admin = adminService.get(request);
        if(admin==null){
            return Result.error("非法访问");
        }
        App app = admin.getApp();
        if(id!=null){
            if(!admin.getIsAdmin()){
                return Result.error("非法访问");
            }
            app = appService.find(id);
        }
        if(app==null){
            return Result.error("非法访问");
        }
        return Result.success(app.getAppConfig().getConfig());
    }

    @PostMapping("/otherUpdate")
    public Result otherUpdate(HttpServletRequest request,Long id,String otherConfig){
        Admin admin = adminService.get(request);
        if(admin==null){
            return Result.error("非法访问");
        }
        App app = admin.getApp();
        if(id!=null){
            if(!admin.getIsAdmin()){
                return Result.error("非法访问");
            }
            app = appService.find(id);
        }
        if(app==null){
            return Result.error("非法访问");
        }

        Map<String,Object> config = JsonUtils.toObject(otherConfig, new TypeReference<Map<String, Object>>() {
        });
        AppConfig appConfig = app.getAppConfig();
        if(appConfig==null){
            appConfig = new AppConfig();

        }
        appConfig.getConfig().putAll(config);
        app.setAppConfig(appConfig);
        appService.update(app);
        return Result.success("操作成功");
    }
}
