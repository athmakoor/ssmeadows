package com.ssmeadows.controller;

import com.ssmeadows.bean.*;
import com.ssmeadows.service.DataService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping("/api")
public class DataController {
    @Resource
    private DataService dataService;


    @GetMapping("/plot/all")
    public List<Plot> allPlots() {
        return dataService.findAll();
    }

    @GetMapping("/home-data")
    public HomeData allPlotsStatus() {
        HomeData data = new HomeData();
        data.setPlots(dataService.findAll());
        data.setStats(dataService.getStats());

        return data;
    }

    @PostMapping("/plot/update")
    public Plot updateStatus(@RequestBody final Plot data) {
        return dataService.update(data);
    }

    @PostMapping("/update-stats")
    public StatsData updateStatus(@RequestBody final StatsData data) {
        return dataService.updateStats(data);
    }

    @GetMapping("/get-stats")
    public StatsData getStatus() {
        return dataService.getStats();
    }

    @PostMapping("/login")
    public Boolean login(@RequestBody final AuthRequest data) {
        return dataService.login(data);
    }
}
