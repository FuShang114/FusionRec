package com.itmk.web.reco.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.itmk.utils.ResultUtils;
import com.itmk.utils.ResultVo;
import com.itmk.web.reco.entity.RecoEngineConfig;
import com.itmk.web.reco.entity.RecoJob;
import com.itmk.web.reco.entity.RecoRule;
import com.itmk.web.reco.entity.RecoTrainConfig;
import com.itmk.web.reco.service.RecoEngineConfigService;
import com.itmk.web.reco.service.RecoJobService;
import com.itmk.web.reco.service.RecoRuleService;
import com.itmk.web.reco.service.RecoTrainConfigService;
import com.itmk.web.reco.dto.RecoTrainTriggerResultDto;
import com.itmk.web.reco.service.RecoTrainTriggerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reco")
public class RecoAdminController {
    @Autowired
    private RecoEngineConfigService recoEngineConfigService;
    @Autowired
    private RecoRuleService recoRuleService;
    @Autowired
    private RecoJobService recoJobService;
    @Autowired
    private RecoTrainConfigService recoTrainConfigService;
    @Autowired
    private RecoTrainTriggerService recoTrainTriggerService;

    @GetMapping("/engine/config")
    public ResultVo getConfig(String scene) {
        String finalScene = (scene == null || scene.trim().isEmpty()) ? "home_hot" : scene;
        RecoEngineConfig config = recoEngineConfigService.getOrInitByScene(finalScene);
        return ResultUtils.success("查询成功", config);
    }

    @PutMapping("/engine/config")
    public ResultVo saveConfig(@RequestBody RecoEngineConfig config) {
        if (config.getScene() == null || config.getScene().trim().isEmpty()) {
            return ResultUtils.error("scene不能为空");
        }
        String msg = recoEngineConfigService.validateWeights(config);
        if (msg != null) {
            return ResultUtils.error(msg);
        }
        QueryWrapper<RecoEngineConfig> query = new QueryWrapper<>();
        query.lambda().eq(RecoEngineConfig::getScene, config.getScene());
        RecoEngineConfig old = recoEngineConfigService.getOne(query);
        Date now = new Date();
        if (old == null) {
            config.setCreateTime(now);
            config.setUpdateTime(now);
            if (config.getEnabled() == null) {
                config.setEnabled("1");
            }
            recoEngineConfigService.save(config);
            return ResultUtils.success("保存成功");
        }
        old.setEnabled(config.getEnabled() == null ? old.getEnabled() : config.getEnabled());
        old.setCfWeight(config.getCfWeight());
        old.setCtrWeight(config.getCtrWeight());
        old.setCvrWeight(config.getCvrWeight());
        old.setUpdateTime(now);
        recoEngineConfigService.updateById(old);
        return ResultUtils.success("保存成功");
    }

    @GetMapping("/rule/list")
    public ResultVo listRule(String scene) {
        QueryWrapper<RecoRule> query = new QueryWrapper<>();
        if (scene != null && !scene.trim().isEmpty()) {
            query.lambda().eq(RecoRule::getScene, scene);
        }
        query.lambda().orderByDesc(RecoRule::getPriority).orderByDesc(RecoRule::getRuleId);
        List<RecoRule> list = recoRuleService.list(query);
        return ResultUtils.success("查询成功", list);
    }

    @PostMapping("/rule")
    public ResultVo addRule(@RequestBody RecoRule rule) {
        String msg = recoRuleService.validateRule(rule);
        if (msg != null) {
            return ResultUtils.error(msg);
        }
        Date now = new Date();
        rule.setCreateTime(now);
        rule.setUpdateTime(now);
        if (rule.getEnabled() == null) {
            rule.setEnabled("1");
        }
        if (rule.getPriority() == null) {
            rule.setPriority(0);
        }
        recoRuleService.save(rule);
        return ResultUtils.success("新增成功");
    }

    @PutMapping("/rule")
    public ResultVo editRule(@RequestBody RecoRule rule) {
        if (rule.getRuleId() == null) {
            return ResultUtils.error("ruleId不能为空");
        }
        String msg = recoRuleService.validateRule(rule);
        if (msg != null) {
            return ResultUtils.error(msg);
        }
        rule.setUpdateTime(new Date());
        recoRuleService.updateById(rule);
        return ResultUtils.success("编辑成功");
    }

    @DeleteMapping("/rule/{ruleId}")
    public ResultVo deleteRule(@PathVariable("ruleId") Long ruleId) {
        recoRuleService.removeById(ruleId);
        return ResultUtils.success("删除成功");
    }

    @PostMapping("/rule/validate")
    public ResultVo validateRule(@RequestBody RecoRule rule) {
        String msg = recoRuleService.validateRule(rule);
        if (msg != null) {
            return ResultUtils.error(msg);
        }
        return ResultUtils.success("校验通过");
    }

    @GetMapping("/job/list")
    public ResultVo jobList(Long currentPage, Long pageSize) {
        long pageNum = currentPage == null || currentPage <= 0 ? 1 : currentPage;
        long size = pageSize == null || pageSize <= 0 ? 10 : pageSize;
        IPage<RecoJob> page = new Page<>(pageNum, size);
        QueryWrapper<RecoJob> query = new QueryWrapper<>();
        query.lambda().orderByDesc(RecoJob::getCreateTime);
        IPage<RecoJob> list = recoJobService.page(page, query);
        return ResultUtils.success("查询成功", list);
    }

    @GetMapping("/train/config")
    public ResultVo getTrainConfig(String scene) {
        String finalScene = (scene == null || scene.trim().isEmpty()) ? "home_hot" : scene;
        RecoTrainConfig config = recoTrainConfigService.getOrInitByScene(finalScene);
        return ResultUtils.success("查询成功", config);
    }

    @PutMapping("/train/config")
    public ResultVo saveTrainConfig(@RequestBody RecoTrainConfig config) {
        if (config.getScene() == null || config.getScene().trim().isEmpty()) {
            return ResultUtils.error("scene不能为空");
        }
        QueryWrapper<RecoTrainConfig> query = new QueryWrapper<>();
        query.lambda().eq(RecoTrainConfig::getScene, config.getScene());
        RecoTrainConfig old = recoTrainConfigService.getOne(query);
        Date now = new Date();
        if (old == null) {
            config.setCreateTime(now);
            config.setUpdateTime(now);
            if (config.getEnabled() == null) {
                config.setEnabled("1");
            }
            recoTrainConfigService.save(config);
            return ResultUtils.success("保存成功");
        }
        old.setEnabled(config.getEnabled() == null ? old.getEnabled() : config.getEnabled());
        old.setTrainFrequency(config.getTrainFrequency());
        old.setAttrWeight(config.getAttrWeight());
        old.setConsumeWeight(config.getConsumeWeight());
        old.setRatingWeight(config.getRatingWeight());
        old.setDishWeight(config.getDishWeight());
        old.setCronExpr(config.getCronExpr());
        old.setNextRunTime(config.getNextRunTime());
        old.setRemark(config.getRemark());
        old.setUpdateTime(now);
        recoTrainConfigService.updateById(old);
        return ResultUtils.success("保存成功");
    }

    @PostMapping("/train/trigger")
    public ResultVo triggerTrain(@RequestBody Map<String, String> body) {
        String scene = body == null ? null : body.get("scene");
        RecoTrainTriggerResultDto result = recoTrainTriggerService.trigger(scene);
        return ResultUtils.success("训练任务已提交", result);
    }

    @GetMapping("/train/job/status")
    public ResultVo trainJobStatus(Long jobId) {
        if (jobId == null) {
            return ResultUtils.error("jobId不能为空");
        }
        RecoJob job = recoJobService.getById(jobId);
        if (job == null) {
            return ResultUtils.error("任务不存在");
        }
        return ResultUtils.success("查询成功", job);
    }
}
