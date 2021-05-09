
package com.bootx.dao.impl;

import com.bootx.dao.MoreProgramDao;
import com.bootx.dao.SubscriptionRecordDao;
import com.bootx.entity.App;
import com.bootx.entity.MoreProgram;
import com.bootx.entity.SubscriptionRecord;
import com.bootx.entity.SubscriptionTemplate;
import com.bootx.member.entity.Member;
import com.bootx.util.DateUtils;
import org.springframework.stereotype.Repository;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.Collections;
import java.util.List;

/**
 * Dao - 插件配置
 * 
 * @author blackboy
 * @version 1.0
 */
@Repository
public class MoreProgramDaoImpl extends BaseDaoImpl<MoreProgram, Long> implements MoreProgramDao {

    @Override
    public List<MoreProgram> findListByApp(App app) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<MoreProgram> criteriaQuery = criteriaBuilder.createQuery(MoreProgram.class);
        Root<MoreProgram> root = criteriaQuery.from(MoreProgram.class);
        criteriaQuery.select(root);
        Predicate restrictions = criteriaBuilder.conjunction();
        if(app!=null){
            restrictions = criteriaBuilder.and(restrictions, criteriaBuilder.equal(root.get("app"), app));
        }else{
            restrictions = criteriaBuilder.and(restrictions, criteriaBuilder.isNull(root.get("app")));
        }
        criteriaQuery.where(restrictions);
        return super.findList(criteriaQuery,null,null,null,null);
    }
}