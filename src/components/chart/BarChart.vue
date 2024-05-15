<script setup lang="ts">
import * as echarts from 'echarts';
import { reactive, defineProps,ref,watch, onMounted } from 'vue';

const goodsName = ref([
    '日用品类',
    '食品类',
    '服装鞋帽类',
    '饮料类',
    '烟草类',
    '药品类',
    '电子产品类',
    '家用电器类',
    '家居用品类',
    '书籍文具类',
     '化妆品类',
     '运动户外用品类',
     '汽车配件类','宠物用品类',
])
const props = defineProps({
    chartTitle: {
        type: String,
    },
    chartData:{
        type:Array,
    },
});

const chart = ref();//dom引用

const option = reactive({
    color: ['#ddb900'],
    title: {
        text: props.chartTitle,
        textStyle: {
            fontSize: 30,
        },
        left: 'center',
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {        
            type: 'shadow'       
        }
    },
    legend: {
        data: ['箱数'],
        left:'left',
    },
    xAxis: [
        {
        axisLabel:{
            interval:0,
            rotate:45
        },    
        data: goodsName.value,
    }
],
    yAxis: {},
    series: [
        {
            name: '箱数',
            type: 'bar',
            data:props.chartData,
        }
    ],
});

const initChart = () => {
    option.series[0].data = props.chartData
    let myChart = echarts.init(chart.value);
    myChart.setOption(option);
    //图表自适应
    window.addEventListener('resize', () => {
        myChart.resize();
    });
};
watch(props.chartData, (newData) => {
  option.series[0].data = newData;
  initChart()
});
onMounted(()=>{
    option.series[0].data = props.chartData
    initChart();
});
</script>

<template>
    <div ref="chart" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;margin: 10px;"></div>
</template>

<style lang="scss" scoped></style>