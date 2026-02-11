<template>
  <el-form style="margin: 20px 0px" label-width="80px" size="normal">
    <el-form-item>
      <el-button style="padding: 0px 50px" @click="charts('0')">日统计</el-button
      >
      <el-button
      @click="charts('1')"
        style="padding: 0px 50px"
        type="primary"
        plain
        >月统计</el-button
      >
      <el-button
      @click="charts('2')"
        style="padding: 0px 50px"
        type="success"
        plain
        >年统计</el-button
      >
    </el-form-item>
  </el-form>
  <div ref="myChart" :style="{ width: '100%', height: '400px' }"></div>
  <div ref="myChart1" :style="{ width: '100%', height: '350px' }"></div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import useInstance from "@/hooks/useInstance";
import {getTotalApi} from '@/api/order/index'
const { global } = useInstance();
const myChart = ref<HTMLElement>();
const myChart1 = ref<HTMLElement>();

//柱状图
const charts = async (type:string) => {
  const echartInstance = global.$echarts.init(myChart.value);
  const echartInstance1 = global.$echarts.init(myChart1.value);
  let option = reactive({
    title: {
      text: "直方图",
    },
    xAxis: {
      type: "category",
      data: [],
      axisLabel: {
        //x轴文字的配置
        show: true,
        interval: 0, //使x轴文字显示全
      },
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [],
        type: "bar",
        itemStyle: {
          normal: {
            //这里是颜色
            color: function (params:any) {
              //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
              var colorList = [
                "#00A3E0",
                "#FFA100",
                "#ffc0cb",
                "#CCCCCC",
                "#BBFFAA",
                "#749f83",
                "#ca8622",
                "#00A3E0",
                "#FFA100",
                "#ffc0cb",
                "#CCCCCC",
                "#BBFFAA",
                "#749f83",
                "#ca8622",
                "#00A3E0",
                "#FFA100",
                "#ffc0cb",
                "#CCCCCC",
                "#BBFFAA",
                "#749f83",
                "#ca8622",
                "#00A3E0",
                "#FFA100",
                "#ffc0cb",
                "#CCCCCC",
                "#BBFFAA",
                "#749f83",
                "#ca8622",
                "#00A3E0",
                "#FFA100",
                "#ffc0cb",
                "#CCCCCC",
                "#BBFFAA",
                "#749f83",
                "#ca8622",
                "#00A3E0",
                "#FFA100",
                "#ffc0cb",
                "#CCCCCC",
                "#BBFFAA",
                "#749f83",
                "#ca8622",
              ];
              return colorList[params.dataIndex];
            },
          },
        },
      },
    ],
    tooltip: {
      // 鼠标悬浮提示框显示 X和Y 轴数据
      trigger: "axis",
      backgroundColor: "rgba(32, 33, 36,.7)",
      borderColor: "rgba(32, 33, 36,0.20)",
      borderWidth: 1,
      textStyle: {
        // 文字提示样式
        color: "#fff",
        fontSize: "12",
      },
    },
  });
  let option1 = reactive({
    title: {
      text: "折线图",
    },
    xAxis: {
      type: "category",
      data: [],
      axisLabel: {
        //x轴文字的配置
        show: true,
        interval: 0, //使x轴文字显示全
      },
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [],
        type: "line",
      },
    ],
    tooltip: {
      // 鼠标悬浮提示框显示 X和Y 轴数据
      trigger: "axis",
      backgroundColor: "rgba(32, 33, 36,.7)",
      borderColor: "rgba(32, 33, 36,0.20)",
      borderWidth: 1,
      textStyle: {
        // 文字提示样式
        color: "#fff",
        fontSize: "12",
      },
    },
  });
  //动态获取数据
  let res = await getTotalApi(type)
  if(res && res.data){
    console.log(res)
    option.xAxis.data = res.data.names
    option.series[0].data = res.data.values
    option1.xAxis.data = res.data.names
    option1.series[0].data = res.data.values
  }
  echartInstance.setOption(option);
  echartInstance1.setOption(option1);
};
onMounted(() => {
  charts('0');
});
</script>

<style lang="scss" scoped></style>
