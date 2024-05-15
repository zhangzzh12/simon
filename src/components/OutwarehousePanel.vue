<script setup lang="ts">
import { useWareDataStore } from '@/stores/WarehouseData';
import { ref, reactive } from 'vue';
const { houseNumber } = useWareDataStore();
const props = defineProps({
    title: String,
})
const countValidator = (rule,value,callback) => {
    const num = Number(value);
    if(houseNumber<num){
        callback(new Error('出库数量不能超过库存数量'))
    }else {
        callback()
    }
}
const rules = {
    number:[
        {min:0,message:'出库数量不能为负数',trigger:'blur'},
        {validator: countValidator,trigger:'blur'}
    ]
}
//表单校验
const ruleFormRef = ref();//获取表单dom
const { formInline } = useWareDataStore(); 
</script>

<template>
    <div class="title">
        <h3>{{ props.title }}</h3>
    </div>
    <el-form :model="formInline" class="demo-form-inline" label-position="right" label-width="auto"
        ref="ruleFormRef" :rules="rules">
        <el-form-item label="数量" prop="number" width="300">
            <el-input-number v-model="formInline.number" :min="0" clearable />
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