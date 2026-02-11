package com.itmk.web.reco.dto;

import lombok.Data;

@Data
public class RecoTrainTriggerResultDto {
    private Long jobId;
    private String status;
    private Integer exitCode;
    private String output;
}
