package com.itmk.web.reco.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.itmk.web.reco.entity.RecoJob;
import com.itmk.web.reco.mapper.RecoJobMapper;
import com.itmk.web.reco.service.RecoJobService;
import org.springframework.stereotype.Service;

@Service
public class RecoJobServiceImpl extends ServiceImpl<RecoJobMapper, RecoJob> implements RecoJobService {
}
