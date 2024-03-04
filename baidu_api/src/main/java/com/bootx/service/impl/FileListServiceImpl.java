package com.bootx.service.impl;

import com.bootx.dao.FileListDao;
import com.bootx.entity.FileList;
import com.bootx.service.FileListService;
import jakarta.annotation.Resource;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

@Service
public class FileListServiceImpl extends BaseServiceImpl<FileList,Long> implements FileListService {

    @Resource
    private FileListDao fileListDao;

    @Override
    public FileList save(FileList fileList) {

        setValue(fileList);
        return super.save(fileList);
    }

    @Override
    @Transactional
    public FileList update(FileList fileList) {
        setValue(fileList);
        for (FileList children : fileListDao.findChildren(fileList, true, null)) {
            setValue(children);
        }
        return super.update(fileList);
    }

    /**
     * 设置值
     *
     * @param fileList
     *            商品分类
     */
    private void setValue(FileList fileList) {
        if (fileList == null) {
            return;
        }
        FileList parent = fileList.getParent();
        if (parent != null) {
            fileList.setTreePath(parent.getTreePath() + parent.getId() + FileList.TREE_PATH_SEPARATOR);
        } else {
            fileList.setTreePath(FileList.TREE_PATH_SEPARATOR);
        }
        fileList.setGrade(fileList.getParentIds().length);
    }

    @Override
    public FileList findByFsId(Long fsId) {
        return fileListDao.find("fsId",fsId);
    }
}
