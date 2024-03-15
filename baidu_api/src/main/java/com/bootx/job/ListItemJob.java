package com.bootx.job;

import com.bootx.entity.FileList;
import com.bootx.pojo.FileListPojo;
import com.bootx.service.BaiDuAccessTokenService;
import com.bootx.service.FileListService;
import com.bootx.util.BaiDuUtils;
import jakarta.annotation.Resource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
 * @author black
 */
@Component
public class ListItemJob {

    @Resource
    private BaiDuAccessTokenService baiDuAccessTokenService;

    @Resource
    private FileListService fileListService;

    @Resource
    private JdbcTemplate jdbcTemplate;


    @Scheduled(fixedRate = 1000*60*60*20)
    public void run0() {
        // 从网盘里面拉取文件
        String token = baiDuAccessTokenService.getToken();
        FileListPojo list = BaiDuUtils.fileList(token, "/shortVideo/2024",0);
        if (!list.getList().isEmpty()) {
            for (FileListPojo.ListDTO listDTO : list.getList()) {
                check(token,listDTO,listDTO.getFsId());
            }
        }
    }


    private void check(String token,FileListPojo.ListDTO listDTO,Long fsId) {
        FileList byFsId = fileListService.findByFsId(listDTO.getFsId());
        // 服务器修改时间
        Long serverMtime = listDTO.getServerMtime();
        Boolean flag = false;
        if(byFsId == null){
            // 需要保存
            FileList fileList = fileListService.create(listDTO);
            fileListService.create(fileList.getPath());
            System.out.println("保存:"+listDTO.getPath());
            flag = true;
        }else if(!Objects.equals(byFsId.getServerMTime(), serverMtime)){
            flag = true;
        }
        if(flag){
            FileListPojo list = BaiDuUtils.fileList(token, listDTO.getPath(),null);
            if (!list.getList().isEmpty()) {
                for (FileListPojo.ListDTO child : list.getList()) {
                    check(token,child);
                }
            }
        }
    }
}
