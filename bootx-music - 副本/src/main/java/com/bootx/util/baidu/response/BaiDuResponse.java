package com.bootx.util.baidu.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class BaiDuResponse implements Serializable {

    private Integer errno;

    @JsonProperty("guid_info")
    private String guidInfo;
    @JsonProperty("request_id")
    private String requestId;

    private Integer guid;

    public Integer getErrno() {
        return errno;
    }

    public void setErrno(Integer errno) {
        this.errno = errno;
    }

    public String getGuidInfo() {
        return guidInfo;
    }

    public void setGuidInfo(String guidInfo) {
        this.guidInfo = guidInfo;
    }

    public String getRequestId() {
        return requestId;
    }

    public void setRequestId(String requestId) {
        this.requestId = requestId;
    }

    public Integer getGuid() {
        return guid;
    }

    public void setGuid(Integer guid) {
        this.guid = guid;
    }


}
