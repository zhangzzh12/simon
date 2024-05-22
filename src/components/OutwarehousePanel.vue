<script setup lang="ts">
import { useWareDataStore } from "@/stores/WarehouseData";
import { ref, reactive } from "vue";
const props = defineProps({
  title: String,
});
//表单校验
const ruleFormRef = ref(); //获取表单dom
const { formInline } = useWareDataStore();
</script>

<template>
  <div class="title">
    <h3>{{ props.title }}</h3>
  </div>
  <el-form
    :model="formInline"
    class="demo-form-inline"
    label-position="right"
    label-width="auto"
    ref="ruleFormRef"
  >
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
  border-left: 4px solid;
  @include border_color("accent-200");
  padding: 5px 10px;
  margin-bottom: 5px;
  @include font_color("text-100");
}
</style>
