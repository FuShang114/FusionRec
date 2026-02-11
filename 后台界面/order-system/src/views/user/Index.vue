<template>
  <el-main>
    <!--搜索栏 -->
    <el-form :model="listParm" label-width="80px" :inline="true" size="default">
      <el-form-item>
        <el-input v-model="listParm.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="listParm.phone" placeholder="请输入电话"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :icon="Search" @click="searchBtn">搜索</el-button>
        <el-button plain :icon="Close" type="danger" @click="resetBtn">重置</el-button>
        <el-button type="primary" :icon="Plus" @click="addBtn">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 用户列表 -->
    <el-table :height="tableHeight" :data="tableList" border stripe>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="性别" prop="sex">
        <template #default="scope">
          <el-tag v-if="scope.row.sex == '1'" type="danger" size="default">女</el-tag>
          <el-tag v-if="scope.row.sex == '0'" size="default">男</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="电话" prop="phone"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="操作" width="220" align="center">
      <template #default="scope">
        <el-button :icon="Edit" type="primary" size="default" @click="editBtn(scope.row)"
          >编辑</el-button
        >
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
  <!-- 新增、编辑弹框 -->
  <AddUser ref="addRef" @onFresh="getList"></AddUser>
</template>

<script setup lang="ts">
import AddUser from './AddUser.vue';
import {Search,Close,Plus,Edit,Delete} from '@element-plus/icons-vue'
import useUserTable from "@/composables/user/useUserTable";
import useUser from '@/composables/user/useUser';
//表格相关的操作
const { tableHeight,listParm,getList,searchBtn,resetBtn,tableList,sizeChange,currentChange } = useUserTable();
//增删改的业务
const {addBtn,editBtn,deleteBtn,addRef} = useUser(getList)
</script>

<style scoped></style>
