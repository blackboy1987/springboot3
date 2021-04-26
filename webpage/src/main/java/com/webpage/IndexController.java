package com.webpage;

import com.webpage.request.HeaderJson;
import com.webpage.response.JsonRootBean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class IndexController {


    @GetMapping
    public JsonRootBean get (@RequestBody HeaderJson headerJson){
        String url="http://cb.nbxkyl.site/OES/techcomp/ria/commonProcessor?page=dict-deptCostDictExternalRelaMgr&menuId=1050010510";

        Map<String,Object> params = new HashMap<>();
        params.put("header",headerJson.getHeader());
        params.put("body",headerJson.getBody());
        Map<String,String> headers = new HashMap<>();
        headers.put("Host","cb.nbxkyl.site");
        headers.put("Origin","http://cb.nbxkyl.site");
        headers.put("Referer","http://cb.nbxkyl.site/OES/user/");
        headers.put("Cookie","JSESSIONID=5007AA4DBAC4D7F0A62A923B37926C8E; _PK_2=%7B%22user_account%22%3A%222%22%2C%22comp_code%22%3A%221001%22%2C%22copy_code%22%3A%22202%22%2C%22check_data%22%3A%22true%22%7D; theme=light; 2_LastMod=dept; 2_MenuId=1050010510");
        String result = WebUtils.postBody(url,params,headers);
        JsonRootBean jsonRootBean = JsonUtils.toObject(result, JsonRootBean.class);
        return  jsonRootBean;
    }

    @PostMapping
    public JsonRootBean post (@RequestBody HeaderJson headerJson){
        String url="http://cb.nbxkyl.site/OES/techcomp/ria/commonProcessor?page=dict-deptCostDictExternalRelaMgr&menuId=1050010510";

        Map<String,Object> params = new HashMap<>();
        params.put("header",headerJson.getHeader());
        params.put("body",headerJson.getBody());
        Map<String,String> headers = new HashMap<>();
        headers.put("Host","cb.nbxkyl.site");
        headers.put("Origin","http://cb.nbxkyl.site");
        headers.put("Referer","http://cb.nbxkyl.site/OES/user/");
        headers.put("Cookie","JSESSIONID=5007AA4DBAC4D7F0A62A923B37926C8E; _PK_2=%7B%22user_account%22%3A%222%22%2C%22comp_code%22%3A%221001%22%2C%22copy_code%22%3A%22202%22%2C%22check_data%22%3A%22true%22%7D; theme=light; 2_LastMod=dept; 2_MenuId=1050010510");
        String result = WebUtils.postBody(url,params,headers);
        JsonRootBean jsonRootBean = JsonUtils.toObject(result, JsonRootBean.class);
        return  jsonRootBean;
    }

}
