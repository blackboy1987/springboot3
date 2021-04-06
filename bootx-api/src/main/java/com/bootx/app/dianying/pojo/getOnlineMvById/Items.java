/**
  * Copyright 2021 json.cn 
  */
package com.bootx.app.dianying.pojo.getOnlineMvById;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Items implements Serializable {

    private long vod_id;
    private int type_id;
    private String vod_name;
    private String vod_class;

    public long getVod_id() {
        return vod_id;
    }

    public void setVod_id(long vod_id) {
        this.vod_id = vod_id;
    }

    public int getType_id() {
        return type_id;
    }

    public void setType_id(int type_id) {
        this.type_id = type_id;
    }

    public String getVod_name() {
        return vod_name;
    }

    public void setVod_name(String vod_name) {
        this.vod_name = vod_name;
    }

    public String getVod_class() {
        return vod_class;
    }

    public void setVod_class(String vod_class) {
        this.vod_class = vod_class;
    }
}