package com.ssmeadows.controller;

import com.ssmeadows.bean.AuthRequest;
import com.ssmeadows.bean.Plot;
import com.ssmeadows.bean.StatsData;
import com.ssmeadows.service.DataService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping("/admin/api")
public class AdminController {
    @Resource
    private DataService dataService;

    @PostMapping("/plot/update")
    public Plot updateStatus(@RequestBody final Plot data) {
        return dataService.update(data);
    }

    @PostMapping("/stats/update")
    public StatsData updateStatus(@RequestBody final StatsData data) {
        return dataService.updateStats(data);
    }

    @PostMapping("/login")
    public Boolean login(@RequestBody final AuthRequest data) {
        return dataService.validateLogin(data);
    }

}
