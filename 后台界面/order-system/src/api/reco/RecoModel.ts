export interface RecoEngineConfigModel {
  configId?: number
  scene: string
  enabled: string
  cfWeight: number
  ctrWeight: number
  cvrWeight: number
}

export interface RecoRuleModel {
  ruleId?: number
  ruleName: string
  scene: string
  enabled: string
  priority: number
  minUsageDays?: number | null
  minOrderCount30d?: number | null
  minConsumeAmount30d?: number | null
  highValueOnly: string
  cfWeight: number
  ctrWeight: number
  cvrWeight: number
  remark?: string
}

export interface RecoTrainConfigModel {
  id?: number
  scene: string
  enabled: string
  trainFrequency: string
  attrWeight: number
  consumeWeight: number
  ratingWeight: number
  dishWeight: number
  cronExpr?: string
  nextRunTime?: string | null
  remark?: string
}

export interface RecoTrainTriggerResultModel {
  jobId?: number
  status?: string
  exitCode?: number
  output?: string
}

export interface RecoJobStatusModel {
  jobId: number
  status: string
  message?: string
  updateTime?: string
  startTime?: string
  endTime?: string
  sampleSize?: number
  modelVersion?: string
}
