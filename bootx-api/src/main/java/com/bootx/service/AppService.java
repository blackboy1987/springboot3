
package com.bootx.service;

import com.bootx.entity.Admin;
import com.bootx.entity.App;
import com.bootx.entity.Order;

import javax.servlet.http.HttpServletRequest;

/**
 * Service - 插件
 * 
 * @author blackboy
 * @version 1.0
 */
public interface AppService extends BaseService<App,Long> {

    App findByAppCode(String appCode);

    boolean exist(String appCode, String appSecret);

    App get(HttpServletRequest request);

    App get1(HttpServletRequest request);

    /**
     * 判断用户名是否存在
     *
     * @param username
     *            用户名(忽略大小写)
     * @return 用户名是否存在
     */
    boolean usernameExists(String username);

    /**
     * 判断用户名是否存在
     *
     * @param appId
     *            用户名(忽略大小写)
     * @return 用户名是否存在
     */
    boolean appIdExists(String appId);

    /**
     * 判断用户名是否存在
     *
     * @param appSecret
     *            用户名(忽略大小写)
     * @return 用户名是否存在
     */
    boolean appSecretExists(String appSecret);

    /**
     * 判断用户名是否存在
     *
     * @param appName
     *            用户名(忽略大小写)
     * @return 用户名是否存在
     */
    boolean appNameExists(String appName);

    /**
     * 判断用户名是否存在
     *
     * @param appCode
     *            用户名(忽略大小写)
     * @return 用户名是否存在
     */
    boolean appCodeExists(String appCode);

    /**
     * 判断用户名是否存在
     *
     * @param appToken
     *            用户名(忽略大小写)
     * @return 用户名是否存在
     */
    boolean appTokenExists(String appToken);

    App create(Admin admin, Order order);
}