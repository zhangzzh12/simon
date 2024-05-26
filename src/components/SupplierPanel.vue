<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { useGoodsDataStore } from "@/stores/supplierManage.ts";
import { storeToRefs } from "pinia";
import { supplierPostService, supplierPutService } from "@/api/supplier.ts";
const { formInline } = storeToRefs(useGoodsDataStore());
const tile = ref("");
const ruleFormRef = ref();
const dialogVisible = ref(false);
const emit = defineEmits(["success"]);
const supplierKind = ref([
  {
    id: "1",
    name: "日用品类",
  },
  {
    id: "2",
    name: "食品类",
  },
  {
    id: "3",
    name: "服装鞋帽类",
  },
  {
    id: "4",
    name: "饮料类",
  },
  {
    id: "5",
    name: "烟草类",
  },
  {
    id: "6",
    name: "药品类",
  },
  {
    id: "7",
    name: "电子产品类",
  },
  {
    id: "8",
    name: "家用电器类",
  },
  {
    id: "9",
    name: "家居用品类",
  },
  {
    id: "10",
    name: "书籍文具类",
  },
  {
    id: "11",
    name: "化妆品类",
  },
  {
    id: "12",
    name: "运动户外用品类",
  },
  {
    id: "13",
    name: "汽车配件类",
  },
  {
    id: "14",
    name: "宠物用品类",
  },
]);
const open = (row: any, title: string) => {
  tile.value = title;
  formInline.value = { ...row };
  dialogVisible.value = true;
  if (ruleFormRef.value) {
    ruleFormRef.value.resetFields();
  }
};
const rules = {
  name: [{ required: true, message: "请填写供货商名称", trigger: "blur" }],
  address: [{ required: true, message: "请填写供货商地址", trigger: "blur" }],
  kind: [{ required: true, message: "请选择供货商种类", trigger: "blur" }],
  phoneNum: [
    { required: true, message: "请填写供货商电话号码", trigger: "blur" },
    { pattern: /^\d{11}$/, message: "电话号码必须是11位数字", trigger: "blur" },
  ],
};
const findByName = (name) => {
  const kind = supplierKind.value.find((item) => item.name === name);
  return kind ? kind.id : "";
};
const Submit = async () => {
  await ruleFormRef.value.validate();
  formInline.value.kind = findByName(formInline.value.kind);
  if (formInline.value.id) {
    await supplierPutService(formInline.value);
  } else {
    await supplierPostService(formInline.value);
  }
  dialogVisible.value = false;
  emit("success");
};
defineExpose({
  open,
});
</script>

<template>
  <el-dialog v-model="dialogVisible" width="360">
    <div class="title">
      <h3>{{ tile }}</h3>
    </div>
    <el-form
      class="demo-form-inline"
      label-position="right"
      label-width="auto"
      ref="ruleFormRef"
      :model="formInline"
      :rules="rules"
    >
      <el-form-item label="姓名" prop="name">
        <el-input
          v-model="formInline.name"
          placeholder="请输入供货商姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input
          v-model="formInline.address"
          placeholder="请输入供货商地址"
        ></el-input>
      </el-form-item>
      <el-form-item label="种类" prop="kind">
        <el-select v-model="formInline.kind" placeholder="请选择供货商种类">
          <el-option
            v-for="goods in supplierKind"
            style="margin-left: 10px"
            :value="goods.name"
            :key="goods.id"
            :label="goods.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电话号码" prop="phoneNum">
        <el-input
          v-model="formInline.phoneNum"
          placeholder="请输入供货商电话号码"
        ></el-input>
      </el-form-item>
      <div
        style="display: flex; justify-content: space-between; margin-top: 30px"
      >
        <div class="button" @click="Submit">保存</div>
        <div class="button" @click="dialogVisible = false">取消</div>
      </div>
    </el-form>
  </el-dialog>
</template>

<style scoped lang="scss">
.el-form-item {
  margin-top: 20px;
}

.avatar {
  width: 140px;
  height: 140px;
  display: block;
}

.button {
  min-width: 100px;
  padding: 0 10px;
  height: 35px;
  outline: none;
  border: none;
  @include background_color("bg-300");
  color: white;
  font-size: 16px;
  border-radius: 5px;
  transition: all 0.3s ease;
  margin-right: 80px;
  box-shadow: 0 0 4px rgba(49, 61, 68, 0.5);
  text-align: center;
  line-height: 35px;
  user-select: none;

  &:hover {
    scale: 1.03;
    opacity: 0.8;
  }

  &:active {
    scale: 0.98;
  }
}

.title {
  border-left: 4px solid;
  @include border_color("accent-200");
  padding: 5px 10px;
  margin-bottom: 5px;
  @include font_color("text-100");
}
</style>
