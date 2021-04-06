/**
  * Copyright 2021 json.cn 
  */
package com.bootx.app.duanshipin.pojo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * Auto-generated: 2021-03-07 2:26:54
 *
 * @author json.cn (i@json.cn)
 * @website http://www.json.cn/java2pojo/
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class JsonRootBean2 {

    private int code;
    private String msg;
    private Data1 data;
    public void setCode(int code) {
         this.code = code;
     }
     public int getCode() {
         return code;
     }

    public void setMsg(String msg) {
         this.msg = msg;
     }
     public String getMsg() {
         return msg;
     }

    public void setData(Data1 data) {
         this.data = data;
     }
     public Data1 getData() {
         return data;
     }

}