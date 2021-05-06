
package com.bootx.app.daka.service.impl;
import com.bootx.app.daka.entity.ClickRecord;
import com.bootx.app.daka.service.ClickRecordService;
import com.bootx.entity.App;
import com.bootx.member.entity.Member;
import com.bootx.service.impl.BaseServiceImpl;
import com.bootx.util.DateUtils;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Service - 素材目录
 * 
 * @author blackboy
 * @version 1.0
 */
@Service
public class ClickRecordServiceImpl extends BaseServiceImpl<ClickRecord, Long> implements ClickRecordService {

    @Override
    public Map<String, Object> count0(App app, Date beginDate, Date endDate) {
        if(beginDate==null){
            beginDate = DateUtils.getNextDay(-365*10);
        }
        if(endDate==null){
            endDate = new Date();
        }
        String sql="select count(1) times,SUM(clickrecord.point) point from clickrecord AS clickrecord where clickrecord.appId="+app.getId()+" AND clickrecord.createdDate>='"+DateUtils.formatDateToString(beginDate,"yyyy-MM-dd HH:mm:ss")+"' AND clickrecord.createdDate>='"+DateUtils.formatDateToString(endDate,"yyyy-MM-dd 23:59:59")+"'";

        return jdbcTemplate.queryForMap(sql);
    }

    @Override
    public Map<String, Object> count(Member member, Date beginDate, Date endDate) {
        if(beginDate==null){
            beginDate = DateUtils.getNextDay(-365*10);
        }
        if(endDate==null){
            endDate = new Date();
        }

        String sql="select count(1) times,SUM(clickrecord.point) point,member.point remainPoint from clickrecord AS clickrecord,member as member where  clickrecord.memberId="+member.getId()+" and clickrecord.appId="+member.getAppId()+" AND member.id=clickrecord.memberId AND clickrecord.createdDate>='"+DateUtils.formatDateToString(beginDate,"yyyy-MM-dd HH:mm:ss")+"' AND clickrecord.createdDate<='"+DateUtils.formatDateToString(endDate,"yyyy-MM-dd HH:mm:ss")+"'";

        return jdbcTemplate.queryForMap(sql);
    }
    public Map<String, Object> count1(Member member, Date beginDate, Date endDate) {
        if(beginDate==null){
            beginDate = DateUtils.getNextDay(-365*10);
        }
        if(endDate==null){
            endDate = new Date();
        }

        String sql="select count(1) times,SUM(clickrecord.point) point,member.point remainPoint from clickrecord AS clickrecord,member as member where member.parent_id="+member.getId()+" and member.grade="+(member.getGrade()+1) +" and clickrecord.appId="+member.getAppId()+" AND member.id=clickrecord.memberId AND clickrecord.createdDate>='"+DateUtils.formatDateToString(beginDate,"yyyy-MM-dd HH:mm:ss")+"' AND clickrecord.createdDate<='"+DateUtils.formatDateToString(endDate,"yyyy-MM-dd HH:mm:ss")+"' ORDER BY clickrecord.createdDate DESC";

        return jdbcTemplate.queryForMap(sql);
    }
    public Map<String, Object> count2(Member member, Date beginDate, Date endDate) {
        if(beginDate==null){
            beginDate = DateUtils.getNextDay(-365*10);
        }
        if(endDate==null){
            endDate = new Date();
        }

        String sql="select count(1) times,SUM(clickrecord.point) point,member.point remainPoint from clickrecord AS clickrecord,member as member where member.grade="+(member.getGrade()+2)+" and member.treePath like ',"+member.getId()+",%' and clickrecord.appId="+member.getAppId()+" AND member.id=clickrecord.memberId AND clickrecord.createdDate>='"+DateUtils.formatDateToString(beginDate,"yyyy-MM-dd HH:mm:ss")+"' AND clickrecord.createdDate<='"+DateUtils.formatDateToString(endDate,"yyyy-MM-dd HH:mm:ss")+"' ORDER BY clickrecord.createdDate DESC";

        return jdbcTemplate.queryForMap(sql);
    }

    @Override
    public List<Map<String, Object>> list(Member member, Date beginDate, Date endDate) {
        if(beginDate==null){
            beginDate = DateUtils.getNextDay(-365*10);
        }
        if(endDate==null){
            endDate = new Date();
        }

        String sql="select member.nickName,member.avatarUrl,DATE_FORMAT(clickrecord.createdDate,'%Y-%m-%d %H:%i:%s') createdDate,clickrecord.point from clickrecord AS clickrecord,member as member where  clickrecord.memberId="+member.getId()+" and clickrecord.appId="+member.getAppId()+" AND member.id=clickrecord.memberId AND clickrecord.createdDate>='"+DateUtils.formatDateToString(beginDate,"yyyy-MM-dd HH:mm:ss")+"' AND clickrecord.createdDate<='"+DateUtils.formatDateToString(endDate,"yyyy-MM-dd HH:mm:ss")+"' ORDER BY clickrecord.createdDate DESC";

        return jdbcTemplate.queryForList(sql);
    }

    @Override
    public List<Map<String, Object>> list1(Member member, Date beginDate, Date endDate) {
        if(beginDate==null){
            beginDate = DateUtils.getNextDay(-365*10);
        }
        if(endDate==null){
            endDate = new Date();
        }

        String sql="select member.nickName,member.avatarUrl,DATE_FORMAT(clickrecord.createdDate,'%Y-%m-%d %H:%i:%s') createdDate,clickrecord.point from clickrecord AS clickrecord,member as member where member.parent_id="+member.getId()+" and member.grade="+(member.getGrade()+1) +" and clickrecord.appId="+member.getAppId()+" AND member.id=clickrecord.memberId AND clickrecord.createdDate>='"+DateUtils.formatDateToString(beginDate,"yyyy-MM-dd HH:mm:ss")+"' AND clickrecord.createdDate<='"+DateUtils.formatDateToString(endDate,"yyyy-MM-dd HH:mm:ss")+"' ORDER BY clickrecord.createdDate DESC";

        return jdbcTemplate.queryForList(sql);
    }

    @Override
    public List<Map<String, Object>> list2(Member member, Date beginDate, Date endDate) {
        if(beginDate==null){
            beginDate = DateUtils.getNextDay(-365*10);
        }
        if(endDate==null){
            endDate = new Date();
        }
        String sql="select member.nickName,member.avatarUrl,DATE_FORMAT(clickrecord.createdDate,'%Y-%m-%d %H:%i:%s') createdDate,clickrecord.point from clickrecord AS clickrecord,member as member where member.grade="+(member.getGrade()+2)+" and member.treePath like ',"+member.getId()+",%' and clickrecord.appId="+member.getAppId()+" AND member.id=clickrecord.memberId AND clickrecord.createdDate>='"+DateUtils.formatDateToString(beginDate,"yyyy-MM-dd HH:mm:ss")+"' AND clickrecord.createdDate<='"+DateUtils.formatDateToString(endDate,"yyyy-MM-dd HH:mm:ss")+"' ORDER BY clickrecord.createdDate DESC";

        return jdbcTemplate.queryForList(sql);
    }

    @Override
    public List<Map<String, Object>> page(Member member, Date beginDate, Date endDate, Integer page) {
        if(page==null){
            page =1;
        }
        if(beginDate==null){
            beginDate = DateUtils.getNextDay(-365*10);
        }
        if(endDate==null){
            endDate = new Date();
        }

        String sql="select member.nickName,member.avatarUrl,DATE_FORMAT(clickrecord.createdDate,'%Y-%m-%d %H:%i:%s') createdDate,clickrecord.point from clickrecord AS clickrecord,member as member where  clickrecord.memberId="+member.getId()+" and clickrecord.appId="+member.getAppId()+" AND member.id=clickrecord.memberId AND clickrecord.createdDate>='"+DateUtils.formatDateToString(beginDate,"yyyy-MM-dd HH:mm:ss")+"' AND clickrecord.createdDate<='"+DateUtils.formatDateToString(endDate,"yyyy-MM-dd HH:mm:ss")+"' ORDER BY clickrecord.createdDate DESC limit "+(page-1)*10+",10";

        return jdbcTemplate.queryForList(sql);
    }

    @Override
    public List<Map<String, Object>> page1(Member member, Date beginDate, Date endDate, Integer page) {
        if(page==null){
            page =1;
        }
        if(beginDate==null){
            beginDate = DateUtils.getNextDay(-365*10);
        }
        if(endDate==null){
            endDate = new Date();
        }

        String sql="select member.nickName,member.avatarUrl,DATE_FORMAT(clickrecord.createdDate,'%Y-%m-%d %H:%i:%s') createdDate,clickrecord.point from clickrecord AS clickrecord,member as member where member.parent_id="+member.getId()+" and member.grade="+(member.getGrade()+1) +" and clickrecord.appId="+member.getAppId()+" AND member.id=clickrecord.memberId AND clickrecord.createdDate>='"+DateUtils.formatDateToString(beginDate,"yyyy-MM-dd HH:mm:ss")+"' AND clickrecord.createdDate<='"+DateUtils.formatDateToString(endDate,"yyyy-MM-dd HH:mm:ss")+"' ORDER BY clickrecord.createdDate DESC limit "+(page-1)*10+",10";

        return jdbcTemplate.queryForList(sql);
    }

    @Override
    public List<Map<String, Object>> page2(Member member, Date beginDate, Date endDate, Integer page) {
        if(page==null){
            page =1;
        }
        if(beginDate==null){
            beginDate = DateUtils.getNextDay(-365*10);
        }
        if(endDate==null){
            endDate = new Date();
        }
        String sql="select member.nickName,member.avatarUrl,DATE_FORMAT(clickrecord.createdDate,'%Y-%m-%d %H:%i:%s') createdDate,clickrecord.point from clickrecord AS clickrecord,member as member where member.grade="+(member.getGrade()+2)+" and member.treePath like ',"+member.getId()+",%' and clickrecord.appId="+member.getAppId()+" AND member.id=clickrecord.memberId AND clickrecord.createdDate>='"+DateUtils.formatDateToString(beginDate,"yyyy-MM-dd HH:mm:ss")+"' AND clickrecord.createdDate<='"+DateUtils.formatDateToString(endDate,"yyyy-MM-dd HH:mm:ss")+"' ORDER BY clickrecord.createdDate DESC limit "+(page-1)*10+",10";

        return jdbcTemplate.queryForList(sql);
    }

    @Override
    public Map<String, Object> allNum(Member member) {
        Map<String,Object> data = new HashMap<>();
        if(member==null){
            data.put("times",0);
            data.put("point",0);
        }
        String sql="select count(id) count,SUM(point) point FROM clickrecord WHERE memberId="+member.getId();

        return jdbcTemplate.queryForMap(sql);
    }

    @Override
    public List<Map<String, Object>> allNumList(Member member) {
        if(member==null){
            return Collections.emptyList();
        }
        String sql="select DATE_FORMAT(createdDate,'%Y-%m-%d') date,count(id) times,SUM(point) point FROM clickrecord WHERE memberId="+member.getId()+" GROUP BY DATE_FORMAT(createdDate,'%Y-%m-%d') ORDER BY DATE_FORMAT(createdDate,'%Y-%m-%d') DESC";

        return jdbcTemplate.queryForList(sql);
    }

    @Override
    public List<Map<String, Object>> rank(App app, Date beginDate, Date endDate) {
       if(app==null){
           return Collections.emptyList();
       }
        if(beginDate==null){
            beginDate = DateUtils.getNextDay(-365*10);
        }
        if(endDate==null){
            endDate = new Date();
        }
        String sql="select SUM(clickrecord.point) point,member.nickName,member.avatarUrl from clickrecord as clickrecord,member as member WHERE clickrecord.appId="+app.getId()+" and clickrecord.memberId=member.id AND clickrecord.createdDate>='"+DateUtils.formatDateToString(beginDate,"yyyy-MM-dd HH:mm:ss")+"' AND clickrecord.createdDate<='"+DateUtils.formatDateToString(endDate,"yyyy-MM-dd HH:mm:ss")+"' GROUP BY clickrecord.memberId ORDER BY SUM(clickrecord.point) DESC";

        return jdbcTemplate.queryForList(sql);
    }
}