package com.bootx.entity;

import com.bootx.app.daka.common.DaKaConfig;
import com.bootx.app.dianying.pojo.Demo;
import com.bootx.common.BaseAttributeConverter;
import com.bootx.util.JsonUtils;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.type.TypeReference;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
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
    private Map<String,Object> config = new HashMap<>();

    public AppConfig(@NotNull App app) {
        if(app.getType()==1){
            String danMu = "[{\"text\":\"请勿相信视频内广告\",\"color\":\"#ff0000\",\"time\":1},{\"text\":\"本软件永久免费,为避免小程序被封,请联系客服!\",\"color\":\"#ff00ff\",\"time\":3}]";
            getConfig().put("danMu", JsonUtils.toJson(JsonUtils.toObject(danMu, new TypeReference<List<Demo.DataDTO.PlayDTO.DanMu>>() {
            })));
        }else if(app.getType()==5){
            getConfig().putAll(JsonUtils.toObject(JsonUtils.toJson(new DaKaConfig()), new TypeReference<Map<String,Object>>() {
            }));
        }
        this.app = app;
    }

    public AppConfig() {
    }

    public App getApp() {
        return app;
    }

    public void setApp(App app) {
        this.app = app;
    }

    public Map<String, Object> getConfig() {
        return config;
    }

    public void setConfig(Map<String, Object> config) {
        this.config = config;
    }

    public Object get(String key) {
        return config.get(key);
    }

    @Convert
    public static class ConfigConfigConvert extends BaseAttributeConverter<Map<String,Object>>{

    }

}
