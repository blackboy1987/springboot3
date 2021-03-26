package com.bootx;

import cn.hutool.crypto.digest.MD5;
import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import org.apache.commons.io.FilenameUtils;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;

public class Demo1 {

    public static void main(String[] args) throws Exception {
        String root = "E:\\BaiduNetdiskDownload\\广播剧1\\凤囚凰";

        File rootFile = new File(root);
        if(rootFile.isDirectory()){
            list(rootFile);
        }




        // convetor("E:\\BaiduNetdiskDownload\\广播剧1\\【酌墨桃花尽嫣然】\\酌墨桃花尽嫣然108.mp3","E:\\BaiduNetdiskDownload\\广播剧1\\【酌墨桃花尽嫣然】\\酌墨桃花尽嫣然0108.mp3");
    }

    private static void list(File rootFile) throws Exception {
        File[] files = rootFile.listFiles();
        String rootFileName = MD5.create().digestHex(rootFile.getName());
        System.out.println(rootFileName);
        for (File file:files) {
            String path = file.getParentFile().getAbsolutePath()+"/result/"+file.getName();
            String a = FilenameUtils.getExtension(path);
            convetor(file.getAbsolutePath(),path);
            upload(path,rootFileName+"/"+MD5.create().digestHex(FilenameUtils.getName(file.getName()).replace("."+a,""))+"."+a);
        }

    }

    public static void convetor(String videoInputPath, String videoOutPath) throws Exception {

        StringBuffer sb = new StringBuffer();
        sb.append("ffmpeg ");
        sb.append(" -i ");
        sb.append(videoInputPath);
        sb.append(" -metadata grouping=abc ");
        sb.append(" -metadata TPE1=abc ");
        sb.append(" -metadata TPE2=abc ");
        sb.append(" -metadata comment=abc ");
        sb.append(" -metadata year=abc ");
        sb.append(" -metadata TIT2=abc ");
        sb.append(" -metadata TPE=abc ");
        sb.append(" -metadata USLT=abc ");
        sb.append(" -metadata author=abc ");
        sb.append(" -metadata TALB=abc ");
        sb.append(" -metadata TCOM=abc ");
        sb.append(" -metadata TCON=abc ");
        sb.append(" -metadata TCOP=abc ");
        sb.append(" -metadata description=abc ");
        sb.append(" -metadata synopsis=abc ");
        sb.append(" -metadata show=abc ");
        sb.append(" -metadata episode_id=abc ");
        sb.append(" -metadata network=abc ");
        sb.append(" -metadata TSSE=abc ");
        sb.append(" -vcodec copy -acodec copy ");
        sb.append(videoOutPath);
        sb.append(" -y");
        Process process = Runtime.getRuntime().exec(sb.toString());

        InputStream in = process.getInputStream();
        while (in.read()!=-1){
            System.out.println(in.read());
        }
        in.close();
        process.waitFor();
    }

    private static void upload(String filePath,String fileName) throws IOException {
        String endpoint = "oss-cn-hangzhou.aliyuncs.com";
        String accessKeyId = "LTAI4GCjrkxGi8rcyoiy6i8Y";
        String accessKeySecret = "AEG4gBrjvNQvSJRSStrZfHfC4EJZOW";
        OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);
        InputStream inputStream = new FileInputStream(filePath);
        ossClient.putObject("bootx-mp3", fileName, inputStream);

        ossClient.shutdown();

    }

}
