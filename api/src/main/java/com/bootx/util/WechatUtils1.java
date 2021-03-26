package com.bootx.util;

import com.bootx.util.wechat.AccessToken;
import com.bootx.util.wechat.AccessToken1;
import com.bootx.util.wechat.WechatQRCode;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpEntity;
import org.apache.http.ParseException;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.config.RegistryBuilder;
import org.apache.http.conn.socket.ConnectionSocketFactory;
import org.apache.http.conn.socket.PlainConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.util.EntityUtils;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.springframework.util.Assert;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.util.*;

public final class WechatUtils1 {

    private static final String APPID = "wx334733aa32708827";

    private static final String APPSECRET = "3eb62f47d6e23698c000da747ce5cede";

    /**
     * PoolingHttpClientConnectionManager
     */
    private static final PoolingHttpClientConnectionManager HTTP_CLIENT_CONNECTION_MANAGER;

    /**
     * CloseableHttpClient
     */
    private static final CloseableHttpClient HTTP_CLIENT;

    static {
        HTTP_CLIENT_CONNECTION_MANAGER = new PoolingHttpClientConnectionManager(RegistryBuilder.<ConnectionSocketFactory>create().register("http", PlainConnectionSocketFactory.getSocketFactory()).register("https", SSLConnectionSocketFactory.getSocketFactory()).build());
        HTTP_CLIENT_CONNECTION_MANAGER.setDefaultMaxPerRoute(100);
        HTTP_CLIENT_CONNECTION_MANAGER.setMaxTotal(200);
        RequestConfig requestConfig = RequestConfig.custom().setConnectionRequestTimeout(60000).setConnectTimeout(60000).setSocketTimeout(60000).build();
        HTTP_CLIENT = HttpClientBuilder.create().setConnectionManager(HTTP_CLIENT_CONNECTION_MANAGER).setDefaultRequestConfig(requestConfig).build();
    }

    private WechatUtils1(){}

    public static Map<String, String> parseXml(HttpServletRequest request){
        Map<String, String> map = new HashMap<>();
        InputStream inputStream = null;
        try {
            inputStream = request.getInputStream();
            SAXReader reader = new SAXReader();
            Document document = reader.read(inputStream);
            Element root = document.getRootElement();
            List<Element> elementList = root.elements();
            for (Element e : elementList) {
                // 首字母转小写和去掉下划线：“_”
                map.put(StringUtils.uncapitalize(e.getName()).replace("_",""), e.getText());
            }
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            if(inputStream!=null){
                try {
                    inputStream.close();
                }catch (Exception e){
                    e.printStackTrace();
                }
            }
        }
        return map;
    }

    /**
     * 获取accesstoken
     * @return
     */
    public static AccessToken1 getAccessToken(){
        AccessToken1 accessToken = EhCacheUtils.getCacheAccessToken1();
        if(accessToken!=null && accessToken.getExpiresDate().compareTo(System.currentTimeMillis())>0){
            System.out.println("accessToken:"+accessToken.getAccessToken());
            return accessToken;
        }
        String url = "https://api.weixin.qq.com/cgi-bin/token";
        Map<String,Object> params = new HashMap<>();
        params.put("grant_type","client_credential");
        params.put("appid",APPID);
        params.put("secret",APPSECRET);
        String result = WebUtils.get(url,params);
        accessToken = JsonUtils.toObject(result, AccessToken1.class);
        if(StringUtils.isNotEmpty(accessToken.getAccessToken())){
            accessToken.setExpiresDate(accessToken.getExpires()-60*1000);
            EhCacheUtils.setCacheAccessToken1(accessToken);
            return accessToken;
        }
        return getAccessToken();
    }


    public static Map<String,String> createQRCode () throws IOException, WriterException {
        String url = "https://api.weixin.qq.com/cgi-bin/qrcode/create";
        Map<String,Object> params = new HashMap<>();
        Map<String,String> scene = new HashMap<>();
        scene.put("scene_str","blackboy");
        params.put("expire_seconds",2592000);
        params.put("action_name","QR_STR_SCENE");
        params.put("action_info",scene);
        System.out.println(JsonUtils.toJson(params));
        String s = postJson(url, params);
        System.out.println(s);
        WechatQRCode wechatQRCode = JsonUtils.toObject(s,WechatQRCode.class);
        String code = generateQRCodeImage(wechatQRCode.getUrl(),300,300);
        Map<String,String> data = new HashMap<>();
        data.put(wechatQRCode.getTicket(),code);
        System.out.println("code:"+code);
        data.put("ticket",wechatQRCode.getTicket());
        data.put("img",code);
        return data;
    }


    private static String generateQRCodeImage(String text, int width, int height) throws IOException, WriterException {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();

        BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, width, height);
        Path path = FileSystems.getDefault().getPath(String.valueOf(FileUtils.getTempDirectory()), UUID.randomUUID() + ".png");
        MatrixToImageWriter.writeToPath(bitMatrix, "PNG", path);
        return url2Base64(path);
    }


    public static String url2Base64(Path path) throws IOException {
        File file = path.toFile();
        System.out.println(file.getAbsolutePath()+"===========================================================================================");

        ByteArrayOutputStream data = new ByteArrayOutputStream();
        InputStream is = null;
        try {
            byte[] by = new byte[1024];
            is = new ByteArrayInputStream(FileUtils.readFileToByteArray(file));
            int len = -1;
            while ((len = is.read(by)) != -1) {
                data.write(by, 0, len);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            try {
                if(is!=null){
                    is.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return Base64.encodeBase64String(data.toByteArray());
    }


    public static String postJson(String url,Map<String,Object> parameterMap){
        Assert.hasText(url,"");
        String result = null;
        try {
            HttpPost httpPost = new HttpPost(url + (StringUtils.contains(url, "?") ? "&" : "?") + "access_token="+getAccessToken().getAccessToken());
            if (parameterMap != null && parameterMap.size()>0) {
                StringEntity params = new StringEntity(JsonUtils.toJson(parameterMap),"utf-8");//解决中文乱码问题
                params.setContentEncoding("UTF-8");
                params.setContentType("application/json");
                httpPost.setEntity(params);
            }
            CloseableHttpResponse httpResponse = HTTP_CLIENT.execute(httpPost);
            try {
                HttpEntity httpEntity = httpResponse.getEntity();
                if (httpEntity != null) {
                    result = EntityUtils.toString(httpEntity);
                    EntityUtils.consume(httpEntity);
                }
            } finally {
                try {
                    httpResponse.close();
                } catch (IOException e) {
                }
            }
        } catch (IOException | ParseException e) {
            throw new RuntimeException(e.getMessage(), e);
        }
        System.out.println("result:"+result);
        return result;
    }

    public static void main(String[] args) throws IOException, WriterException {
        System.out.println(createQRCode());
    }
}
