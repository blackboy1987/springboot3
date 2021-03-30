package com.bootx.controller;

import com.bootx.common.Result;
import com.bootx.entity.Novel;
import com.bootx.service.NovelCategoryService;
import com.bootx.service.NovelService;
import com.bootx.service.RedisService;
import com.bootx.util.JsonUtils;
import com.bootx.util.novel.Ting55Utils;
import com.bootx.util.novel.TingChina;
import com.bootx.util.novel.TingDongFangUtils;
import com.bootx.util.novel.XSTSUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@RestController
@RequestMapping("/craw")
public class CrawlController {

    public static final Map<String,Integer> map = new HashMap<>();

    @Resource
    private NovelService novelService;

    @Resource
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/tingchina")
    public Result tingchina() {
        ExecutorService fixedThreadPool = Executors.newFixedThreadPool(5);
        for (Long i = 1L; i < 50000L; i++) {
            Long finalI = i;
            fixedThreadPool.execute(()->{
                try {
                    Novel novel = TingChina.detail(finalI);
                    if(novel!=null){
                        novel.getNovelItems().stream().forEach(item->item.setNovel(novel));
                        novelService.save(novel);
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            });
        }
        return Result.success("ok");
    }

    @GetMapping("/ting55")
    public Result ting55() {
        ExecutorService fixedThreadPool = Executors.newFixedThreadPool(5);
        for (Long i = 1L; i < 20000L; i++) {
            Long finalI = i;
            fixedThreadPool.execute(()->{
                try {
                    String url = "https://www.ting55.com" + "/book/"+ finalI;
                    if(!novelService.urlExists(url)){
                        Novel novel = Ting55Utils.detail(finalI);
                        if(novel!=null){
                            novel.getNovelItems().stream().forEach(item->item.setNovel(novel));
                            System.out.println("charu:"+finalI);
                            novelService.save(novel);
                        }
                    }else{
                        System.out.println("数据库存在:"+finalI);
                    }

                } catch (IOException e) {
                    e.printStackTrace();
                }
            });
        }
        return Result.success("ok");
    }


    @GetMapping("/tingchina/mp3")
    public Result tingchinaMp3() {
        ExecutorService fixedThreadPool = Executors.newFixedThreadPool(10);
        List<Map<String, Object>> list = jdbcTemplate.queryForList("select id,url from novelItem where type='tingchina'");
        for (Map<String,Object> item:list) {
            fixedThreadPool.execute(()->{
                String mp3 = TingChina.mp3(item.get("url")+"");
                if(StringUtils.isNotBlank(mp3)){
                    System.out.println(mp3);
                   jdbcTemplate.update("update novelItem set resourceUrl=? where id=?",mp3,item.get("id"));
                }

            });
        }

        return Result.success("ok");
    }
}
