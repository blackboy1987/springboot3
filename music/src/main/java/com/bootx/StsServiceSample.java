package com.bootx;
import com.aliyun.oss.HttpMethod;
import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.aliyun.oss.common.utils.DateUtil;
import com.aliyun.oss.model.GeneratePresignedUrlRequest;
import com.aliyun.oss.model.OSSObject;
import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.exceptions.ClientException;
import com.aliyuncs.http.MethodType;
import com.aliyuncs.profile.DefaultProfile;
import com.aliyuncs.profile.IClientProfile;
import com.aliyuncs.sts.model.v20150401.AssumeRoleRequest;
import com.aliyuncs.sts.model.v20150401.AssumeRoleResponse;
import com.bootx.util.DateUtils;

import java.net.URL;
import java.text.ParseException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class StsServiceSample {

    public static String getUrl(String objectName){
        String endpoint = "http://oss-cn-hangzhou.aliyuncs.com";
        String accessKeyId = "LTAI4G4Wf3RxP5mkFxbDusQn";
        String accessKeySecret = "ew8d9SE8OUSj28tOm1V9OuKDGWTUHm";
        String bucketName = "bootx-xiaochengxu";

        OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);

        Date expiration = DateUtils.getNextSecond(60);
        GeneratePresignedUrlRequest request = new GeneratePresignedUrlRequest(bucketName, objectName, HttpMethod.GET);
        request.setExpiration(expiration);
        URL signedUrl = ossClient .generatePresignedUrl(request);
        ossClient.shutdown();
        return signedUrl.getProtocol()+"://"+signedUrl.getAuthority()+signedUrl.getFile();
    }
}