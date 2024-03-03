package com.bootx.service;

import com.bootx.entity.FileList;

public interface FileListService extends BaseService<FileList,Long>{
    FileList findByFsId(Long fsId);
}
