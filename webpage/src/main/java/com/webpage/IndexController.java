package com.webpage;

import com.webpage.request.HeaderJson;
import com.webpage.response.JsonRootBean;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class IndexController {


    @GetMapping
    public JsonRootBean get (String headerJsonStr,String page,String menuId,String cookie){
        String url="http://cb.nbxkyl.site/OES/techcomp/ria/commonProcessor?page="+page+"&menuId="+menuId;


        HeaderJson headerJson = JsonUtils.toObject(headerJsonStr,HeaderJson.class);
        Map<String,Object> params = new HashMap<>();
        params.put("header",headerJson.getHeader());
        params.put("body",headerJson.getBody());
        Map<String,String> headers = new HashMap<>();
        headers.put("Host","cb.nbxkyl.site");
        headers.put("Origin","http://cb.nbxkyl.site");
        headers.put("Referer","http://cb.nbxkyl.site/OES/user/");
        headers.put("Cookie",cookie);
        String result = WebUtils.postBody(url,params,headers);
        JsonRootBean jsonRootBean = JsonUtils.toObject(result, JsonRootBean.class);
        return  jsonRootBean;
    }

    @PostMapping
    public JsonRootBean post (String headerJsonStr,String page,String menuId,String cookie){
        String url="http://cb.nbxkyl.site/OES/techcomp/ria/commonProcessor?page="+page+"&menuId="+menuId;


        HeaderJson headerJson = JsonUtils.toObject(headerJsonStr,HeaderJson.class);
        Map<String,Object> params = new HashMap<>();
        params.put("header",headerJson.getHeader());
        params.put("body",headerJson.getBody());
        Map<String,String> headers = new HashMap<>();
        headers.put("Host","cb.nbxkyl.site");
        headers.put("Origin","http://cb.nbxkyl.site");
        headers.put("Referer","http://cb.nbxkyl.site/OES/user/");
        headers.put("Cookie",cookie);
        String result = WebUtils.postBody(url,params,headers);
        JsonRootBean jsonRootBean = JsonUtils.toObject(result, JsonRootBean.class);
        return  jsonRootBean;
    }

}
