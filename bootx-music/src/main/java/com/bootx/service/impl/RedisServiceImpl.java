package com.bootx.service.impl;

import com.bootx.service.RedisService;
import com.bootx.util.JsonUtils;
import com.fasterxml.jackson.core.type.TypeReference;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class RedisServiceImpl implements RedisService {

    @Resource
    private StringRedisTemplate stringRedisTemplate;

    @Override
    public void set(String key, String value) {
        stringRedisTemplate.opsForValue().set(key,value);
    }

    @Override
    public String get(String key) {
        return stringRedisTemplate.opsForValue().get(key);
    }

    @Override
    public Boolean remove(String key) {
        return stringRedisTemplate.delete(key);

    }

    @Override
    public boolean hasKey(String key) {
        return stringRedisTemplate.hasKey(key);
    }

    @Override
    public <T> T get(String key, Class<T> clazz) {
        String val = get(key);
        if(StringUtils.isBlank(val)){
            return null;
        }
        try {
            return JsonUtils.toObject(val,clazz);
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
}
