package com.bootx.util.wechat;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

@JsonIgnoreProperties(ignoreUnknown = true)
public class AccessToken1 extends BaseResponse {

    @JsonProperty("access_token")
    private String accessToken;

    private Long expiresDate;

    @JsonProperty("expires_in")
    private Long expires;

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public Long getExpiresDate() {
        return expiresDate;
    }

    public void setExpiresDate(Long expiresDate) {
        this.expiresDate = expiresDate;
    }

    public Long getExpires() {
        return expires;
    }

    public void setExpires(Long expires) {
        this.expires = expires;
    }
}
