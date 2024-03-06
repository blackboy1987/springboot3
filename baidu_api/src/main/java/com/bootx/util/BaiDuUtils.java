package com.bootx.util;

import com.bootx.pojo.*;
import com.fasterxml.jackson.core.type.TypeReference;
import org.apache.commons.lang3.StringUtils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

public class BaiDuUtils {

    public static final String token = "";

    private static final String appKey = "I5CqOku7s1jjNpSQ2uMS4Kzzx7Sz6yzv";

    private static final String appId = "25599902";

    private static final String secretKey = "VwSQA3kIB5jqXHeCcLNB7KxOGFU6lNg4";

    private static final String signKey = "r*kksd-pqT*DTe6nf4ZoQ6V$AJ$AE%Jr";

    private static final String shareSecret = "ShareSecret";

    private static final String shareThirdld = "2080";

    public static String getCode(){
        String url="http://openapi.baidu.com/oauth/2.0/authorize?response_type=code&client_id="+appKey+"&redirect_uri=oob&scope=basic,netdisk&device_id="+appId;
        System.out.println(url);
        return "ec04f93409aa376e6578d5a161ebd47e";
    }


    public static BaiDuAccessToken getToken(){
        String code = getCode();
        String url="https://openapi.baidu.com/oauth/2.0/token?grant_type=authorization_code&code="+code+"&client_id="+appKey+"&client_secret="+secretKey+"&redirect_uri=oob";
        String s = WebUtils.get(url,null);
        System.out.println(s);
        return JsonUtils.toObject(s,new TypeReference<BaiDuAccessToken>(){});
    }

    public static BaiDuAccessToken refreshToken(String token) {
        String url="https://openapi.baidu.com/oauth/2.0/token?grant_type=refresh_token&refresh_token="+token+"&client_id="+appKey+"&client_secret="+secretKey;
        String s = WebUtils.get(url,null);
        System.out.println(s);
        return JsonUtils.toObject(s,new TypeReference<BaiDuAccessToken>(){});
    }


    /**
     * 获取用户信息
     * @param token
     * @return
     */
    public static UinfoPojo uinfo(String token) {
        String url="https://pan.baidu.com/rest/2.0/xpan/nas?method=uinfo&access_token="+token;
        String s = WebUtils.get(url,null);
        System.out.println(s);
        return JsonUtils.toObject(s, new TypeReference<UinfoPojo>() {
        });
    }

    /**
     * 获取网盘容量信息
     * @param token
     * @return
     */
    public static QuotaPojo quota(String token) {
        String url="https://pan.baidu.com/api/quota?checkfree=1&checkexpire=1&access_token="+token;
        String s = WebUtils.get(url,null);
        System.out.println(s);
        return JsonUtils.toObject(s, new TypeReference<QuotaPojo>() {
        });
    }

    /**
     * 获取网盘容量信息
     * @param token
     * @return
     */
    public static FileListPojo fileList(String token,String dir) {
        if(StringUtils.isBlank(dir)){
            dir = "/短剧";
        }

        String url = "https://pan.baidu.com/rest/2.0/xpan/file?method=list&dir="+dir+"&order=time&start=0&limit=1000&web=web&folder=0&access_token="+token+"&desc=1";
        try {
            URL url1 = new URL(url);
            HttpURLConnection conn = (HttpURLConnection) url1.openConnection();
            conn.setRequestMethod("GET");
            BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();
            return JsonUtils.toObject(response.toString(), new TypeReference<FileListPojo>() {
            });
        }catch (Exception e){
            FileListPojo fileListPojo = new FileListPojo();
            fileListPojo.setErrmsg(e.getMessage());
            return fileListPojo;
        }
    }

    /**
     * 获取文档列表
     * @param token
     * @param dir
     * @return
     */
    public static DocListPojo docList(String token,String dir) {
        if(StringUtils.isBlank(dir)){
            dir = "/短剧";
        }

        String url = "https://pan.baidu.com/rest/2.0/xpan/file?method=doclist&parent_path="+dir+"&order=time&page=1&num=1000&web=1&folder=0&access_token="+token+"&desc=0";
        try {
            URL url1 = new URL(url);
            HttpURLConnection conn = (HttpURLConnection) url1.openConnection();
            conn.setRequestMethod("GET");
            BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();
            System.out.println(response.toString());

            return JsonUtils.toObject(response.toString(), new TypeReference<DocListPojo>() {
            });
        }catch (Exception e){
            DocListPojo fileListPojo = new DocListPojo();
            fileListPojo.setErrmsg(e.getMessage());
            return fileListPojo;
        }
    }

    /**
     * 获取图片列表
     * @param token
     * @param dir
     * @return
     */
    public static ImageListPojo imageList(String token, String dir) {
        if(StringUtils.isBlank(dir)){
            dir = "/短剧";
        }

        String url = "https://pan.baidu.com/rest/2.0/xpan/file?method=imagelist&parent_path="+dir+"&order=time&page=1&num=1000&web=1&folder=0&access_token="+token+"&desc=0";
        try {
            URL url1 = new URL(url);
            HttpURLConnection conn = (HttpURLConnection) url1.openConnection();
            conn.setRequestMethod("GET");
            BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();
            System.out.println(response.toString());

            return JsonUtils.toObject(response.toString(), new TypeReference<ImageListPojo>() {
            });
        }catch (Exception e){
            ImageListPojo fileListPojo = new ImageListPojo();
            fileListPojo.setErrmsg(e.getMessage());
            return fileListPojo;
        }
    }
    /**
     * 获取视频列表
     * @param token
     * @param dir
     * @return
     */
    public static FileListPojo videoList(String token,String dir) {
        if(StringUtils.isBlank(dir)){
            dir = "/短剧";
        }

        String url = "https://pan.baidu.com/rest/2.0/xpan/file?method=videolist&parent_path="+dir+"&order=time&page=1&num=1000&web=1&folder=0&access_token="+token+"&desc=0";
        try {
            URL url1 = new URL(url);
            HttpURLConnection conn = (HttpURLConnection) url1.openConnection();
            conn.setRequestMethod("GET");
            BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();
            System.out.println(response.toString());

            return JsonUtils.toObject(response.toString(), new TypeReference<FileListPojo>() {
            });
        }catch (Exception e){
            FileListPojo fileListPojo = new FileListPojo();
            fileListPojo.setErrmsg(e.getMessage());
            return fileListPojo;
        }
    }

    /**
     * 获取bt列表
     * @param token
     * @param dir
     * @return
     */
    public static BtListPojo btList(String token,String dir) {
        if(StringUtils.isBlank(dir)){
            dir = "/短剧";
        }

        String url = "https://pan.baidu.com/rest/2.0/xpan/BtListPojo?method=doclist&parent_path="+dir+"&order=time&page=1&num=1000&web=1&folder=0&access_token="+token+"&desc=0";
        try {
            URL url1 = new URL(url);
            HttpURLConnection conn = (HttpURLConnection) url1.openConnection();
            conn.setRequestMethod("GET");
            BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();
            System.out.println(response.toString());

            return JsonUtils.toObject(response.toString(), new TypeReference<BtListPojo>() {
            });
        }catch (Exception e){
            BtListPojo fileListPojo = new BtListPojo();
            fileListPojo.setErrmsg(e.getMessage());
            return fileListPojo;
        }
    }


    /**
     * 获取分类文件总个数
     * @param token
     * @param dir
     *      目录名称，为空时，parent_path = "/" && recursion = 1
     * @param category
     *      文件类型，1 视频、2 音频、3 图片、4 文档、5 应用、6 其他、7 种子
     * @param recursion
     *      是否递归，0 不递归、1 递归，默认0
     * @return
     */
    public static BtListPojo categoryInfo(String token,String dir,Integer category,Integer recursion) {
        if(StringUtils.isBlank(dir)){
            dir = "/短剧";
        }

        String url = "http://pan.baidu.com/api/categoryinfo?parent_path="+dir+"&category="+category+"&recursion="+recursion+"&access_token="+token+"&desc=0";
        try {
            URL url1 = new URL(url);
            HttpURLConnection conn = (HttpURLConnection) url1.openConnection();
            conn.setRequestMethod("GET");
            BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();
            System.out.println(response.toString());

            return JsonUtils.toObject(response.toString(), new TypeReference<BtListPojo>() {
            });
        }catch (Exception e){
            BtListPojo fileListPojo = new BtListPojo();
            fileListPojo.setErrmsg(e.getMessage());
            return fileListPojo;
        }
    }

    /**
     * 获取分类文件总个数
     * @param token
     * @param dir
     *      目录名称，为空时，parent_path = "/" && recursion = 1
     * @param category
     *      文件类型，1 视频、2 音频、3 图片、4 文档、5 应用、6 其他、7 种子
     * @param recursion
     *      是否递归，0 不递归、1 递归，默认0
     * @return
     */
    public static CategoryListPojo categoryList(String token,String dir,Integer category,Integer recursion) {
        if(StringUtils.isBlank(dir)){
            dir = "/短剧";
        }
        String url = "http://pan.baidu.com/rest/2.0/xpan/multimedia?method=categorylist?parent_path="+dir+"&category="+category+"&recursion="+recursion+"&access_token="+token+"&desc=0";
        try {
            URL url1 = new URL(url);
            HttpURLConnection conn = (HttpURLConnection) url1.openConnection();
            conn.setRequestMethod("GET");
            BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();
            System.out.println(response.toString());

            return JsonUtils.toObject(response.toString(), new TypeReference<CategoryListPojo>() {
            });
        }catch (Exception e){
            CategoryListPojo fileListPojo = new CategoryListPojo();
            fileListPojo.setErrmsg(e.getMessage());
            return fileListPojo;
        }
    }


    public static FileMetasPojo filemetas(String token,String fsids) {
        String url = "http://pan.baidu.com/rest/2.0/xpan/multimedia?method=filemetas&fsids="+fsids+"&dlink=1&thumb=1&access_token="+token+"&extra=1&needmedia=1&detail=1";
        try {
            URL url1 = new URL(url);
            HttpURLConnection conn = (HttpURLConnection) url1.openConnection();
            conn.setRequestMethod("GET");
            BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();
            System.out.println(response.toString());
            return JsonUtils.toObject(response.toString(), new TypeReference<FileMetasPojo>() {
            });
        }catch (Exception e){
            FileMetasPojo fileListPojo = new FileMetasPojo();
            fileListPojo.setErrmsg(e.getMessage());
            return fileListPojo;
        }
    }


    public static void main(String[] args) {
        String accessToken="121.2e7b421ed8e6bb7c77099f5dcc4d252c.YHXdtDdCTgICZA5f98AwZ2fG_TsZ_fXFlpSyzRL.sxWUzw";
        filemetas(accessToken,"[882820963403436]");
    }
}
