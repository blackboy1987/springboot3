
package com.bootx.dao;

import com.bootx.common.Page;
import com.bootx.common.Pageable;
import com.bootx.entity.Admin;
import com.bootx.entity.App;

/**
 * Dao - 素材目录
 * 
 * @author blackboy
 * @version 1.0
 */
public interface AppDao extends BaseDao<App, Long> {

    Page<App> findPage(Admin admin, Pageable pageable);
}