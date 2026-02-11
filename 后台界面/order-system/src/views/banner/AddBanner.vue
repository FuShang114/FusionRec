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
        <el-form-item prop="title" label="标题：">
          <el-input v-model="addModel.title"></el-input>
        </el-form-item>
        <el-form-item prop="goodsId" label="菜品：">
          <el-select
            style="width: 100%"
            v-model="addModel.goodsId"
            placeholder="请选择菜品"
            size="default"
          >
            <el-option
              v-for="item in selectData"
              :key="item['value']"
              :label="item['label']"
              :value="item['value']"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="orderNum" label="序号：">
          <el-input v-model="addModel.orderNum"></el-input>
        </el-form-item>
        <el-form-item prop="status" label="上下架：">
          <el-radio-group v-model="addModel.status">
            <el-radio :label="'0'">下架</el-radio>
            <el-radio :label="'1'">上架</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="images" label="广告图片">
          <UploadImage
            ref="imgRef"
            @getImg="getImg"
            :oldUrl="oldUrl"
            :fileList="fileList"
          ></UploadImage>
        </el-form-item>
      </el-form>
    </template>
  </SysDialog>
</template>

<script setup lang="ts">
import { EditType, NewType } from "@/type/BaseType";
import UploadImage from "@/components/UploadImage.vue";
import { BannerType } from "@/api/banner/BannerModel";
import SysDialog from "@/components/SysDialog.vue";
import useDialog from "@/hooks/useDialog";
import { ElMessage, FormInstance, UploadUserFile } from "element-plus";
import { reactive, ref, nextTick } from "vue";
import useSelectCategory from "@/composables/banner/useSelectCategory";
import { addApi, editApi } from "@/api/banner/index";
const imgRef = ref();
//图片初始值
const fileList = ref<Array<UploadUserFile>>([]);
//回显的图片
const oldUrl = ref<Array<{ url: string }>>([]);
//图片地址
const imgUrl = ref<Array<{ url: string }>>([]);
//下拉菜品
const { getSelect, selectData } = useSelectCategory();
//表单ref属性
const addFormRef = ref<FormInstance>();
//弹框属性
const { dialog, onClose, onConfirm, onShow } = useDialog();
//弹框显示
const show = (type: string, row?: BannerType) => {
  //清空图片
  imgUrl.value = [];
  oldUrl.value = [];
  fileList.value = [];
  dialog.height = 400;
  dialog.width = 800;
  //查询下拉菜品
  getSelect();
  onShow();
  if (type == EditType.EDIT && row) {
    nextTick(() => {
      Object.assign(addModel, row);
      //图片回显
      if (addModel.images) {
        //逗号分隔的字符串，转换为数组
        let imgs = addModel.images.split(",");
        for (let i = 0; i < imgs.length; i++) {
          let img = {
            name: "",
            url: "",
          };
          img.name = imgs[i];
          img.url = imgs[i];
          fileList.value.push(img);
          oldUrl.value.push({ url: imgs[i] });
        }
      }
    });
  }
  //清空表单
  addFormRef.value?.resetFields();
  addModel.type = type;
};
//暴露出去
defineExpose({
  show,
});
//表单绑定的对象
const addModel = reactive<BannerType>({
  type: "",
  banId: "",
  goodsId: "",
  title: "",
  images: "",
  status: "",
  orderNum: "",
});
//表单验证规则
const rules = reactive({
  goodsId: [
    {
      required: true,
      trigger: "blur",
      message: "请选择菜品",
    },
  ],
  title: [
    {
      required: true,
      trigger: "blur",
      message: "请填写标题",
    },
  ],
  orderNum: [
    {
      required: true,
      trigger: "blur",
      message: "请填写序号",
    },
  ],
  status: [
    {
      required: true,
      trigger: "blur",
      message: "请选择是否上架",
    },
  ],
  images: [
    {
      required: true,
      trigger: "blur",
      message: "请上传图片",
    },
  ],
});
//接收图片上传地址
const getImg = (img: NewType) => {
  console.log("999");
  console.log(img.newImgUrl);
  imgUrl.value = oldUrl.value.concat(img.newImgUrl);
  if (img.deleteUrl.length > 0) {
    let newArr = imgUrl.value.filter(
      (x) => !img.deleteUrl.some((item) => x.url === item.url)
    );
    imgUrl.value = newArr;
  }
  // console.log(imgUrl.value)
  //把图片路径拼接为逗号分隔的字符串
  let url = "";
  for (let k = 0; k < imgUrl.value.length; k++) {
    url = url + imgUrl.value[k].url + ",";
  }
  addModel.images = url.substring(0, url.lastIndexOf(","));
  console.log(addModel.images);
};
//注册事件
const emits = defineEmits(["onFresh"]);
//表单提交
const commit = () => {
  addFormRef.value?.validate(async (valid) => {
    if (valid) {
      let res = null;
      if (addModel.type == EditType.ADD) {
        res = await addApi(addModel);
      } else {
        res = await editApi(addModel);
      }
      if (res && res.code == 200) {
        ElMessage.success(res.msg);
        emits("onFresh");
        imgRef.value.clearimg()
        onClose();
      }
    }
  });
};
</script>

<style scoped></style>
