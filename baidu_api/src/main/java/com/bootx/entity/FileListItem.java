package com.bootx.entity;

import jakarta.persistence.*;
import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class FileListItem extends OrderedEntity<Long>{

    /**
     * 树路径分隔符
     */
    public static final String TREE_PATH_SEPARATOR = ",";

    private Long fsId;

    private Integer category;

    private String path;

    private String fileName;

    private Long serverMTime;

    private Long serverCTime;

    private Long localMTime;

    private Long localCTime;

    /**
     * 上级分类
     */
    @ManyToOne(fetch = FetchType.LAZY)
    private FileList fileList;

    public Long getFsId() {
        return fsId;
    }

    public void setFsId(Long fsId) {
        this.fsId = fsId;
    }

    public Integer getCategory() {
        return category;
    }

    public void setCategory(Integer category) {
        this.category = category;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public Long getServerMTime() {
        return serverMTime;
    }

    public void setServerMTime(Long serverMTime) {
        this.serverMTime = serverMTime;
    }

    public Long getServerCTime() {
        return serverCTime;
    }

    public void setServerCTime(Long serverCTime) {
        this.serverCTime = serverCTime;
    }

    public Long getLocalMTime() {
        return localMTime;
    }

    public void setLocalMTime(Long localMTime) {
        this.localMTime = localMTime;
    }

    public Long getLocalCTime() {
        return localCTime;
    }

    public void setLocalCTime(Long localCTime) {
        this.localCTime = localCTime;
    }

    public FileList getFileList() {
        return fileList;
    }

    public void setFileList(FileList fileList) {
        this.fileList = fileList;
    }
}
