<script setup lang="ts">
import * as echarts from 'echarts';
import { reactive, defineProps,ref,watch, onMounted } from 'vue';


const props = defineProps({
    chartTitle: {
        type: String,
    },
    xAxis:{
        type: Array
    },
    chartData:{
        type:Array,
    },
});

const chart = ref();

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
        data: props.xAxis,
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
    let myChart = echarts.init(chart.value);
    myChart.setOption(option);
    //图表自适应
    window.addEventListener('resize', () => {
        myChart.resize();
    });
};
watch(props.chartData, (newValue,oldValue) => {
    console.log(newValue)
    if(newValue.length>0){
        initChart();
    }
});
onMounted(()=>{
    initChart();
});
</script>

<template>
    <div ref="chart" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;margin: 10px;"></div>
</template>

<style lang="scss" scoped></style>