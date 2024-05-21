<script setup lang="ts">
import * as echarts from 'echarts';
import { reactive, defineProps,ref,watch, onMounted } from 'vue';


const props = defineProps({
    chartTitle: {
        type: String,
    },
    yAxis:{
        type: Object,
    },
    chartData:{
        type:Array,
    },
    xAxis:{
        type:Object,
    },
    value: {
        type: String,
    }
});

const chart = ref();
const option =reactive({
  title: {
    text: props.chartTitle,
    textStyle: {
            color: '#917800',
        }
  },
  xAxis: props.xAxis,
  yAxis: props.yAxis,
  series: props.chartData,
})


const initChart = () => {
    let myChart = echarts.init(chart.value);
    myChart.setOption(option);
    //图表自适应
    window.addEventListener('resize', () => {
        myChart.resize();
    });
};
watch(props.chartData, (newValue,oldValue) => {
    if(newValue.length>0){
        initChart();
    }
});
onMounted(()=>{
    initChart();
});
</script>

<template>
    <div ref="chart" style="width: 100%;height: 100%;"></div>
</template>

<style lang="scss" scoped></style>