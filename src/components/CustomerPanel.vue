<script setup lang="ts">
import { customerPostService, customerPutService } from "@/api/customer";
import { ref, defineEmits } from "vue";
const tile = ref("");
const ruleFormRef = ref();
const dialogVisible = ref(false);
const emit = defineEmits(["success"]);
let customer = ref({
  id: "",
  name: "",
  kind: "",
  address: "",
  phoneNum: "",
});
const open = (row, title: string) => {
  tile.value = title;
  customer.value = { ...row };
  dialogVisible.value = true;
  if (ruleFormRef.value) {
    ruleFormRef.value.resetFields();
  }
};
const onSubmit = async () => {
  if (customer.value.kind === "零售客户") {
    customer.value.kind = "1";
  } else if (customer.value.kind === "批发客户") {
    customer.value.kind = "2";
  }
  if (customer.value.id) {
    await customerPutService(customer.value);
  } else {
    await customerPostService(customer.value);
  }
  dialogVisible.value = false;
  emit("success");
};
const cancelButtonClickHandler = () => {
  ruleFormRef.value.resetFields();
  dialogVisible.value = false;
};
defineExpose({
  open,
});
const rules = {
  name: [{ required: true, message: "请填写客户姓名", trigger: "blur" }],
  kind: [{ required: true, message: "请填写客户种类", trigger: "blur" }],
  address: [{ required: true, message: "请填写地址", trigger: "blur" }],
  phoneNum: [
    { required: true, message: "请填写电话号码", trigger: "blur" },
    { pattern: /^\d{11}$/, message: "电话号码必须是11位数字", trigger: "blur" },
  ],
};
</script>

<template>
  <div></div>
  <el-dialog v-model="dialogVisible" width="400">
    <div class="title">
      <h3>{{ tile }}</h3>
    </div>
    <el-form
      class="demo-form-inline"
      label-position="right"
      label-width="auto"
      ref="ruleFormRef"
      :model="customer"
      :rules="rules"
    >
      <el-form-item label="客户姓名" prop="name">
        <el-input
          v-model="customer.name"
          placeholder="请输入客户姓名"
          clearable
        />
      </el-form-item>
      <el-form-item label="客户种类" prop="kind">
        <el-select v-model="customer.kind" placeholder="请选择">
          <el-option label="零售客户" value="1" style="margin-left: 7px" />
          <el-option label="批发客户" value="2" style="margin-left: 7px" />
        </el-select>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input
          v-model="customer.address"
          placeholder="请输入地址"
          clearable
        />
      </el-form-item>
      <el-form-item label="电话号码" prop="phoneNum">
        <el-input
          v-model="customer.phoneNum"
          placeholder="请输入电话号码"
          clearable
        />
      </el-form-item>
      <div
        style="display: flex; justify-content: space-between; margin-top: 30px"
      >
        <div class="button" @click="onSubmit">保存</div>
        <div class="button" @click="cancelButtonClickHandler">取消</div>
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
