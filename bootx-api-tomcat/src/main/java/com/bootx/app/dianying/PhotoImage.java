package com.bootx.app.dianying;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PhotoImage implements Serializable {

    private Image small = new Image();

    private Image large =  new Image();

    public Image getSmall() {
        return small;
    }

    public void setSmall(Image small) {
        this.small = small;
    }

    public Image getLarge() {
        return large;
    }

    public void setLarge(Image large) {
        this.large = large;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Image implements Serializable{
        private String url;

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }
    }
}
