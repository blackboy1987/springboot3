
package com.bootx.service;

import com.bootx.entity.App;
import com.bootx.entity.MoreProgram;

import java.util.List;

/**
 * Service - 插件
 * 
 * @author blackboy
 * @version 1.0
 */
public interface MoreProgramService extends BaseService<MoreProgram,Long> {

    List<MoreProgram> findListByApp(App app);
}