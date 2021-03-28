package com.bootx.util;


import org.apache.commons.lang3.StringUtils;

import java.util.HashMap;
import java.util.Map;

/**
 * https://ting55.com
 */
public class Ting55Utils {

    public static String getResourceUrl(String url){
        Map<String,Object> params = new HashMap();
        params.put("bookId", 14918);
        params.put("isPay", 10);
        params.put("page", 8);
        Map<String,String> headers = new HashMap<>();
        headers.put("Referer", " https://ting55.com/book/14933-3");
        headers.put("X-Requested-With", "XMLHttpRequest");
        headers.put("xt", "c6e3be1820b8e62be15514099ddf1bb2");
        String result = WebUtils.post(url,params,headers);
        System.out.println(result);

        return result;
    }

    public static void main(String[] args) {
        getResourceUrl("https://ting55.com/glink");
    }


}
