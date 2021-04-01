package com.bootx.controller;

import com.bootx.Demo;
import com.bootx.common.Result;
import com.bootx.entity.App;
import com.bootx.entity.RewardType;
import com.bootx.member.entity.Member;
import com.bootx.member.entity.PointLog;
import com.bootx.member.service.MemberService;
import com.bootx.service.AppService;
import com.bootx.service.RedisService;
import com.bootx.util.JWTUtils;
import com.bootx.util.JsonUtils;
import com.bootx.util.WebUtils;
import com.fasterxml.jackson.core.type.TypeReference;
import org.apache.commons.lang3.StringUtils;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.lang.management.ThreadInfo;
import java.util.*;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

@RestController("apiDemoController")
@RequestMapping("/demo")
public class DemoController {

    @Resource
    private JdbcTemplate jdbcTemplate;

    @Resource
    private RedisService redisService;

    @GetMapping
    public List<String> init(Integer start) throws InterruptedException {
        String key="post2_";
        Executor threadPool = Executors.newFixedThreadPool(8);
        // 37902
        List<String> list = new ArrayList<>();
        for (int i=start;i<start+100000;i++) {
            boolean a = redisService.hasKey(key+i);
            if(a){
                //System.out.println(i+"==========================缓存==========ok");
              //continue;
            }
            Integer count = jdbcTemplate.queryForObject("select count(id) from cms5.cms_posts where id="+i, Integer.class);
            if(count!=null&&count>0){
                redisService.set(key+ i, "123");
                System.out.println(i+"======数据库==========ok");
                continue;
            }
            int finalI = i;

            threadPool.execute(() -> {
                String sql = Demo.getSql(finalI);
                if(StringUtils.isNotBlank(sql)){
                    list.add(sql);
                    try{
                        jdbcTemplate.update(sql );
                        redisService.set(key+ finalI, "123");
                        System.out.println(finalI+"===========================================================================ok");
                    }catch (Exception e){
                        e.printStackTrace();
                    }
                }else{
                    redisService.set(key+ finalI, "123");
                    System.out.println(finalI+"================no");
                }
            });
        }
        return list;
    }

}
