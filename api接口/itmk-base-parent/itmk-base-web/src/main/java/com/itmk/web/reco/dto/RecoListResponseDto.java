package com.itmk.web.reco.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class RecoListResponseDto {
    private String scene;
    private String weightSource;
    private List<RecoListItemDto> items = new ArrayList<>();
}
