package com.bootx.controller.wechat;

import com.bootx.entity.BaseEntity;

import javax.persistence.Entity;

/**
 * 微信用户
 */
@Entity
public class WeChatUser extends BaseEntity<Long> {

    private String openId;

    private String ticket;

    public String getOpenId() {
        return openId;
    }

    public void setOpenId(String openId) {
        this.openId = openId;
    }

    public String getTicket() {
        return ticket;
    }

    public void setTicket(String ticket) {
        this.ticket = ticket;
    }
}
