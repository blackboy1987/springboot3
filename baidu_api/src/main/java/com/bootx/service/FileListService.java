package com.bootx.service;

import com.bootx.entity.FileList;
import com.bootx.pojo.FileListPojo;

/**
 * @author black
 */
public interface FileListService extends BaseService<FileList,Long>{

    /**
     * 根据目录来获取目录下的文件，并保存到数据库
     * @param path
     */
    void create(String path,FileList parent);

    FileList findByFsId(Long fsId);

    FileList findByPath(String path);

    FileList create(FileListPojo.ListDTO listDTO);
}
