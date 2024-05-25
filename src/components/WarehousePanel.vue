<script setup lang="ts">
import { useWareDataStore } from "@/stores/WarehouseData";
import { ref } from "vue";
import { goodsGetService } from "@/api/warehouse";
//货品种类
const goodsKind = ref([
  {
    id: 1,
    name: "日用品类",
  },
  {
    id: 2,
    name: "食品类",
  },
  {
    id: 3,
    name: "服装鞋帽类",
  },
  {
    id: 4,
    name: "饮料类",
  },
  {
    id: 5,
    name: "烟草类",
  },
  {
    id: 6,
    name: "药品类",
  },
  {
    id: 7,
    name: "电子产品类",
  },
  {
    id: 8,
    name: "家用电器类",
  },
  {
    id: 9,
    name: "家居用品类",
  },
  {
    id: 10,
    name: "书籍文具类",
  },
  {
    id: 11,
    name: "化妆品类",
  },
  {
    id: 12,
    name: "运动户外用品类",
  },
  {
    id: 13,
    name: "汽车配件类",
  },
  {
    id: 14,
    name: "宠物用品类",
  },
]);
const dataList = ref([]);
const props = defineProps({
  title: String,
});
const rules = {
  name: [{ required: true, message: "请选择货品名称", trigger: "blur" }],
  number: [{ required: true, message: "请填写货品数量", trigger: "blur" }],
  kind: [{ required: true, message: "请选择货品种类", trigger: "blur" }],
  code: [{ required: true, message: "请选择货品编号", trigger: "blur" }],
};
//表单校验
const ruleFormRef = ref(); //获取表单dom
const { formInline } = useWareDataStore();
const getGoods = async () => {
  const res = await goodsGetService();
  dataList.value = res.data.data;
};
const handleNameChange = () => {
  const data = dataList.value.find((item) => item.name === formInline.name);
  formInline.kind = data.kind;
  formInline.code = data.code;
};
const selectChange = () => {
  const data = dataList.value.find((item) => item.code === formInline.code);
  formInline.kind = data.kind;
  formInline.name = data.name;
};
const clearForm = () => {
  if (ruleFormRef.value) {
    ruleFormRef.value.resetFields();
  }
};
defineExpose({
  clearForm,
});
getGoods();
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
    <el-form-item label="货品名称" prop="name">
      <el-select
        v-model="formInline.name"
        placeholder="请选择货品名称"
        @change="handleNameChange"
      >
        <el-option
          v-for="data in dataList"
          style="margin-left: 10px"
          :value="data.name"
          :key="data.id"
          :label="data.name"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="货品数量" prop="number">
      <el-input
        v-model="formInline.number"
        placeholder="请输入货品数量"
        clearable
      />
    </el-form-item>
    <el-form-item label="货品种类">
      <el-select placeholder="请选择货品的种类" v-model="formInline.kind">
        <el-option
          v-for="goods in goodsKind"
          style="margin-left: 10px"
          :value="goods.id"
          :key="goods.id"
          :label="goods.name"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="货品编号" prop="code">
      <el-select
        v-model="formInline.code"
        placeholder="请选择货品的编号"
        @change="selectChange"
      >
        <el-option
          v-for="data in dataList"
          style="margin-left: 10px"
          :value="data.code"
          :key="data.id"
          :label="data.code"
        ></el-option>
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
  border-left: 4px solid;
  @include border_color("accent-200");
  padding: 5px 10px;
  margin-bottom: 5px;
  @include font_color("text-100");
}
</style>
