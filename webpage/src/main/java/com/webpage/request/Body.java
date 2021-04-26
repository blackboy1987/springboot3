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
public class Body {

    private Map<String,Object> dataStores = new HashMap<>();
    private Parameters parameters;

    public Map<String, Object> getDataStores() {
        return dataStores;
    }

    public void setDataStores(Map<String, Object> dataStores) {
        this.dataStores = dataStores;
    }

    public void setParameters(Parameters parameters) {
         this.parameters = parameters;
     }
     public Parameters getParameters() {
         return parameters;
     }

}