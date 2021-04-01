package com.bootx.controller.wechat;


import com.bootx.util.*;
import com.bootx.util.wechat.BaseEvent;
import com.bootx.util.wechat.MsgType;
import com.bootx.util.wechat.TextMessage;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController("wechatIndexController")
@RequestMapping("/wechat")
public class IndexController {

    @GetMapping
    public String index(String signature, String timestamp, String nonce, String echostr) {
        if (SignUtil.checkSignature(signature, timestamp, nonce)) {
            return echostr;
        }
        return "error";
    }


    @PostMapping
    public String index(HttpServletRequest request) {
        Map<String, String> map = WechatUtils1.parseXml(request);
        String event = map.get("event");
        if(StringUtils.equalsAnyIgnoreCase("SCAN",event)){
            // 扫码进来的（已经关注了）
        }else if(StringUtils.equalsAnyIgnoreCase("subscribe",event)) {
            // 订阅
        }else if(StringUtils.equalsAnyIgnoreCase("unsubscribe",event)) {
            // 取消订阅
        }
        return subscribe(map);
    }


    private String subscribe(Map<String, String> map) {
        WeChatUser weChatUser = new WeChatUser();
        TextMessage textMessage = new TextMessage();
        textMessage.setMsgType(MsgType.text);
        textMessage.setCreateTime(System.currentTimeMillis());
        BaseEvent baseEvent = JsonUtils.toObject(JsonUtils.toJson(map), BaseEvent.class);
        textMessage.setFromUserName(baseEvent.getToUserName());
        textMessage.setToUserName(baseEvent.getFromUserName());
        weChatUser.setOpenId(baseEvent.getFromUserName());
        textMessage.setContent("感谢您的关注");
        String ticket = map.get("ticket");
        if(StringUtils.isNotBlank(ticket)){
            weChatUser.setTicket(ticket);
            StringBuffer sb = new StringBuffer();
            sb.append("感谢您的关注\n\n");
            textMessage.setContent(sb.toString());
            textMessage.setMsgType(MsgType.text);
        }
        String result = XmlUtils.toXml(textMessage);
        EhCacheUtils.setCacheWechatUserCache(weChatUser);
        return result;
    }
}
