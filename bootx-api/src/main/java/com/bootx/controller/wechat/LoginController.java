package com.bootx.controller.wechat;

import com.bootx.entity.Admin;
import com.bootx.service.AdminService;
import com.bootx.util.EhCacheUtils;
import com.bootx.util.JWTUtils;
import com.bootx.util.JsonUtils;
import com.bootx.util.WechatUtils1;
import com.google.zxing.WriterException;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController("wechatLoginController")
@RequestMapping("/wechat/login")
public class LoginController {

    @Resource
    private AdminService adminService;

    @GetMapping
    public Map<String,Object> wechat() throws IOException, WriterException {
        Map<String,String> data = WechatUtils1.createQRCode();
        Map<String,Object> result = new HashMap<>();
        if(StringUtils.isNotBlank(data.get("ticket"))&&StringUtils.isNotBlank(data.get("img"))){
            result.put("ticket",data.get("ticket"));
            result.put("img",data.get("img"));
            result.put("code",0);
        }else{
            result.put("code",-1);
        }
        return result;
    }

    @PostMapping("/refresh")
    public Map<String,Object> refresh(String ticket){
        Map<String,Object> data = new HashMap<>();

        if(StringUtils.isNotBlank(ticket)){
            WeChatUser weChatUser = EhCacheUtils.getCacheWechatUser(ticket);
            if(weChatUser==null){
                // 没有获取到用户，继续刷新
                data.put("code",1);
            }else{
                // 获取到用户
                Admin member = adminService.findByOpenId(weChatUser.getOpenId());
                if(member==null){
                    // TODO 创建新的用户并登录
                    member = adminService.create(weChatUser);
                }
                Map<String,Object> map = new HashMap<>();
                map.put("id",member.getId());
                data.put("token", JWTUtils.create(member.getId()+"",map));
                data.put("code",0);
            }

        }else{
            // 停止刷新
            data.put("code",-1);
        }

        return data;


    }


}
