package com.bootx.controller.admin;

import com.bootx.common.Pageable;
import com.bootx.common.Result;
import com.bootx.controller.BaseController;
import com.bootx.service.NovelService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController("adminNovelController")
@RequestMapping("/admin/api/novle")
public class NovelController extends BaseController {

    @Resource
    private NovelService novelService;

    @PostMapping("/page")
    public Result page(Pageable pageable){
        return Result.success(novelService.findPage(pageable));
    }

}
