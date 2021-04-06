package com.bootx.app.duanshipin.controller;

import com.bootx.common.Pageable;
import com.bootx.common.Result;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController("shortVideoIndex1Controller")
@RequestMapping("/api/short_video1")
public class Index1Controller {

    @Resource
    private JdbcTemplate jdbcTemplate;

    @PostMapping("/category")
    public Result category(){
        return Result.success(jdbcTemplate.queryForList("select id,name from duanshipin_short_video_channel order by id asc "));
    }
    @PostMapping("/list")
    public Result list(Long categoryId, Pageable pageable){
        pageable.setPageSize(5);
        return Result.success(jdbcTemplate.queryForList("select id,time,title,videoImage from duanshipin_short_video where shortVideoChannel_id="+categoryId+" order by uploadTime desc limit "+(pageable.getPageNumber()-1)*pageable.getPageSize()+","+pageable.getPageSize()));
    }
    @PostMapping("/detail")
    public Result detail(Long id){
        return Result.success(jdbcTemplate.queryForMap("select * from duanshipin_short_video where id="+id));
    }
}
