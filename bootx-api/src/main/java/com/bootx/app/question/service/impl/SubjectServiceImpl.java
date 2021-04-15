
package com.bootx.app.question.service.impl;

import com.bootx.app.question.dao.SubjectDao;
import com.bootx.app.question.entity.Subject;
import com.bootx.app.question.service.SubjectService;
import com.bootx.service.impl.BaseServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Service - 素材目录
 * 
 * @author blackboy
 * @version 1.0
 */
@Service
public class SubjectServiceImpl extends BaseServiceImpl<Subject, Long> implements SubjectService {

    @Resource
    private SubjectDao subjectDao;

    @Override
    public boolean titleExist(String title) {
        return subjectDao.exists("title",title);
    }
}