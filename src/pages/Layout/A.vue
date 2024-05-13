<script setup lang="ts">
</script>

<template>
<el-breadcrumb>
   <el-breadcrumb-item :to="{ path: '' }">货品管理</el-breadcrumb-item>
</el-breadcrumb>
<el-form>
      <el-form-item label="名称">
        <el-input placeholder="请输入货品名称"></el-input>
      </el-form-item>

      <el-form-item label="售价">
         <el-input placeholder="请输入货品售价"></el-input>
      </el-form-item>

      <el-form-item label="种类">
         <el-input placeholder="请输入货品种类"></el-input>
      </el-form-item>

      <el-form-item label="进价">
         <el-input placeholder="请输入货品进价"></el-input>
      </el-form-item>

      <el-button type="primary" style="width:100px" >查询</el-button>

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

<el-table boreder="true">
   <el-table-column type="selection"align="center"></el-table-column>
   <el-table-column align="center" label="货品名称"></el-table-column>
   <el-table-column align="center" label="货品编号"></el-table-column>
   <el-table-column align="center" label="售价"></el-table-column>
   <el-table-column align="center" label="种类"></el-table-column>
   <el-table-column align="center" label="进价"></el-table-column>
   <el-table-column align="center" label="图片"></el-table-column>
   <el-table-column align="center" label="操作"></el-table-column>
</el-table>

</template>

<style lang="scss" scoped>
.el-form{
   display: flex;
   justify-content: space-between;
   margin-right: 5vh;
}

</style>