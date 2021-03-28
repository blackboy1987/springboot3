package com.bootx.entity;

import com.bootx.common.BaseAttributeConverter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class Novel extends BaseEntity<Long>{

    private String title;

    private String img;

    private String author;

    private String announcer;

    @NotEmpty
    @Column(nullable = false,updatable = false,unique = true)
    private String url;

    private String memo;

    @Column(length = 2000)
    private String content;

    private String updateTime;

    private String categoryName;

    @Convert(converter = TagConverter.class)
    private List<String> tags = new ArrayList<>();

    private Long collectionCount;

    private Long readCount;

    private Long commentCount;

    @NotNull
    @Min(0)
    @Column(nullable = false)
    private Integer itemCount;

    /**
     * 文章分类
     */
    @ManyToOne(fetch = FetchType.LAZY)
    private NovelCategory novelCategory;

    @NotEmpty
    @Column(nullable = false,updatable = false)
    private String type;

    /**
     * 文章标签
     */
    @JsonView(BaseView.class)
    @ManyToMany(fetch = FetchType.LAZY)
    @OrderBy("order asc")
    private Set<NovelTag> novelTags = new HashSet<>();


    @OneToMany(mappedBy = "novel",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private Set<NovelItem> novelItems = new HashSet<>();

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getAnnouncer() {
        return announcer;
    }

    public void setAnnouncer(String announcer) {
        this.announcer = announcer;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }

    public Long getCollectionCount() {
        return collectionCount;
    }

    public void setCollectionCount(Long collectionCount) {
        this.collectionCount = collectionCount;
    }

    public Long getReadCount() {
        return readCount;
    }

    public void setReadCount(Long readCount) {
        this.readCount = readCount;
    }

    public Long getCommentCount() {
        return commentCount;
    }

    public void setCommentCount(Long commentCount) {
        this.commentCount = commentCount;
    }

    public Set<NovelItem> getNovelItems() {
        return novelItems;
    }

    public void setNovelItems(Set<NovelItem> novelItems) {
        this.novelItems = novelItems;
    }

    public Integer getItemCount() {
        return itemCount;
    }

    public void setItemCount(Integer itemCount) {
        this.itemCount = itemCount;
    }

    public NovelCategory getNovelCategory() {
        return novelCategory;
    }

    public void setNovelCategory(NovelCategory novelCategory) {
        this.novelCategory = novelCategory;
    }

    public Set<NovelTag> getNovelTags() {
        return novelTags;
    }

    public void setNovelTags(Set<NovelTag> novelTags) {
        this.novelTags = novelTags;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Converter
    public static class TagConverter extends BaseAttributeConverter<List<String>>{

    }
}
