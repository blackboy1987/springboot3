package com.bootx.util.baidu;

import com.bootx.util.JsonUtils;
import com.bootx.util.WebUtils;
import com.bootx.util.baidu.response.AccessToken;
import com.bootx.util.baidu.response.FileListResponse;
import com.bootx.util.baidu.response.QuotaResponse;

import java.util.HashMap;
import java.util.Map;

/**
 * https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=XFk1Mdo3tkcmXZjCEuiE8unmrUFPy1if&client_secret=3OGCb8lLMyrZQZCF9L0G1oTarFMo7Bmm
 */
public final class BaiDuUtils {

    private static final String accessToken = "123.05ed2063abf9fe683c96cf7c06953398.YgSYBHyMzwUS7h8PryQxXhCKjreAldx61rGpl-n.TYiHgQ";

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
        params.put("access_token",accessToken);
        params.put("checkfree",1);
        params.put("checkexpire",1);
        String s = WebUtils.get(url, params);
        System.out.println(s);
        return JsonUtils.toObject(s, QuotaResponse.class);
    }

    public static FileListResponse fileList(){
        String url ="https://pan.baidu.com/rest/2.0/xpan/file?method=list";
        Map<String,Object> params = new HashMap<>();
        params.put("access_token",accessToken);
        /**
         *需要list的目录，以/开头的绝对路径, 默认为/
         */
        params.put("dir","/有声小说/言情小说/李野默_八月桂花遍地开（70回）");
        /**
         *排序字段：默认为name
         * time表示先按文件类型排序，后按修改时间排序
         * name表示先按文件类型排序，后按文件名称排序
         * size表示先按文件类型排序， 后按文件大小排序
         */
        params.put("order","time");
        /**
         *该KEY存在为降序，否则为升序 （注：排序的对象是当前目录下所有文件，不是当前分页下的文件）
         */
        params.put("desc","desc");
        /**
         *起始位置，从0开始
         */
        params.put("start",0);
        /**
         *每页条目数，默认为1000，最大值为10000
         */
        params.put("limit",1000);
        /**
         *值为web时， 返回dir_empty属性 和 缩略图数据
         */
        params.put("web","web");
        /**
         *是否只返回文件夹，0 返回所有，1 只返回目录条目，且属性只返回path字段。
         */
        params.put("folder",0);
        /**
         *是否返回 dir_empty 属性，0 不返回，1 返回
         */
        params.put("showempty",1);
        String s = WebUtils.get(url, params);
        System.out.println(s);
        return JsonUtils.toObject(s, FileListResponse.class);
    }


    public static void main(String[] args) {
        FileListResponse fileListResponse = fileList();
        System.out.println(fileListResponse);
    }


}
