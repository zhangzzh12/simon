<script setup lang="ts">
import { reactive } from 'vue';

 let head_list =reactive([
    {id:1 , title: "总点单量" ,number:114514545},
    {id:2 , title: "今日成交额" ,number:114514545},
    {id:3 , title: "季度物资成本" ,number:114514545},
    {id:4 , title: "季度平均利润率" ,number:114514545},
    {id:5 , title: "月度工时统计" ,number:114514545}
 ])
</script>

<template>
<div class="main">
<div class="head">
    <h1>首页</h1>
</div>
    <div class="head1">
    <div class="categoty" v-for="value in head_list" :key="value.id">
    <span>{{ value.title }}</span>
    <hr>
    <br>
    <span>{{ value.number }}</span>
    </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
.main{
    display: flex;
    flex-direction: column;
 
 .head{
    display: flex;
    height: 100px;
    width: 100%;
    margin-right: auto;
    border-bottom: 2px solid black;
    font-size: 50px;  
    font-weight: 600;
    user-select: none;
    justify-content: space-around;
 }
 .head1{
    display: flex;
    flex-direction: row;
    
    .categoty{
    background-color: #ebeb6e;
    border-radius: 10px;
    box-shadow: 0 0 10px;
    margin-right: 30px;
    width: 250px;
    height: 100px;
   
 }
}
 
}
</style>