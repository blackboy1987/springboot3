package com.bootx.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/page")
public class PageIndex {

    @GetMapping(value="/**")
    public String index(){
        return "index";
    }

}
