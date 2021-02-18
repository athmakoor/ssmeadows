package com.ssmeadows.service;

import com.ssmeadows.bean.AuthRequest;
import com.ssmeadows.bean.Plot;
import com.ssmeadows.bean.PlotStatus;
import com.ssmeadows.bean.StatsData;

import java.util.List;

public interface DataService {
    List<Plot> findAll();

    List<PlotStatus> findAllStatus();

    Plot update(Plot data);

    StatsData updateStats(StatsData data);

    StatsData getStats();

    Boolean login(AuthRequest data);
}
