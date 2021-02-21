package com.ssmeadows.web.controller;

import com.ssmeadows.web.service.WebService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import java.util.Map;

@Controller
@RequestMapping(value = "")
public class WebController {
    @Resource
    private WebService webService;

    @GetMapping("/")
    public String base(final Map<String, Object> model) {
        webService.updateDefaultModel(model);
        return "home";
    }

    @GetMapping("/admin")
    public String admin(final Map<String, Object> model) {
        webService.updateDefaultModel(model);
        return "admin";
    }

    @GetMapping("/login")
    public String login(final Map<String, Object> model) {
        webService.updateDefaultModel(model);
        return "login";
    }

    @GetMapping("/views/**")
    public String others(final Map<String, Object> model) {
        webService.updateDefaultModel(model);
        return "404";
    }
}
