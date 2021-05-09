package com.bootx.app.daka.entity;

import com.bootx.entity.App;
import com.bootx.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.HashSet;
import java.util.Set;

@Entity(name = "daka_productcategory")
@Table(name = "daka_productcategory")
public class ProductCategory extends BaseEntity<Long> {

    @ManyToOne(fetch = FetchType.LAZY)
    private App app;

    @NotEmpty
    @Column(nullable = false)
    @JsonView({ListView.class,PageView.class})
    private String name;

    @OneToMany(mappedBy = "productCategory",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JsonView({ListView.class})
    private Set<Product> products = new HashSet<>();

    public App getApp() {
        return app;
    }

    public void setApp(App app) {
        this.app = app;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }
}
