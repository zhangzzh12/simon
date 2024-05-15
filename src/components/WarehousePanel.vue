<script setup lang="ts">
import { useWareDataStore } from '@/stores/WarehouseData';
import { ref, reactive } from 'vue';
//货品种类
const goodsKind = ref([
   {
      id: '',
      name: '请选择'
   },
   {
      id: 1,
      name: '日用品类'
   },
   {
      id: 2,
      name: '食品类'
   },
   {
      id: 3,
      name: '服装鞋帽类'
   },
   {
      id: 4,
      name: '饮料类'
   },
   {
      id: 5,
      name: '烟草类'
   },
   {
      id: 6,
      name: '药品类'
   },
   {
      id: 7,
      name: '电子产品类'
   },
     {
      id: 8,
      name: '家用电器类'
   },
   {
      id: 9,
      name: '家居用品类'
   },
   {
      id: 10,
      name: '书籍文具类'
   },
   {
      id: 11,
      name: '化妆品类'
   },
   {
      id: 12,
      name: '运动户外用品类'
   },
   {
      id: 13,
      name: '汽车配件类'
   },
   {
      id: 14,
      name: '宠物用品类'
   }
])
const props = defineProps({
    title: String,
})

//表单校验
const ruleFormRef = ref();//获取表单dom
const { formInline } = useWareDataStore(); 
</script>

<template>
    <div class="title">
        <h3>{{ props.title }}</h3>
    </div>
    <el-form :model="formInline" class="demo-form-inline" label-position="right" label-width="auto"
        ref="ruleFormRef">
        <el-form-item label="货品名称" prop="name">
            <el-input v-model="formInline.name" placeholder="请输入货品名称" clearable />
        </el-form-item>
        <el-form-item label="货品数量" prop="number">
            <el-input v-model="formInline.number" placeholder="请输入货品数量" clearable />
        </el-form-item>
        <el-form-item label="货品种类">
          <el-select placeholder="请选择货品的种类" v-model="formInline.kind">
            <el-option v-for="goods in goodsKind" style="margin-left: 10px;" :value="goods.id" :key="goods.id"
              :label="goods.name">
            </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="货品编号" prop="code">
            <el-input v-model="formInline.code" placeholder="请输入货品的编号" clearable />
        </el-form-item>
        <el-form-item label="货品进价" prop="inPrice">
            <el-input v-model="formInline.inPrice" placeholder="请输入货品的进价" clearable />
        </el-form-item>          
        <el-form-item class="button-box">
            <slot name="button"></slot>
        </el-form-item>
    </el-form>
</template>

<style lang="scss">
.demo-form-inline .el-input {
    --el-input-width: 220px;
}

.demo-form-inline .el-select {
    --el-select-width: 220px;
}

.el-form-item__content {
    justify-content: space-between;
}

.title {
    border-left: 4px solid ;
    @include border_color('accent-200');
    padding: 5px 10px;
    margin-bottom: 5px;
    @include font_color('text-100');
}
</style>