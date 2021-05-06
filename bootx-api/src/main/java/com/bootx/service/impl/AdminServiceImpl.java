
package com.bootx.service.impl;

import com.bootx.controller.wechat.WeChatUser;
import com.bootx.dao.AdminDao;
import com.bootx.entity.Admin;
import com.bootx.entity.App;
import com.bootx.entity.Order;
import com.bootx.member.entity.PointLog;
import com.bootx.service.AdminService;
import com.bootx.util.CodeUtils;
import com.bootx.util.JWTUtils;
import io.jsonwebtoken.Claims;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Service - 管理员
 * 
 * @author 好源++ Team
 * @version 6.1
 */
@Service
public class AdminServiceImpl extends BaseServiceImpl<Admin, Long> implements AdminService {

    @Resource
    private AdminDao adminDao;

    @Override
    public Admin findByOpenId(String openId) {
        return adminDao.find("openId",openId);
    }

    @Override
    public Admin findByUsername(String username) {
        return adminDao.find("username",username);
    }

    @Override
    public Admin findByMobile(String mobile) {
        return adminDao.find("mobile",mobile);
    }

    @Override
    public boolean usernameExist(String username) {
        return adminDao.exists("username",username);
    }
    @Override
    public boolean mobileExist(String mobile) {
        return adminDao.exists("mobile",mobile);
    }

    @Override
    public Admin create(WeChatUser weChatUser) {
        Admin admin = new Admin();
        admin.setOpenId(weChatUser.getOpenId());
        admin.setPassword("123456");
        return super.save(admin);
    }

    @Override
    @Transactional(readOnly = true)
    public Admin get(HttpServletRequest request) {
        String token = request.getHeader("token");
        if(StringUtils.isBlank(token)){
            token = request.getParameter("token");
        }
        try {
            Claims claims = JWTUtils.parseToken(token);
            String id = claims.getId();
            return super.find(Long.valueOf(id));
        }catch (Exception e){
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public Map<String, Object> getData(Admin admin) {
        Map<String,Object> data = new HashMap<>();
        if(admin==null){
            return data;
        }
        data.put("id",admin.getId());
        data.put("username",admin.getUsername());

        return data;
    }

    @Override
    public Admin create(String orderSn,String mobile) {
        Admin admin = new Admin();
        admin.setIsAdmin(false);
        admin.setOpenId(orderSn);
        admin.setStatus(1);
        String username = CodeUtils.getCode1(8);
        while (usernameExist(username)){
            username = CodeUtils.getCode1(8);
        }
        admin.setMobile(mobile);
        admin.setUsername(username);
        admin.setPassword(username);
        admin = super.save(admin);
        return admin;
    }
}