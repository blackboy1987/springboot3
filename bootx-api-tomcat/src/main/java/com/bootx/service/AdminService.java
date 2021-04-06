
package com.bootx.service;

import com.bootx.controller.wechat.WeChatUser;
import com.bootx.entity.Admin;
import com.bootx.entity.App;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * Service - 管理员
 * 
 * @author 好源++ Team
 * @version 6.1
 */
public interface AdminService extends BaseService<Admin, Long> {

    Admin findByOpenId(String openId);

    Admin findByUsername(String username);

    Admin create(WeChatUser weChatUser);

    Admin get(HttpServletRequest request);

    Map<String, Object> getData(Admin admin);
}