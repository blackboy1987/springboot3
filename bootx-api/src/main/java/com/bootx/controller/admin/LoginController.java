package com.bootx.controller.admin;

import com.bootx.common.Result;
import com.bootx.controller.BaseController;
import com.bootx.entity.App;
import com.bootx.entity.BaseEntity;
import com.bootx.member.entity.Member;
import com.bootx.service.AppService;
import com.bootx.util.CodeUtils;
import com.bootx.util.DateUtils;
import com.bootx.util.JWTUtils;
import org.apache.commons.lang3.StringUtils;
import org.jsoup.internal.StringUtil;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

@RestController("apiLoginController")
@RequestMapping("/login")
public class LoginController extends BaseController {

    @Resource
    private AppService appService;

    @PostMapping("/submit")
    private Result login(String username,String password,String type) {
        Map<String,Object> data = new HashMap<>();
        data.put("type",type);
        if(StringUtils.isBlank(username)||StringUtils.isBlank(password)){
            data.put("status","error");
            data.put("msg","请输入用户名和密码");
            return Result.error(-1,"请输入用户名和密码",data);
        }

        App app = null;
        data.put("status","error");
        data.put("msg","用户名或密码错误");
        return Result.error(-1,"用户名或密码错误",data);

    }



}
