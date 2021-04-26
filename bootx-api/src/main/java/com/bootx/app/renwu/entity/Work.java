package com.bootx.app.renwu.entity;

import com.bootx.entity.BaseEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Entity
@Table(name = "renwu_work")
public class Work extends BaseEntity<Long> {

    @NotEmpty
    @Column(nullable = false)
    private String title;

    @NotEmpty
    @Column(nullable = false)
    private String img;

    @NotEmpty
    @Column(nullable = false)
    private String description;

    @NotNull
    @Column(nullable = false)
    private Integer type;

    @NotNull
    @Column(nullable = false)
    private Integer status;

    @NotNull
    @Column(nullable = false, precision = 27, scale = 12)
    private BigDecimal payment;

    @NotNull
    @Column(nullable = false, precision = 27, scale = 12)
    private BigDecimal payed;

    @NotNull
    @Column(nullable = false)
    private Integer planNum;

    @NotNull
    @Column(nullable = false)
    private Integer finishNum;

    @NotNull
    @Column(nullable = false, precision = 27, scale = 12)
    private BigDecimal vipPayment;


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public BigDecimal getPayment() {
        return payment;
    }

    public void setPayment(BigDecimal payment) {
        this.payment = payment;
    }

    public BigDecimal getPayed() {
        return payed;
    }

    public void setPayed(BigDecimal payed) {
        this.payed = payed;
    }

    public Integer getPlanNum() {
        return planNum;
    }

    public void setPlanNum(Integer planNum) {
        this.planNum = planNum;
    }

    public Integer getFinishNum() {
        return finishNum;
    }

    public void setFinishNum(Integer finishNum) {
        this.finishNum = finishNum;
    }

    public BigDecimal getVipPayment() {
        return vipPayment;
    }

    public void setVipPayment(BigDecimal vipPayment) {
        this.vipPayment = vipPayment;
    }
}
