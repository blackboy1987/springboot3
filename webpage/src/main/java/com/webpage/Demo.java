package com.webpage;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;

import java.io.File;
import java.io.IOException;

public class Demo {

    public static void main(String[] args) throws IOException {
        File root = new File("C:\\Users\\black\\Desktop\\webpage\\plugins");

        deleteFile(root);

    }


    public static void deleteFile(File file) throws IOException {
        File[] files = file.listFiles();
        if(files.length==0){
            System.out.println("===============================================");
            FileUtils.deleteDirectory(file);
            return ;
        }
        for (File child:files) {
            if(child.isDirectory()){
                deleteFile(child);
            }else{
                if(!StringUtils.endsWith(child.getName(),"view")){
                    System.out.println("delete："+child.getAbsolutePath());
                    FileUtils.deleteQuietly(child);
                }
            }
        }
    }

}
