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
            <el-form-item prop="categoryId" label="菜品分类">
              <el-select
                style="width: 100%"
                v-model="addModel.categoryId"
                placeholder="请选择分类"
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
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="goodsName" label="菜品名称">
              <el-input v-model="addModel.goodsName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item prop="orderNum" label="菜品序号">
              <el-input v-model="addModel.orderNum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="status" label="是否热推">
              <el-radio-group v-model="addModel.status">
                <el-radio :label="'0'">否</el-radio>
                <el-radio :label="'1'">是</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item prop="goodsUnit" label="菜品单位">
          <el-input v-model="addModel.goodsUnit"></el-input>
        </el-form-item>
        <el-form-item prop="specs" label="菜品规格">
          <el-row>
            <!-- <el-col :span="12" :offset="0">
            <el-divider content-position="left">菜品规格</el-divider>
          </el-col> -->
            <el-col
              style="display: flex; align-items: center"
              :span="12"
              :offset="0"
            >
              <el-button
                type="primary"
                plain
                style="margin-left: 20px"
                :icon="Plus"
                size="small"
                @click="addSpecs"
                >添加规格</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item
          v-for="num in addModel.specs.length"
          size="small"
          :key="num"
        >
          <el-row>
            <el-col :span="7" :offset="0">
              <el-form-item :label="'名称' + num" size="small">
                <el-input
                  v-model="addModel.specs[num - 1].specsName"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="0">
              <el-form-item :label="'价格' + num" size="small">
                <el-input
                  v-model="addModel.specs[num - 1].goodsPrice"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="0">
              <el-form-item :label="'序号' + num" size="small">
                <el-input v-model="addModel.specs[num - 1].orderNum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3" :offset="0">
              <el-button
                @click="deleteSpecs(num)"
                style="margin-left: 15px"
                :icon="Close"
                type="danger"
                plain
                circle
                size="small"
              ></el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item prop="goodsImage" label="菜品图片">
          <UploadImage
            ref="uploadImgs"
            @getImg="getImg"
            :oldUrl="oldUrl"
            :fileList="fileList"
          ></UploadImage>
        </el-form-item>
        <el-form-item prop="goodsDesc" label="菜品详情">
          <div v-if="dialog.visible" style="border: 1px solid #ccc">
            <Toolbar
              style="border-bottom: 1px solid #ccc"
              :editor="editorRef"
              :defaultConfig="toolbarConfig"
              :mode="mode"
            />
            <Editor
              style="height: 250px; overflow-y: hidden"
              v-model="valueHtml"
              :defaultConfig="editorConfig"
              :mode="mode"
              @onCreated="handleCreated"
            />
          </div>
        </el-form-item>
      </el-form>
    </template>
  </SysDialog>
</template>

<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import useSelectCategory from "@/composables/goods/useSelectCategory";
import UploadImage from "@/components/UploadImage.vue";
import { nextTick, reactive, ref, watch } from "vue";
import { GoodsType, SpecsType } from "@/api/goods/GoodsModel";
import SysDialog from "@/components/SysDialog.vue";
import useDialog from "@/hooks/useDialog";
import { ElMessage, FormInstance, UploadUserFile } from "element-plus";
import { EditType, NewType } from "@/type/BaseType";
import useEditor from "@/composables/goods/useEditor";
import { Plus, Close } from "@element-plus/icons-vue";
import { addApi, editApi } from "@/api/goods/index";
const uploadImgs = ref();
//编辑器
const {
  editorRef,
  valueHtml,
  toolbarConfig,
  editorConfig,
  handleCreated,
  mode,
} = useEditor();
//表单的ref属性
const addFormRef = ref<FormInstance>();
//图片初始值
const fileList = ref<Array<UploadUserFile>>([]);
//回显的图片
const oldUrl = ref<Array<{ url: string }>>([]);
//图片地址
const imgUrl = ref<Array<{ url: string }>>([]);
//弹框属性
const { dialog, onClose, onShow } = useDialog();
//下拉分类业务
const { selectData, getSelect } = useSelectCategory();
//表单绑定对象
const addModel = reactive<GoodsType>({
  type: "",
  goodsId: "",
  categoryId: "",
  goodsName: "",
  goodsImage: "",
  goodsDesc: "",
  status: "",
  goodsUnit: "",
  orderNum: "",
  specs: [],
});
//显示弹框
const show = (type: string, row?: GoodsType) => {
  //清空图片
  imgUrl.value = [];
  oldUrl.value = [];
  fileList.value = [];
  //清空文本编辑器
  valueHtml.value = '';
  // if (editorRef.value) {
  //   editorRef.value.clear();
  // }
  getSelect();
  dialog.width = 960;
  dialog.height = 560;
  //编辑回显
  if (type == EditType.EDIT && row) {
    nextTick(() => {
      Object.assign(addModel, row);
      //图片回显
      if (addModel.goodsImage) {
        //逗号分隔的字符串，转换为数组
        let imgs = addModel.goodsImage.split(",");
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
      //编辑器回显
      valueHtml.value = addModel.goodsDesc;
    });
  } else {
    nextTick(() => {
      //清空规格
      addModel.specs = [];
      //设置默认的规格
      addSpecs();
    });
  }
  onShow();
  //清空表单
  addFormRef.value?.resetFields();
  //设置本次操作是新增还是编辑
  addModel.type = type;
};
// const onClose = ()=>{
//   valueHtml.value = '';
//   dialog.visible = false;
// }
//暴露出去给外部使用
defineExpose({
  show,
});

//菜品详情验证规则
const checkEdit = (rule: any, value: any, callback: any) => {
  if (editorRef.value.getText().length == 0) {
    callback(new Error("请填写菜品详情"));
  } else {
    callback();
  }
};
//规格验证
const checkSpecs = (rule: any, value: any, callback: any) => {
  if (addModel.specs.length == 0) {
    callback(new Error("请填写规格"));
  } else {
    let tag = false;
    addModel.specs.forEach((item: SpecsType) => {
      if (!item.specsName) {
        tag = false;
        callback(new Error("请填写规格名称"));
      } else if (!item.goodsPrice) {
        tag = false;
        callback(new Error("请填写规格价格"));
      } else if (!item.orderNum) {
        tag = false;
        callback(new Error("请填写规格序号"));
      } else {
        tag = true;
      }
    });
    if (tag) {
      callback();
    }
  }
};
//表单验证规则
const rules = reactive({
  categoryId: [
    {
      required: true,
      message: "请选择分类",
      trigger: "blur",
    },
  ],
  goodsName: [
    {
      required: true,
      message: "请填写菜品名称",
      trigger: "blur",
    },
  ],
  goodsImage: [
    {
      required: true,
      message: "请上传菜品图片",
      trigger: "blur",
    },
  ],
  goodsUnit: [
    {
      required: true,
      message: "请填写单位",
      trigger: "blur",
    },
  ],
  orderNum: [
    {
      required: true,
      message: "请填写序号",
      trigger: "blur",
    },
  ],
  status: [
    {
      required: true,
      message: "请选择是否是热推",
      trigger: "blur",
    },
  ],
  goodsDesc: [
    {
      trigger: "blur",
      validator: checkEdit,
      required: true,
    },
  ],
  specs: [
    {
      required: true,
      validator: checkSpecs,
      trigger: "blur",
    },
  ],
});
//接收图片上传地址
const getImg = (img: NewType) => {
  console.log("999");
  console.log(img);
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
  addModel.goodsImage = url.substring(0, url.lastIndexOf(","));
  console.log(addModel.goodsImage);
};
//获取编辑器的数据
watch(
  () => valueHtml.value,
  (value) => {
    console.log(value);
    addModel.goodsDesc = value;
  }
);
//添加规格按钮
const addSpecs = () => {
  addModel.specs.push({
    goodsPrice: "",
    specsName: "",
    orderNum: "",
  });
};
//删除规格
const deleteSpecs = (num: number) => {
  addModel.specs.splice(num - 1, 1);
};
//注册事案
const emits = defineEmits(["orRefsh"]);
//提交表单
const commit = () => {
  console.log(uploadImgs.value);
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
        emits("orRefsh");
        uploadImgs.value.clearimg()
        onClose();
      }
    }
  });
};
</script>

<style scoped></style>
