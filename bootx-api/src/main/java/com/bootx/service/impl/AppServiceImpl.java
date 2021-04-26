
package com.bootx.service.impl;

import com.bootx.common.Page;
import com.bootx.common.Pageable;
import com.bootx.dao.AppDao;
import com.bootx.entity.*;
import com.bootx.member.entity.Member;
import com.bootx.service.AppService;
import com.bootx.service.RedisService;
import com.bootx.util.DateUtils;
import com.bootx.util.JWTUtils;
import com.bootx.util.JsonUtils;
import io.jsonwebtoken.Claims;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Service - 素材目录
 * 
 * @author blackboy
 * @version 1.0
 */
@Service
public class AppServiceImpl extends BaseServiceImpl<App, Long> implements AppService {

    @Resource
    private AppDao appDao;
    @Resource
    private RedisService redisService;

    @Override
    @Transactional(readOnly = true)
    public App findByAppCode(String appCode) {
        String cacheKey = App.CACHE_PREFIX + appCode;
        App app = redisService.get(cacheKey, App.class);
        if(app==null){
            try{
                app = appDao.find("appCode",appCode);
                redisService.set(cacheKey, JsonUtils.toJson(app));
            }catch (Exception e){
                e.printStackTrace();
            }
        }
        return app;

    }

    @Override
    @Transactional(readOnly = true)
    public boolean exist(String appCode, String appSecret) {
        App app = findByAppCode(appCode);
        if(app==null){
            return false;
        }
        if(!StringUtils.equals(appSecret, app.getAppToken())){
            return false;
        }
        return true;
    }

    @Override
    @Transactional(readOnly = true)
    public App get(HttpServletRequest request) {
        String appCode = request.getHeader("appCode");
        String appToken = request.getHeader("appToken");
        if(StringUtils.isBlank(appCode)){
            appCode = request.getParameter("appCode");
        }
        if(StringUtils.isBlank(appToken)){
            appToken = request.getParameter("appToken");
        }
        App app = findByAppCode(appCode);
        if(app==null||!StringUtils.equals(appToken,app.getAppToken())){
            return null;
        }
        return app;
    }

    @Override
    @Transactional(readOnly = true)
    public boolean usernameExists(String username) {
        return appDao.exists("username",username);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean appIdExists(String appId) {
        return appDao.exists("appId",appId);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean appSecretExists(String appSecret) {
        return appDao.exists("appSecret",appSecret);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean appNameExists(String appName) {
        return appDao.exists("appName",appName);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean appCodeExists(String appCode) {
        return appDao.exists("appCode",appCode);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean appTokenExists(String appToken) {
        return appDao.exists("appToken",appToken);
    }

    @Override
    public App create(Admin admin, Order order) {
        App app = new App();
        app.setAdmin(admin);
        app.setAppId("临时appId_"+admin.getUsername());
        app.setAppSecret("临时appSecret_"+admin.getUsername());
        app.setAppCode("临时appCode_"+admin.getUsername());
        app.setAppToken("临时appToken_"+admin.getUsername());
        app.setAppName("临时appName_"+admin.getUsername());
        app.setExpireDate(DateUtils.getNextDay(new Date(),order.getDays()));
        app.setStatus(1);
        app.setAppAd(new AppAd(app));
        app.setType(1);
        app.setAppConfig(new AppConfig(app));
        admin.setApp(app);
        return super.save(app);
    }

    @Override
    public Page<Map<String, Object>> findPageJdbc(Pageable pageable) {
        StringBuffer sb = new StringBuffer("select id,createdDate,appId,username from app ");
        StringBuffer totalSql = new StringBuffer("select count(1) from app");

        if(StringUtils.isNotBlank(pageable.getOrderProperty())&&pageable.getOrderDirection()!=null){
            sb.append(" ORDER BY "+pageable.getOrderProperty()+" "+pageable.getOrderDirection().name());
        }else{
            sb.append(" ORDER BY createdDate desc");
        }
        sb.append(" LIMIT "+(pageable.getPageNumber()-1)*pageable.getPageSize()+","+pageable.getPageSize());

        List<Map<String, Object>> list = jdbcTemplate.queryForList(sb.toString());
        Long total = jdbcTemplate.queryForObject(totalSql.toString(),Long.class);

        return new Page(list,total,pageable);
    }

    @Override
    public Map<String, Object> findJdbc(Long id) {
        return null;
    }


    @Override
    @Transactional(readOnly = true)
    public App get1(HttpServletRequest request) {
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
    public App save(App app) {
        String cacheKey = App.CACHE_PREFIX + app.getAppCode();
        redisService.set(cacheKey, JsonUtils.toJson(app));
        return super.save(app);
    }

    @Override
    public App update(App app) {
        String cacheKey = App.CACHE_PREFIX + app.getAppCode();
        redisService.set(cacheKey, JsonUtils.toJson(app));
        return super.update(app);
    }

    @Override
    public App update(App app, String... ignoreProperties) {
        String cacheKey = App.CACHE_PREFIX + app.getAppCode();
        redisService.set(cacheKey, JsonUtils.toJson(app));
        return super.update(app, ignoreProperties);
    }
}