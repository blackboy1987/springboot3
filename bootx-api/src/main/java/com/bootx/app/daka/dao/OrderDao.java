
package com.bootx.app.daka.dao;

import com.bootx.app.daka.entity.Order;
import com.bootx.common.Page;
import com.bootx.common.Pageable;
import com.bootx.dao.BaseDao;
import com.bootx.entity.App;
import com.bootx.member.entity.Member;

import java.util.List;

/**
 * Dao - 积分记录
 * 
 * @author IGOMALL  Team
 * @version 1.0
 */
public interface OrderDao extends BaseDao<Order, Long> {

	List<Order> findList(App app, Member member);

	Page<Order> findPage(App app, Member member,Pageable pageable);

}