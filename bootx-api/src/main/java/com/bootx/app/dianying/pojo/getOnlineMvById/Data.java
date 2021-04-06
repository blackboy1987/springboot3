/**
  * Copyright 2021 json.cn 
  */
package com.bootx.app.dianying.pojo.getOnlineMvById;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Data {

    private List<Items> items = new ArrayList<>();

    public List<Items> getItems() {
        return items;
    }

    public void setItems(List<Items> items) {
        this.items = items;
    }
}