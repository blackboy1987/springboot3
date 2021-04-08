package com.bootx.controller;

import com.bootx.common.Result;
import com.bootx.entity.Novel;
import com.bootx.entity.NovelItem;
import com.bootx.service.NovelService;
import com.bootx.service.RedisService;
import com.bootx.util.DownloadUtils;
import com.bootx.util.novel.ETingShuUtils;
import com.bootx.util.novel.Ting55Utils;
import com.bootx.util.novel.TingChina;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@RestController
@RequestMapping("/download")
public class DownloadController {

    public static final Map<String,Integer> map = new HashMap<>();

    @Resource
    private NovelService novelService;

    @Resource
    private RedisService redisService;

    @Resource
    private JdbcTemplate jdbcTemplate;

    @GetMapping
    public Result index() {

        List<Map<String, Object>> list = jdbcTemplate.queryForList("select id from novel ORDER BY itemCount ASC,id DESC");
        ExecutorService fixedThreadPool = Executors.newFixedThreadPool(10);
        for (Integer start = 0;start<list.size();start++) {
            Novel novel = novelService.find(Long.valueOf(list.get(start).get("id")+""));
            final boolean[] flag = {true};
            for (NovelItem novelItem:novel.getNovelItems()){
                fixedThreadPool.execute(()->{
                    if(flag[0]){
                        String resourceUrl = novelItem.getResourceUrl();
                        if(!redisService.hasKey(novelItem.getId()+"_resource")&&!redisService.hasKey(novelItem.getId()+"_resource_error")){
                            String path = "F:/有声小说/"+novel.getCategoryName()+"/"+parse(novel.getId())+"_"+novel.getTitle()+"_"+novel.getMemo()+"/"+parse(novelItem.getOrder()+0L)+"_"+novelItem.getTitle()+"."+ FilenameUtils.getExtension(resourceUrl);
                            long start1 = System.currentTimeMillis();
                            try {
                                DownloadUtils.download(resourceUrl,path);
                                redisService.set(novelItem.getId()+"_resource","ok");
                                System.out.println((System.currentTimeMillis()-start1)/1000+"=="+path+"======完成");
                            }catch (Exception e){
                                e.printStackTrace();
                                redisService.set(novelItem.getId()+"_resource_error","ok");
                                System.out.println((System.currentTimeMillis()-start1)/1000+"=="+path+"======完成=============error");
                                FileUtils.deleteQuietly(new File(path));
                                flag[0] = false;
                            }
                        }
                    }
                });
            }
        }
        return Result.success("ok");
    }

    private String parse(Long id) {
        if(id<10){
            return "0000"+id;
        }
        if(id<100){
            return "000"+id;
        }
        if(id<1000){
            return "00"+id;
        }
        if(id<10000){
            return "0"+id;
        }
        return id+"";
    }
}
