
package com.bootx.app.zhishifufei.pojo;


import com.bootx.util.HtmlParseUtils;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.naming.directory.SearchResult;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@JsonIgnoreProperties(ignoreUnknown = true)
public class GetList implements Serializable {

    private String code;
    private Msg msg;
    public void setCode(String code) {
         this.code = code;
     }
     public String getCode() {
         return code;
     }

    public void setMsg(Msg msg) {
         this.msg = msg;
     }
     public Msg getMsg() {
         return msg;
     }

    public static class Msg {

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
        private String buygoods;

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public Integer getType() {
            return type;
        }

        public void setType(Integer type) {
            this.type = type;
        }

        public Long getTid() {
            return tid;
        }

        public void setTid(Long tid) {
            this.tid = tid;
        }

        public Integer getHot() {
            return hot;
        }

        public void setHot(Integer hot) {
            this.hot = hot;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getPicname() {
            return picname;
        }

        public void setPicname(String picname) {
            this.picname = picname;
        }

        public String getContent() {
            return HtmlParseUtils.parse(content);
        }

        public void setContent(String content) {
            this.content = HtmlParseUtils.parse(content);
        }

        public Integer getCount() {
            return count;
        }

        public void setCount(Integer count) {
            this.count = count;
        }

        public String getDizhi() {
            return dizhi;
        }

        public void setDizhi(String dizhi) {
            this.dizhi = dizhi;
        }

        public BigDecimal getPrice() {
            return price;
        }

        public void setPrice(BigDecimal price) {
            this.price = price;
        }

        public Date getAddtime() {
            return addtime;
        }

        public void setAddtime(Date addtime) {
            this.addtime = new Date(addtime.getTime()*1000);
        }

        public Integer getStatus() {
            return status;
        }

        public void setStatus(Integer status) {
            this.status = status;
        }

        public Integer getFenxiang() {
            return fenxiang;
        }

        public void setFenxiang(Integer fenxiang) {
            this.fenxiang = fenxiang;
        }

        public String getBuygoods() {
            return buygoods;
        }

        public void setBuygoods(String buygoods) {
            this.buygoods = buygoods;
        }
    }

}