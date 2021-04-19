package com.bootx.app.question.controller;

import com.bootx.app.question.service.SubjectService;
import com.bootx.common.Result;
import com.bootx.entity.App;
import com.bootx.entity.AppConfig;
import com.bootx.entity.RewardType;
import com.bootx.member.entity.Member;
import com.bootx.member.entity.PointLog;
import com.bootx.member.service.MemberService;
import com.bootx.service.AppService;
import com.bootx.service.RedisService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.Map;
import java.util.Random;

@RestController("apiQuestionIndexController")
@RequestMapping("/api/question")
public class IndexController {

    @Resource
    private SubjectService subjectService;

    @Resource
    private RedisService redisService;

    @Resource
    private AppService appService;

    @Resource
    private MemberService memberService;

    @Resource
    private RedisTemplate<String, Map<String,Object>> redisTemplate;


    private Random RANDOM = new Random();

    @PostMapping("/get")
    public Result get(HttpServletRequest request){
        // App app = appService.get(request);
       // Member member = memberService.get(request);
        Map<String, Object> map = redisTemplate.opsForValue().get("question_" + RANDOM.nextInt(978));
        while (map==null||map.size()==0){
            map = redisTemplate.opsForValue().get("question_" + RANDOM.nextInt(978));
        }
        return Result.success(map);
    }

    //'right'|'error'|'sign'
    @PostMapping("/adjust")
    public Result adjust(HttpServletRequest request,RewardType type){
        App app = appService.get(request);
        if(app==null){
            return Result.error("非法请求");
        }
        AppConfig appConfig = app.getAppConfig();
        Member member = memberService.get(request);
        if(member==null){
            return Result.error("用户不存在");
        }
        // 答题回答正确
        if(RewardType.right==type){
            memberService.addPoint(member,100*-1, PointLog.Type.deduct,"答题正确，扣减");
        }else if(RewardType.error==type){
            // 答题回答错误
            memberService.addPoint(member,100*-1, PointLog.Type.deduct,"答题错误，扣减");
        }else if(RewardType.sign==type){
            /**
             * 判断当天是否签到
             */
            Integer count = memberService.countPointLog(new Date(),member,PointLog.Type.sign);
            if(count>0){
                return Result.error("今日已签到，明日再来吧");
            }
            //签到
            String signPoint = appConfig.get("signPoint")+"";
            if(StringUtils.isBlank(signPoint)){
                signPoint = "100";
            }try {
                memberService.addPoint(member,Long.parseLong(signPoint), PointLog.Type.sign,"签到赠送积分");
            }catch (Exception ignored){

            }
        }
        return Result.success("");
    }

}
