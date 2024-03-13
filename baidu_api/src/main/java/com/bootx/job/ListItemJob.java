package com.bootx.job;

import com.bootx.entity.FileList;
import com.bootx.pojo.FileListPojo;
import com.bootx.service.BaiDuAccessTokenService;
import com.bootx.service.FileListService;
import com.bootx.util.BaiDuUtils;
import com.bootx.util.FileUploadUtils;
import jakarta.annotation.Resource;
import org.apache.commons.lang3.StringUtils;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * @author black
 */
//@Component
public class ListItemJob {

    ExecutorService executor = Executors.newFixedThreadPool(4);
    @Resource
    private BaiDuAccessTokenService baiDuAccessTokenService;

    @Resource
    private FileListService fileListService;

    @Resource
    private JdbcTemplate jdbcTemplate;

    @Scheduled(fixedRate = 1000*60*60*20)
    public void run0(){
        String token = baiDuAccessTokenService.getToken();
        FileListPojo fileListPojo = BaiDuUtils.fileList(token, "/shortVideo/2024/2024三月", null);
        fileListService.batchCreate(fileListPojo, fileListService.find(28L));
        fileListPojo.getList().forEach(list -> {
            fileListService.batchSaveChildren(list,token);
        });
    }


   //@Scheduled(fixedRate = 1000*60*60*20)
    public void run(){
        String token = baiDuAccessTokenService.getToken();
        List<Map<String, Object>> maps = jdbcTemplate.queryForList("select id from filelist where grade=5 and category=6;");
        for (Map<String, Object> map : maps) {
            FileList parent = fileListService.find(Long.valueOf(map.get("id").toString()));
            FileListPojo fileListPojo = BaiDuUtils.fileList(token, parent.getPath(), null);
            fileListService.batchCreate(fileListPojo, parent);
        }
    }

    @Scheduled(fixedRate = 1000*60*60*20)
    public void update(){
        String token = baiDuAccessTokenService.getToken();
        List<Map<String, Object>> maps = jdbcTemplate.queryForList("select id from filelist where grade=5 and category=6;");
        for (Map<String, Object> map : maps) {
            FileList parent = fileListService.find(Long.valueOf(map.get("id").toString()));
            FileListPojo fileListPojo = BaiDuUtils.fileList(token, parent.getPath(), null);
            fileListService.batchCreate(fileListPojo, parent);
        }
    }


    //@Scheduled(fixedRate = 1000*60*30)
    public void run1(){
        /*String token = baiDuAccessTokenService.getToken();
        String updateFsId = jdbcTemplate.queryForObject("select updateFsId from config", String.class);
        String[] split = updateFsId.split(",");
        boolean flag = true;
        for (String fsId : split) {
            try {
                FileList parent = fileListService.find(Long.valueOf(fsId));
                if(parent!=null && parent.getCategory()==6){
                    FileListPojo fileListPojo = BaiDuUtils.fileList(token, parent.getPath(), null);
                    fileListService.batchCreate(fileListPojo, parent);
                    fileListPojo.getList().forEach(list -> {
                        fileListService.batchSaveChildren(list,token);
                    });
                }

            }catch (Exception e){
                flag = false;
                e.printStackTrace();
            }
        }
        if(flag){
            jdbcTemplate.queryForObject("update config set updateFsId=null,lastModifiedDate=NOW(),version=version+1 ", String.class);
        }*/
    }

    //@Scheduled(fixedRate = 1000*2)
    public void run2() {
        String token = "121.3b6dd2b52b40b5478767a79f9c5facb6.YQbCWdedA74iNzcQIdvSCOn-p5z1rkROrPzSEYS.DITsEg";
        List<Map<String,Object>> fsIds = jdbcTemplate.queryForList("SELECT fsId,path,parent_id FROM filelist WHERE id >= ((SELECT MAX(id) FROM filelist)-(SELECT MIN(id) FROM filelist)) * RAND() + (SELECT MIN(id)  FROM filelist) and category=1 and playUrl is null limit 10;");
        for (Map<String, Object> map : fsIds) {
            String fsId = map.get("fsId")+"";
            String path = map.get("path")+"";
            String parentId = map.get("parent_id")+"";

            executor.submit(()->{
                String streaming = BaiDuUtils.streaming(token, path);
                while (!StringUtils.contains(streaming,"#EXT-X-ENDLIST")){
                    streaming = BaiDuUtils.streaming(token, path);
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                        throw new RuntimeException(e);
                    }
                }
                String path1 = "video/"+parentId+"/"+fsId+".m3u8";
                FileUploadUtils.upload(streaming,path1);
                String url = "https://bootx-video.oss-cn-hangzhou.aliyuncs.com/"+path1;
                int update = jdbcTemplate.update("update fileList set playUrl=?,lastModifiedDate=NOW(),version=version+1 where fsId=? and playUrl is null", url, fsId);
                System.out.println(update);
            });
        }
    }
}
