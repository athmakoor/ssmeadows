package com.ssmeadows.repository;

import com.ssmeadows.bean.jpa.PlotEntity;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface PlotRepository extends PagingAndSortingRepository<PlotEntity, Integer> {
}
