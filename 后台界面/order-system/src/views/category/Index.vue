<template>
    <el-main>
        <!-- 搜索栏 -->
        <el-form :model="listParm"  :inline="true" size="default">
            <el-form-item>
                <el-input v-model="listParm.categoryName" placeholder="请输入分类名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button :icon="Search" @click="searchBtn">搜索</el-button>
                <el-button type="danger" plain :icon="Close" @click="resetBtn">重置</el-button>
                <el-button :icon="Plus" type="primary" @click="addBtn">新增</el-button>
            </el-form-item>
        </el-form>
        <!-- 表格 -->
        <el-table :height="tableHeight" :data="tableList" border stripe>
            <el-table-column prop="categoryName" label="分类名称"></el-table-column>
            <el-table-column prop="orderNum" label="序号"></el-table-column>
            <el-table-column  label="操作" width="200" align="center">
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
    <!-- 新增、编辑弹框 -->
    <AddCategory ref="addRef" @onFresh="getList"></AddCategory>
</template>

<script setup lang="ts">
import AddCategory from '@/views/category/AddCategory.vue'
import {Edit,Plus,Delete,Search,Close} from '@element-plus/icons-vue'
import useTable from '@/composables/category/useTable'
import useCategory from '@/composables/category/useCategory'
//表格相关的操作
const {listParm,getList,searchBtn,resetBtn,tableList,sizeChange,currentChange,tableHeight} = useTable()
//增删改
const {addBtn,editBtn,deleteBtn,addRef} = useCategory(getList)
</script>

<style scoped>

</style>