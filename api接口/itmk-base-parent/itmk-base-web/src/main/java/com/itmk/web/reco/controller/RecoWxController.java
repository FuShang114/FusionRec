package com.itmk.web.reco.controller;

import com.itmk.utils.ResultUtils;
import com.itmk.utils.ResultVo;
import com.itmk.web.reco.dto.RecoEventBatchDto;
import com.itmk.web.reco.dto.RecoListResponseDto;
import com.itmk.web.reco.service.RecoEventLogService;
import com.itmk.web.reco.service.RecoRecommendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/wxapi/reco")
public class RecoWxController {
    @Autowired
    private RecoEventLogService recoEventLogService;
    @Autowired
    private RecoRecommendService recoRecommendService;

    @PostMapping("/event/batch")
    public ResultVo saveEventBatch(@RequestBody RecoEventBatchDto dto) {
        recoEventLogService.saveEventBatch(dto);
        return ResultUtils.success("上报成功");
    }

    @GetMapping("/list")
    public ResultVo list(String openid, String scene, Integer size) {
        RecoListResponseDto data = recoRecommendService.getRecoList(openid, scene, size);
        return ResultUtils.success("查询成功", data);
    }
}
