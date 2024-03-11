package com.bootx.service.impl;

import com.bootx.dao.FileListDao;
import com.bootx.entity.FileList;
import com.bootx.pojo.FileListPojo;
import com.bootx.service.FileListService;
import com.bootx.util.BaiDuUtils;
import com.bootx.util.DateUtils;
import com.bootx.util.JsonUtils;
import jakarta.annotation.Resource;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.Parameter;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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

    @Override
    public FileList create(FileListPojo.ListDTO listDTO,FileList parent) {
        FileList fileList = findByFsId(listDTO.getFsId());
        if(fileList==null){
            fileList = new FileList();
        }
        fileList.setParent(parent);
        fileList.setFsId(listDTO.getFsId());
        fileList.setFileName(listDTO.getServerFilename());
        fileList.setCategory(listDTO.getCategory());
        fileList.setPath(listDTO.getPath());
        fileList.setLocalMTime(listDTO.getLocalMtime());
        fileList.setLocalCTime(listDTO.getLocalCtime());
        fileList.setServerCTime(listDTO.getServerCtime());
        fileList.setServerMTime(listDTO.getServerMtime());
        fileList.setTreePath(null);
        fileList.setGrade(null);
        fileList.setChildren(new HashSet<>());

        if(fileList.getCategory()!=6){
            FileListPojo.Thumb thumbs = listDTO.getThumbs();
            if(thumbs!=null && StringUtils.isNotBlank(thumbs.getIcon())){
                fileList.setCover(thumbs.getIcon());
            }
            if(fileList.getOrder()==null){
                fileList.setOrder(getOrder(fileList.getFileName()));
            }
        }
        if(fileList.isNew()){
            fileList.setNeedUpdate(fileList.getCategory() == 6);
            return save(fileList);
        }else{
            if(!fileList.getServerMTime().equals(listDTO.getServerMtime())){
                fileList.setNeedUpdate(true);
                return update(fileList);
            }
            return null;
        }
    }

    @Override
    public void saveChildren(FileList fileList, String token) {
        FileListPojo fileListPojo = BaiDuUtils.fileList(token, fileList.getPath(),0);
        for (FileListPojo.ListDTO listDTO : fileListPojo.getList()) {
            FileList child = findByFsId(listDTO.getFsId());
            if(child==null){
                child = new FileList();
            }
            child.setParent(fileList);
            child.setFsId(listDTO.getFsId());
            child.setFileName(listDTO.getServerFilename());
            child.setCategory(listDTO.getCategory());
            child.setPath(listDTO.getPath());
            child.setLocalMTime(listDTO.getLocalMtime());
            child.setLocalCTime(listDTO.getLocalCtime());
            child.setServerCTime(listDTO.getServerCtime());
            child.setServerMTime(listDTO.getServerMtime());
            child.setTreePath(null);
            child.setGrade(null);
            if(child.getCategory()!=6){
               child.setOrder(getOrder(child.getFileName()));
            }
            child.setChildren(new HashSet<>());
            if(child.isNew()){
                save(child);
            }else{
                update(child);
            }
            if(child.getCategory()==6){
                saveChildren(child,token);
            }
        }
    }

    @Override
    public List<FileList> getChildren(FileList parent) {
        return fileListDao.findChildren(parent,false,null);
    }

    @Override
    public void remove(List<FileList> needDelete) {
        needDelete.forEach(item->{
            List<Map<String, Object>> maps = jdbcTemplate.queryForList("select id from filelist where id=? or treePath like '%," + item.getId() + ",%' order by id desc ;", item.getId());
            if (!maps.isEmpty()) {
                maps.forEach(i->{
                    int update = jdbcTemplate.update("delete from filelist where id=?", i.get("id"));
                    System.out.println("delete====:"+update);
                });
            }
        });
    }

    @Override
    public FileList create1(FileListPojo.ListDTO listDTO, FileList parent) {
        FileList fileList = findByFsId(listDTO.getFsId());
        if(fileList==null){
            fileList = new FileList();
            fileList.setParent(parent);
            fileList.setFsId(listDTO.getFsId());
            fileList.setFileName(listDTO.getServerFilename());
            fileList.setCategory(listDTO.getCategory());
            fileList.setPath(listDTO.getPath());
            fileList.setLocalMTime(listDTO.getLocalMtime());
            fileList.setLocalCTime(listDTO.getLocalCtime());
            fileList.setServerCTime(listDTO.getServerCtime());
            fileList.setServerMTime(listDTO.getServerMtime());
            fileList.setTreePath(null);
            fileList.setGrade(null);
            fileList.setChildren(new HashSet<>());
            FileListPojo.Thumb thumbs = listDTO.getThumbs();
            if(thumbs!=null && StringUtils.isNotBlank(thumbs.getIcon())){
                fileList.setCover(thumbs.getIcon());
            }
            if(fileList.getOrder()==null){
                fileList.setOrder(getOrder(fileList.getFileName()));
            }
            return save(fileList);
        }
        if(StringUtils.isNotBlank(fileList.getPlayUrl())){
            return null;
        }
        return fileList;
    }

    @Override
    public FileList next(FileList current) {
        String treePath = current.getTreePath();
        try {
            Long id = jdbcTemplate.queryForObject("select id from filelist where treePath=? and orders>=? order by orders asc limit 1;", Long.class, treePath, current.getOrder() + 1);
            return find(id);
        }catch (Exception e){
            return null;
        }
    }

    @Override
    public void batchCreate(FileListPojo fileListPojo, FileList parent) {
        CompletableFuture.runAsync(()->{
            List<Object[]> objects = new ArrayList<>();
            for (FileListPojo.ListDTO listDTO : fileListPojo.getList()) {
                Object[] obj = new Object[15];
                // orders
                obj[0] = listDTO.getCategory()==6?null:getOrder(listDTO.getServerFilename());
                // category
                obj[1] = listDTO.getCategory();
                // cover
                obj[2] = null;
                // fileName
                obj[3] = listDTO.getServerFilename();
                // fsId
                obj[4] = listDTO.getFsId();
                // grade
                obj[5] = parent==null?0:parent.getGrade()+1;
                // localCTime
                obj[6] = listDTO.getLocalCtime();
                // localMTime
                obj[7] = listDTO.getLocalMtime();
                // needUpdate
                obj[8] = listDTO.getCategory()==6;
                // path
                obj[9] = listDTO.getPath();
                // playUrl
                obj[10] = null;
                // serverCTime
                obj[11] = listDTO.getServerCtime();
                // serverMTime
                obj[12] = listDTO.getServerMtime();
                // treePath
                obj[13] = parent!=null?parent.getTreePath()+parent.getId()+",":",";
                // parent_id
                obj[14] = parent==null?null:parent.getId();
                objects.add(obj);
            }
            jdbcTemplate.batchUpdate("insert into filelist(createdDate, lastModifiedDate, version, orders, category, cover, fileName, fsId, grade, localCTime, localMTime, needUpdate, path, playUrl, serverCTime, serverMTime, treePath, parent_id) value (NOW(),NOW(),0,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE version=version+1,lastModifiedDate=NOW()", objects);
        });
    }

    @Override
    public void batchSaveChildren(FileListPojo.ListDTO list, String token) {
        FileListPojo fileListPojo = BaiDuUtils.fileList(token, list.getPath(),0);
        if(!fileListPojo.getList().isEmpty()){
            batchCreate(fileListPojo,findByFsId(list.getFsId()));
            fileListPojo.getList().forEach(i->{
                if(i.getCategory()==6){
                    batchSaveChildren(i,token);
                }
            });


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
