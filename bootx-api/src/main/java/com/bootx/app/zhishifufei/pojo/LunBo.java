package com.bootx.app.zhishifufei.pojo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class LunBo implements Serializable {
    private List<Slun> slun;
    public void setSlun(List<Slun> slun) {
        this.slun = slun;
    }
    public List<Slun> getSlun() {
        return slun;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Slun implements Serializable {

        private Long id;
        private String title;
        private String picname;
        private String link;
        private Integer sort;
        private Integer status;

        public void setId(Long id) {
            this.id = id;
        }
        public Long getId() {
            return id;
        }

        public void setTitle(String title) {
            this.title = title;
        }
        public String getTitle() {
            return title;
        }

        public void setPicname(String picname) {
            this.picname = picname;
        }
        public String getPicname() {
            return picname;
        }

        public void setLink(String link) {
            this.link = link;
        }
        public String getLink() {
            return link;
        }

        public void setSort(Integer sort) {
            this.sort = sort;
        }
        public Integer getSort() {
            return sort;
        }

        public void setStatus(Integer status) {
            this.status = status;
        }
        public Integer getStatus() {
            return status;
        }

    }
}