package com.bootx.service.impl;

import com.bootx.dao.FileListDao;
import com.bootx.entity.FileList;
import com.bootx.pojo.FileListPojo;
import com.bootx.service.BaiDuAccessTokenService;
import com.bootx.service.FileListService;
import com.bootx.util.BaiDuUtils;
import jakarta.annotation.Resource;
import jakarta.transaction.Transactional;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author black
 */
@Service
public class FileListServiceImpl extends BaseServiceImpl<FileList,Long> implements FileListService {

    @Resource
    private BaiDuAccessTokenService baiDuAccessTokenService;

    @Resource
    private FileListDao fileListDao;

    @Override
    public FileList findByFsId(Long fsId) {
        return fileListDao.find("fsId",fsId);
    }
    @Override
    public FileList findByPath(String path) {
        return fileListDao.find("path",path);
    }

    @Override
    public void create(String path) {
        FileList parent = findByPath(path);
        String token = baiDuAccessTokenService.getToken();
        FileListPojo fileListPojo = BaiDuUtils.list(token, path);
        if (!fileListPojo.getList().isEmpty()) {
            fileListPojo.getList().forEach(fileList -> {
                createByJdbc(fileList,parent);
                if(fileList.getCategory()==6){
                    create(fileList.getPath());
                }
            });
        }
    }

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

    private void createByJdbc(FileListPojo.ListDTO fileList,FileList parent) {
        int update = jdbcTemplate.update("insert into filelist(" +
                        "createdDate, lastModifiedDate, version, " +
                        "orders, category, fileName, fsId, grade, localCTime, localMTime, status, path, playUrl, serverCTime, serverMTime, treePath, parent_id) value (" +
                        "NOW(),NOW(),0" +
                        ",?,?,?,?,?,?,?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE version=version+1,lastModifiedDate=NOW()",
                getOrder(fileList.getServerFilename()),
                fileList.getCategory(),
                fileList.getServerFilename(),
                fileList.getFsId(),
                (parent == null) ? 0 : parent.getGrade() + 1,
                fileList.getLocalCtime(),
                fileList.getLocalMtime(),
                fileList.getCategory() == 6 ? 1:0,
                fileList.getPath(),
                null,
                fileList.getServerCtime(),
                fileList.getServerMtime(),
                parent == null ? "," : parent.getTreePath() + parent.getId() + ",",
                parent == null ? null : parent.getId()
        );
        System.out.println(update);
    }

    @Transactional
    public FileList create(FileListPojo.ListDTO fileList) {
        FileList current = findByFsId(fileList.getFsId());
        if(current==null){
            current = new FileList();
        }
        current.setParent(null);
        current.setFsId(fileList.getFsId());
        current.setFileName(fileList.getServerFilename());
        current.setCategory(fileList.getCategory());
        current.setPath(fileList.getPath());
        current.setLocalMTime(fileList.getLocalMtime());
        current.setLocalCTime(fileList.getLocalCtime());
        current.setServerCTime(fileList.getServerCtime());
        current.setServerMTime(fileList.getServerMtime());
        current.setTreePath(null);
        current.setGrade(null);
        current.setChildren(new HashSet<>());

        if(fileList.getCategory()!=6){
            FileListPojo.Thumb thumbs = fileList.getThumbs();
            if(thumbs!=null && StringUtils.isNotBlank(thumbs.getIcon())){
                current.setCover(thumbs.getIcon());
            }
            if(current.getOrder()==null){
                current.setOrder(getOrder(current.getFileName()));
            }
        }
        if(current.isNew()){
            current.setStatus(fileList.getCategory() == 6 ? 1:0);
            return save(current);
        }else{
            if(!current.getServerMTime().equals(fileList.getServerMtime())){
                current.setStatus(1);
                return update(current);
            }
            return null;
        }
    }


















    private Integer getOrder(String fileName){
        try {
            String order = fileName
                    .replaceAll(".mp4", "")
                    .replaceAll("视频", ",")
                    .replaceAll("-", "")
                    .replaceAll("完", "")
                    .replaceAll("第", "")
                    .replaceAll("52短剧网(52duanju.com)-mp4juepinyishen", "")
                    .replaceAll("52短剧网(52duanju.com)", "")
                    .replaceAll("-", "");
            Pattern pattern = Pattern.compile("[^0-9]");
            Matcher matcher = pattern.matcher(order);
            order = matcher.replaceAll("");
            return Integer.valueOf(order);
        }catch (Exception ignored){
        }

        return null;
    }
}
