package com.itmk.web.reco.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class RecoEventBatchDto {
    private List<RecoEventItemDto> events = new ArrayList<>();
}
