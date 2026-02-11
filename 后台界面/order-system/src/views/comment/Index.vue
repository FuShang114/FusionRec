<template>
    <el-main>
      <!-- 表格 -->
      <el-table :height="tableHeight" :data="tableList" border stripe>
        <el-table-column label="名称" prop="goodsName"></el-table-column>
        <el-table-column label="商品图片" prop="goodsImage">
          <template #default="scope">
            <el-image
              :src="scope.row.goodsImage.split(',')[0]"
              style="height: 60px; width: 60px; border-radius: 50%"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="昵称" prop="nickName"></el-table-column>
        <el-table-column label="头像" prop="avatarUrl">
          <template #default="scope">
            <el-image
              :src="imgUrl+scope.row.avatarUrl"
              style="height: 60px; width: 60px; border-radius: 50%"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="评论内容" prop="commentText"></el-table-column>
        <el-table-column label="时间" prop="createTime"></el-table-column>
        <el-table-column label="操作" width="220" align="center">
          <template #default="scope">
            <el-button :icon="Delete" @click="deleteBtn(scope.row.commentId)" type="danger" size="default">删除</el-button>
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
  </template>
  
  <script setup lang="ts">
  import {ref} from 'vue'
  import {  Delete } from "@element-plus/icons-vue";
  import useCommentTable from "@/composables/comment/useCommentTable";
  const imgUrl = ref('http://localhost:8089/')
  //表格业务
  const {  listParm, deleteBtn,  tableList,sizeChange ,currentChange,tableHeight} = useCommentTable();

  </script>
  
  <style scoped></style>
  