package com.ssmeadows.bean;


public class StatsData {
    private Integer id = 1;

    private String profAgents;

    private String provAllotted;

    private String allotted;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getProfAgents() {
        return profAgents;
    }

    public void setProfAgents(String profAgents) {
        this.profAgents = profAgents;
    }

    public String getProvAllotted() {
        return provAllotted;
    }

    public void setProvAllotted(String provAllotted) {
        this.provAllotted = provAllotted;
    }

    public String getAllotted() {
        return allotted;
    }

    public void setAllotted(String allotted) {
        this.allotted = allotted;
    }
}
