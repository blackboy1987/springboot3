
package com.bootx.service.impl;

import com.bootx.dao.OrderDao;
import com.bootx.entity.Order;
import com.bootx.service.OrderService;
import org.springframework.stereotype.Service;

/**
 * Service - 素材目录
 * 
 * @author blackboy
 * @version 1.0
 */
@Service
public class OrderServiceImpl extends BaseServiceImpl<Order, Long> implements OrderService {

    private OrderDao orderDao;

    @Override
    public boolean orderSnExist(String orderSn) {
        return orderDao.exists("orderSn",orderSn);
    }

    @Override
    public Order findByOrderSn(String orderSn) {
        return orderDao.find("orderSn",orderSn);
    }
}