package com.bootx.app.xiaoshuo.controller;

import com.bootx.app.xiaoshuo.util.ToolUtils;
import com.bootx.common.Result;
import com.bootx.service.RedisService;
import com.bootx.util.JsonUtils;
import com.fasterxml.jackson.core.type.TypeReference;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.Map;

@RestController("apiXiaoShuoIndexController")
@RequestMapping("/api/xiaoshuo")
public class IndexController {

    @Resource
    private RedisService redisService;

    @GetMapping
    public Result index(String type,String topType){
        String s = redisService.get("xiaoshuo_" + type + "_" + type);
        s = "";
        try {
            Map<String, Object> result = JsonUtils.toObject(s, new TypeReference<Map<String, Object>>() {
            });
            return Result.success(result);
        }catch (Exception e){
            Map<String, Object> index = ToolUtils.index(type, topType);
            redisService.set("xiaoshuo_" + type + "_" + type,JsonUtils.toJson(index));
            return Result.success(index);
        }

    }

    @GetMapping("/detail")
    public Result detail(String url){
        Map<String, Object> index = ToolUtils.detail(url);
        return Result.success(index);

    }


}
