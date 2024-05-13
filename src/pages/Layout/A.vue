<script setup lang="ts">
const Query = () => {

}
</script>

<template>
<el-breadcrumb>
   <el-breadcrumb-item :to="{ path: '' }">货品管理</el-breadcrumb-item>
</el-breadcrumb>
<el-form>
      <el-form-item label="名称">
        <el-input placeholder="请输入货品名称"></el-input>
      </el-form-item>

      <el-form-item label="">
         <el-input></el-input>
      </el-form-item>

      <el-form-item label="">
         <el-input></el-input>
      </el-form-item>
      <el-button type="primary" @click="Query" style="width:100px" >查询</el-button>

</el-form>
<el-button 
   type="primary" 
   style="margin-top: 20px; 
   margin-bottom: 15px;
   width:100px"
>新增货品
</el-button>

<el-button
   type="primary" 
   style="margin-top: 20px; 
   margin-bottom: 15px;
   width:100px" 
>批量删除
</el-button>

<table>
   <thead>
      <tr>
         <th></th>
         <th></th>
         <th></th>
         <th></th>
      </tr>
   </thead>
   <tbody>
      <tr>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      </tr>
   </tbody>
</table>
</template>

<style lang="scss" scoped>
.el-form{
   display: flex;
   justify-content: space-between;
   margin-right: 5vh;
}
.el-input{
  background-color: #F9E4AD;
}
</style>