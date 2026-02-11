<template>
  <el-main>
    <el-row :gutter="16">
      <el-col :span="12">
        <el-card>
          <template #header>
            <span>默认推荐权重配置</span>
          </template>
          <el-form :model="engineForm" label-width="110px">
            <el-form-item label="场景">
              <el-input v-model="engineForm.scene" disabled />
            </el-form-item>
            <el-form-item label="启用状态">
              <el-switch
                v-model="engineForm.enabled"
                active-value="1"
                inactive-value="0"
                active-text="启用"
                inactive-text="停用"
              />
            </el-form-item>
            <el-form-item label="CF权重">
              <el-input-number v-model="engineForm.cfWeight" :step="0.1" :min="0" :max="1" />
            </el-form-item>
            <el-form-item label="CTR权重">
              <el-input-number v-model="engineForm.ctrWeight" :step="0.1" :min="0" :max="1" />
            </el-form-item>
            <el-form-item label="CVR权重">
              <el-input-number v-model="engineForm.cvrWeight" :step="0.1" :min="0" :max="1" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveEngineConfig">保存默认权重</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>
            <span>推荐效果预览</span>
          </template>
          <el-form :inline="true" :model="previewForm">
            <el-form-item label="openid">
              <el-input v-model="previewForm.openid" style="width: 280px" />
            </el-form-item>
            <el-form-item label="数量">
              <el-input-number v-model="previewForm.size" :min="1" :max="20" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="loadPreview">预览</el-button>
            </el-form-item>
          </el-form>
          <el-table :data="previewList" border stripe height="280">
            <el-table-column prop="goodsId" label="商品ID" width="90" />
            <el-table-column prop="goodsName" label="商品名称" />
            <el-table-column prop="score" label="分数" width="120" />
            <el-table-column prop="rankNo" label="排序" width="80" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <el-card style="margin-top: 16px">
      <template #header>
        <span>模型训练配置</span>
      </template>
      <el-form :model="trainForm" label-width="120px" :inline="true">
        <el-form-item label="启用训练">
          <el-switch
            v-model="trainForm.enabled"
            active-value="1"
            inactive-value="0"
            active-text="启用"
            inactive-text="停用"
          />
        </el-form-item>
        <el-form-item label="训练频率">
          <el-select v-model="trainForm.trainFrequency" style="width: 160px">
            <el-option label="每小时" value="HOURLY" />
            <el-option label="每天" value="DAILY" />
            <el-option label="每周" value="WEEKLY" />
            <el-option label="Cron表达式" value="CRON" />
          </el-select>
        </el-form-item>
        <el-form-item label="属性权重w1">
          <el-input-number v-model="trainForm.attrWeight" :step="0.1" :min="0" :max="1" />
        </el-form-item>
        <el-form-item label="消费权重w2">
          <el-input-number v-model="trainForm.consumeWeight" :step="0.1" :min="0" :max="1" />
        </el-form-item>
        <el-form-item label="评分权重w3">
          <el-input-number v-model="trainForm.ratingWeight" :step="0.1" :min="0" :max="1" />
        </el-form-item>
        <el-form-item label="菜品权重w4">
          <el-input-number v-model="trainForm.dishWeight" :step="0.1" :min="0" :max="1" />
        </el-form-item>
        <el-form-item label="Cron表达式">
          <el-input v-model="trainForm.cronExpr" style="width: 260px" placeholder="例如: 0 0 2 * * ?" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="trainForm.remark" style="width: 260px" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveTrainConfig">保存训练配置</el-button>
          <el-button type="warning" :loading="isPolling" :disabled="isPolling" @click="triggerTrain">手动触发训练</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin-top: 16px">
      <template #header>
        <span>训练任务状态列表（最新覆盖旧状态）</span>
      </template>
      <el-table :data="trainJobList" border stripe height="260">
        <el-table-column prop="jobId" label="任务ID" width="90" />
        <el-table-column prop="status" label="状态" width="110">
          <template #default="scope">
            <el-tag :type="scope.row.status === 'SUCCESS' ? 'success' : scope.row.status === 'FAILED' ? 'danger' : scope.row.status === 'RUNNING' ? 'warning' : 'info'">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="modelVersion" label="模型版本" width="140" />
        <el-table-column prop="sampleSize" label="样本量" width="90" />
        <el-table-column prop="createTime" label="创建时间" width="170" />
        <el-table-column prop="updateTime" label="更新时间" width="170" />
        <el-table-column prop="message" label="状态信息" />
      </el-table>
    </el-card>

    <el-card style="margin-top: 16px">
      <template #header>
        <div class="header-row">
          <span>规则分流配置</span>
          <el-button type="primary" @click="openAdd">新增规则</el-button>
        </div>
      </template>
      <el-table :data="ruleList" border stripe>
        <el-table-column prop="ruleName" label="规则名称" />
        <el-table-column prop="priority" label="优先级" width="90" />
        <el-table-column prop="minUsageDays" label="最小使用天数" width="120" />
        <el-table-column prop="minOrderCount30d" label="30天下单次数" width="120" />
        <el-table-column prop="minConsumeAmount30d" label="30天消费额" width="120" />
        <el-table-column prop="highValueOnly" label="高价值用户" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.highValueOnly === '1' ? 'danger' : 'info'">
              {{ scope.row.highValueOnly === "1" ? "是" : "否" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="权重(CF/CTR/CVR)" width="180">
          <template #default="scope">
            {{ scope.row.cfWeight }}/{{ scope.row.ctrWeight }}/{{ scope.row.cvrWeight }}
          </template>
        </el-table-column>
        <el-table-column prop="enabled" label="状态" width="90">
          <template #default="scope">
            <el-tag :type="scope.row.enabled === '1' ? 'success' : 'info'">
              {{ scope.row.enabled === "1" ? "启用" : "停用" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button type="primary" size="small" @click="openEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="deleteRule(scope.row.ruleId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </el-main>

  <el-dialog v-model="dialogVisible" :title="dialogTitle" width="560px">
    <el-form :model="ruleForm" label-width="120px">
      <el-form-item label="规则名称">
        <el-input v-model="ruleForm.ruleName" />
      </el-form-item>
      <el-form-item label="优先级">
        <el-input-number v-model="ruleForm.priority" :min="0" :max="999" />
      </el-form-item>
      <el-form-item label="最小使用天数">
        <el-input-number v-model="ruleForm.minUsageDays" :min="0" :max="9999" />
      </el-form-item>
      <el-form-item label="30天下单次数">
        <el-input-number v-model="ruleForm.minOrderCount30d" :min="0" :max="9999" />
      </el-form-item>
      <el-form-item label="30天消费额">
        <el-input-number v-model="ruleForm.minConsumeAmount30d" :min="0" :max="999999" />
      </el-form-item>
      <el-form-item label="高价值用户">
        <el-switch
          v-model="ruleForm.highValueOnly"
          active-value="1"
          inactive-value="0"
          active-text="是"
          inactive-text="否"
        />
      </el-form-item>
      <el-form-item label="启用状态">
        <el-switch
          v-model="ruleForm.enabled"
          active-value="1"
          inactive-value="0"
          active-text="启用"
          inactive-text="停用"
        />
      </el-form-item>
      <el-form-item label="CF权重">
        <el-input-number v-model="ruleForm.cfWeight" :step="0.1" :min="0" :max="1" />
      </el-form-item>
      <el-form-item label="CTR权重">
        <el-input-number v-model="ruleForm.ctrWeight" :step="0.1" :min="0" :max="1" />
      </el-form-item>
      <el-form-item label="CVR权重">
        <el-input-number v-model="ruleForm.cvrWeight" :step="0.1" :min="0" :max="1" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="ruleForm.remark" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="saveRule">保存</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  addRuleApi,
  deleteRuleApi,
  editRuleApi,
  getEngineConfigApi,
  getRecoPreviewApi,
  getRuleListApi,
  getJobListApi,
  getTrainJobStatusApi,
  getTrainConfigApi,
  saveEngineConfigApi,
  saveTrainConfigApi,
  triggerTrainApi,
  validateRuleApi,
} from "@/api/reco";
import { RecoEngineConfigModel, RecoRuleModel, RecoTrainConfigModel } from "@/api/reco/RecoModel";

const scene = "home_hot";
const engineForm = reactive<RecoEngineConfigModel>({
  scene,
  enabled: "1",
  cfWeight: 0.33,
  ctrWeight: 0.33,
  cvrWeight: 0.34,
});
const previewForm = reactive({
  openid: "ok-u55Yewi_iD6ghDCVkzD0A-hwo",
  size: 5,
});
const previewList = ref<any[]>([]);
const ruleList = ref<RecoRuleModel[]>([]);
const trainJobList = ref<any[]>([]);
const trainJobId = ref<number>();
const trainStatus = ref("IDLE");
const trainMessage = ref("");
const isPolling = ref(false);
const pollingTimer = ref<number>();
const pollingStartMs = ref(0);
const trainForm = reactive<RecoTrainConfigModel>({
  scene,
  enabled: "1",
  trainFrequency: "DAILY",
  attrWeight: 0.2,
  consumeWeight: 0.3,
  ratingWeight: 0.3,
  dishWeight: 0.2,
  cronExpr: "0 0 2 * * ?",
  nextRunTime: null,
  remark: "",
});
const dialogVisible = ref(false);
const dialogTitle = ref("新增规则");
const isEdit = ref(false);
const ruleForm = reactive<RecoRuleModel>({
  ruleName: "",
  scene,
  enabled: "1",
  priority: 0,
  minUsageDays: null,
  minOrderCount30d: null,
  minConsumeAmount30d: null,
  highValueOnly: "0",
  cfWeight: 0.2,
  ctrWeight: 0.4,
  cvrWeight: 0.4,
  remark: "",
});

const loadEngineConfig = async () => {
  const res = await getEngineConfigApi(scene);
  if (res && res.code === 200) {
    Object.assign(engineForm, res.data);
  }
};

const saveEngineConfig = async () => {
  const res = await saveEngineConfigApi(engineForm);
  if (res && res.code === 200) {
    ElMessage.success(res.msg);
  }
};

const loadRules = async () => {
  const res = await getRuleListApi(scene);
  if (res && res.code === 200) {
    ruleList.value = res.data || [];
  }
};

const loadPreview = async () => {
  const res = await getRecoPreviewApi(previewForm.openid, scene, previewForm.size);
  if (res && res.code === 200) {
    previewList.value = res.data?.items || [];
  }
};

const loadTrainConfig = async () => {
  const res = await getTrainConfigApi(scene);
  if (res && res.code === 200) {
    Object.assign(trainForm, res.data);
  }
};

const loadTrainJobList = async () => {
  const res = await getJobListApi(1, 20);
  if (!res || res.code !== 200) {
    return;
  }
  trainJobList.value = res.data?.records || [];
  // 最新任务覆盖页面头部状态展示
  if (!isPolling.value && trainJobList.value.length > 0) {
    const latest = trainJobList.value[0];
    trainJobId.value = latest.jobId;
    trainStatus.value = latest.status || "IDLE";
    trainMessage.value = latest.message || "";
  }
};

const saveTrainConfig = async () => {
  const res = await saveTrainConfigApi(trainForm);
  if (res && res.code === 200) {
    ElMessage.success(res.msg);
  }
};

const triggerTrain = async () => {
  if (isPolling.value) {
    return;
  }
  const res = await triggerTrainApi(scene);
  if (!res || res.code !== 200 || !res.data?.jobId) {
    ElMessage.error(res?.msg || "训练触发失败");
    return;
  }
  trainJobId.value = res.data.jobId;
  trainStatus.value = res.data.status || "PENDING";
  trainMessage.value = res.data.output || "训练任务已提交";
  await loadTrainJobList();
  ElMessage.success("训练任务已提交，开始轮询状态");
  startPolling(res.data.jobId);
};

const stopPolling = () => {
  if (pollingTimer.value) {
    window.clearInterval(pollingTimer.value);
    pollingTimer.value = undefined;
  }
  isPolling.value = false;
};

const pollTrainStatus = async (jobId: number) => {
  const res = await getTrainJobStatusApi(jobId);
  if (!res || res.code !== 200 || !res.data) {
    return;
  }
  trainStatus.value = res.data.status || "UNKNOWN";
  trainMessage.value = res.data.message || "";
  await loadTrainJobList();
  if (trainStatus.value === "SUCCESS") {
    stopPolling();
    ElMessage.success("训练任务已完成");
    return;
  }
  if (trainStatus.value === "FAILED") {
    stopPolling();
    ElMessage.error("训练任务失败，请查看状态信息");
    return;
  }
  const elapsed = Date.now() - pollingStartMs.value;
  if (elapsed > 5 * 60 * 1000) {
    stopPolling();
    ElMessage.warning("训练状态轮询超时，请稍后手动刷新");
  }
};

const startPolling = (jobId: number) => {
  stopPolling();
  isPolling.value = true;
  pollingStartMs.value = Date.now();
  pollTrainStatus(jobId);
  pollingTimer.value = window.setInterval(() => {
    pollTrainStatus(jobId);
  }, 2000);
};

const resetRuleForm = () => {
  Object.assign(ruleForm, {
    ruleId: undefined,
    ruleName: "",
    scene,
    enabled: "1",
    priority: 0,
    minUsageDays: null,
    minOrderCount30d: null,
    minConsumeAmount30d: null,
    highValueOnly: "0",
    cfWeight: 0.2,
    ctrWeight: 0.4,
    cvrWeight: 0.4,
    remark: "",
  });
};

const openAdd = () => {
  isEdit.value = false;
  dialogTitle.value = "新增规则";
  resetRuleForm();
  dialogVisible.value = true;
};

const openEdit = (row: RecoRuleModel) => {
  isEdit.value = true;
  dialogTitle.value = "编辑规则";
  Object.assign(ruleForm, row);
  dialogVisible.value = true;
};

const saveRule = async () => {
  const validateRes = await validateRuleApi(ruleForm);
  if (!validateRes || validateRes.code !== 200) {
    return;
  }
  const res = isEdit.value ? await editRuleApi(ruleForm) : await addRuleApi(ruleForm);
  if (res && res.code === 200) {
    ElMessage.success(res.msg);
    dialogVisible.value = false;
    loadRules();
  }
};

const deleteRule = async (ruleId?: number) => {
  if (!ruleId) return;
  await ElMessageBox.confirm("确定删除该规则吗？", "提示", { type: "warning" });
  const res = await deleteRuleApi(ruleId);
  if (res && res.code === 200) {
    ElMessage.success(res.msg);
    loadRules();
  }
};

onMounted(() => {
  loadEngineConfig();
  loadTrainConfig();
  loadTrainJobList();
  loadRules();
  loadPreview();
  // 页面刷新后恢复最新进行中的训练任务
  window.setTimeout(() => {
    const running = trainJobList.value.find((item) => item.status === "RUNNING" || item.status === "PENDING");
    if (running && running.jobId) {
      trainJobId.value = running.jobId;
      trainStatus.value = running.status;
      trainMessage.value = running.message || "";
      startPolling(running.jobId);
    }
  }, 500);
});

onUnmounted(() => {
  stopPolling();
});
</script>

<style scoped lang="scss">
.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
