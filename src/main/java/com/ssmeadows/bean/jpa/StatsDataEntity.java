package com.ssmeadows.bean.jpa;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "stats_data")
public class StatsDataEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "prof_agents")
    private String profAgents;

    @Column(name = "prov_allotted")
    private String provAllotted;

    @Column(name = "allotted")
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
