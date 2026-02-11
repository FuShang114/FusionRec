package com.itmk.web.reco.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.itmk.web.reco.dto.RecoEventBatchDto;
import com.itmk.web.reco.entity.RecoEventLog;

public interface RecoEventLogService extends IService<RecoEventLog> {
    void saveEventBatch(RecoEventBatchDto dto);
}
