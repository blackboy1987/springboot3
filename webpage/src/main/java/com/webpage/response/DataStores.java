
package com.webpage.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class DataStores {

    private Result result;
    public void setResult(Result result) {
         this.result = result;
     }
     public Result getResult() {
         return result;
     }

}