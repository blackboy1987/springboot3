package com.bootx.controller.api;

import com.bootx.common.Pageable;
import com.bootx.common.Result;
import com.bootx.entity.BaseEntity;
import com.bootx.service.AreaService;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author black
 */
@RestController("apiAdminAppController")
@RequestMapping("/admin/api/app")
public class AreaController {

    @Resource
    private AreaService areaService;

    @PostMapping("/list1")
    @JsonView(BaseEntity.PageView.class)
    public Result list1(Pageable pageable,String name){
        return Result.success(areaService.findPage(pageable,name));
    }
}
