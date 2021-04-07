package com.bootx.util.baidu.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class FileListResponse extends BaiDuResponse {

    private List<FileList> list = new ArrayList<>();

    public List<FileList> getList() {
        return list;
    }

    public void setList(List<FileList> list) {
        this.list = list;
    }

    public static class FileList {
        @JsonProperty("fs_id")
        private String fsId;//文件在云端的唯一标识ID
        private String path;//	文件的绝对路径
        @JsonProperty("server_filename")
        private String serverFilename; //文件名称
        private Long size;//文件大小，单位B
        @JsonProperty("server_mtime")
        private Long serverMtime;//	uint	文件在服务器修改时间
        @JsonProperty("server_ctime")
        private Long serverCtime;//	unit	文件在服务器创建时间
        @JsonProperty("server_atime")
        private Long serverAtime;
        @JsonProperty("local_mtime")
        private Long localMtime;//	uint	文件在客户端修改时间
        @JsonProperty("local_ctime")
        private Long localCtime;//	unit	文件在客户端创建时间
        private Integer isdir;//	uint	是否目录，0 文件、1 目录
        private Integer category;//	unit	文件类型，1 视频、2 音频、3 图片、4 文档、5 应用、6 其他、7 种子
        private String md5;//	string	文件的md5值，只有是文件类型时，该KEY才存在
        @JsonProperty("dir_empty")
        private Integer dirEmpty;//	int	该目录是否存在子目录， 只有请求参数带WEB且该条目为目录时，该KEY才存在， 0为存在， 1为不存在
        private Map<String,String> thumbs;//	array	只有请求参数带WEB且该条目分类为图片时，该KEY才存在，包含三个尺寸的缩略图URL

        private Integer share;

        private Integer unlist;

        private Integer pl;

        private Integer wpfile;
        @JsonProperty("oper_id")
        private Long operId;

        public String getFsId() {
            return fsId;
        }

        public void setFsId(String fsId) {
            this.fsId = fsId;
        }

        public String getPath() {
            return path;
        }

        public void setPath(String path) {
            this.path = path;
        }

        public String getServerFilename() {
            return serverFilename;
        }

        public void setServerFilename(String serverFilename) {
            this.serverFilename = serverFilename;
        }

        public Long getSize() {
            return size;
        }

        public void setSize(Long size) {
            this.size = size;
        }

        public Long getServerMtime() {
            return serverMtime;
        }

        public void setServerMtime(Long serverMtime) {
            this.serverMtime = serverMtime;
        }

        public Long getServerCtime() {
            return serverCtime;
        }

        public void setServerCtime(Long serverCtime) {
            this.serverCtime = serverCtime;
        }

        public Long getLocalMtime() {
            return localMtime;
        }

        public void setLocalMtime(Long localMtime) {
            this.localMtime = localMtime;
        }

        public Long getLocalCtime() {
            return localCtime;
        }

        public void setLocalCtime(Long localCtime) {
            this.localCtime = localCtime;
        }

        public Integer getIsdir() {
            return isdir;
        }

        public void setIsdir(Integer isdir) {
            this.isdir = isdir;
        }

        public Integer getCategory() {
            return category;
        }

        public void setCategory(Integer category) {
            this.category = category;
        }

        public String getMd5() {
            return md5;
        }

        public void setMd5(String md5) {
            this.md5 = md5;
        }

        public Integer getDirEmpty() {
            return dirEmpty;
        }

        public void setDirEmpty(Integer dirEmpty) {
            this.dirEmpty = dirEmpty;
        }

        public Map<String, String> getThumbs() {
            return thumbs;
        }

        public void setThumbs(Map<String, String> thumbs) {
            this.thumbs = thumbs;
        }

        public Integer getShare() {
            return share;
        }

        public void setShare(Integer share) {
            this.share = share;
        }

        public Integer getUnlist() {
            return unlist;
        }

        public void setUnlist(Integer unlist) {
            this.unlist = unlist;
        }

        public Integer getPl() {
            return pl;
        }

        public void setPl(Integer pl) {
            this.pl = pl;
        }

        public Long getServerAtime() {
            return serverAtime;
        }

        public void setServerAtime(Long serverAtime) {
            this.serverAtime = serverAtime;
        }

        public Integer getWpfile() {
            return wpfile;
        }

        public void setWpfile(Integer wpfile) {
            this.wpfile = wpfile;
        }

        public Long getOperId() {
            return operId;
        }

        public void setOperId(Long operId) {
            this.operId = operId;
        }
    }
}
