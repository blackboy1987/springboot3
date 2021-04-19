
package com.bootx.app.zhaocha.service;

import com.bootx.app.zhaocha.entity.Rank;
import com.bootx.service.BaseService;

/**
 * Service - 管理员
 * 
 * @author 好源++ Team
 * @version 6.1
 */
public interface RankService extends BaseService<Rank, Long> {

    Rank findByRank(Integer rank);
}