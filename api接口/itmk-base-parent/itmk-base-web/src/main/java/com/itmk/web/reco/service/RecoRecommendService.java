package com.itmk.web.reco.service;

import com.itmk.web.reco.dto.RecoListResponseDto;

public interface RecoRecommendService {
    RecoListResponseDto getRecoList(String openid, String scene, Integer size);
}

