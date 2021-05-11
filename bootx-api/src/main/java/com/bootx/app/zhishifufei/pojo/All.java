package com.bootx.app.zhishifufei.pojo;

import com.bootx.util.HtmlParseUtils;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class All implements Serializable {

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
        private Integer type;
        private Long tid;
        private Integer hot;
        private String title;
        private String picname;
        private String content;
        private Integer count;
        private String dizhi;
        private BigDecimal price;
        private Date addtime;
        private Integer status;
        private Integer fenxiang;
        public void setId(Long id) {
            this.id = id;
        }
        public Long getId() {
            return id;
        }

        public void setType(Integer type) {
            this.type = type;
        }
        public Integer getType() {
            return type;
        }

        public void setTid(Long tid) {
            this.tid = tid;
        }
        public Long getTid() {
            return tid;
        }

        public void setHot(Integer hot) {
            this.hot = hot;
        }
        public Integer getHot() {
            return hot;
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

        public void setContent(String content) {
            this.content = HtmlParseUtils.parse(content);
        }
        public String getContent() {
            return HtmlParseUtils.parse(content);
        }

        public void setCount(Integer count) {
            this.count = count;
        }
        public Integer getCount() {
            return count;
        }

        public void setDizhi(String dizhi) {
            this.dizhi = dizhi;
        }
        public String getDizhi() {
            return dizhi;
        }

        public void setPrice(BigDecimal price) {
            this.price = price;
        }
        public BigDecimal getPrice() {
            return price;
        }

        public void setAddtime(Date addtime) {
            this.addtime = new Date(addtime.getTime()*1000);
        }
        public Date getAddtime() {
            return addtime;
        }

        public void setStatus(Integer status) {
            this.status = status;
        }
        public Integer getStatus() {
            return status;
        }

        public void setFenxiang(Integer fenxiang) {
            this.fenxiang = fenxiang;
        }
        public Integer getFenxiang() {
            return fenxiang;
        }
    }
}
