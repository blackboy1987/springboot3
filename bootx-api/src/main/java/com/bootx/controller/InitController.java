package com.bootx.controller;

import com.bootx.app.daka.entity.Product;
import com.bootx.app.daka.service.ProductService;
import com.bootx.common.Result;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@RestController("init1Controller")
@RequestMapping("/init1")
public class InitController {

    @Resource
    private ProductService productService;

    @GetMapping
    private Result init() {
        List<Product> all = productService.findAll();
        for (Product product:all) {
            List<String> list = new ArrayList<>();
            list.add("https://bootx-xiaochengxu.oss-cn-hangzhou.aliyuncs.com/daka/1.jpg");
            list.add("https://bootx-xiaochengxu.oss-cn-hangzhou.aliyuncs.com/daka/2.jpg");
            list.add("https://bootx-xiaochengxu.oss-cn-hangzhou.aliyuncs.com/daka/3.jpg");
            list.add("https://bootx-xiaochengxu.oss-cn-hangzhou.aliyuncs.com/daka/4.jpg");
            list.add("https://bootx-xiaochengxu.oss-cn-hangzhou.aliyuncs.com/daka/5.jpg");
            product.setImages(list);
            productService.update(product);
        }

        return Result.success("ok");
    }

}
