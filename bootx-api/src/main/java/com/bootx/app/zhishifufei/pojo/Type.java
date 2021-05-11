package com.bootx.app.zhishifufei.pojo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Type implements Serializable {

    private String code;
    private List<Msg> msg;
    public void setCode(String code) {
        this.code = code;
    }
    public String getCode() {
        return code;
    }

    public void setMsg(List<Msg> msg) {
        this.msg = msg;
    }
    public List<Msg> getMsg() {
        return msg;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Msg implements Serializable {

        private Long id;
        private String picname;
        private String title;
        private Integer sort;
        private Integer status;
        public void setId(Long id) {
            this.id = id;
        }
        public Long getId() {
            return id;
        }

        public void setPicname(String picname) {
            this.picname = picname;
        }
        public String getPicname() {
            return picname;
        }

        public void setTitle(String title) {
            this.title = title;
        }
        public String getTitle() {
            return title;
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
