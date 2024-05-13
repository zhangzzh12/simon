<script setup>
import * as echarts from 'echarts';
import { reactive, defineProps, watch } from 'vue';

const props = defineProps({
    chartTitle: {
        type: String,
    },
    chartData:{
        type: Array,
    },
    chartLegend:{
        type:Array,
    },
});
watch(props.chartData,(newValue,oldValue)=>{
    if(newValue.length>0){
        initChart();
    }
});

const chart = ref();//dom引用

const option = reactive({
    title: {
        text: props.chartTitle,
        textStyle: {
            fontSize: 30,
        },
        left:'center',
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data: props.chartLegend,
    },
    series: [
        {
            type: 'pie',
            radius: ['45%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            labelLine: {
                show: false,
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            },
            data: props.chartData,
            padAngle: 1,
        }
    ],
    itemStyle: {
        borderRadius: ['5%','5%'],
    },
    radius: ['40%', '70%'],
});

const initChart = () => {
    let myChart = echarts.init(chart.value);
    myChart.setOption(option);
    //图表自适应
    window.addEventListener('resize', () => {
        myChart.resize();
    });
};

</script>

<template>
    <div ref="chart" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;"></div>
</template>

<style lang="scss" scoped></style>