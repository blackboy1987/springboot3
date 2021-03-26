package com.bootx.service;

import com.bootx.entity.Novel;

public interface NovelService extends BaseService<Novel,Long> {

    boolean urlExists(String url);

    Novel findByUrl(String url);
}
