
package com.webpage.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.HashMap;
import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
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