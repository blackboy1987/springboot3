package com.bootx.controller;

import com.bootx.common.Pageable;
import com.bootx.common.Result;
import com.bootx.entity.Novel;
import com.bootx.entity.NovelCategory;
import com.bootx.entity.NovelTag;
import com.bootx.service.NovelCategoryService;
import com.bootx.service.NovelService;
import com.bootx.service.NovelTagService;
import com.bootx.service.RedisService;
import com.bootx.util.IShuYinUtils;
import com.bootx.util.JsonUtils;
import com.bootx.util.XSTSUtils;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.RandomUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.naming.ldap.HasControls;
import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.Executor;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;

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

    @GetMapping("/init2")
    public Result init2() throws IOException {
        /*File[] files = new File("C:\\Users\\black\\Desktop\\novel\\xsts").listFiles();
        for (File file:files) {
            String s = FileUtils.readFileToString(file, Charset.defaultCharset());
            Novel novel = JsonUtils.toObject(s, Novel.class);
            novelService.save(novel);
            FileUtils.deleteQuietly(file);

        }
*/

        ExecutorService fixedThreadPool = Executors.newFixedThreadPool(5);
        for (int i = 1; i < 1486; i++) {
            int finalI = i;
            fixedThreadPool.execute(()->{
                Map<String, Object> detail = XSTSUtils.detail("https://www.xsts.net/"+ finalI +".html");
                if(detail!=null){
                    Novel novel = JsonUtils.toObject(JsonUtils.toJson(detail),Novel.class);
                    novel.getNovelItems().stream().forEach(item->item.setNovel(novel));
                    novel.setItemCount(novel.getNovelItems().size()+0L);
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
        Map<String,Object> data = new HashMap<>();
        data.put("detail",jdbcTemplate.queryForMap("select title,img,title,content,memo from novel where id=?",id));
        data.put("items",jdbcTemplate.queryForList("select id,title from novelItem where novel_id=?",id));

        return Result.success(data);
    }


    @GetMapping("/url")
    private Result url(Long id,Long itemId){
        return Result.success(jdbcTemplate.queryForObject("select resourceUrl from novelItem where novel_id=? and id=?",String.class,id,itemId));
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
                    novelCategoryService.save(byName);

                }
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
