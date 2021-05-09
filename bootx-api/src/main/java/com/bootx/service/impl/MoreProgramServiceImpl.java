
package com.bootx.service.impl;

import com.bootx.dao.MoreProgramDao;
import com.bootx.entity.App;
import com.bootx.entity.MoreProgram;
import com.bootx.service.MoreProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service - 素材目录
 * 
 * @author blackboy
 * @version 1.0
 */
@Service
public class MoreProgramServiceImpl extends BaseServiceImpl<MoreProgram, Long> implements MoreProgramService {

    @Autowired
    private MoreProgramDao moreProgramDao;
    @Override
    public List<MoreProgram> findListByApp(App app) {
        return moreProgramDao.findListByApp(app);
    }
}