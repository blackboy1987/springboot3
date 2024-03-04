package com.bootx;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Demo {
    public static void main(String[] args) {
        String phoneString = "非凡特工72.mp4".replaceAll(".mp4","");
        // 提取数字
        // 1
        Pattern pattern = Pattern.compile("[^0-9]");
        Matcher matcher = pattern.matcher(phoneString);
        String all = matcher.replaceAll("");
        System.out.println("phone:" + all);
    }
}
