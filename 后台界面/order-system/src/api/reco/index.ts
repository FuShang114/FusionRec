import http from "@/http";
import {
  RecoEngineConfigModel,
  RecoJobStatusModel,
  RecoRuleModel,
  RecoTrainConfigModel,
  RecoTrainTriggerResultModel,
} from "./RecoModel";

export const getEngineConfigApi = (scene: string) => {
  return http.get("/api/reco/engine/config", { scene });
};

export const saveEngineConfigApi = (parm: RecoEngineConfigModel) => {
  return http.put("/api/reco/engine/config", parm);
};

export const getRuleListApi = (scene: string) => {
  return http.get("/api/reco/rule/list", { scene });
};

export const addRuleApi = (parm: RecoRuleModel) => {
  return http.post("/api/reco/rule", parm);
};

export const editRuleApi = (parm: RecoRuleModel) => {
  return http.put("/api/reco/rule", parm);
};

export const deleteRuleApi = (ruleId: number) => {
  return http.delete(`/api/reco/rule/${ruleId}`);
};

export const validateRuleApi = (parm: RecoRuleModel) => {
  return http.post("/api/reco/rule/validate", parm);
};

export const getRecoPreviewApi = (openid: string, scene: string, size: number) => {
  return http.get("/wxapi/reco/list", { openid, scene, size });
};

export const getJobListApi = (currentPage: number, pageSize: number) => {
  return http.get("/api/reco/job/list", { currentPage, pageSize });
};

export const getTrainConfigApi = (scene: string) => {
  return http.get("/api/reco/train/config", { scene });
};

export const saveTrainConfigApi = (parm: RecoTrainConfigModel) => {
  return http.put("/api/reco/train/config", parm);
};

export const triggerTrainApi = (scene: string) => {
  return http.post<{ code: number; msg: string; data: RecoTrainTriggerResultModel }>("/api/reco/train/trigger", { scene });
};

export const getTrainJobStatusApi = (jobId: number) => {
  return http.get<{ code: number; msg: string; data: RecoJobStatusModel }>("/api/reco/train/job/status", { jobId });
};
