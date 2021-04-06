package com.bootx.app.dianying.entity;

import com.bootx.common.BaseAttributeConverter;
import com.bootx.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.Convert;
import javax.persistence.Converter;
import javax.persistence.Entity;
import java.util.ArrayList;
import java.util.List;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class Movie extends BaseEntity<Long> {

    private Long douBanBanId;


    private String title;

    private String image;

    private String score;

    private String timeLength;

    @Convert(converter = CategoryConverter.class)
    private List<String> categories = new ArrayList<>();

    public Long getDouBanBanId() {
        return douBanBanId;
    }

    public void setDouBanBanId(Long douBanBanId) {
        this.douBanBanId = douBanBanId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getScore() {
        return score;
    }

    public void setScore(String score) {
        this.score = score;
    }

    public String getTimeLength() {
        return timeLength;
    }

    public void setTimeLength(String timeLength) {
        this.timeLength = timeLength;
    }

    public List<String> getCategories() {
        return categories;
    }

    public void setCategories(List<String> categories) {
        this.categories = categories;
    }


    @Converter
    public static class CategoryConverter extends BaseAttributeConverter<List<String>>{}
}
