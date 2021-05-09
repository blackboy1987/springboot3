
package com.bootx.dao.impl;

import com.bootx.common.Page;
import com.bootx.common.Pageable;
import com.bootx.dao.AppDao;
import com.bootx.entity.Admin;
import com.bootx.entity.App;
import com.bootx.entity.SubscriptionRecord;
import com.bootx.util.DateUtils;
import org.springframework.stereotype.Repository;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.Collections;

/**
 * Dao - 插件配置
 * 
 * @author blackboy
 * @version 1.0
 */
@Repository
public class AppDaoImpl extends BaseDaoImpl<App, Long> implements AppDao {

    @Override
    public Page<App> findPage(Admin admin, Pageable pageable) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<App> criteriaQuery = criteriaBuilder.createQuery(App.class);
        Root<App> root = criteriaQuery.from(App.class);
        criteriaQuery.select(root);
        Predicate restrictions = criteriaBuilder.conjunction();
        if(!admin.getIsAdmin()){
            restrictions = criteriaBuilder.and(restrictions, criteriaBuilder.equal(root.get("admin"), admin));
        }
        criteriaQuery.where(restrictions);
        return super.findPage(criteriaQuery,pageable);
    }
}