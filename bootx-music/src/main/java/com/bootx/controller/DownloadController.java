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
        ExecutorService fixedThreadPool = Executors.newFixedThreadPool(10);
        List<Map<String,Object>> list = jdbcTemplate.queryForList("select id,itemCount,url from novel order by itemCount asc, id asc");
        for (int i=0;i<list.size();i++) {
            int finalI = i;
            fixedThreadPool.execute(()->{
                Novel novel = novelService.find(Long.valueOf(list.get(finalI).get("id")+""));
                if(novel!=null){
                    File file = new File("/Volumes/blackboy/有声小说/"+novel.getCategoryName()+"/"+parse(novel.getId())+"_"+novel.getTitle());
                    if(!file.exists()){
                        for (NovelItem novelItem:novel.getNovelItems()){
                            String resourceUrl = novelItem.getResourceUrl();
                            System.out.println(novel.getId()+":"+resourceUrl);
                            String path = "/Volumes/blackboy/有声小说/"+novel.getCategoryName()+"/"+parse(novel.getId())+"_"+novel.getTitle()+"_"+novel.getMemo()+"/"+novelItem.getOrder()+"_"+novelItem.getTitle()+"."+ FilenameUtils.getExtension(resourceUrl);
                            try {
                                DownloadUtils.download(resourceUrl,path);
                            }catch (Exception e){
                                e.printStackTrace();
                                FileUtils.deleteQuietly(new File(path));
                            }
                        }
                    }else{
                        System.out.println(novel.getId()+":已存在！！！");
                    }
                }
            });
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
