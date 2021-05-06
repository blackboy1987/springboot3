
package com.webpage.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.HashMap;
import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Result {

    private String rowSetName;
    private MetaData metaData;
    private int pageNumber;
    private RowSet rowSet;
    private int recordCount;
    private String name;
    private long pageSize;
    private Map<String,String> parameters = new HashMap<>();
    public void setRowSetName(String rowSetName) {
         this.rowSetName = rowSetName;
     }
     public String getRowSetName() {
         return rowSetName;
     }

    public void setMetaData(MetaData metaData) {
         this.metaData = metaData;
     }
     public MetaData getMetaData() {
         return metaData;
     }

    public void setPageNumber(int pageNumber) {
         this.pageNumber = pageNumber;
     }
     public int getPageNumber() {
         return pageNumber;
     }

    public void setRowSet(RowSet rowSet) {
         this.rowSet = rowSet;
     }
     public RowSet getRowSet() {
         return rowSet;
     }

    public void setRecordCount(int recordCount) {
         this.recordCount = recordCount;
     }
     public int getRecordCount() {
         return recordCount;
     }

    public void setName(String name) {
         this.name = name;
     }
     public String getName() {
         return name;
     }

    public void setPageSize(long pageSize) {
         this.pageSize = pageSize;
     }
     public long getPageSize() {
         return pageSize;
     }

    public Map<String, String> getParameters() {
        return parameters;
    }

    public void setParameters(Map<String, String> parameters) {
        this.parameters = parameters;
    }
}