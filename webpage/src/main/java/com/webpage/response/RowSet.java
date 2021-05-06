
package com.webpage.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
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