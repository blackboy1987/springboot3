package com.bootx;

import com.bootx.util.WebUtils;

import java.util.HashMap;
import java.util.Map;

public class Demo {


    public static void main(String[] args) {
        Map<String,String> headers = new HashMap<>();
        headers.put("Authorization","Bearer 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");
        String s = WebUtils.get("https://api.openai.com/v1/models/whisper-1", headers, null);
        System.out.println(s);
    }

}
