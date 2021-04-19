package com.bootx.app.zhaocha.entity;

import com.bootx.entity.BaseEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "zhaocha_rank")
public class Rank extends BaseEntity<Long> {

    @NotNull
    @Min(1)
    @Column(nullable = false,unique = true)
    private Integer rank;

    private String img;

    @NotEmpty
    @Column(nullable = false,unique = true)
    private String name;


    @NotNull
    @Min(1)
    @Column(nullable = false,unique = true)
    private Integer level;

    private String title;

    private String rankImg;

    public Integer getRank() {
        return rank;
    }

    public void setRank(Integer rank) {
        this.rank = rank;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getRankImg() {
        return rankImg;
    }

    public void setRankImg(String rankImg) {
        this.rankImg = rankImg;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }
}
