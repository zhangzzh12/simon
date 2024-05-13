<script setup lang="ts">
import { useWareDataStore } from '@/stores/WarehouseData';
import { ref, reactive } from 'vue';

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
        <el-form-item label="用户名" prop="username">
            <el-input v-model="formInline.name" placeholder="请输入用户名，2-20字符，不可重复" clearable />
        </el-form-item>
        <el-form-item label="员工姓名" prop="name">
            <el-input v-model="formInline.name" placeholder="请输入员工姓名，2-10个字" clearable />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
            <el-select v-model="formInline.gender" placeholder="请选择" clearable>
                <el-option label="男" value=1 />
                <el-option label="女" value=2 />
            </el-select>
        </el-form-item>
        <el-form-item label="职位">
            <el-select v-model="formInline.job" placeholder="请选择" clearable>
                <el-option label="班主任" value=1 />
                <el-option label="讲师" value=2 />
                <el-option label="学工主管" value=3 />
                <el-option label="教研主管" value=4 />
            </el-select>
        </el-form-item>
        <el-form-item label="入职时间">
            <el-date-picker v-model="formInline.entrydate" type="date" placeholder="请选择入职时间"
                value-format="YYYY-MM-DD" clearable />
        </el-form-item>
        <el-form-item label="归属部门">
            <el-select v-model="formInline.deptId" placeholder="请选择" clearable>
                <el-option label="学工部" value=1 />
                <el-option label="教研部" value=2 />
            </el-select>
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