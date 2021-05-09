package com.bootx;

import com.bootx.util.JsonUtils;
import com.bootx.util.WebUtils;
import com.fasterxml.jackson.core.type.TypeReference;
import org.apache.commons.io.FileUtils;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Demo {

    public static void main(String[] args) {
        File file = new File("C:\\Users\\black\\Desktop\\新建文本文档 (3).txt");
        BufferedReader reader = null;
        try {
            System.out.println("以行为单位读取文件内容，一次读一整行：");
            reader = new BufferedReader(new FileReader(file));
            String tempString = null;
            int line = 1;
            while ((tempString = reader.readLine()) != null) {
                System.out.println("line " + line + ": " + "C:\\Users\\black\\Desktop\\webpage\\page\\src\\pages\\"+tempString+"\\index.tsx");
                create("C:\\Users\\black\\Desktop\\webpage\\page\\src\\pages\\"+tempString+"\\index.tsx");

                line++;
            }
            reader.close();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException ignored) {
                }
            }
        }

    }

    private static void create(String s) throws IOException {
        File file = new File(s);
        File file1 = new File("C:\\Users\\black\\Desktop\\index.tsx");
        System.out.println(file.getAbsolutePath());
        FileUtils.copyFile(file1,file);
    }

}
