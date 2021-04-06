package com.bootx.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class App extends BaseEntity<Long>{

    public static final String CACHE_PREFIX = "app_";

    @NotNull
    @Column(nullable = false,updatable = false,unique = true)
    public String appId;

    @NotNull
    @Column(nullable = false,unique = true)
    private String appSecret;

    @NotNull
    @Column(nullable = false,updatable = false,unique = true)
    private String appToken;

    @NotNull
    @Length(max = 18,min = 18)
    @Column(length = 18,nullable = false,updatable = false,unique = true)
    private String appCode;

    @NotNull
    @Column(nullable = false,unique = true)
    private String appName;

    /**
     * 0: 微信待审核
     * 1：微信审核通过
     * 2：已禁用
     */
    @NotNull
    @Column(nullable = false)
    private Integer status;

    private String logo;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(updatable = false)
    @JsonIgnore
    private Admin admin;

    /**
     * 0：成语
     * 1：电影
     * 2：短视频
     * 3：图转文
     * 4：答题
     */
    @NotNull
    @Column(nullable = false,updatable = false)
    private Integer type;

    /**
     * 账号过期时间。
     */
    @NotNull
    @Column(nullable = false)
    private Date expireDate;

    @OneToOne(mappedBy = "app", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private AppAd AppAd;

    @OneToOne(mappedBy = "app", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private AppConfig appConfig;

    @OneToMany(mappedBy = "app",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<SubscriptionTemplate> subscriptionTemplates = new HashSet<>();

    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }

    public String getAppSecret() {
        return appSecret;
    }

    public void setAppSecret(String appSecret) {
        this.appSecret = appSecret;
    }

    public String getAppToken() {
        return appToken;
    }

    public void setAppToken(String appToken) {
        this.appToken = appToken;
    }

    public String getAppCode() {
        return appCode;
    }

    public void setAppCode(String appCode) {
        this.appCode = appCode;
    }

    public String getAppName() {
        return appName;
    }

    public void setAppName(String appName) {
        this.appName = appName;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }


    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Date getExpireDate() {
        return expireDate;
    }

    public void setExpireDate(Date expireDate) {
        this.expireDate = expireDate;
    }

    public Admin getAdmin() {
        return admin;
    }

    public void setAdmin(Admin admin) {
        this.admin = admin;
    }

    public AppAd getAppAd() {
        return AppAd;
    }

    public void setAppAd(AppAd appAd) {
        AppAd = appAd;
    }

    public AppConfig getAppConfig() {
        return appConfig;
    }

    public void setAppConfig(AppConfig appConfig) {
        this.appConfig = appConfig;
    }

    public Set<SubscriptionTemplate> getSubscriptionTemplates() {
        return subscriptionTemplates;
    }

    public void setSubscriptionTemplates(Set<SubscriptionTemplate> subscriptionTemplates) {
        this.subscriptionTemplates = subscriptionTemplates;
    }
}
