<script setup lang="ts">
import { useWareDataStore } from "@/stores/WarehouseData";
import { ref } from "vue";
const props = defineProps({
  title: String,
});
const ruleFormRef = ref();
const { formInline } = useWareDataStore();
const rules = {
  number: [{ required: true, message: "请填写数量", trigger: "blur" }],
};
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
    :rules="rules"
  >
    <el-form-item label="货品名称">
      <el-input v-model="formInline.name"> </el-input>
    </el-form-item>
    <el-form-item label="货品数量" prop="number">
      <el-input v-model="formInline.number"> </el-input>
    </el-form-item>
    <el-form-item label="货品编号">
      <el-input v-model="formInline.code"> </el-input>
    </el-form-item>
    <el-form-item label="调拨到的仓库">
      <el-select v-model="formInline.nextLocation" placeholder="请选择">
        <el-option
          v-if="formInline.location !== 0"
          value="0"
          style="margin-left: 3px"
          label="店铺"
        ></el-option>
        <el-option
          v-if="formInline.location !== 1"
          value="1"
          style="margin-left: 3px"
          label="A仓库"
        ></el-option>
        <el-option
          v-if="formInline.location !== 2"
          value="2"
          style="margin-left: 3px"
          label="B仓库"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
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
