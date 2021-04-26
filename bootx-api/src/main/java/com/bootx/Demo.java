package com.bootx;

import com.bootx.util.JsonUtils;
import com.bootx.util.WebUtils;
import com.fasterxml.jackson.core.type.TypeReference;

import java.util.HashMap;
import java.util.Map;

public class Demo {

    public static void main(String[] args) {
        String url="http://cb.nbxkyl.site/OES/techcomp/ria/commonProcessor?page=dict-deptCostDictExternalRelaMgr&menuId=1050010510";

        String header = "{\"header\":{\"code\":0,\"message\":{\"title\":\"\",\"detail\":\"\"}},\"body\":{\"dataStores\":{},\"parameters\":{\"map\":{\"compCode\":\"1001\",\"isLast\":1},\"_parameters\":\"map(compCode,isLast)\",\"_parameterTypes\":\"map(string,string)\",\"dcID\":\"dict\",\"_boId\":\"deptBase_ComboBoxBOImpl_bo\",\"_methodName\":\"getSysDeptAll\",\"_methodParameterTypes\":\"java.util.Map\",\"nom\":\"getSysDeptByComp\"}}}";


        Map<String,Object> parameter = JsonUtils.toObject(header, new TypeReference<Map<String, Object>>() {
        });

        Map<String,String> headers = new HashMap<>();
        headers.put("Host","cb.nbxkyl.site");
        headers.put("Origin","http://cb.nbxkyl.site");
        headers.put("Referer","http://cb.nbxkyl.site/OES/user/");
        headers.put("Cookie","JSESSIONID=5007AA4DBAC4D7F0A62A923B37926C8E; _PK_2=%7B%22user_account%22%3A%222%22%2C%22comp_code%22%3A%221001%22%2C%22copy_code%22%3A%22202%22%2C%22check_data%22%3A%22true%22%7D; theme=light; 2_LastMod=dept; 2_MenuId=1050010510");

        String result = WebUtils.postBody(url, parameter, headers);
        System.out.println(result);
    }

}
