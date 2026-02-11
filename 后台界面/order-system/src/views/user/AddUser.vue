<template>
  <SysDialog
    :title="dialog.title"
    :width="dialog.width"
    :height="dialog.height"
    :visible="dialog.visible"
    @onClose="onClose"
    @onConfirm="commit"
  >
    <template v-slot:content>
      <el-form
        :model="addModel"
        ref="addFormRef"
        :rules="rules"
        label-width="80px"
        :inline="false"
        size="default"
      >
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item prop="name" label="姓名">
              <el-input v-model="addModel.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="sex" label="性别">
              <el-radio-group v-model="addModel.sex">
                <el-radio :label="'0'">男</el-radio>
                <el-radio :label="'1'">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item prop="phone" label="电话">
              <el-input v-model="addModel.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="email" label="邮箱">
              <el-input v-model="addModel.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item prop="username" label="账户">
              <el-input v-model="addModel.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="password" label="密码">
              <el-input type="password" v-model="addModel.password"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </SysDialog>
</template>

<script setup lang="ts">
import { addUserApi,editUserApi } from "@/api/user/index";
import SysDialog from "@/components/SysDialog.vue";
import useDialog from "@/hooks/useDialog";
import { nextTick, reactive, ref } from "vue";
import { UserModel } from "@/api/user/UserModel";
import { ElMessage, FormInstance } from "element-plus";
import { EditType, Title } from "@/type/BaseType";
//表单的ref属性
const addFormRef = ref<FormInstance>();
//弹框属性
const { dialog, onClose, onConfirm, onShow } = useDialog();
//显示弹框
const show = (type:string,row?:UserModel) => {
  console.log(row)
  //设置弹框的标题
  type == EditType.ADD ? dialog.title = Title.ADD : dialog.title = Title.EDIT
  dialog.height = 180;
  dialog.visible = true;
  //传递了row，说明是编辑，
  //编辑回显数据
  if(row){
    nextTick(()=>{
      Object.assign(addModel,row)
    })
  }
  //清空表单
  addFormRef.value?.resetFields();
   //设置本次操作是新增还是编辑
   addModel.type = type;
};
//defineExpose：暴露出去，给父组件调用
defineExpose({
  show,
});
//表单绑定的对象
const addModel = reactive<UserModel>({
  userId: "",
  username: "",
  password: "",
  phone: "",
  email: "",
  sex: "",
  name: "",
  type:''
});
//表单验证规则
const rules = reactive({
  name: [
    {
      required: true,
      message: "请输入姓名",
      trigger: "blur",
    },
  ],
  sex: [
    {
      required: true,
      message: "请选择性别",
      trigger: "blur",
    },
  ],
  phone: [
    {
      required: true,
      message: "请输入电话",
      trigger: "blur",
    },
  ],
  username: [
    {
      required: true,
      message: "请输入账户",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
  ],
});
//注册事件
const emists = defineEmits(['onFresh'])
//表单提交
const commit = () => {
  addFormRef.value?.validate(async (valid) => {
    if (valid) {
      console.log(addModel)
      let res = null;
      if(addModel.type == EditType.ADD){
        res = await addUserApi(addModel);
      }else{
        res = await editUserApi(addModel)
      }
      if (res && res.code == 200) {
        ElMessage.success(res.msg)
        //刷新列表
        emists('onFresh')
        onClose();
      }
    }
  });
};
</script>

<style scoped></style>
