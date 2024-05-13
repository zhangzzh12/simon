<script setup lang="ts">
import { ref } from 'vue'
import GoodsPanel from '@/components/GoodsPanel.vue'
const total = ref(0)
const dialog =  ref()
const form = ref()
const goodsKind = ref([
   {
      id:1,
      name:'食品类'
   },
   {
      id:2,
      name:'服装类'
   },
   {
      id:3,
      name:'鞋帽类'
   },
   {
      id:4,
      name:'日用品类'
   },
   {
      id:5,
      name:'家具类'
   },
   {
      id:6,
      name:'家用电器类'
   },
   {
      id:7,
      name:'纺织品类'     
   }
])
const formModel = ref({
   page:1,
   pageSize:10,
   name:'',
   kind:'',
   outPriceLow:'',
   outPriceHigh:'',
   inPriceLow:'',
   inPriceHigh:''
})

const countValidator = ( rule , value , callback ) => {
   if(Number(value)<0){
      return callback(new Error('价格不得小于0'))
   }else {
      return callback()
   }
}
const minValidator = () => {
   
}
const  maxValidator = () => {

}
const rules = {
   outPriceLow:[
       { validator: countValidator, trigger: 'blur' },
       { validator: minValidator, trigger: 'blur' }
   ],
   outPriceHigh:[
      { validator: countValidator, trigger: 'blur' },
      { validator: maxValidator, trigger: 'blur' }
   ],
   inPriceLow:[
      { validator: countValidator, trigger: 'blur' },
      { validator: minValidator, trigger: 'blur' }
   ],
   inPriceHigh:[
      { validator: countValidator, trigger: 'blur' },
      { validator: maxValidator, trigger: 'blur' }
   ]
}
const getGoods = async () => {   
}

const onSizeChange = (size:number) => {
   formModel.value.pageSize = size
   getGoods()
}
const onCurrentChange = (page:number) => {
   formModel.value.page = page
   getGoods()
}
const addClick = ( row ) => {
   dialog.value.open( row , '新增货品')
}
const editClick = (row) => {
   dialog.value.open( row , '编辑货品')
}
const onSuccess = () => {
   getGoods()
}
const Query = () => {
}
getGoods()
</script>

<template>
<div class="box">
   <el-form :rules="rules" ref="form" :model="formModel" style="display: flex; align-items: center;">
   <el-form-item label="名称">
      <el-input placeholder="请输入货品名称" v-model="formModel.name" style="width: 120px" ></el-input>
   </el-form-item>

   <el-form-item label="售价" prop="outPriceLow">
      <el-input 
         v-model="formModel.outPriceLow"
      ></el-input>
   </el-form-item>
   <span style="margin:0 5px;">-</span>
   <el-form-item  prop="outPriceHigh">
      <el-input 
         v-model="formModel.outPriceHigh"
      ></el-input>
   </el-form-item>

   <el-form-item label="种类">
      <el-select style="width: 200px" placeholder="请选择货品的种类" v-model="formModel.kind">
         <el-option v-for="goods in goodsKind" style="margin-left: 10px;"
            :value="goods.id" :key="goods.id" :label="goods.name">
         </el-option>
      </el-select>
   </el-form-item>
   
   <el-form-item label="进价" prop="inPriceLow">
      <el-input 
         v-model="formModel.inPriceLow"
      ></el-input>
   </el-form-item>

   <span style="margin: 0 5px;">-</span>

   <el-form-item prop="inPriceHigh">
      <el-input-number
         v-model="formModel.inPriceHigh"
      ></el-input-number>
   </el-form-item>

   <el-button type="primary" style="width:100px" @click="Query">查询</el-button>

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
<GoodsPanel ref="dialog" onSuccess="onSuccess"></GoodsPanel>
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