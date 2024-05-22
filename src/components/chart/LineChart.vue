<script setup lang="ts">
import * as echarts from 'echarts';
import { reactive, defineProps, ref, watch, onMounted } from 'vue';


const props = defineProps({
    chartTitle: {
        type: String,
    },
    yAxis: {
        type: Object,
    },
    chartData: {
        type: Array,
    },
    xAxis: {
        type: Object,
    },
    chartLegend: {
        type: Array,
    }
});

const chart = ref();
const option = reactive({
    title: {
        text: props.chartTitle,
        textStyle: {
            color: '#917800',
        }
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: props.chartLegend,
        textStyle: {
            color: '#917800',
        },
    },
    xAxis: props.xAxis,
    yAxis: props.yAxis,
    series: props.chartData,
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
})


const initChart = () => {
    let myChart = echarts.init(chart.value);
    myChart.setOption(option);
    //图表自适应
    window.addEventListener('resize', () => {
        myChart.resize();
    });
};
watch(props.chartData, (newValue, oldValue) => {
    if (newValue.length > 0) {
        initChart();
    }
});
onMounted(() => {
    initChart();
});
</script>

<template>
    <div ref="chart" style="width: 100%;height: 100%;"></div>
</template>

<style lang="scss" scoped></style>