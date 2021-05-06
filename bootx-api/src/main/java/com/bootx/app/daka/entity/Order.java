package com.bootx.app.daka.entity;

import com.bootx.entity.App;
import com.bootx.entity.BaseEntity;
import com.bootx.member.entity.Member;
import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity(name = "daka_order")
@Table(name = "daka_order")
public class Order extends BaseEntity<Long> {

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonView({BaseEntity.ListView.class})
    private Product product;

    @NotEmpty
    @Column(nullable = false,updatable = false)
    @JsonView({BaseEntity.ListView.class})
    private String sn;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false,updatable = false)
    private App app;

    @ManyToOne
    private Member member;

    /**
     * 1：待发货
     * 2：已发货
     * 3：已签收
     * 4: 拒绝
     */
    @NotNull
    @Column(nullable = false)
    @JsonView({BaseEntity.ListView.class})
    private Integer status;

    @NotEmpty
    @Column(nullable = false)
    @JsonView({BaseEntity.ListView.class})
    private String name;

    @NotEmpty
    @Column(nullable = false)
    @JsonView({BaseEntity.ListView.class})
    private String phone;

    @NotEmpty
    @Column(nullable = false)
    @JsonView({BaseEntity.ListView.class})
    private String address;

    /**
     * 快递单号
     */
    @JsonView({BaseEntity.ListView.class})
    private String courierNumber;

    /**
     * 快递公司名称
     */
    @JsonView({BaseEntity.ListView.class})
    private String courierName;

    /**
     * 3： 兑换订单
     */
    @JsonView({BaseEntity.ListView.class})
    private Integer type;

    /**
     * 兑换码
     */
    @JsonView({BaseEntity.ListView.class})
    private String fictitious;


    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public String getSn() {
        return sn;
    }

    public void setSn(String sn) {
        this.sn = sn;
    }

    public App getApp() {
        return app;
    }

    public void setApp(App app) {
        this.app = app;
    }

    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getType() {
        return type;
    }

    @Transient
    @JsonView({BaseEntity.ListView.class})
    public String getStatusMsg(){
        return status+"";
    }


    @Transient
    @JsonView({BaseEntity.ListView.class})
    public String getMemo(){
        return "拒绝理由";
    }



    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCourierNumber() {
        return courierNumber;
    }

    public void setCourierNumber(String courierNumber) {
        this.courierNumber = courierNumber;
    }

    public String getCourierName() {
        return courierName;
    }

    public void setCourierName(String courierName) {
        this.courierName = courierName;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getFictitious() {
        return fictitious;
    }

    public void setFictitious(String fictitious) {
        this.fictitious = fictitious;
    }
}
