package com.bootx.dao;

import com.bootx.entity.App;
import com.bootx.entity.MoreProgram;

import java.util.List;

public interface MoreProgramDao extends BaseDao<MoreProgram, Long> {

    List<MoreProgram> findListByApp(App app);
}
