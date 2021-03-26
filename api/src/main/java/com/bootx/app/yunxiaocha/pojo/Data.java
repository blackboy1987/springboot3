/**
  * Copyright 2021 json.cn 
  */
package com.bootx.app.yunxiaocha.pojo;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Data {

    private String notice="  1.可提前通过宏顺耳道预约小程序进行预约，每日早10:00到22:00可预约。\n" +
            "  2.一个微信号最多可预约1人，如随行有多人，请分别预约。\n" +
            "       3.疫情期间，进店客户请佩戴口罩，外地客户需要出示健康码。\n" +
            "  4.暂不接受团队预约。\n" +
            "  9.如在预约时遇到问题，可咨询18368490197。";
    private String noticeRich="<p>   " +
            " 1.可提前通过宏顺耳道预约小程序进行预约，每日早10:00到22:00可预约。</p><p><p>    <p style=\"color: rgb(255, 0, 0);\">    " +
            "2.一个微信号最多可预约1人，如随行有多人，请分别预约。</p><p>    " +
            "3.疫情期间，进店客户请佩戴口罩，外地客户需要出示健康码</p>" +
            "<p>4.暂不接受团队预约。</p><p>    " +
            "5.如在预约时遇到问题，可拨打电话进行咨询。咨询电话：<span style=\"color: rgb(255, 0, 0);\">18368490197。<span></p>";
    private int noticeFontSize=32;
    private String peopleTips="一个微信号最多可预约1人，如随行有多人，请分别预约。";
    private String peopleTipsTemplate="一个微信号最多可预约peopleNumber人，如随行有多人，请分别预约。";
    private boolean allowAdult=true;
    private int minorMaxCount=1;
    private String urlPrefix="https://reserve12345667.cqkjg.cn";
    private WxTemplateIds wxTemplateIds;
    public void setNotice(String notice) {
         this.notice = notice;
     }
     public String getNotice() {
         return notice;
     }

    public void setNoticeRich(String noticeRich) {
         this.noticeRich = noticeRich;
     }
     public String getNoticeRich() {
         return noticeRich;
     }

    public void setNoticeFontSize(int noticeFontSize) {
         this.noticeFontSize = noticeFontSize;
     }
     public int getNoticeFontSize() {
         return noticeFontSize;
     }

    public void setPeopleTips(String peopleTips) {
         this.peopleTips = peopleTips;
     }
     public String getPeopleTips() {
         return peopleTips;
     }

    public void setPeopleTipsTemplate(String peopleTipsTemplate) {
         this.peopleTipsTemplate = peopleTipsTemplate;
     }
     public String getPeopleTipsTemplate() {
         return peopleTipsTemplate;
     }

    public void setAllowAdult(boolean allowAdult) {
         this.allowAdult = allowAdult;
     }
     public boolean getAllowAdult() {
         return allowAdult;
     }

    public void setMinorMaxCount(int minorMaxCount) {
         this.minorMaxCount = minorMaxCount;
     }
     public int getMinorMaxCount() {
         return minorMaxCount;
     }

    public void setUrlPrefix(String urlPrefix) {
         this.urlPrefix = urlPrefix;
     }
     public String getUrlPrefix() {
         return urlPrefix;
     }

    public void setWxTemplateIds(WxTemplateIds wxTemplateIds) {
         this.wxTemplateIds = wxTemplateIds;
     }
     public WxTemplateIds getWxTemplateIds() {
         return wxTemplateIds;
     }

}