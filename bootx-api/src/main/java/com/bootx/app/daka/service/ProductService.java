
package com.bootx.app.daka.service;

import com.bootx.app.daka.entity.Product;
import com.bootx.common.Page;
import com.bootx.common.Pageable;
import com.bootx.entity.App;
import com.bootx.member.entity.Member;
import com.bootx.member.entity.PointLog;
import com.bootx.service.BaseService;

import java.util.List;

/**
 * Service - 积分记录
 * 
 * @author IGOMALL  Team
 * @version 1.0
 */
public interface ProductService extends BaseService<Product, Long> {

	List<Product> findList(App app);

	Page<Product> findPage(App app,Pageable pageable);

}