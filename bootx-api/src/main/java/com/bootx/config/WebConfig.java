package com.bootx.config;

import com.bootx.app.zhaocha.interceptor.ZhaoChaInterceptor;
import com.bootx.interceptor.CorsInterceptor;
import com.bootx.interceptor.ValidateInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Bean
    public CorsInterceptor corsInterceptor() {
        return new CorsInterceptor();
    }


    @Bean
    public ZhaoChaInterceptor zhaoChaInterceptor() {
        return new ZhaoChaInterceptor();
    }

    @Bean
    public ValidateInterceptor validateInterceptor() {
        return new ValidateInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(corsInterceptor())
                .addPathPatterns("/**");
        registry.addInterceptor(validateInterceptor())
                .addPathPatterns("/api/**");
        registry.addInterceptor(zhaoChaInterceptor())
                .addPathPatterns("/api/zhaocha","/api/zhacha/**");

    }

}
