<script setup lang="ts">
import { testStore } from "@/store/test/index";
//局部使用的方式，需要单独引入
import { Edit } from "@element-plus/icons-vue";
import { computed } from "vue";
//获取store
const store = testStore();
//改变store里面的count的值
const addBtn = () => {
  //store.conunt++
  // store.setCount(++store.conunt)
  // store.$patch({
  //   conunt:++store.conunt
  // })
  store.$patch((state) => {
    state.conunt = ++state.conunt;
  });
};
//computed取值
const count = computed(()=>{
  return store.conunt
})
</script>

<template>
  <el-row class="mb-4">
    <el-button @click="addBtn" type="primary">Primary</el-button>
  </el-row>
  <div>{{ count }}</div>
  <el-icon>
    <Edit />
  </el-icon>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
