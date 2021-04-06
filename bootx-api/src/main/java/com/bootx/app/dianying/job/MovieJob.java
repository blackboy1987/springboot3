package com.bootx.app.dianying.job;

import com.bootx.entity.App;
import com.bootx.entity.SubscriptionRecord;
import com.bootx.entity.SubscriptionTemplate;
import com.bootx.service.SubscriptionRecordService;
import com.bootx.util.WechatUtils;
import com.bootx.util.wechat.BaseResponse;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class MovieJob {

    @Resource
    private SubscriptionRecordService subscriptionRecordService;

    @Scheduled(fixedDelay = 1000*60*30)
    public void send(){
        List<SubscriptionRecord> subscriptionRecords = subscriptionRecordService.findListByStatus(0);
        for (SubscriptionRecord subscriptionRecord:subscriptionRecords) {
            Map<String, Object> param1 = new HashMap<>();
            param1.put("page",subscriptionRecord.getPage());
            param1.put("data",subscriptionRecord.getParam());
            BaseResponse baseResponse = WechatUtils.subscribeSend(subscriptionRecord.getApp(),subscriptionRecord.getSubscriptionTemplate().getTemplateId(),subscriptionRecord.getMember().getOpenId(),param1);
            if(baseResponse.getErrCode()==0){
                // 发送成功
                subscriptionRecord.setStatus(1);
            }else{
                // 发送失败
                subscriptionRecord.setStatus(2);
            }
            subscriptionRecordService.update(subscriptionRecord);
        }
    }
}
