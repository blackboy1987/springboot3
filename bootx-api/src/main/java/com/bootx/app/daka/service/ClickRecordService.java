
package com.bootx.app.daka.service;

import com.bootx.app.daka.entity.ClickRecord;
import com.bootx.entity.App;
import com.bootx.member.entity.Member;
import com.bootx.service.BaseService;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Service - 插件
 * 
 * @author blackboy
 * @version 1.0
 */
public interface ClickRecordService extends BaseService<ClickRecord,Long> {

    Map<String,Object> count0(App app, Date beginDate, Date endDate);
    /**
     * 会员的打卡汇总
     * @param member
     * @param beginDate
     * @param endDate
     * @return
     */
    Map<String,Object> count(Member member, Date beginDate, Date endDate);

    Map<String,Object> count1(Member member, Date beginDate, Date endDate);

    Map<String,Object> count2(Member member, Date beginDate, Date endDate);

    /**
     * 会员的打卡记录
     * @param member
     * @param beginDate
     * @param endDate
     * @return
     */
    List<Map<String,Object>> list(Member member, Date beginDate, Date endDate);

    /**
     * 会员的一级打卡记录
     * @param member
     * @param beginDate
     * @param endDate
     * @return
     */
    List<Map<String,Object>> list1(Member member, Date beginDate, Date endDate);

    /**
     * 会员的打二级卡记录
     * @param member
     * @param beginDate
     * @param endDate
     * @return
     */
    List<Map<String,Object>> list2(Member member, Date beginDate, Date endDate);


    /**
     * 会员的打卡记录
     * @param member
     * @param beginDate
     * @param endDate
     * @return
     */
    List<Map<String,Object>> page(Member member, Date beginDate, Date endDate,Integer page);

    /**
     * 会员的一级打卡记录
     * @param member
     * @param beginDate
     * @param endDate
     * @return
     */
    List<Map<String,Object>> page1(Member member, Date beginDate, Date endDate,Integer page);

    /**
     * 会员的打二级卡记录
     * @param member
     * @param beginDate
     * @param endDate
     * @return
     */
    List<Map<String,Object>> page2(Member member, Date beginDate, Date endDate,Integer page);

    /**
     *
     * @param member
     * @return
     */
    Map<String,Object> allNum(Member member);

    List<Map<String,Object>> allNumList(Member member);

    List<Map<String,Object>> rank(App app, Date beginDate, Date endDate);

}