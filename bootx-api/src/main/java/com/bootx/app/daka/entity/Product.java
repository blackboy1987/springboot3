package com.bootx.app.daka.entity;

import com.bootx.common.BaseAttributeConverter;
import com.bootx.entity.App;
import com.bootx.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "daka_product")
@Table(name = "daka_product")
public class Product extends BaseEntity<Long> {

    @ManyToOne(fetch = FetchType.LAZY)
    private ProductCategory productCategory;

    @ManyToOne(fetch = FetchType.LAZY)
    private App app;

    @Column(nullable = false, precision = 27, scale = 12)
    @JsonView({ListView.class,PageView.class})
    private BigDecimal price;

    @Column(nullable = false, precision = 27, scale = 12)
    @JsonView({ListView.class,PageView.class})
    private BigDecimal marketPrice;

    @NotEmpty
    @Column(nullable = false)
    @JsonView({ListView.class,PageView.class})
    private String icon;

    @NotEmpty
    @Column(nullable = false)
    @JsonView({ListView.class,PageView.class})
    private String name;

    /**
     * 1: 普通商品
     * 2：红包商品
     * 3：兑换商品
     */
    @NotNull
    @Column(nullable = false)
    @JsonView({ListView.class,PageView.class})
    private Integer type;

    @NotNull
    @Column(nullable = false)
    @JsonView({ListView.class,PageView.class})
    private Integer exchangeNumber;

    @Convert(converter = ImagesConvert.class)
    @JsonView({ListView.class,PageView.class})
    @Lob
    private List<String> images = new ArrayList<>();

    @Lob
    @JsonView({ListView.class})
    private String introduction;

    @NotNull
    @Column(nullable = false)
    @JsonView({ListView.class,PageView.class})
    private Integer quantity;

    @NotNull
    @Column(nullable = false)
    @JsonView({ListView.class,PageView.class})
    private Integer status;

    /**
     * 是否有教程
     */
    @NotNull
    @Column(nullable = false)
    @JsonView({ListView.class,PageView.class})
    private Boolean isUnderLine;

    public ProductCategory getProductCategory() {
        return productCategory;
    }

    public void setProductCategory(ProductCategory productCategory) {
        this.productCategory = productCategory;
    }

    public App getApp() {
        return app;
    }

    public void setApp(App app) {
        this.app = app;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public BigDecimal getMarketPrice() {
        return marketPrice;
    }

    public void setMarketPrice(BigDecimal marketPrice) {
        this.marketPrice = marketPrice;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Boolean getIsUnderLine() {
        return isUnderLine;
    }

    public void setIsUnderLine(Boolean isUnderLine) {
        this.isUnderLine = isUnderLine;
    }

    public Integer getExchangeNumber() {
        return exchangeNumber;
    }

    public void setExchangeNumber(Integer exchangeNumber) {
        this.exchangeNumber = exchangeNumber;
    }

    @Transient
    @JsonView({ListView.class})
    public Integer getExchangeType(){
        return 2;
    }
    @Transient
    @JsonView({ListView.class})
    public boolean getIsFree(){
        return true;
    }
    @Transient
    @JsonView({ListView.class})
    public BigDecimal getMoney(){
        return new BigDecimal(1.23);
    }
    @Transient
    @JsonView({PageView.class})
    public String getProductCategoryName(){
        if(productCategory!=null){
            return productCategory.getName();
        }
        return null;
    }

    @Convert
    public static class ImagesConvert extends BaseAttributeConverter<List<String>> {

    }
}
