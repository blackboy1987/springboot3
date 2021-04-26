/**
  * Copyright 2021 json.cn 
  */
package com.webpage.response;

import java.util.List;

/**
 * Auto-generated: 2021-04-25 19:56:40
 *
 * @author json.cn (i@json.cn)
 * @website http://www.json.cn/java2pojo/
 */
public class RowSet {

    private List<String> filter;
    private List<String> delete;
    private List<Object> primary;
    public void setFilter(List<String> filter) {
         this.filter = filter;
     }
     public List<String> getFilter() {
         return filter;
     }

    public void setDelete(List<String> delete) {
         this.delete = delete;
     }
     public List<String> getDelete() {
         return delete;
     }

    public void setPrimary(List<Object> primary) {
         this.primary = primary;
     }
     public List<Object> getPrimary() {
         return primary;
     }

}