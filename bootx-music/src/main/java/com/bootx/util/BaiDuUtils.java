package com.bootx.util;

import com.bootx.util.baidu.AccessToken;
import com.bootx.util.baidu.QuotaResponse;

import java.util.HashMap;
import java.util.Map;

/**
 * https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=XFk1Mdo3tkcmXZjCEuiE8unmrUFPy1if&client_secret=3OGCb8lLMyrZQZCF9L0G1oTarFMo7Bmm
 */
public final class BaiDuUtils {

    public static AccessToken getAccessToken(){
        String result = WebUtils.get("https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=XFk1Mdo3tkcmXZjCEuiE8unmrUFPy1if&client_secret=3OGCb8lLMyrZQZCF9L0G1oTarFMo7Bmm&scope=basic,netdisk",null);
        return JsonUtils.toObject(result,AccessToken.class);

    }

    public static AccessToken getAccessToken1(){
        String result = WebUtils.get("https://openapi.baidu.com/oauth/2.0/authorize?response_type=token&client_id=L6g70tBRRIXLsY0Z3HwKqlRE&redirect_uri=oob&scope=netdisk",null);
        return JsonUtils.toObject(result,AccessToken.class);

    }

    public static AccessToken refreshAccessToken(String refreshToken){
        String result = WebUtils.get("https://aip.baidubce.com/oauth/2.0/token?grant_type=refresh_token&refresh_token="+refreshToken+"&client_id=XFk1Mdo3tkcmXZjCEuiE8unmrUFPy1if&client_secret=3OGCb8lLMyrZQZCF9L0G1oTarFMo7Bmm",null);
        return JsonUtils.toObject(result,AccessToken.class);
    }


    /**
     * 获取网盘容量信息
     */
    public static QuotaResponse quota(){
        String url ="https://pan.baidu.com/api/quota";
        Map<String,Object> params = new HashMap<>();
        params.put("access_token","123.f05a67bfd7ea77a29b48e8cdf1e7d962.YQASShAl1kH7IgRX3usJLo9stmemittMZBhky_O._hnUuA");
        params.put("checkfree",1);
        params.put("checkexpire",1);
        String s = WebUtils.get(url, params);
        System.out.println(s);
        return JsonUtils.toObject(s, QuotaResponse.class);
    }


    public static void main(String[] args) {
        AccessToken accessToken1 = getAccessToken1();
        System.out.println(accessToken1);
    }


}
