package com.bootx.controller.admin;

import com.bootx.common.Result;
import com.bootx.controller.BaseController;
import com.bootx.entity.Admin;
import com.bootx.service.AdminService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController("apiAdminIndexController")
@RequestMapping("/admin/api")
public class IndexController extends BaseController {

    @Resource
    private AdminService adminService;

    @PostMapping("/currentUser")
    private Result currentUser(HttpServletRequest request) {
        Admin admin = adminService.get(request);
        if(admin==null){
            return Result.error("非法访问");
        }
        Map<String,Object> data = new HashMap<>();
        data.put("id",admin.getId());
        data.put("username",admin.getUsername());
        data.put("currentAuthority","admin");
        return Result.success(data);
    }
}
