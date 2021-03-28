package com.bootx.dao.impl;

import com.bootx.dao.NovelDao;
import com.bootx.entity.Novel;
import org.springframework.stereotype.Repository;

@Repository
public class NovelDaoImpl extends BaseDaoImpl<Novel,Long> implements NovelDao {
}
