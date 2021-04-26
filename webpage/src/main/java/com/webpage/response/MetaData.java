/**
  * Copyright 2021 json.cn 
  */
package com.webpage.response;

import java.util.HashMap;
import java.util.Map;

/**
 * Auto-generated: 2021-04-25 19:56:40
 *
 * @author json.cn (i@json.cn)
 * @website http://www.json.cn/java2pojo/
 */
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