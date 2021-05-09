package com.bootx.entity;

import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;

@Entity
public class MoreProgram extends BaseEntity<Long>{

    @JsonView({BaseEntity.ListView.class})
    private String name;

    @JsonView({BaseEntity.ListView.class})
    private String memo;

    @JsonView({BaseEntity.ListView.class})
    private String appId;

    @JsonView({BaseEntity.ListView.class})
    private String path;

    @JsonView({BaseEntity.ListView.class})
    private String icon;

    @ManyToOne(fetch = FetchType.LAZY)
    private App app;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }

    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public App getApp() {
        return app;
    }

    public void setApp(App app) {
        this.app = app;
    }
}
