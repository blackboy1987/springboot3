package com.bootx.util;

import cn.hutool.crypto.SecureUtil;

import java.util.Random;

public final class CodeUtils {

    public static final String[] CODE = new String[]{
            "1","2","3","4","5","6","7","8","9","0",
            "A","B","C","D","E","F","G","H","J",
            "K","L","M","N","P","Q","R","S","T",
            "U","V","W","X","Y","Z"
    };

    public static final String[] CODE1 = new String[]{
            "1","2","3","4","5","6","7","8","9","0",
            "a","b","c","d","e","f","g","h","j",
            "k","l","m","n","p","q","r","s","t",
            "u","v","w","x","y","z"
    };

    public static final String[] CODE2 = new String[]{
            "1","2","3","4","5","6","7","8","9","0",
            "a","b","c","d","e","f","g","h","j",
            "k","l","m","n","p","q","r","s","t",
            "u","v","w","x","y","z","A","B","C",
            "D","E","F","G","H","J", "K","L",
            "M","N","P","Q","R","S","T", "U",
            "V","W","X","Y","Z"
    };

    private static final Random RANDOM = new Random();

    private CodeUtils(){}

    public static String getCode(Integer length){
        StringBuffer sb = new StringBuffer();
        for(int i=0;i<length;i++){
            sb.append(CODE[RANDOM.nextInt(CODE.length)]);
        }
        return sb.toString();
    }

    public static String getCode1(Integer length){
        StringBuffer sb = new StringBuffer();
        for(int i=0;i<length;i++){
            sb.append(CODE1[RANDOM.nextInt(CODE.length)]);
        }
        return sb.toString();
    }

    public static String getCode2(Integer length){
        StringBuffer sb = new StringBuffer();
        for(int i=0;i<length;i++){
            sb.append(CODE2[RANDOM.nextInt(CODE.length)]);
        }
        return sb.toString();
    }

    public static String getToken(String code){
        String s = SecureUtil.sha256(code);
        return s;
    }
}
