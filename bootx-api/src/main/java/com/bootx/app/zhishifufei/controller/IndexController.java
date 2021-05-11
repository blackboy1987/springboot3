package com.bootx.app.zhishifufei.controller;

import com.bootx.app.zhishifufei.pojo.All;
import com.bootx.app.zhishifufei.pojo.GetList;
import com.bootx.app.zhishifufei.pojo.LunBo;
import com.bootx.app.zhishifufei.pojo.Type;
import com.bootx.common.Result;
import com.bootx.entity.App;
import com.bootx.service.AppService;
import com.bootx.util.JsonUtils;
import com.bootx.util.WebUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController("apiZhiShiFuFeiController")
@RequestMapping("/api/zhishifufei")
public class IndexController {

    private static final String baseUrl="https://www.yunxiaoxu.shop/App/zm/";

    @Resource
    private AppService appService;

    /**
     * 获取小程序配置
     * @param request
     * @return
     */
    @GetMapping("/config")
    public Result config(HttpServletRequest request){
        App app = appService.get(request);
        if(app==null){
            return Result.error("非法访问");
        }
        Map<String,Object> data = new HashMap<>();
        data.put("name",app.getAppName());
        data.put("status",app.getStatus());
        data.put("logo",app.getLogo());
        data.put("config",app.getAppConfig().getConfig());
        data.put("ads",app.getAppAd().getAds());
        return Result.success(data);
    }

    @GetMapping("/lunbo")
    public Result lunbo(HttpServletRequest request){
        App app = appService.get(request);
        if(app==null){
            return Result.error("非法访问");
        }
        String result = WebUtils.get(baseUrl + "lunbo",null);
        LunBo lunBo = JsonUtils.toObject(result, LunBo.class);
        return Result.success(lunBo.getSlun());
    }

    @PostMapping("/all")
    public Result all(HttpServletRequest request,Integer page){
        if(page==null){
            page = 1;
        }
        Integer nextrow = (page-1)*10;
        App app = appService.get(request);
        if(app==null){
            return Result.error("非法访问");
        }
        Map<String,Object> params = new HashMap<>();
        params.put("nextrow",nextrow);
        String result = WebUtils.post(baseUrl + "all",params);
        All all = JsonUtils.toObject(result, All.class);
        return Result.success(all.getMsg());
    }

    @GetMapping("/type")
    public Result type(HttpServletRequest request){
        App app = appService.get(request);
        if(app==null){
            return Result.error("非法访问");
        }
        String result = WebUtils.get(baseUrl + "type",null);
        Type type = JsonUtils.toObject(result, Type.class);
        return Result.success(type.getMsg());
    }



    @PostMapping("/leibiao")
    public Result leibiao(HttpServletRequest request,Integer page,Long tid){
        if(page==null){
            page = 1;
        }
        Integer nextrow = (page-1)*10;
        App app = appService.get(request);
        if(app==null){
            return Result.error("非法访问");
        }
        Map<String,Object> params = new HashMap<>();
        params.put("nextrow",nextrow);
        params.put("tid",tid);
        String result = WebUtils.post(baseUrl + "leibiao",params);
        All all = JsonUtils.toObject(result, All.class);
        return Result.success(all.getMsg());
    }

    @PostMapping("/getlist")
    public Result getlist(HttpServletRequest request,Long tid){
        App app = appService.get(request);
        if(app==null){
            return Result.error("非法访问");
        }
        Map<String,Object> params = new HashMap<>();
        params.put("tid",tid);
        String result = WebUtils.post(baseUrl + "getlist",params);
        GetList all = JsonUtils.toObject(result, GetList.class);
        return Result.success(all.getMsg());
    }

}
