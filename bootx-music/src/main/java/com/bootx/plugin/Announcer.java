package com.bootx.plugin;

public class Announcer {

    private String name;

    private String url;

    public Announcer() {
    }

    public Announcer(String name) {
        this.name = name;
    }

    public Announcer(String name, String url) {
        this.name = name;
        this.url = url;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
