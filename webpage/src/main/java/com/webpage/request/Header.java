/**
  * Copyright 2021 json.cn 
  */
package com.webpage.request;

import java.util.HashMap;
import java.util.Map;

/**
 * Auto-generated: 2021-04-25 19:36:58
 *
 * @author json.cn (i@json.cn)
 * @website http://www.json.cn/java2pojo/
 */
public class Header {

    private int code;

    private Map<String,Object> message = new HashMap<>();
    public void setCode(int code) {
         this.code = code;
     }
     public int getCode() {
         return code;
     }

    public Map<String, Object> getMessage() {
        return message;
    }

    public void setMessage(Map<String, Object> message) {
        this.message = message;
    }
}