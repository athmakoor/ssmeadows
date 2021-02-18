package com.ssmeadows.bean;

import java.util.List;

public class HomeData {
    private List<Plot> plots;
    private StatsData stats;

    public List<Plot> getPlots() {
        return plots;
    }

    public void setPlots(List<Plot> plots) {
        this.plots = plots;
    }

    public StatsData getStats() {
        return stats;
    }

    public void setStats(StatsData stats) {
        this.stats = stats;
    }
}
