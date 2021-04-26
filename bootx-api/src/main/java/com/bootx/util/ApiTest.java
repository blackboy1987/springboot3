package com.bootx.util;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

public class ApiTest {

    //普通短信
    private void sendsms() throws UnsupportedEncodingException {
        String accessKey = "dxwblackboy1987"; //用户开发key
        String accessSecret = "8226A146350519B335244B8F0228"; //用户开发秘钥

        Map<String,Object> params = new HashMap<>();
        params.put("accesskey",accessKey);
        params.put("secret",accessSecret);
        params.put("sign","bootx");
        params.put("mobile","19971579891");
        params.put("templateId","212756");
        params.put("content", URLEncoder.encode("您的小程序：##黎夏剧场##信息正在被##admin##账号修改，如不是本人操作，请登录平台（https://www.igomall.xin），进行修改密码。","utf-8"));


        Object o = WebUtils.postBody("http://api.1cloudsp.com/api/v2/single_send", params);
        System.out.println(o);
    }

    public static void main(String[] args) throws Exception {
        ApiTest t = new ApiTest();
        //普通短信
        t.sendsms();
    }
}