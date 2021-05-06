package com.bootx.app.daka.entity;

import com.bootx.entity.BaseEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

@Entity
public class ClickRecord extends BaseEntity<Long> {

    @NotNull
    @Column(nullable = false,updatable = false)
    private Long memberId;

    @Column(nullable = false)
    private Long point;

    @NotNull
    @Column(nullable = false,updatable = false)
    private Long appId;


    public Long getMemberId() {
        return memberId;
    }

    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }

    public Long getPoint() {
        return point;
    }

    public void setPoint(Long point) {
        this.point = point;
    }

    public Long getAppId() {
        return appId;
    }

    public void setAppId(Long appId) {
        this.appId = appId;
    }
}
