
package com.webpage.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.HashMap;
import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
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