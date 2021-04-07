package com.bootx.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class NovelItem extends OrderedEntity<Long>{

    private String title;

    @NotEmpty
    @Column(nullable = false,unique = true)
    private String url;

    @NotNull
    @JoinColumn(nullable = false,updatable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Novel novel;

    private String resourceUrl;

    @NotEmpty
    @Column(nullable = false,updatable = false)
    private String type;


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Novel getNovel() {
        return novel;
    }

    public void setNovel(Novel novel) {
        this.novel = novel;
    }

    public String getResourceUrl() {
        return resourceUrl;
    }

    public void setResourceUrl(String resourceUrl) {
        this.resourceUrl = resourceUrl;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
