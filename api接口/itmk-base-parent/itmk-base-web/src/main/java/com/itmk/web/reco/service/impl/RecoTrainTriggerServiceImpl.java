package com.itmk.web.reco.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.itmk.web.reco.dto.RecoTrainTriggerResultDto;
import com.itmk.web.reco.entity.RecoJob;
import com.itmk.web.reco.service.RecoJobService;
import com.itmk.web.reco.service.RecoTrainTriggerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class RecoTrainTriggerServiceImpl implements RecoTrainTriggerService {
    private static final int MAX_MESSAGE_LEN = 250;

    @Autowired
    private RecoJobService recoJobService;

    @Override
    public RecoTrainTriggerResultDto trigger(String scene) {
        RecoTrainTriggerResultDto dto = new RecoTrainTriggerResultDto();
        String finalScene = (scene == null || scene.trim().isEmpty()) ? "home_hot" : scene;

        QueryWrapper<RecoJob> runningQuery = new QueryWrapper<>();
        runningQuery.lambda()
                .eq(RecoJob::getJobType, "score")
                .eq(RecoJob::getAlgoType, "BLEND")
                .in(RecoJob::getStatus, "PENDING", "RUNNING")
                .orderByDesc(RecoJob::getCreateTime)
                .last("limit 1");
        RecoJob running = recoJobService.getOne(runningQuery);
        if (running != null) {
            dto.setJobId(running.getJobId());
            dto.setStatus(running.getStatus());
            dto.setExitCode(0);
            dto.setOutput("已有训练任务进行中，请等待完成");
            return dto;
        }

        Date now = new Date();
        RecoJob job = new RecoJob();
        job.setJobType("score");
        job.setAlgoType("BLEND");
        job.setStatus("PENDING");
        job.setMessage("queued scene=" + finalScene);
        job.setCreateTime(now);
        job.setUpdateTime(now);
        recoJobService.save(job);

        dto.setJobId(job.getJobId());
        dto.setStatus("PENDING");
        dto.setExitCode(0);
        dto.setOutput("训练任务已提交");

        Thread worker = new Thread(() -> runOfflineJob(job.getJobId(), finalScene), "reco-train-" + job.getJobId());
        worker.setDaemon(true);
        worker.start();
        return dto;
    }

    private void runOfflineJob(Long jobId, String scene) {
        RecoJob job = recoJobService.getById(jobId);
        if (job == null) {
            return;
        }
        Date start = new Date();
        job.setStatus("RUNNING");
        job.setStartTime(start);
        job.setMessage("running scene=" + scene);
        job.setUpdateTime(start);
        recoJobService.updateById(job);

        String pythonRoot = System.getenv("RECO_PYTHON_ROOT");
        if (pythonRoot == null || pythonRoot.trim().isEmpty()) {
            pythonRoot = "D:/源码/recommend-engine-python";
        }

        ProcessBuilder pb = new ProcessBuilder("cmd", "/c", "py pipelines/run_offline.py");
        pb.directory(new java.io.File(pythonRoot));
        pb.redirectErrorStream(true);
        Map<String, String> env = pb.environment();
        env.put("RECO_SCENE", scene);
        env.put("RECO_JOB_ID", String.valueOf(jobId));

        StringBuilder out = new StringBuilder();
        int exitCode = -1;
        try {
            Process p = pb.start();
            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(p.getInputStream(), StandardCharsets.UTF_8))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    out.append(line).append('\n');
                }
            }
            exitCode = p.waitFor();
        } catch (Exception ex) {
            out.append(ex.getMessage() == null ? "trigger failed" : ex.getMessage());
        }

        RecoJob done = recoJobService.getById(jobId);
        if (done == null) {
            return;
        }
        Date end = new Date();
        done.setEndTime(end);
        done.setUpdateTime(end);
        done.setStatus(exitCode == 0 ? "SUCCESS" : "FAILED");

        String output = out.toString();
        done.setMessage(truncate(output));
        String version = extractByRegex(output, "version=([0-9]{8,})");
        if (version != null) {
            done.setModelVersion(version);
        }
        String blendRows = extractByRegex(output, "blend_rows=([0-9]+)");
        if (blendRows != null) {
            try {
                done.setSampleSize(Long.parseLong(blendRows));
            } catch (Exception ignore) {
            }
        }
        recoJobService.updateById(done);
    }

    private String truncate(String text) {
        if (text == null) {
            return null;
        }
        String flat = text.replace('\r', ' ').replace('\n', ' ').trim();
        if (flat.length() <= MAX_MESSAGE_LEN) {
            return flat;
        }
        return flat.substring(0, MAX_MESSAGE_LEN);
    }

    private String extractByRegex(String text, String regex) {
        if (text == null) {
            return null;
        }
        Matcher m = Pattern.compile(regex).matcher(text);
        if (m.find()) {
            return m.group(1);
        }
        return null;
    }
}
