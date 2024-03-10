package com.bootx.service.impl;

import com.bootx.dao.FileListDao;
import com.bootx.entity.FileList;
import com.bootx.pojo.FileListPojo;
import com.bootx.service.FileListService;
import com.bootx.util.BaiDuUtils;
import jakarta.annotation.Resource;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
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
        redisService.set("needSaveOrUpdateFsId:"+fileList.getFsId(),fileList.getPath(),10, TimeUnit.DAYS);
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
                try {
                    String order = fileList.getFileName()
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
                    fileList.setOrder(Integer.valueOf(order));
                }catch (Exception ignored){
                }
            }
        }else{
            addCache(fileList.getFsId());
        }
        if(fileList.isNew()){
            fileList.setNeedUpdate(fileList.getCategory() == 6);
            return save(fileList);
        }else{
            if(fileList.getServerMTime()!=listDTO.getServerMtime()){
                fileList.setNeedUpdate(true);
                return update(fileList);
            }
            return null;
        }
    }

    private void addCache(Long fsId) {
       /* String s = redisService.get("needSaveOrUpdateFsId");
        if(StringUtils.isNotBlank(s)){
            s = "";
        }
        String[] split = s.split(",");
        if(!ArrayUtils.contains(split,fsId+"") && !redisService.hasKey("needSaveOrUpdateFsId:"+fsId)){
            redisService.set("needSaveOrUpdateFsId",s+","+fsId);
        }*/
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
                try {
                    String order = child.getFileName()
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
                    child.setOrder(Integer.valueOf(order));
                }catch (Exception ignored){
                }
            }else{
                addCache(fileList.getFsId());
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
            try {
                String order = fileList.getFileName()
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
                fileList.setOrder(Integer.valueOf(order));
            }catch (Exception ignored){
            }
            return save(fileList);
        }
        if(StringUtils.isNotBlank(fileList.getPlayUrl())){
            return null;
        }
        return fileList;
    }
}
