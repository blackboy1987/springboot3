
package com.bootx.app.question.service;

import com.bootx.app.question.entity.Subject;
import com.bootx.app.yunxiaocha.entity.Order;
import com.bootx.service.BaseService;

/**
 * Service - 插件
 * 
 * @author blackboy
 * @version 1.0
 */
public interface SubjectService extends BaseService<Subject,Long> {

    boolean titleExist(String title);
}