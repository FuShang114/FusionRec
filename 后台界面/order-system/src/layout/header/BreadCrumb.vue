<template>
  <el-breadcrumb class="bred" separator="/">
    <el-breadcrumb-item v-for="item in tabs">{{ item.meta.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref, watch } from "vue";
import { useRoute, RouteLocationMatched } from "vue-router";
//获取当前路由
const route = useRoute();
//定义面包屑导航数据
const tabs: Ref<RouteLocationMatched[]> = ref([]);
//监听当前路由
watch(
  () => route.path,
  () => getBredcrumb()
);
//获取面包屑导航数据
const getBredcrumb = () => {
    //找出有title的数据
    let mached = route.matched.filter((item)=>item.meta && item.meta.title);
    // console.log(mached)
    const first = mached[0]
    console.log(first)
    if(first.path !== '/dashboard'){
        mached = [{path:'/dashboard',meta:{title:'首页'}} as any].concat(mached)
    }
    tabs.value = mached
};
onMounted(()=>{
    getBredcrumb()
})
</script>
<style scoped lang="scss">
//修改字体颜色
:deep(.el-breadcrumb__inner) {
  color: #fff !important;
}
.bred {
  margin-left: 20px;
}
// 修改字体大小
// :deep(.el-breadcrumb__item) {
//   font-size: 16px !important;
// }
</style>
