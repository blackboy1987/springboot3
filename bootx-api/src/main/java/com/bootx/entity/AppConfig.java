package com.bootx.entity;

import com.bootx.common.BaseAttributeConverter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class AppConfig extends BaseEntity<Long>{

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(updatable = false)
    @JsonIgnore
    public App app;

    @NotNull
    @Convert(converter = ConfigConfigConvert.class)
    @Column(length = 3000,nullable = false)
    private Map<String,String> config = new HashMap<>();

    public App getApp() {
        return app;
    }

    public void setApp(App app) {
        this.app = app;
    }

    public Map<String, String> getConfig() {
        return config;
    }

    public void setConfig(Map<String, String> config) {
        this.config = config;
    }

    public String get(String key) {
        return config.get(key);
    }

    @Convert
    public static class ConfigConfigConvert extends BaseAttributeConverter<Map<String,String>>{

    }

}
