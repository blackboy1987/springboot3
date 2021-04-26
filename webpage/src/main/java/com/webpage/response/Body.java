/**
  * Copyright 2021 json.cn 
  */
package com.webpage.response;

import java.util.Map;

/**
 * Auto-generated: 2021-04-25 19:56:40
 *
 * @author json.cn (i@json.cn)
 * @website http://www.json.cn/java2pojo/
 */
public class Body {

    private DataStores dataStores;
    private Map<String,Object> parameters;
    public void setDataStores(DataStores dataStores) {
         this.dataStores = dataStores;
     }
     public DataStores getDataStores() {
         return dataStores;
     }

    public Map<String, Object> getParameters() {
        return parameters;
    }

    public void setParameters(Map<String, Object> parameters) {
        this.parameters = parameters;
    }
}