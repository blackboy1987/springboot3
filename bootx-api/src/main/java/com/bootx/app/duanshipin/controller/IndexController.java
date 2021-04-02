package com.bootx.app.duanshipin.controller;

import com.bootx.common.Pageable;
import com.bootx.common.Result;
import com.bootx.util.WebUtils;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController("shortVideoIndexController")
@RequestMapping("/api/short_video")
public class IndexController {

    @Resource
    private JdbcTemplate jdbcTemplate;

    @PostMapping("/category")
    public Result category(){
        return Result.success(jdbcTemplate.queryForList("select channelId id,name from duanshipin_short_video_channel order by id asc "));
    }
    @PostMapping("/list")
    public String list(Long categoryId, Pageable pageable){
        pageable.setPageSize(5);
        String url="https://weixinapi.baomihua.com/getrecommend.ashx?dataType=rec&pageIndex="+pageable.getPageSize()+"&pageSize=5&sceneType=weixin_index&clientId=&channelId="+categoryId+"&wxnum=1000&pmhUserId=&version=v7.0.4";
        if(categoryId==0){
            url="https://weixinapi.baomihua.com/getrecommend.ashx?dataType=newlist&pageIndex="+pageable.getPageSize()+"&pageSize=5&sceneType=weixin_channel&clientId=&channelId=0&wxnum=1000&pmhUserId=&version=v7.0.4";
        }

        return WebUtils.get(url, null);
    }
    @PostMapping("/detail")
    public String detail(Long id){

        String url="https://weixinapi.baomihua.com/getvideourl.aspx?flvid="+id+"&devicetype=wap&dataType=json";

        return WebUtils.get(url, null);
    }


    @PostMapping("/getrecommend")
    public String getrecommend(Long id){
        String url="https://weixinapi.baomihua.com/getrecommend.ashx?dataType=relate&videoId="+id+"&pageIndex=1&pageSize=30&sceneType=weixin_play&clientId=&version=v7.0.4";
        return WebUtils.get(url, null);
    }


}
