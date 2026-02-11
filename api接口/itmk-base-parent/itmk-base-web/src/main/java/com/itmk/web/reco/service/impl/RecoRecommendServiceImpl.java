package com.itmk.web.reco.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.itmk.web.goods.entity.SysGoods;
import com.itmk.web.goods.service.SysGoodsService;
import com.itmk.web.goods_specs.entity.SysGoodsSpecs;
import com.itmk.web.goods_specs.service.SysGoodsSpecsService;
import com.itmk.web.reco.dto.RecoListItemDto;
import com.itmk.web.reco.dto.RecoListResponseDto;
import com.itmk.web.reco.dto.RecoOnlineScoreDto;
import com.itmk.web.reco.dto.RecoWeightDecisionDto;
import com.itmk.web.reco.entity.RecoBlendResult;
import com.itmk.web.reco.entity.RecoEngineConfig;
import com.itmk.web.reco.entity.RecoResult;
import com.itmk.web.reco.entity.RecoUserProfileDaily;
import com.itmk.web.reco.mapper.RecoBlendResultMapper;
import com.itmk.web.reco.mapper.RecoResultMapper;
import com.itmk.web.reco.service.*;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class RecoRecommendServiceImpl implements RecoRecommendService {
    @Autowired
    private RecoEngineConfigService recoEngineConfigService;
    @Autowired
    private RecoRuleService recoRuleService;
    @Autowired
    private RecoUserProfileDailyService recoUserProfileDailyService;
    @Autowired
    private RecoRuleHitLogService recoRuleHitLogService;
    @Autowired
    private RecoBlendResultMapper recoBlendResultMapper;
    @Autowired
    private RecoResultMapper recoResultMapper;
    @Autowired
    private SysGoodsService sysGoodsService;
    @Autowired
    private SysGoodsSpecsService sysGoodsSpecsService;
    @Autowired
    private RecoOnlineInferService recoOnlineInferService;

    @Override
    public RecoListResponseDto getRecoList(String openid, String scene, Integer size) {
        int finalSize = size == null || size <= 0 ? 10 : size;
        String finalScene = (scene == null || scene.trim().isEmpty()) ? "home_hot" : scene;
        RecoListResponseDto response = new RecoListResponseDto();
        response.setScene(finalScene);

        RecoWeightDecisionDto decision = buildWeightDecision(openid, finalScene);
        response.setWeightSource(decision.getSource());
        if (openid != null && !openid.trim().isEmpty()) {
            recoRuleHitLogService.logHit(openid, finalScene, decision);
        }

        List<RecoListItemDto> items = queryOnlineResult(openid, finalScene, finalSize, decision);
        if (items.isEmpty()) {
            items = queryDynamicBlendFromAlgo(openid, finalScene, finalSize, decision);
        }
        if (items.isEmpty()) {
            items = queryBlendResult(openid, finalScene, finalSize);
        }
        if (items.isEmpty()) {
            items = queryHotFallback(finalSize);
        }
        response.setItems(items);
        return response;
    }

    private List<RecoListItemDto> queryDynamicBlendFromAlgo(String openid, String scene, int size, RecoWeightDecisionDto decision) {
        if (openid == null || openid.trim().isEmpty()) {
            return new ArrayList<>();
        }
        Map<Long, BigDecimal> cf = getLatestAlgoScoreMap(openid, scene, "CF");
        Map<Long, BigDecimal> ctr = getLatestAlgoScoreMap(openid, scene, "CTR");
        Map<Long, BigDecimal> cvr = getLatestAlgoScoreMap(openid, scene, "CVR");
        Set<Long> goodsSet = new HashSet<>();
        goodsSet.addAll(cf.keySet());
        goodsSet.addAll(ctr.keySet());
        goodsSet.addAll(cvr.keySet());
        if (goodsSet.isEmpty()) {
            return new ArrayList<>();
        }
        List<RecoOnlineScoreDto> scoreList = new ArrayList<>();
        for (Long gid : goodsSet) {
            RecoOnlineScoreDto dto = new RecoOnlineScoreDto();
            dto.setGoodsId(gid);
            BigDecimal cfScore = cf.getOrDefault(gid, BigDecimal.ZERO);
            BigDecimal ctrScore = ctr.getOrDefault(gid, BigDecimal.ZERO);
            BigDecimal cvrScore = cvr.getOrDefault(gid, BigDecimal.ZERO);
            dto.setCfScore(cfScore);
            dto.setCtrScore(ctrScore);
            dto.setCvrScore(cvrScore);
            BigDecimal blend = cfScore.multiply(decision.getCfWeight())
                    .add(ctrScore.multiply(decision.getCtrWeight()))
                    .add(cvrScore.multiply(decision.getCvrWeight()));
            dto.setBlendScore(blend);
            scoreList.add(dto);
        }
        scoreList.sort(Comparator.comparing(RecoOnlineScoreDto::getBlendScore, Comparator.nullsLast(BigDecimal::compareTo)).reversed());
        List<RecoListItemDto> items = new ArrayList<>();
        int rank = 1;
        for (RecoOnlineScoreDto score : scoreList) {
            if (rank > size) {
                break;
            }
            SysGoods goods = sysGoodsService.getById(score.getGoodsId());
            if (goods == null || !"1".equals(goods.getStatus())) {
                continue;
            }
            RecoListItemDto dto = new RecoListItemDto();
            BeanUtils.copyProperties(goods, dto);
            dto.setRankNo(rank++);
            dto.setScore(score.getBlendScore() == null ? BigDecimal.ZERO : score.getBlendScore());
            QueryWrapper<SysGoodsSpecs> specsQ = new QueryWrapper<>();
            specsQ.lambda().eq(SysGoodsSpecs::getGoodsId, goods.getGoodsId()).orderByAsc(SysGoodsSpecs::getOrderNum);
            dto.setSpecs(sysGoodsSpecsService.list(specsQ));
            items.add(dto);
        }
        return items;
    }

    private Map<Long, BigDecimal> getLatestAlgoScoreMap(String openid, String scene, String algoType) {
        QueryWrapper<RecoResult> maxDtQ = new QueryWrapper<>();
        maxDtQ.lambda()
                .eq(RecoResult::getOpenid, openid)
                .eq(RecoResult::getBizScene, scene)
                .eq(RecoResult::getAlgoType, algoType);
        maxDtQ.select("max(dt) as dt");
        RecoResult max = recoResultMapper.selectOne(maxDtQ);
        if (max == null || max.getDt() == null) {
            return new HashMap<>();
        }
        QueryWrapper<RecoResult> q = new QueryWrapper<>();
        q.lambda()
                .eq(RecoResult::getOpenid, openid)
                .eq(RecoResult::getBizScene, scene)
                .eq(RecoResult::getAlgoType, algoType)
                .eq(RecoResult::getDt, max.getDt());
        List<RecoResult> rows = recoResultMapper.selectList(q);
        Map<Long, BigDecimal> out = new HashMap<>();
        for (RecoResult row : rows) {
            out.put(row.getGoodsId(), row.getScore() == null ? BigDecimal.ZERO : row.getScore());
        }
        return out;
    }

    private RecoWeightDecisionDto buildWeightDecision(String openid, String scene) {
        RecoUserProfileDaily profile = null;
        if (openid != null && !openid.trim().isEmpty()) {
            profile = recoUserProfileDailyService.getLatestByOpenid(openid);
        }
        RecoWeightDecisionDto byRule = recoRuleService.matchRule(profile, scene);
        if (byRule != null) {
            return byRule;
        }
        RecoEngineConfig config = recoEngineConfigService.getOrInitByScene(scene);
        RecoWeightDecisionDto dto = new RecoWeightDecisionDto();
        dto.setSource("DEFAULT");
        dto.setRuleId(null);
        dto.setCfWeight(config.getCfWeight());
        dto.setCtrWeight(config.getCtrWeight());
        dto.setCvrWeight(config.getCvrWeight());
        return dto;
    }

    private List<RecoListItemDto> queryBlendResult(String openid, String scene, int size) {
        if (openid == null || openid.trim().isEmpty()) {
            return new ArrayList<>();
        }
        QueryWrapper<RecoBlendResult> maxDtQ = new QueryWrapper<>();
        maxDtQ.lambda().eq(RecoBlendResult::getOpenid, openid).eq(RecoBlendResult::getBizScene, scene);
        maxDtQ.select("max(dt) as dt");
        RecoBlendResult max = recoBlendResultMapper.selectOne(maxDtQ);
        if (max == null || max.getDt() == null) {
            return new ArrayList<>();
        }
        QueryWrapper<RecoBlendResult> query = new QueryWrapper<>();
        query.lambda()
                .eq(RecoBlendResult::getOpenid, openid)
                .eq(RecoBlendResult::getBizScene, scene)
                .eq(RecoBlendResult::getDt, max.getDt())
                .orderByAsc(RecoBlendResult::getRankNo);
        query.last("limit " + size);
        List<RecoBlendResult> rows = recoBlendResultMapper.selectList(query);
        return toListItems(rows);
    }

    private List<RecoListItemDto> queryOnlineResult(String openid, String scene, int size, RecoWeightDecisionDto decision) {
        if (openid == null || openid.trim().isEmpty()) {
            return new ArrayList<>();
        }
        QueryWrapper<SysGoods> q = new QueryWrapper<>();
        q.lambda().eq(SysGoods::getStatus, "1");
        List<SysGoods> goodsList = sysGoodsService.list(q);
        if (goodsList == null || goodsList.isEmpty()) {
            return new ArrayList<>();
        }
        List<Long> goodsIds = new ArrayList<>();
        for (SysGoods g : goodsList) {
            goodsIds.add(g.getGoodsId());
        }
        List<RecoOnlineScoreDto> scoreList = recoOnlineInferService.infer(
                openid,
                scene,
                goodsIds,
                decision.getCfWeight(),
                decision.getCtrWeight(),
                decision.getCvrWeight()
        );
        if (scoreList == null || scoreList.isEmpty()) {
            return new ArrayList<>();
        }
        scoreList.sort(Comparator.comparing(RecoOnlineScoreDto::getBlendScore, Comparator.nullsLast(BigDecimal::compareTo)).reversed());
        List<RecoListItemDto> items = new ArrayList<>();
        int rank = 1;
        for (RecoOnlineScoreDto score : scoreList) {
            if (rank > size) {
                break;
            }
            SysGoods goods = sysGoodsService.getById(score.getGoodsId());
            if (goods == null || !"1".equals(goods.getStatus())) {
                continue;
            }
            RecoListItemDto dto = new RecoListItemDto();
            BeanUtils.copyProperties(goods, dto);
            dto.setRankNo(rank++);
            dto.setScore(score.getBlendScore() == null ? BigDecimal.ZERO : score.getBlendScore());
            QueryWrapper<SysGoodsSpecs> specsQ = new QueryWrapper<>();
            specsQ.lambda().eq(SysGoodsSpecs::getGoodsId, goods.getGoodsId()).orderByAsc(SysGoodsSpecs::getOrderNum);
            dto.setSpecs(sysGoodsSpecsService.list(specsQ));
            items.add(dto);
        }
        return items;
    }

    private List<RecoListItemDto> queryHotFallback(int size) {
        QueryWrapper<SysGoods> query = new QueryWrapper<>();
        query.lambda().eq(SysGoods::getStatus, "1").orderByAsc(SysGoods::getOrderNum);
        query.last("limit " + size);
        List<SysGoods> goods = sysGoodsService.list(query);
        List<RecoListItemDto> list = new ArrayList<>();
        int rank = 1;
        for (SysGoods item : goods) {
            RecoListItemDto dto = new RecoListItemDto();
            BeanUtils.copyProperties(item, dto);
            dto.setScore(BigDecimal.ZERO);
            dto.setRankNo(rank++);
            QueryWrapper<SysGoodsSpecs> specsQ = new QueryWrapper<>();
            specsQ.lambda().eq(SysGoodsSpecs::getGoodsId, item.getGoodsId()).orderByAsc(SysGoodsSpecs::getOrderNum);
            dto.setSpecs(sysGoodsSpecsService.list(specsQ));
            list.add(dto);
        }
        return list;
    }

    private List<RecoListItemDto> toListItems(List<RecoBlendResult> rows) {
        List<RecoListItemDto> list = new ArrayList<>();
        for (RecoBlendResult row : rows) {
            SysGoods goods = sysGoodsService.getById(row.getGoodsId());
            if (goods == null || !"1".equals(goods.getStatus())) {
                continue;
            }
            RecoListItemDto dto = new RecoListItemDto();
            BeanUtils.copyProperties(goods, dto);
            dto.setScore(row.getScore());
            dto.setRankNo(row.getRankNo());
            QueryWrapper<SysGoodsSpecs> specsQ = new QueryWrapper<>();
            specsQ.lambda().eq(SysGoodsSpecs::getGoodsId, row.getGoodsId()).orderByAsc(SysGoodsSpecs::getOrderNum);
            dto.setSpecs(sysGoodsSpecsService.list(specsQ));
            list.add(dto);
        }
        return list;
    }
}
