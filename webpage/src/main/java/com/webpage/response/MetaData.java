
package com.webpage.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.HashMap;
import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
public class MetaData {

    private String condition;
    private Map<String,Object> columns = new HashMap<>();
    private String order;
    public void setCondition(String condition) {
         this.condition = condition;
     }
     public String getCondition() {
         return condition;
     }

    public Map<String, Object> getColumns() {
        return columns;
    }

    public void setColumns(Map<String, Object> columns) {
        this.columns = columns;
    }

    public void setOrder(String order) {
         this.order = order;
     }
     public String getOrder() {
         return order;
     }

}