
package com.bootx.app.zhaocha.service.impl;

import com.bootx.app.zhaocha.dao.LevelDao;
import com.bootx.app.zhaocha.entity.Level;
import com.bootx.app.zhaocha.service.LevelService;
import com.bootx.service.impl.BaseServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Service - 管理员
 * 
 * @author 好源++ Team
 * @version 6.1
 */
@Service
public class LevelServiceImpl extends BaseServiceImpl<Level, Long> implements LevelService {

    @Resource
    private LevelDao levelDao;

    @Override
    public Level findByLevel(Integer level) {
        return levelDao.find("level",level);
    }
}