
package com.bootx.app.daka.service.impl;

import com.bootx.app.daka.dao.ProductCategoryDao;
import com.bootx.app.daka.dao.ProductDao;
import com.bootx.app.daka.entity.Product;
import com.bootx.app.daka.entity.ProductCategory;
import com.bootx.app.daka.service.ProductCategoryService;
import com.bootx.app.daka.service.ProductService;
import com.bootx.common.Page;
import com.bootx.common.Pageable;
import com.bootx.entity.App;
import com.bootx.service.impl.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service - 积分记录
 * 
 * @author IGOMALL  Team
 * @version 1.0
 */
@Service("daKaProductCategoryService")
public class ProductCategoryServiceImpl extends BaseServiceImpl<ProductCategory, Long> implements ProductCategoryService {

	@Autowired
	private ProductCategoryDao productCategoryDao;

	@Override
	public List<ProductCategory> findList(App app) {
		return productCategoryDao.findList(app);
	}

	@Override
	public Page<ProductCategory> findPage(App app, Pageable pageable) {
		return productCategoryDao.findPage(app,pageable);
	}
}