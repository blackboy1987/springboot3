package com.bootx.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonView;

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
    @Column(nullable = false,unique = true)
    @JsonView({PageView.class})
    public String appId;

    @NotNull
    @Column(nullable = false,unique = true)
    @JsonView({PageView.class})
    private String appSecret;

    @NotNull
    @Column(nullable = false,unique = true)
    @JsonView({PageView.class})
    private String appToken;

    @NotNull
    @Column(nullable = false,unique = true)
    @JsonView({PageView.class})
    private String appCode;

    @NotNull
    @Column(nullable = false,unique = true)
    @JsonView({PageView.class})
    private String appName;

    /**
     * 0: 账号刚创建，没有完善信息
     * 1：审核中
     * 2：已审核
     * 3：已禁用
     */
    @NotNull
    @Column(nullable = false)
    @JsonView({PageView.class})
    private Integer status;

    @JsonView({PageView.class})
    private String logo;

    //@JsonView({PageView.class})
    //private String appLogo;

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
     * 5：打卡小程序
     */
    @NotNull
    @Column(nullable = false,updatable = false)
    @JsonView({PageView.class})
    private Integer type;

    /**
     * 账号过期时间。
     */
    @NotNull
    @Column(nullable = false)
    @JsonView({PageView.class})
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

   /* public String getAppLogo() {
        return appLogo;
    }

    public void setAppLogo(String appLogo) {
        this.appLogo = appLogo;
    }*/

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

    @Transient
    @JsonView({PageView.class})
    public String getAdminName(){
        return getAdmin().getUsername();
    }
}
