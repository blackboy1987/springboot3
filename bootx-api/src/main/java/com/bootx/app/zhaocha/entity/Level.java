package com.bootx.app.zhaocha.entity;

import com.bootx.common.BaseAttributeConverter;
import com.bootx.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.apache.commons.collections.ArrayStack;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "zhaocha_level")
public class Level extends BaseEntity<Long> {



    @NotNull
    @Min(1)
    @Column(nullable = false,updatable = false,unique = true)
    private Integer level;

    @NotNull
    @Min(1)
    @Column(nullable = false,updatable = false)
    private Integer rank;

    /**
     * 是否升级
     */
    @NotNull
    @Column(nullable = false)
    private Integer rankUp;

    @Lob
    @Convert(converter = LayerConverter.class)
    @NotEmpty
    private List<Layer> content = new ArrayList<>();

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public Integer getRank() {
        return rank;
    }

    public void setRank(Integer rank) {
        this.rank = rank;
    }

    public Integer getRankUp() {
        return rankUp;
    }

    public void setRankUp(Integer rankUp) {
        this.rankUp = rankUp;
    }

    public List<Layer> getContent() {
        return content;
    }

    public void setContent(List<Layer> content) {
        this.content = content;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Layer implements Serializable {
        private String name;

        private String layer;

        private Integer x;

        private Integer y;

        private Integer width;

        private Integer height;

        private String url;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getLayer() {
            return layer;
        }

        public void setLayer(String layer) {
            this.layer = layer;
        }

        public Integer getX() {
            return x;
        }

        public void setX(Integer x) {
            this.x = x;
        }

        public Integer getY() {
            return y;
        }

        public void setY(Integer y) {
            this.y = y;
        }

        public Integer getWidth() {
            return width;
        }

        public void setWidth(Integer width) {
            this.width = width;
        }

        public Integer getHeight() {
            return height;
        }

        public void setHeight(Integer height) {
            this.height = height;
        }


        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }
    }

    @Converter
    public static class LayerConverter extends BaseAttributeConverter<List<Layer>>{}

}
