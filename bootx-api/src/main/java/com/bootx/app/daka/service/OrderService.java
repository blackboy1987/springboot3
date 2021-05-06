
package com.bootx.app.daka.service;

import com.bootx.app.daka.entity.Order;
import com.bootx.app.daka.entity.Product;
import com.bootx.common.Page;
import com.bootx.common.Pageable;
import com.bootx.entity.App;
import com.bootx.member.entity.Member;
import com.bootx.service.BaseService;

import java.util.List;

/**
 * Service - 积分记录
 * 
 * @author IGOMALL  Team
 * @version 1.0
 */
public interface OrderService extends BaseService<Order, Long> {

	List<Order> findList(App app, Member member);

	Page<Order> findPage(App app, Member member,Pageable pageable);

}