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

    @GetMapping
    public Result index(Long id) {
        for (Long start = id;start<(id+10);start++) {
            Novel novel = novelService.find(start);
            boolean flag = true;
            if(novel==null){
                continue;
            }
            File file = new File(id+"_"+novel.getTitle());
            System.out.println(file.exists());
            for (NovelItem novelItem:novel.getNovelItems()){
                if(!flag){
                    break;
                }
                String resourceUrl = novelItem.getResourceUrl();
                System.out.println(novel.getId()+":"+resourceUrl);
                String path = "D:/有声小说/"+novel.getCategoryName()+"/"+novel.getId()+"_"+novel.getTitle()+"_"+novel.getMemo()+"/"+novelItem.getOrder()+"_"+novelItem.getTitle()+"."+ FilenameUtils.getExtension(resourceUrl);
                try {
                    DownloadUtils.download(resourceUrl,path);
                }catch (Exception e){
                    e.printStackTrace();
                    FileUtils.deleteQuietly(new File(path));
                    flag = false;
                }
            }
        }
        return Result.success("ok");
    }
}
