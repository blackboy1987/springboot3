
package com.bootx.app.daka.service.impl;

import com.bootx.app.daka.entity.Product;
import com.bootx.common.Page;
import com.bootx.common.Pageable;
import com.bootx.entity.App;
import com.bootx.app.daka.dao.ProductDao;
import com.bootx.app.daka.service.ProductService;
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
@Service("daKaProductService")
public class ProductServiceImpl extends BaseServiceImpl<Product, Long> implements ProductService {

	@Autowired
	private ProductDao productDao;

	@Override
	public List<Product> findList(App app) {
		return productDao.findList(app);
	}

	@Override
	public Page<Product> findPage(App app, Pageable pageable) {
		return productDao.findPage(app,pageable);
	}
}