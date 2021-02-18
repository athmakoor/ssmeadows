package com.ssmeadows.repository;

import com.ssmeadows.bean.jpa.StatsDataEntity;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface StatsDataRepository extends PagingAndSortingRepository<StatsDataEntity, Integer> {
}
