package com.ssmeadows.service.impl;

import com.ssmeadows.bean.AuthRequest;
import com.ssmeadows.bean.Plot;
import com.ssmeadows.bean.PlotStatus;
import com.ssmeadows.bean.StatsData;
import com.ssmeadows.bean.jpa.PlotEntity;
import com.ssmeadows.bean.jpa.StatsDataEntity;
import com.ssmeadows.repository.PlotRepository;
import com.ssmeadows.repository.StatsDataRepository;
import com.ssmeadows.service.DataService;
import com.ssmeadows.service.mapping.ServiceMapper;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

@Component
public class DataServiceImpl implements DataService {
    @Resource
    private ServiceMapper<Plot, PlotEntity> plotMapper;
    @Resource
    private ServiceMapper<PlotStatus, PlotEntity> statusMapper;
    @Resource
    private ServiceMapper<StatsData, StatsDataEntity> statsMapper;
    @Resource
    private PlotRepository plotRepository;
    @Resource
    private StatsDataRepository statsDataRepository;

    @Override
    public List<Plot> findAll() {
        return plotMapper.mapEntitiesToDTOs(plotRepository.findAll(), Plot.class);
    }

    @Override
    public List<PlotStatus> findAllStatus() {
        return statusMapper.mapEntitiesToDTOs(plotRepository.findAll(), PlotStatus.class);
    }

    @Override
    public Plot update(Plot data) {
        PlotEntity entity = plotRepository.findById(data.getId()).get();
        plotMapper.mapDTOToEntity(data, entity);

        PlotEntity savedEntity = plotRepository.save(entity);

        return plotMapper.mapEntityToDTO(savedEntity, Plot.class);
    }

    @Override
    public StatsData updateStats(StatsData data) {
        StatsDataEntity entity = statsDataRepository.findById(1).get();
        statsMapper.mapDTOToEntity(data, entity);

        StatsDataEntity savedEntity = statsDataRepository.save(entity);

        return statsMapper.mapEntityToDTO(savedEntity, StatsData.class);
    }

    @Override
    public StatsData getStats() {
        return statsMapper.mapEntityToDTO(statsDataRepository.findById(1).get(), StatsData.class);
    }

    @Override
    public Boolean login(AuthRequest data) {
        return true;
    }
}
