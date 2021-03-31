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
import org.apache.commons.lang3.RandomUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@RestController
@RequestMapping
public class IndexController {

    public static Map<String,String> map = new HashMap<>();

    @Resource
    private NovelService novelService;

    @Resource
    private NovelCategoryService novelCategoryService;

    @Resource
    private RedisService redisService;

    @Resource
    private JdbcTemplate jdbcTemplate;

    static {
        map.put("人物传记","人物传记");
        map.put("刑侦推理","刑侦推理");
        map.put("推理","刑侦推理");
        map.put("历史军事","历史军事");
        map.put("历史","历史军事");
        map.put("官场商战","官场商战");
        map.put("恐怖惊悚","恐怖惊悚");
        map.put("恐怖","恐怖惊悚");
        map.put("惊悚","恐怖惊悚");
        map.put("武侠小说","武侠小说");
        map.put("武侠","武侠小说");
        map.put("玄幻奇幻","玄幻奇幻");
        map.put("玄幻","玄幻奇幻");
        map.put("百家讲坛","百家讲坛");
        map.put("相声","相声评书");
        map.put("评书","相声评书");
        map.put("科幻有声","科幻有声");
        map.put("经典","科幻有声");
        map.put("科幻","经典纪实");
        map.put("经典纪实","经典纪实");
        map.put("都市言情","都市言情");
        map.put("言情","都市言情");
        map.put("都市","都市言情");
        map.put("通俗文学","通俗文学");
    }


    @GetMapping("/category")
    private Result category(){
        return Result.success(jdbcTemplate.queryForList("select id,name from novelCategory where isShow=true order by orders asc "));

    }

    /**
     * 加载精选内容
     * @return
     */
    @GetMapping("/index")
    public Result index(){
        Map<String,Object> data = new HashMap<>();

        data.put("list",list());
        data.put("news",list1(2,null,10));

        return  Result.success(data);
    }

    private List<Map<String,Object>> list() {
        List<Map<String,Object>> list = new ArrayList<>();
        Map<String,Object> map = new HashMap<>();
        map.put("title","人气必听");
        map.put("list",list1(0,null,6));
        list.add(map);

        Map<String,Object> map1 = new HashMap<>();
        map1.put("title","精彩好书");
        map1.put("list",list1(1,null,6));
        list.add(map1);

        Map<String,Object> map2 = new HashMap<>();
        map2.put("title","穿越重生");
        map2.put("list",list1(2,12L,6));
        list.add(map2);

        Map<String,Object> map3 = new HashMap<>();
        map3.put("title","都市爽听");
        map3.put("list",list1(3,13L,6));
        list.add(map3);

        return list;
    }


    @GetMapping("/list")
    private Result list(Pageable pageable,Long categoryId){
        if(categoryId==null){
            categoryId =0L;
        }
        pageable.setPageSize(10);
        return Result.success(jdbcTemplate.queryForList("select id,title,img,itemCount,content,readCount from novel where novelCategory_id="+categoryId+" or novelCategory_id in (select id from novelcategory where parent_id="+categoryId+") limit "+(pageable.getPageNumber()-1)*pageable.getPageSize()+", "+pageable.getPageSize()));
    }

    @GetMapping("/list1")
    private List<Map<String,Object>> list1(Integer type,Long categoryId,Integer count){
        if(count==null){
            count = 6;
        }
        String orderBy = "readCount";
        String whereClause = "";
        if(type==0){
            orderBy="readCount";
        }else if(type==1){
            orderBy = "commentCount";
        }else if(type==2){
            orderBy = "collectionCount";
        }else if(type==2){
            orderBy = "updateTime";
        }else{
            orderBy = "readCount";
        }
        if (categoryId!=null) {
            whereClause = " and novelCategory_id="+categoryId;
        }

        String sql="select id,title,img,author,itemCount,content,readCount from novel where 1=1 "+whereClause+" order by "+orderBy+" desc limit "+count;
        System.out.println(sql);
        return jdbcTemplate.queryForList(sql);
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
        List<Map<String, Object>> list = jdbcTemplate.queryForList("select categoryName from novel group by categoryName");
        list.stream().forEach(item->{
            String categoryName = item.get("categoryName")+"";
            if(StringUtils.isNotBlank(categoryName)){
                String categoryName1= categoryName;
                if(StringUtils.isNotBlank(map.get(categoryName))){
                    categoryName1 = map.get(categoryName);
                }
                NovelCategory byName = novelCategoryService.findByName(categoryName1);
                if(byName==null){
                    byName = new NovelCategory();
                    byName.setName(categoryName1);
                    byName.setIsShow(true);
                    byName = novelCategoryService.save(byName);
                }
                jdbcTemplate.update("update novel set novelCategory_id=?,categoryName=? where categoryName=?",byName.getId(),categoryName1,categoryName);
            }
        });
        return "ok";
    }
    @GetMapping("/init1")
    public String init1(){
        List<Novel> novels = novelService.findAll();
        novels.stream().forEach(item->{
            if(item.getReadCount()==null){
                new Thread(()->{
                    item.setCommentCount(RandomUtils.nextLong(100,2000));
                    item.setCollectionCount(RandomUtils.nextLong(2000,100000));
                    item.setReadCount(RandomUtils.nextLong(10000,100000000));

                    novelService.update(item);
                }).start();
            }
        });



        return "ok";
    }

}
