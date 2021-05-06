package com.bootx.util;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

public class SmsUtils {
    private static final String accessKey = "dxwblackboy1987"; //用户开发key
    private static final String accessSecret = "8226A146350519B335244B8F0228"; //用户开发秘钥
    private static final String SEND_URL="http://api.1cloudsp.com/api/v2/single_send";

    public static String send(String mobile,String code){
        String result = "";
       try {
           Map<String,Object> params = new HashMap<>();
           params.put("accesskey",accessKey);
           params.put("secret",accessSecret);
           params.put("sign","【爱购商城科技】");
           params.put("mobile",mobile);
           params.put("templateId","64099");
           params.put("content", URLEncoder.encode(code,"utf-8"));
           result = WebUtils.postBody(SEND_URL, params);
       }catch (Exception ignored){

       }
        return result;
    }

    //普通短信
    private void sendsms() throws UnsupportedEncodingException {



        // http://api.1cloudsp.com/api/v2/single_send?accesskey=dxwblackboy1987&secret=8226A146350519B335244B8F0228&sign=【爱购商城科技】&templateId=64099&mobile=19971579891&content=1234
        Map<String,Object> params = new HashMap<>();
        params.put("accesskey",accessKey);
        params.put("secret",accessSecret);
        params.put("sign","【爱购商城科技】");
        params.put("mobile","19971579891");
        params.put("templateId","64099");
        params.put("content", URLEncoder.encode("1234","utf-8"));


        Object o = WebUtils.postBody(SEND_URL, params);
        System.out.println(o);
    }

    public static void main(String[] args) throws Exception {
        SmsUtils t = new SmsUtils();
        //普通短信
        t.sendsms();
    }
}