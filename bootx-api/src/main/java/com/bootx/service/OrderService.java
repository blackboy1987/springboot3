
package com.bootx.service;

import com.bootx.entity.Order;

/**
 * Service - 插件
 * 
 * @author blackboy
 * @version 1.0
 */
public interface OrderService extends BaseService<Order,Long> {

    boolean orderSnExist(String orderSn);

    Order findByOrderSn(String orderSn);
}