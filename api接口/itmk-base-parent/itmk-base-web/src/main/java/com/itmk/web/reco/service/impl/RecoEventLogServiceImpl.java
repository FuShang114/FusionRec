package com.itmk.web.reco.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.itmk.web.reco.dto.RecoEventBatchDto;
import com.itmk.web.reco.dto.RecoEventItemDto;
import com.itmk.web.reco.entity.RecoEventLog;
import com.itmk.web.reco.mapper.RecoEventLogMapper;
import com.itmk.web.reco.service.RecoEventLogService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class RecoEventLogServiceImpl extends ServiceImpl<RecoEventLogMapper, RecoEventLog> implements RecoEventLogService {
    @Override
    public void saveEventBatch(RecoEventBatchDto dto) {
        if (dto == null || dto.getEvents() == null || dto.getEvents().isEmpty()) {
            return;
        }
        List<RecoEventLog> list = new ArrayList<>();
        for (RecoEventItemDto item : dto.getEvents()) {
            if (item == null || item.getOpenid() == null || item.getGoodsId() == null || item.getEventType() == null) {
                continue;
            }
            RecoEventLog log = new RecoEventLog();
            BeanUtils.copyProperties(item, log);
            if (log.getScene() == null || log.getScene().trim().isEmpty()) {
                log.setScene("home_hot");
            }
            if (log.getEventTime() == null) {
                log.setEventTime(new Date());
            }
            list.add(log);
        }
        if (!list.isEmpty()) {
            this.saveBatch(list);
        }
    }
}
