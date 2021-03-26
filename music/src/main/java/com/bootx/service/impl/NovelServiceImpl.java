package com.bootx.service.impl;

import com.bootx.dao.NovelDao;
import com.bootx.entity.Novel;
import com.bootx.service.NovelService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class NovelServiceImpl extends BaseServiceImpl<Novel,Long> implements NovelService {

    @Resource
    private NovelDao novelDao;

    @Override
    public boolean urlExists(String url) {
        return novelDao.exists("url",url);
    }

    @Override
    public Novel findByUrl(String url) {
        return novelDao.find("url",url);
    }
}
