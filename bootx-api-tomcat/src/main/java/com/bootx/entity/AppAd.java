package com.bootx.entity;

import com.bootx.common.BaseAttributeConverter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.validator.constraints.Length;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class AppAd extends BaseEntity<Long>{

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false,updatable = false)
    @JsonIgnore
    public App app;

    @Convert(converter = AdConfigConvert.class)
    @Column(length = 3000,nullable = false)
    private Map<String,AdConfig> ads = new HashMap<>();

    public AppAd(@NotNull App app) {
        this.app = app;
    }

    public App getApp() {
        return app;
    }

    public AppAd() {
    }

    public void setApp(App app) {
        this.app = app;
    }

    public Map<String, AdConfig> getAds() {
        return ads;
    }

    public void setAds(Map<String, AdConfig> ads) {
        this.ads = ads;
    }


    @Convert
    public static class AdConfigConvert extends BaseAttributeConverter<Map<String,AdConfig>>{

    }


    @Transactional
    public void put(String key,AdConfig adConfig){
        ads.put(key,adConfig);
    }

    @Transactional
    public AdConfig get(String key){
        return ads.get(key);
    }
}
