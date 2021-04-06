/**
  * Copyright 2021 json.cn 
  */
package com.bootx.app.duanshipin.pojo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

/**
 * Auto-generated: 2021-03-07 2:26:54
 *
 * @author json.cn (i@json.cn)
 * @website http://www.json.cn/java2pojo/
 */

@JsonIgnoreProperties(ignoreUnknown = true)
public class Data1 {

    private long Video_ID;
    @JsonProperty("Title")
    private String title;
    private int ClassID;
    private int ClassIDTwo;
    private long UserID;
    private String CoverImgs;
    @JsonProperty("Duration")
    private Long duration;
    @JsonProperty("Description")
    private String description;
    @JsonProperty("UploadTime")
    private Date uploadTime;
    @JsonProperty("Tags")
    private String tags;
    private String ClassName;
    private String UserName;
    private String CompanyName;
    private String HeadImg;

    public long getVideo_ID() {
        return Video_ID;
    }

    public void setVideo_ID(long video_ID) {
        Video_ID = video_ID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getClassID() {
        return ClassID;
    }

    public void setClassID(int classID) {
        ClassID = classID;
    }

    public int getClassIDTwo() {
        return ClassIDTwo;
    }

    public void setClassIDTwo(int classIDTwo) {
        ClassIDTwo = classIDTwo;
    }

    public long getUserID() {
        return UserID;
    }

    public void setUserID(long userID) {
        UserID = userID;
    }

    public String getCoverImgs() {
        return CoverImgs;
    }

    public void setCoverImgs(String coverImgs) {
        CoverImgs = coverImgs;
    }

    public Long getDuration() {
        return duration;
    }

    public void setDuration(Long duration) {
        this.duration = duration;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getUploadTime() {
        return uploadTime;
    }

    public void setUploadTime(Date uploadTime) {
        this.uploadTime = uploadTime;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public String getClassName() {
        return ClassName;
    }

    public void setClassName(String className) {
        ClassName = className;
    }

    public String getUserName() {
        return UserName;
    }

    public void setUserName(String userName) {
        UserName = userName;
    }

    public String getCompanyName() {
        return CompanyName;
    }

    public void setCompanyName(String companyName) {
        CompanyName = companyName;
    }

    public String getHeadImg() {
        return HeadImg;
    }

    public void setHeadImg(String headImg) {
        HeadImg = headImg;
    }
}