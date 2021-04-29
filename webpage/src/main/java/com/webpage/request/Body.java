
package com.webpage.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.HashMap;
import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Body {

    private Map<String,Object> dataStores = new HashMap<>();
    private Map<String,Object> parameters;

    public Map<String, Object> getDataStores() {
        return dataStores;
    }

    public void setDataStores(Map<String, Object> dataStores) {
        this.dataStores = dataStores;
    }

    public void setParameters(Map<String,Object> parameters) {
         this.parameters = parameters;
     }
     public Map<String,Object> getParameters() {
         return parameters;
     }

}