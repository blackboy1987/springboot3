
package com.bootx.app.yunxiaocha.service.impl;

import com.bootx.app.yunxiaocha.entity.Order;
import com.bootx.app.yunxiaocha.service.OrderService;
import com.bootx.common.Page;
import com.bootx.common.Pageable;
import com.bootx.dao.AppDao;
import com.bootx.entity.App;
import com.bootx.service.AppService;
import com.bootx.service.impl.BaseServiceImpl;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * Service - 素材目录
 * 
 * @author blackboy
 * @version 1.0
 */
@Service
public class OrderServiceImpl extends BaseServiceImpl<Order, Long> implements OrderService {

}