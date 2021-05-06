package com.bootx.util;

import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.aliyun.oss.model.PutObjectRequest;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;

import java.io.File;

public class UploadUtils {

    private static final String endpoint = "https://oss-cn-hangzhou.aliyuncs.com";
    private static final String accessKeyId = "LTAI4GCjrkxGi8rcyoiy6i8Y";
    private static final String accessKeySecret = "AEG4gBrjvNQvSJRSStrZfHfC4EJZOW";
    private static final String bucketName = "bootx-xiaochengxu";

    public static void upload(File file, String path) {
        try {
            OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);
            PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, path, file);
            ossClient.putObject(putObjectRequest);
            ossClient.shutdown();
        }finally {
            FileUtils.deleteQuietly(file);
        }
    }

    public static String getUrl(String path){
        if(StringUtils.startsWith(path,"/")){
            return "https://bootx-xiaochengxu.oss-cn-hangzhou.aliyuncs.com"+path;
        }
        return "https://bootx-xiaochengxu.oss-cn-hangzhou.aliyuncs.com/"+path;
    }
}
