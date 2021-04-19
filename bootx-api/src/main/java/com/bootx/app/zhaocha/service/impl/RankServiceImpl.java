
package com.bootx.app.zhaocha.service.impl;

import com.bootx.app.zhaocha.dao.RankDao;
import com.bootx.app.zhaocha.entity.Rank;
import com.bootx.app.zhaocha.service.RankService;
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
public class RankServiceImpl extends BaseServiceImpl<Rank, Long> implements RankService {

    @Resource
    private RankDao rankDao;


    @Override
    public Rank findByRank(Integer rank) {
        return rankDao.find("rank",rank);
    }
}