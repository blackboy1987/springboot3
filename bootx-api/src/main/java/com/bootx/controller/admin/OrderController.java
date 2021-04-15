package com.bootx.controller.admin;

import com.bootx.common.Page;
import com.bootx.common.Pageable;
import com.bootx.common.Result;
import com.bootx.entity.Admin;
import com.bootx.entity.App;
import com.bootx.entity.BaseEntity;
import com.bootx.entity.Order;
import com.bootx.service.AdminService;
import com.bootx.service.AppService;
import com.bootx.service.OrderService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

@RestController("apiAdminOrderController")
@RequestMapping("/admin/api/order")
public class OrderController {

    @Resource
    private OrderService orderService;
    @Resource
    private AdminService adminService;
    @Resource
    private AppService appService;

    @PostMapping("/list")
    @JsonView(BaseEntity.PageView.class)
    public Result list(HttpServletRequest request, Pageable pageable){
        Admin admin = adminService.get(request);
        if(admin==null||!admin.getIsAdmin()){
            return Result.error("非法访问");
        }
        App app = admin.getApp();
        if(app==null){
            return Result.error("非法访问");
        }
        Page<Order> page = orderService.findPage(pageable);
        for (Order order:page.getContent()) {
            Admin admin1 = adminService.find(order.getAdminId());
            if(admin1!=null){
                order.setUsername(admin1.getUsername());
            }
            App app1 = appService.find(order.getAppId());
            if(app1!=null){
                order.setAppName(app1.getAppName());
            }
        }
        return Result.success(page);
    }

    @PostMapping("/save")
    public Result save(HttpServletRequest request, Order order){
        Admin admin = adminService.get(request);
        if(admin==null||!admin.getIsAdmin()){
            return Result.error("非法访问");
        }
        App app = admin.getApp();
        if(app==null){
            return Result.error("非法访问");
        }
        if(orderService.orderSnExist(order.getOrderSn())){
            return Result.error("订单编号已存在");
        }
        order.setIsUsed(false);
        orderService.save(order);
        return Result.success("ok");
    }



    @PostMapping("/edit")
    public Result edit(HttpServletRequest request,String orderSn){
        Admin admin = adminService.get(request);
        if(admin==null||!admin.getIsAdmin()){
            return Result.error("非法访问");
        }
        App app = admin.getApp();
        if(app==null){
            return Result.error("非法访问");
        }

        return Result.success(orderService.findByOrderSn(orderSn));
    }

    @PostMapping("/update")
    public Result update(HttpServletRequest request, Order order){
        Admin admin = adminService.get(request);
        if(admin==null||!admin.getIsAdmin()){
            return Result.error("非法访问");
        }
        App app = admin.getApp();
        if(app==null){
            return Result.error("非法访问");
        }

        orderService.update(order);
        return Result.success("ok");
    }

    @PostMapping("/delete")
    public Result update(HttpServletRequest request, Long [] ids){
        Admin admin = adminService.get(request);
        if(admin==null||!admin.getIsAdmin()){
            return Result.error("非法访问");
        }
        App app = admin.getApp();
        if(app==null){
            return Result.error("非法访问");
        }
        orderService.delete(ids);
        return Result.success("ok");
    }
}
