<script setup>
import { ref } from 'vue'
import GoodsDialog from '@/components/GoodsDialog.vue'
const total = ref(0)
const dialog =  ref()
const goodsKind = ref([
   {
      id:1,
      name:''
   },
   {

   },
   {

   },
   {

   },
   {

   },
   {

   },
   {
      
   }
])
const formModel = ref({
   page:1,
   pageSize:10
})
const onSizeChange = () => {

}
const onCurrentChange = () => {

}
const addClick = ( row ) => {
   dialog.value.open( row , '新增货品')
}
const editClick = (row) => {
   dialog.value.open( row , '编辑货品')
}
const onSuccess = () => {

}
</script>

<template>
<div class="box">
   <el-form>
   <el-form-item label="名称">
      <el-input placeholder="请输入货品名称"></el-input>
   </el-form-item>

   <el-form-item label="售价">
      <el-input placeholder="请输入货品售价"></el-input>
   </el-form-item>

   <el-form-item label="种类">
      <el-select style="width: 200px" placeholder="请选择货品的种类">
         <el-option v-for="goods in goodsKind" :value="goods"></el-option>
      </el-select>
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
   width:100px "
   @click="addClick"
>新增货品
</el-button>

<el-button
   type="primary" 
   style="margin-top: 20px; 
   margin-bottom: 15px;
   width:100px" 
>批量删除
</el-button>

<el-table border fit>
   <el-table-column type="selection"align="center"></el-table-column>
   <el-table-column align="center" label="货品名称"></el-table-column>
   <el-table-column align="center" label="货品编号"></el-table-column>
   <el-table-column align="center" label="售价"></el-table-column>
   <el-table-column align="center" label="种类"></el-table-column>
   <el-table-column align="center" label="进价"></el-table-column>
   <el-table-column align="center" label="图片">
      <template #default="{row}">
         <el-image 
            :zoom-rate="1.2" 
            :max-scale="7" 
            :src="row.image" 
            fit="fill" 
            :min-scale="0.2"
         ></el-image> 
      </template>
   </el-table-column>

   <el-table-column align="center" label="操作">
      <template #default="{row}">
         <el-button 
            link type="primary" 
            size="small" 
            style="color: rgb(255, 153, 0)"
            @click="editClick(row)"
         >编辑
         </el-button>
          <el-button link type="primary" size="small" style="color: rgb(255, 153, 0)">删除</el-button>
        </template>
   </el-table-column>
</el-table>
<goodsDialog ref="dialog" onSuccess="onSuccess"></goodsDialog>
<el-pagination
      v-model:current-page="formModel.page"
      v-model:page-size="formModel.pageSize"
      :page-sizes="[10, 20, 50, 100]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: end"
    />
</div>

</template>

<style lang="scss" scoped>
.box{
   margin: 30px
}
.el-form{
   display: flex;
   justify-content: space-between;
   margin-right: 5vh;
}
.el-button {
@include background_color('bg-300')
}
</style>