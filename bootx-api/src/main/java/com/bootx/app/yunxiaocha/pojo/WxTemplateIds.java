/**
  * Copyright 2021 json.cn 
  */
package com.bootx.app.yunxiaocha.pojo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class WxTemplateIds {

    private String serviceApplyMessage="CHnuuVZtfOy2SehyZjTs8wxqYyr2Gk7m_0FvnzIL34c";
    private String activityStartNotify="dBTkVNNwibOkDI7u7vYGZo7IzeZeq5ABgNtl1d-buQc";
    public void setServiceApplyMessage(String serviceApplyMessage) {
         this.serviceApplyMessage = serviceApplyMessage;
     }
     public String getServiceApplyMessage() {
         return serviceApplyMessage;
     }

    public void setActivityStartNotify(String activityStartNotify) {
         this.activityStartNotify = activityStartNotify;
     }
     public String getActivityStartNotify() {
         return activityStartNotify;
     }

}