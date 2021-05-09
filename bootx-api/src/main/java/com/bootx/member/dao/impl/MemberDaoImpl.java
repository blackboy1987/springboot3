
package com.bootx.member.dao.impl;

import com.bootx.common.Page;
import com.bootx.common.Pageable;
import com.bootx.dao.impl.BaseDaoImpl;
import com.bootx.member.dao.MemberDao;
import com.bootx.entity.App;
import com.bootx.member.entity.Member;
import com.bootx.util.DateUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.Collections;
import java.util.Date;
import java.util.Map;

/**
 * Dao - 插件配置
 * 
 * @author blackboy
 * @version 1.0
 */
@Repository
public class MemberDaoImpl extends BaseDaoImpl<Member, Long> implements MemberDao {

    @Override
    public Member find(String openId, App app) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Member> criteriaQuery = criteriaBuilder.createQuery(Member.class);
        Root<Member> root = criteriaQuery.from(Member.class);
        criteriaQuery.select(root);
        Predicate restrictions = criteriaBuilder.conjunction();
        if (app == null || StringUtils.isEmpty(openId)) {
            return null;
        }
        restrictions = criteriaBuilder.and(restrictions, criteriaBuilder.equal(root.get("openId"), openId));
        restrictions = criteriaBuilder.and(restrictions, criteriaBuilder.equal(root.get("app"), app));
        criteriaQuery.where(restrictions);
        try {
            return super.findList(criteriaQuery).get(0);
        }catch (Exception e){
            return null;
        }
    }

    @Override
    public Page<Map<String,Object>> findPage(Pageable pageable, App app) {
        if (app == null) {
            return new Page<>(Collections.emptyList(),0L,pageable);
        }

        StringBuffer sb = new StringBuffer();
        StringBuffer sb1 = new StringBuffer();
        sb.append("SELECT");
        sb1.append("SELECT");
        sb1.append(" count(currentTable.id)");
        sb.append(" currentTable.id,");
        sb.append(" currentTable.createdDate,");
        sb.append(" currentTable.updateDate,");
        sb.append(" currentTable.nickName,");
        sb.append(" currentTable.avatarUrl,");
        sb.append(" currentTable.balance,");
        sb.append(" currentTable.point,");
        sb.append(" currentTable.city,");
        sb.append(" currentTable.province,");
        sb.append(" currentTable.country,");
        sb.append(" currentTable.isAuth,");
        sb.append(" (SELECT nickName FROM member AS parentTable WHERE parentTable.id = currentTable.id) parentName,");
        sb.append(" (SELECT COUNT( id ) totalCount FROM clickrecord WHERE memberId = currentTable.id) totalCount,");
        sb.append(" (SELECT COUNT( id ) todayCount FROM clickrecord WHERE memberId = currentTable.id AND createdDate >= '"+ DateUtils.formatDateToString(new Date(),"yyyy-MM-dd 00:00:00") +"' AND createdDate <= '"+DateUtils.formatDateToString(new Date(),"yyyy-MM-dd 00:00:00")+"') todayCount ");
        sb.append(" FROM member AS currentTable");
        sb1.append(" FROM member AS currentTable");
        sb.append(" WHERE 1=1");
        sb1.append(" WHERE 1=1");
        sb.append(" and currentTable.appId = "+app.getId());
        sb1.append(" and currentTable.appId = "+app.getId());
        sb.append(" order by currentTable.createdDate desc");

        return new Page<>(jdbcTemplate.queryForList(sb.toString()),jdbcTemplate.queryForObject(sb1.toString(),Long.class),pageable);



    }
}