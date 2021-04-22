package com.webpage;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@RestController
public class IndexController {

    @Resource
    private RestTemplate restTemplate;


    @GetMapping
    public String index (){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.add("Host","cb.nbxkyl.site");
        headers.add("Referer","http://cb.nbxkyl.site/OES/user/");
        List<String> cookies = new ArrayList<>();
        cookies.add(" JSESSIONID=49DC17041D39DF298B3E8B9F35BF521B; _PK_2=%7B%22user_account%22%3A%222%22%2C%22comp_code%22%3A%221001%22%2C%22copy_code%22%3A%22202%22%2C%22check_data%22%3A%22true%22%7D; theme=light; 2_MenuId=111010010000; 2_LastMod=common");
        headers.put(HttpHeaders.COOKIE, cookies);

        HttpEntity<String> requestEntity = new HttpEntity<String>(null, headers);
        ResponseEntity<String> response = restTemplate.exchange("http://cb.nbxkyl.site/OES/ui/vhwsp?page=base-sysSetting-sysPara&menuId=101001102000&dojo.preventCache=1618965785327", HttpMethod.GET, requestEntity, String.class);
        return response.getBody();
    }

}
