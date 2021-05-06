
package com.bootx.app.daka.service.impl;

import com.bootx.app.daka.dao.OrderDao;
import com.bootx.app.daka.dao.ProductDao;
import com.bootx.app.daka.entity.Order;
import com.bootx.app.daka.entity.Product;
import com.bootx.app.daka.service.OrderService;
import com.bootx.app.daka.service.ProductService;
import com.bootx.common.Page;
import com.bootx.common.Pageable;
import com.bootx.entity.App;
import com.bootx.member.entity.Member;
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
@Service("daKaOrderService")
public class OrderServiceImpl extends BaseServiceImpl<Order, Long> implements OrderService {

	@Autowired
	private OrderDao orderDao;

	@Override
	public List<Order> findList(App app, Member member) {
		return orderDao.findList(app,member);
	}

	@Override
	public Page<Order> findPage(App app, Member member, Pageable pageable) {
		return orderDao.findPage(app,member,pageable);
	}
}