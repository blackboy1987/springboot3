package com.bootx.controller.admin;

import com.bootx.common.Pageable;
import com.bootx.common.Result;
import com.bootx.entity.Admin;
import com.bootx.entity.App;
import com.bootx.entity.Order;
import com.bootx.service.AdminService;
import com.bootx.service.OrderService;
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

    @PostMapping("/list")
    public Result list(HttpServletRequest request, Pageable pageable){
        Admin admin = adminService.get(request);
        if(admin==null){
            return Result.error("非法访问");
        }
        App app = admin.getApp();
        if(app==null){
            return Result.error("非法访问");
        }
        return Result.success(orderService.findPage(pageable));
    }

    @PostMapping("/save")
    public Result save(HttpServletRequest request, Order order){
        Admin admin = adminService.get(request);
        if(admin==null){
            return Result.error("非法访问");
        }
        App app = admin.getApp();
        if(app==null){
            return Result.error("非法访问");
        }
        if(orderService.orderSnExist(order.getOrderSn())){
            return Result.error("订单编号已存在");
        }

        orderService.save(order);
        return Result.success("ok");
    }



    @PostMapping("/edit")
    public Result edit(HttpServletRequest request,String orderSn){
        Admin admin = adminService.get(request);
        if(admin==null){
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
        if(admin==null){
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
        if(admin==null){
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
