package com.ssmeadows.bean.jpa;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "plot")
public class PlotEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "status")
    private String status;

    @Column(name = "owner_name")
    private String ownerName;

    @Column(name = "owner_location")
    private String ownerLocation;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getOwnerLocation() {
        return ownerLocation;
    }

    public void setOwnerLocation(String ownerLocation) {
        this.ownerLocation = ownerLocation;
    }
}
