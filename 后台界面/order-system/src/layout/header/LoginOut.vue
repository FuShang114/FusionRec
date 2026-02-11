<template>
    <el-dropdown>
    <span class="el-dropdown-link">
      <img class="uimage" src='@/assets/user.jpg'/>
    </span>
    <template #dropdown>
      <el-dropdown-menu @click="loginOut">
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import useInstance from '@/hooks/useInstance';
//获取router
const router = useRouter()
//获取全局属性
const {global} = useInstance()
const loginOut = async() => {
    let confirm = await global.$myconfirm('确定退出登录吗?')
    if(confirm){
        //清空缓存数据
        sessionStorage.clear()
        //跳转到登录页面
        router.push({name:'login'})
    }
};
</script>

<style scoped>
.uimage{
  height: 45px;
  width: 45px;
  border-radius: 50%;
  cursor: pointer;
}
</style>