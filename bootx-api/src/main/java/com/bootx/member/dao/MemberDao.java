
package com.bootx.member.dao;

import com.bootx.common.Page;
import com.bootx.common.Pageable;
import com.bootx.dao.BaseDao;
import com.bootx.entity.App;
import com.bootx.member.entity.Member;

import java.util.Map;

/**
 * Dao - 素材目录
 * 
 * @author blackboy
 * @version 1.0
 */
public interface MemberDao extends BaseDao<Member, Long> {

    Member find(String openId, App app);

    Page<Map<String,Object>> findPage(Pageable pageable, App app);
}