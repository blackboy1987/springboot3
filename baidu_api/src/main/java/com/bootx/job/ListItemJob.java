package com.bootx.job;

import com.bootx.entity.FileList;
import com.bootx.pojo.FileListPojo;
import com.bootx.service.BaiDuAccessTokenService;
import com.bootx.service.FileListService;
import com.bootx.service.RedisService;
import com.bootx.util.BaiDuUtils;
import com.bootx.util.FileUploadUtils;
import jakarta.annotation.Resource;
import org.apache.commons.lang3.StringUtils;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

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
    private RedisService redisService;

    @Resource
    private JdbcTemplate jdbcTemplate;

    //@Scheduled(cron = "0 0 0 * * ? *")
    public void run0(){
        String token = baiDuAccessTokenService.getToken();
        FileListPojo fileListPojo = BaiDuUtils.fileList(token, "/", null);
        for (FileListPojo.ListDTO listDTO : fileListPojo.getList()) {
            fileListService.create(listDTO, null);
        }
    }

    private void save(Integer grade){
        String token = baiDuAccessTokenService.getToken();
        List<Map<String, Object>> maps = jdbcTemplate.queryForList("select id from fileList where grade=? and needUpdate=true",grade);

        for (Map<String, Object> map : maps) {
            FileList parent = fileListService.find(Long.valueOf(map.get("id")+""));
            if(parent!=null){
                FileListPojo fileListPojo = BaiDuUtils.fileList(token, parent.getPath(), null);
                for (FileListPojo.ListDTO listDTO : fileListPojo.getList()) {
                    fileListService.create(listDTO, parent);
                }
                try {
                    jdbcTemplate.update("update filelist set needUpdate=false,lastModifiedDate=NOW(),version=version+1 where id=?;",map.get("id"));
                }catch (Exception e){
                    e.printStackTrace();
                }
            }
        }
    }
    //@Scheduled(cron = "0 30 0 * * ? *")
    public void run(){
        save(0);
    }

    //@Scheduled(cron = "0 30 2 * * ? *")
    public void run1(){
        save(1);
    }

    //@Scheduled(cron = "0 30 4 * * ? *")
    @Scheduled(fixedRate = 1000*60*60*24*20)
    public void run2(){
        save(2);
    }

    //@Scheduled(cron = "0 30 6 * * ? *")
    public void run3(){
        save(3);
    }

    //@Scheduled(cron = "0 30 8 * * ? *")
    public void run4(){
        save(4);
    }

   // @Scheduled(cron = "0 30 10 * * ? *")
    public void run5(){
        save(5);
    }

   // @Scheduled(cron = "0 30 12 * * ? *")
    public void run6(){
        save(6);
    }

   // @Scheduled(cron = "0 30 14 * * ? *")
    public void run7(){
        save(7);
    }

    //@Scheduled(cron = "0 30 16 * * ? *")
    public void run8(){
        save(8);
    }

   // @Scheduled(cron = "0 30 18 * * ? *")
    public void run9(){
        save(9);
    }

    //@Scheduled(cron = "0 30 20 * * ? *")
    public void run10(){
        save(10);
    }

    //@Scheduled(cron = "0 30 21 * * ? *")
    //@Scheduled(fixedRate = 1000*60*60*24*20)
    public void run100() throws InterruptedException {
        String token = baiDuAccessTokenService.getToken();
        List<Map<String, Object>> maps = jdbcTemplate.queryForList("select id from fileList where category=1 and playUrl is null");

        for (Map<String, Object> map : maps) {
            FileList fileList = fileListService.findByFsId(Long.valueOf(map.get("id")+""));
            if(fileList!=null){
                String streaming = BaiDuUtils.streaming(token, fileList.getPath());
                while (!StringUtils.contains(streaming,"#EXT-X-ENDLIST")){
                    Thread.sleep(1000);
                    streaming = BaiDuUtils.streaming(token, fileList.getPath());
                }

                String path = fileList.getFsId()+".m3u8";
                FileUploadUtils.upload(streaming,fileList.getFsId()+".m3u8");
                String url = "https://bootx-video.oss-cn-hangzhou.aliyuncs.com/"+path;
                fileList.setPlayUrl(url);
                fileListService.update(fileList);
            }
        }
    }
}
