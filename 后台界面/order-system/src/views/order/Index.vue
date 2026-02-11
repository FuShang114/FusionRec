<template>
    <el-main>
      <!-- 搜索栏 -->
      <el-form :model="listParm" :inline="true" size="default">
        <el-form-item>
          <el-input
            v-model="listParm.userName"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :icon="Search" @click="searchBtn">搜索</el-button>
          <el-button @click="resetBtn" type="danger" plain :icon="Close"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
      <!-- 表格 
          主子表的关键：
          1、父表需要设置 row-key字段
          2、设置type = 'expand'
          -->
      <el-table
        row-key="orderId"
        :height="tableHeight"
        :data="tableList"
        border
        stripe
      >
        <el-table-column type="expand">
          <template #default="scope">
            <el-table :data="scope.row.goodsList" border stripe>
              <el-table-column label="菜品图片" prop="goodsImage">
                <template #default="scope">
                  <el-image
                    :src="scope.row.goodsImage.split(',')[0]"
                    style="height: 60px; width: 60px; border-radius: 50%"
                  ></el-image>
                </template>
              </el-table-column>
              <el-table-column label="名称" prop="goodsName"></el-table-column>
              <el-table-column label="价格" prop="price"></el-table-column>
              <el-table-column label="规格" prop="specsName"></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="userName"></el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>
        <el-table-column label="地址" prop="address"></el-table-column>
        <el-table-column label="价格" prop="price"></el-table-column>
        <el-table-column label="下单时间" prop="createTime"></el-table-column>
        <el-table-column label="发货状态" prop="status">
          <template #default="scope">
            <el-tag v-if="scope.row.status == '0'" type="danger" size="normal"
              >待发货</el-tag
            >
            <el-tag v-if="scope.row.status == '1'" size="normal" effect="dark"
              >已发货</el-tag
            >
            <el-tag v-if="scope.row.status == '2'" size="normal" effect="dark"
              >已收货</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template #default="scope">
            <el-button type="primary" @click="sendOrder(scope.row.orderId)" :icon="Edit" size="default">发货</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page.sync="listParm.currentPage"
        :page-sizes="[10, 20, 40, 80, 100]"
        :page-size="listParm.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listParm.total"
        background
      >
      </el-pagination>
    </el-main>
  </template>
  
  <script setup lang="ts">
  import { Search, Close, Plus, Edit, Delete } from "@element-plus/icons-vue";
  import useOrderTable from "@/composables/order/useOrderTable";
  //表格业务
  const {
    tableList,
    sendOrder,
    listParm,
    resetBtn,
    searchBtn,
    sizeChange,
    currentChange,
    tableHeight,
  } = useOrderTable();
  </script>
  
  <style scoped></style>
  