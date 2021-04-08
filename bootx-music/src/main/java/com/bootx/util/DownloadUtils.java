package com.bootx.util;

import org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;

public class DownloadUtils {

    public static void download(String url, String path) throws IOException {
        URLConnection urlConnection = new URL(url).openConnection();
        urlConnection.setConnectTimeout(1000);
        InputStream inputStream = urlConnection.getInputStream();

        File file = new File(path);
        if(!file.getParentFile().exists()){
            file.getParentFile().mkdirs();
        }
        FileUtils.copyToFile(inputStream,file);
    }

    public static void main(String[] args) throws IOException {
        download("http://audio.xmcdn.com/group17/M06/C6/34/wKgJJFjECS_QLYBHAJkHMW0NJys378.m4a","D:\\有声小说\\1.m4a");
    }
}
