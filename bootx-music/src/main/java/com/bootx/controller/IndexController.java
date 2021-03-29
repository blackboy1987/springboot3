package com.bootx.controller;

import com.bootx.common.Pageable;
import com.bootx.common.Result;
import com.bootx.entity.Novel;
import com.bootx.entity.NovelCategory;
import com.bootx.entity.NovelItem;
import com.bootx.service.NovelCategoryService;
import com.bootx.service.NovelService;
import com.bootx.service.RedisService;
import com.bootx.util.novel.*;
import com.bootx.util.JsonUtils;
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
@RequestMapping("/init")
public class IndexController {

    public static final Map<String,Integer> map = new HashMap<>();


    static {
        map.put("30",34);
        map.put("59",1);
        map.put("35",2);
        map.put("61",1);
        map.put("34",1);
        map.put("28",720);
        map.put("29",113);
    }


    @Resource
    private NovelService novelService;

    @Resource
    private NovelCategoryService novelCategoryService;

    @Resource
    private RedisService redisService;

    @Resource
    private JdbcTemplate jdbcTemplate;


    @GetMapping("/category")
    private Result category(){

        return Result.success(jdbcTemplate.queryForList("select id,name from novelCategory where isShow=true order by orders asc "));

    }

    @GetMapping("/xsts")
    public Result xsts() throws IOException {
        ExecutorService fixedThreadPool = Executors.newFixedThreadPool(5);
        for (int i = 1; i < 1486; i++) {
            int finalI = i;
            fixedThreadPool.execute(()->{
                Map<String, Object> detail = XSTSUtils.detail("https://www.xsts.net/"+ finalI +".html");
                if(detail!=null){
                    Novel novel = JsonUtils.toObject(JsonUtils.toJson(detail),Novel.class);
                    novel.getNovelItems().stream().forEach(item->item.setNovel(novel));
                    novel.setItemCount(novel.getNovelItems().size());
                    Novel byUrl = novelService.findByUrl(novel.getUrl());
                    if(byUrl!=null){
                        byUrl.setCategoryName(novel.getCategoryName());
                        novelService.update(byUrl);
                    }else{
                        novelService.save(novel);
                    }
                }
            });
        }
        return Result.success("ok");
    }

    @GetMapping("/tingdongfang")
    public Result tingdongfang() throws IOException {
        ExecutorService fixedThreadPool = Executors.newFixedThreadPool(10);
        for (Long i = 1L; i < 30000L; i++) {
            Long finalI = i;
            fixedThreadPool.execute(()->{
                Novel novel = TingDongFangUtils.detail(finalI);
                if(novel!=null){

                    novel.getNovelItems().stream().forEach(item->item.setNovel(novel));
                    novelService.save(novel);
                }
            });
        }
        return Result.success("ok");
    }

    @GetMapping("/tingchina")
    public Result tingchina() {
        ExecutorService fixedThreadPool = Executors.newFixedThreadPool(10);
        for (Long i = 40000L; i < 50000L; i++) {
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





















    @GetMapping("/list")
    private Result list(Pageable pageable,Long categoryId){
        if(categoryId==null){
            categoryId =0L;
        }
        if(categoryId!=0L){
            pageable.setPageSize(10);
            return Result.success(jdbcTemplate.queryForList("select id,title,img,itemCount,content,readCount from novel where novelCategory_id="+categoryId+" or novelCategory_id in (select id from novelcategory where parent_id="+categoryId+") limit "+(pageable.getPageNumber()-1)*pageable.getPageSize()+", "+pageable.getPageSize()));
        }
        pageable.setPageSize(10);
        return Result.success(jdbcTemplate.queryForList("select id,title,img,itemCount,content,readCount from novel where novelCategory_id=1 or novelCategory_id in (select id from novelcategory where parent_id=1) limit "+(pageable.getPageNumber()-1)*pageable.getPageSize()+", "+pageable.getPageSize()));
    }



    @GetMapping("/detail")
    private Result detail(Long id){
        Map<String,Object> data = jdbcTemplate.queryForMap("select title,img,title,content,memo from novel where id=?",id);
        data.put("items", jdbcTemplate.queryForList("select id,title,orders from novelItem where novel_id=?",id));
        return Result.success(data);
    }


    @GetMapping("/url")
    private Result url(Long id,Long itemId){
        String resourceUrl = jdbcTemplate.queryForObject("select resourceUrl from novelItem where novel_id=? and id=?",String.class,id,itemId);
        if(StringUtils.isBlank(resourceUrl)){
            resourceUrl = getResourceUrl(id,itemId);
        }

        return Result.success(resourceUrl);
    }

    private String getResourceUrl(Long id, Long itemId) {
        Map<String,Object> map = jdbcTemplate.queryForMap("select resourceUrl,id,url,type from novelItem where novel_id=? and id=?",id,itemId);
        String url = map.get("url")+"";
        String type = map.get("type")+"";
        String resourceUrl=map.get("resourceUrl")+"";
        if(StringUtils.equalsAnyIgnoreCase("tingdongfang", type)){
            resourceUrl = TingDongFangUtils.mp3(url);
        }
        System.out.println(resourceUrl);
        jdbcTemplate.update("update novelItem set resourceUrl=? where id=? and novel_id=?", resourceUrl,itemId,id);
        return resourceUrl;
    }

    @GetMapping
    public String init(){
        /*List<Novel> all = novelService.findAll();
        for (Novel novel:all) {
            if(StringUtils.isNotBlank(novel.getCategoryName())){
                continue;
            }
            novel.setReadCount(RandomUtils.nextInt(100000,10000000)+0L);
            novel.setCollectionCount(RandomUtils.nextInt(10000,100000)+0L);
            NovelCategory novelCategory = novel.getNovelCategory();
            if(novelCategory!=null&&novelCategory.getParent()!=null){
                novel.setCategoryName(novelCategory.getParent().getName());
            }else if(novelCategory!=null){
                novel.setCategoryName(novelCategory.getName());
            }
            new Thread(()->{
                System.out.println("+++++++++++++++++++++++++++++++++++++++++"+ novel.getId());
                novelService.update(novel);
            }).start();
        }*/
        List<Map<String, Object>> list = jdbcTemplate.queryForList("select categoryName from novel group by categoryName");
        list.stream().forEach(item->{
            String categoryName = item.get("categoryName")+"";
            if(StringUtils.isNotBlank(categoryName)){
                NovelCategory byName = novelCategoryService.findByName(categoryName);
                if(byName==null){
                    byName = new NovelCategory();
                    byName.setName(categoryName);
                    byName.setIsShow(true);
                    byName = novelCategoryService.save(byName);
                }
                jdbcTemplate.update("update novel set novelCategory_id=? where categoryName=?",byName.getId(),categoryName);
            }
        });






        return "ok";
    }

    @GetMapping("/init1")
    public String init1(){
        // https://www.ishuyin.com/show-24073.html
        for (int i=1;i<100000;i++) {
            Novel novel = IShuYinUtils.detail("https://www.ishuyin.com/show-"+i+".html",null);
            boolean b = redisService.hasKey(novel.getUrl());
            if(!b){
                new Thread(()->{
                    Novel novell = novelService.findByUrl(novel.getUrl());
                    if(novell==null){
                        novel.setReadCount(0L);
                        novel.setCollectionCount(0L);
                        novel.setCommentCount(0L);
                        novelService.save(novel);
                        redisService.set(novel.getUrl(),novel.getUrl());
                    }else{
                        if(novell.getItemCount()!=novel.getItemCount()){
                            novell.setItemCount(novel.getItemCount());
                            novelService.update(novell);
                            redisService.set(novel.getUrl(),novel.getUrl());
                        }
                    }
                }).start();
            }
        }
        return "ok";
    }

}
