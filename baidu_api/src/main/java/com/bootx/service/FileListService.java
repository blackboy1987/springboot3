package com.bootx.service;

import com.bootx.entity.FileList;
import com.bootx.pojo.FileListPojo;

import java.util.List;

/**
 * @author black
 */
public interface FileListService extends BaseService<FileList,Long>{
    FileList findByFsId(Long fsId);

    FileList create(FileListPojo.ListDTO listDTO,FileList parent);

    void saveChildren(FileList fileList, String token);

    List<FileList> getChildren(FileList parent);

    void remove(List<FileList> needDelete);

    FileList create1(FileListPojo.ListDTO listDTO, FileList parent);

    FileList next(FileList current);

    void batchCreate(FileListPojo fileListPojo, FileList parent);

    void batchSaveChildren(FileListPojo.ListDTO list, String token);
}
