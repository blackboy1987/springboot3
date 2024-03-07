package com.bootx.job;

import com.bootx.entity.FileList;
import com.bootx.pojo.CategoryListPojo;
import com.bootx.pojo.FileListPojo;
import com.bootx.pojo.FileMetasPojo;
import com.bootx.service.BaiDuAccessTokenService;
import com.bootx.service.FileListService;
import com.bootx.util.BaiDuUtils;
import com.bootx.util.JsonUtils;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

/**
 * @author black
 */
@Component
public class ListItemJob {

    @Resource
    private BaiDuAccessTokenService baiDuAccessTokenService;

    @Resource
    private FileListService fileListService;

    @Value("${fsId}")
    private Long fsId;

    //@Scheduled(fixedRate = 1000*60*60*24*20)
    public void run(){
        String token = baiDuAccessTokenService.getToken();
        FileListPojo fileListPojo = BaiDuUtils.fileList(token, "/");
        System.out.println(JsonUtils.toJson(fileListPojo));
        List<FileListPojo.ListDTO> list = fileListPojo.getList();
        for (FileListPojo.ListDTO listDTO : list) {
            fileListService.create(listDTO,null);
        }
    }

    //@Scheduled(fixedRate = 1000*60*60*24*20)
    public void run1(){
        FileList parent = fileListService.findByFsId(fsId);
        if(parent != null){
            String token = baiDuAccessTokenService.getToken();
            FileListPojo fileListPojo = BaiDuUtils.fileList(token, parent.getPath());
            List<FileListPojo.ListDTO> list = fileListPojo.getList();
            for (FileListPojo.ListDTO listDTO : list) {
                FileList fileList = fileListService.create(listDTO, parent);
                if(fileList.getCategory()==6){
                    fileListService.saveChildren(fileList,token);
                }
            }
        }
    }

    //@Scheduled(fixedRate = 1000*60*60*24*20)
    public void check(){
        Long checkFsId = 882820963403436L;
        String token = baiDuAccessTokenService.getToken();
        FileList byFsId = fileListService.findByFsId(checkFsId);

        FileMetasPojo filemetas = BaiDuUtils.filemetas(token, "["+checkFsId + "]");
        check1(byFsId,filemetas,token);
    }

    private void check1(FileList byFsId,FileMetasPojo filemetas,String token) {
        Long serverMTime = byFsId.getServerMTime();
        if(!serverMTime.equals(filemetas.getList().get(0).getServerMtime())){
            // 网盘的。说明里面有文件发生了变化。拉取里面的文件
            FileListPojo fileListPojo = BaiDuUtils.fileList(token, byFsId.getPath());
            Set<Long> collect = fileListPojo.getList().stream().map(item -> item.getFsId()).collect(Collectors.toSet());
            // 数据库的
            List<FileList> children = fileListService.getChildren(byFsId);
            List<FileList> needDelete = new ArrayList<>();
            children.forEach(child->{
                if(!collect.contains(child.getFsId())){
                    needDelete.add(child);
                }
            });
            // 删除
            if(!needDelete.isEmpty()){
                fileListService.remove(needDelete);
            }
            for (FileListPojo.ListDTO listDTO : fileListPojo.getList()) {
                Long fsId1 = listDTO.getFsId();
                FileList fileList = fileListService.findByFsId(fsId1);
                if(fileList==null){
                    FileList fileList1 = fileListService.create(listDTO, byFsId);
                    // 保存子目录
                    if(fileList1.getCategory()==6){
                        fileListService.saveChildren(fileList1,token);
                    }
                }else if(!listDTO.getServerMtime().equals(fileList.getServerMTime())){
                    FileMetasPojo filemetas1 = BaiDuUtils.filemetas(token, "["+fileList.getFsId() + "]");
                    check1(fileList,filemetas1,token);
                }
            }
        }
    }



    @Scheduled(fixedRate = 1000*60*60*24*20)
    public void run3(){
        String token = baiDuAccessTokenService.getToken();
        CategoryListPojo categoryListPojo = BaiDuUtils.categoryList(token, "/shortVideo", 6, 1,0,1000);
        System.out.println(categoryListPojo);
    }
}
