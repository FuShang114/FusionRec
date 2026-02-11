<template>
  <SysDialog
    :title="dialog.title"
    :height="dialog.height"
    :width="dialog.width"
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
        <el-form-item prop="categoryName" label="分类名称">
          <el-input v-model="addModel.categoryName"></el-input>
        </el-form-item>
        <el-form-item label="序号" prop="orderNum">
          <el-input type="number" v-model="addModel.orderNum"></el-input>
        </el-form-item>
      </el-form>
    </template>
  </SysDialog>
</template>

<script setup lang="ts">
import SysDialog from "@/components/SysDialog.vue";
import useDialog from "@/hooks/useDialog";
import { CategoryModel } from "@/api/category/CategoryModel";
import { nextTick, reactive, ref } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import {addApi,editApi} from '@/api/category/index'
import { EditType } from "@/type/BaseType";

//表单的ref属性
const addFormRef = ref<FormInstance>();
//弹框属性
const { dialog, onClose, onConfirm, onShow } = useDialog();
//显示弹框
const show = (type:string,row?:CategoryModel) => {
  dialog.height = 150
  onShow();
  //编辑的时候，数据回显
  if(row && type == EditType.EDIT){
    nextTick(()=>{
      Object.assign(addModel,row)
    })
  }
  //设置编辑的属性：0：新增  1：编辑
  addModel.type = type;
  //清空表单
  addFormRef.value?.resetFields()
};
//暴露出去，给外部组件使用
defineExpose({
  show,
});
//表单绑定的对象
const addModel = reactive<CategoryModel>({
  type: "",
  categoryId: "",
  categoryName: "",
  orderNum: "",
});
//表单验证规则
const rules = reactive({
  categoryName: [
    {
      required: true,
      message: "请填写分类名称",
      trigger: "blur",
    },
  ]
});
//注册事件
const emits = defineEmits(['onFresh'])
//表单提交
const commit = ()=>{
    addFormRef.value?.validate(async(valid)=>{
      if(valid){
        let res = null;
        if(addModel.type == EditType.ADD){
          res = await addApi(addModel)
        }else{
          res = await editApi(addModel)
        }
        if(res && res.code == 200){
          ElMessage.success(res.msg)
          //刷新表格
          emits('onFresh')
          onClose()
        }
      }
    })
}
</script>

<style scoped></style>
