package com.webpage;

import com.fasterxml.jackson.core.type.TypeReference;

import java.util.HashMap;
import java.util.Map;

public class Demo {

    public static void main(String[] args) {
        String url="http://cb.nbxkyl.site/OES/techcomp/ria/commonProcessor?page=base-sysCopyMrg-sysCopy&menuId=101003100305";

        String header = "{\"header\":{\"code\":0,\"message\":{\"title\":\"\",\"detail\":\"\"}},\"body\":{\"dataStores\":{\"sysCopy\":{\"rowSet\":{\"primary\":[{\"_t\":1}],\"filter\":[],\"delete\":[]},\"name\":\"sysCopy\",\"pageNumber\":1,\"pageSize\":2147483647,\"recordCount\":0,\"rowSetName\":\"com.viewhigh.vadp.framework.org.entity.SysCopy\"}},\"parameters\":{\"_parameters\":\"sysCopy\",\"_parameterTypes\":\"pojo\",\"dcID\":\"base\",\"_boId\":\"base_SysCopyBOImpl_bo\",\"_methodName\":\"selectSysCopyByPage\",\"_methodParameterTypes\":\"com.viewhigh.vadp.framework.org.entity.SysCopy\",\"_pageNumber\":1,\"_pageSize\":100,\"_calcRecordCount\":true,\"nom\":\"selectSysCopy\"}}}";

        Map<String,Object> parameter = JsonUtils.toObject(header, new TypeReference<Map<String, Object>>() {
        });

        Map<String,String> headers = new HashMap<>();
        headers.put("Host","cb.nbxkyl.site");
        headers.put("Origin","http://cb.nbxkyl.site");
        headers.put("Referer","http://cb.nbxkyl.site/OES/user/");
        headers.put("Cookie","JSESSIONID=89F08FE5E8B615519E8F16BBAD1AF705; _PK_2=%7B%22user_account%22%3A%222%22%2C%22comp_code%22%3A%221001%22%2C%22copy_code%22%3A%22202%22%2C%22check_data%22%3A%22true%22%7D; theme=light; 2_LastMod=common; 2_MenuId=101003100305");

        String result = WebUtils.postBody(url, parameter, headers);
        System.out.println(result);
    }

}
