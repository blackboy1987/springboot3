
package com.webpage.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
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