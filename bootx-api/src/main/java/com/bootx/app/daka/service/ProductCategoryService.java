
package com.bootx.app.daka.service;

import com.bootx.app.daka.entity.Product;
import com.bootx.app.daka.entity.ProductCategory;
import com.bootx.common.Page;
import com.bootx.common.Pageable;
import com.bootx.entity.App;
import com.bootx.service.BaseService;

import java.util.List;

/**
 * Service - 积分记录
 * 
 * @author IGOMALL  Team
 * @version 1.0
 */
public interface ProductCategoryService extends BaseService<ProductCategory, Long> {

	List<ProductCategory> findList(App app);

	Page<ProductCategory> findPage(App app,Pageable pageable);

}