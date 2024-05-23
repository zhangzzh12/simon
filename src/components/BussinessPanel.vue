<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { useGoodsDataStore } from "@/stores/bussinessStaff.ts";
import { storeToRefs } from "pinia";
import {
  bussinessStaffPostService,
  bussinessStaffPutService,
} from "@/api/bussinessStaff";
const { formInline } = storeToRefs(useGoodsDataStore());
const tile = ref("");
const ruleFormRef = ref();
const dialogVisible = ref(false);
const emit = defineEmits(["success"]);
const jobList = ref([
  { id: "1", name: "店长" },
  { id: "2", name: "收银员" },
  { id: "3", name: "仓库管理员" },
  { id: "4", name: "售货员" },
  { id: "5", name: "采购人员" },
]);
const open = (row: any, title: string) => {
  tile.value = title;
  formInline.value = { ...row };
  dialogVisible.value = true;
  if (ruleFormRef.value) {
    ruleFormRef.value.resetFields();
  }
};
const findById = (job: any) => {
  const kind = jobList.value.find((item) => item.id === job);
  return kind ? kind.id : "";
};
const Submit = async () => {
  if (formInline.value.gender === "男") {
    formInline.value.gender = "1";
  } else if (formInline.value.gender === "女") {
    formInline.value.gender = "2";
  }
  if (formInline.value.id) {
    if (formInline.value.job !== "1" || "2" || "3" || "4" || "5") {
      formInline.value.job = findById(formInline.value.job);
    }
    await bussinessStaffPutService(formInline.value);
  } else {
    await bussinessStaffPostService(formInline.value);
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
    >
      <el-form-item label="姓名">
        <el-input v-model="formInline.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input
          v-if="tile === '新增商务人员信息'"
          v-model="formInline.username"
          placeholder="请输入用户名"
        ></el-input>
        <el-input
          v-else
          v-model="formInline.username"
          placeholder="请输入用户名"
          disabled
        ></el-input
      ></el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formInline.password" placeholder="请输入密码">
        </el-input>
      </el-form-item>
      <el-form-item label="性别" v-model="formInline.gender">
        <el-select v-model="formInline.gender" placeholder="请选择性别">
          <el-option label="男" value="1" style="margin-left: 7px" />
          <el-option label="女" value="2" style="margin-left: 7px" />
        </el-select>
      </el-form-item>
      <el-form-item label="职位">
        <el-select
          v-model="formInline.job"
          placeholder="请选择职位"
          style="width: 120px"
        >
          <el-option label="店长" value="1" style="margin-left: 7px" />
          <el-option label="收银员" value="2" style="margin-left: 7px" />
          <el-option label="仓库管理员" value="3" style="margin-left: 7px" />
          <el-option label="售货员" value="4" style="margin-left: 7px" />
          <el-option
            label="采购人员"
            value="5"
            style="margin-left: 7px"
          /> </el-select
      ></el-form-item>
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
