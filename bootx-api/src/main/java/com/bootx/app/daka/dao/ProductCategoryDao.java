
package com.bootx.app.daka.dao;

import com.bootx.app.daka.entity.Product;
import com.bootx.app.daka.entity.ProductCategory;
import com.bootx.common.Page;
import com.bootx.common.Pageable;
import com.bootx.dao.BaseDao;
import com.bootx.entity.App;

import java.util.List;

/**
 * Dao - 积分记录
 * 
 * @author IGOMALL  Team
 * @version 1.0
 */
public interface ProductCategoryDao extends BaseDao<ProductCategory, Long> {

	List<ProductCategory> findList(App app);

	Page<ProductCategory> findPage(App app,Pageable pageable);

}