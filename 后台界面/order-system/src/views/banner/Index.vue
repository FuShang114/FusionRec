<template>
  <el-main>
    <!-- 搜索栏 -->
    <el-form :model="listParm" :inline="true" size="default">
      <el-form-item>
        <el-input placeholder="请输入标题" v-model="listParm.title"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :icon="Search" @click="searchBtn">搜索</el-button>
        <el-button :icon="Close" type="danger" plain @click="resetBtn"
          >重置</el-button
        >
        <el-button :icon="Plus" type="primary" @click="addBtn">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :height="tableHeight" :data="tableList" border stripe>
      <el-table-column label="广告图片" prop="goodsImage">
        <template #default="scope">
          <el-image
            :src="scope.row.images.split(',')[0]"
            style="height: 60px; width: 60px; border-radius: 50%"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="是否上架" prop="title">
        <template #default="scope">
          <el-tag v-if="scope.row.status == '0'" type="danger" size="normal"
            >否</el-tag
          >
          <el-tag v-else size="normal" effect="dark">是</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="序号" prop="orderNum"></el-table-column>
      <el-table-column label="操作" width="220" align="center">
        <template #default="scope">
          <el-button :icon="Edit" type="primary" size="default" @click="editBtn(scope.row)">编辑</el-button>
          <el-button :icon="Delete" type="danger" size="default" @click="deleteBtn(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page.sync="listParm.currentPage"
      :page-sizes="[10,20, 40, 80, 100]"
      :page-size="listParm.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="listParm.total" background>
    </el-pagination>
    
  </el-main>
  <!-- 新增、编辑 -->
  <add-banner ref="addRef" @onFresh="getList"></add-banner>
</template>

<script setup lang="ts">
import AddBanner from "@/views/banner/AddBanner.vue";
import { Edit, Plus, Delete, Search, Close } from "@element-plus/icons-vue";
import useBannerTable from "@/composables/banner/useBannerTable";
import useBanner from "@/composables/banner/useBanner";
//表格业务
const { getList, listParm, resetBtn, searchBtn, tableList,sizeChange ,currentChange,tableHeight} = useBannerTable();
//增删改业务
const { addBtn, editBtn, deleteBtn, addRef } = useBanner(getList);
</script>

<style scoped></style>
