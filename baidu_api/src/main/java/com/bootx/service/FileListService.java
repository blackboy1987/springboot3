package com.bootx.service;

import com.bootx.entity.FileList;
import com.bootx.pojo.FileListPojo;

/**
 * @author black
 */
public interface FileListService extends BaseService<FileList,Long>{
    FileList findByFsId(Long fsId);

    FileList create(FileListPojo.ListDTO listDTO,FileList parent);

    void saveChildren(FileList fileList, String token);
}
