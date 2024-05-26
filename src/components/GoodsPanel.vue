<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { useGoodsDataStore } from "@/stores/goodsData";
import {
  goodsPostService,
  goodsPutService,
  goodsChaService,
} from "@/api/goods";
import { imagePostService } from "@/api/upload";
import { Plus } from "@element-plus/icons-vue";
import { storeToRefs } from "pinia";
const { formInline } = storeToRefs(useGoodsDataStore());
const { setFormInline } = useGoodsDataStore();
const dialogVisible = ref(false);
const tile = ref("");
const ruleFormRef = ref();
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
const validatePrice = (rule, value, callback) => {
  if (value !== "" && !/^\d+(\.\d+)?$/.test(value)) {
    return callback(new Error("请输入正数"));
  } else {
    return callback();
  }
};
const rules = {
  name: [{ required: true, message: "请填写货品名称", trigger: "blur" }],
  inPrice: [
    { required: true, message: "请填写货品进价", trigger: "blur" },
    { validator: validatePrice, trigger: "blur" },
  ],
  outPrice: [
    { required: true, message: "请填写货品售价", trigger: "blur" },
    { validator: validatePrice, trigger: "blur" },
  ],
  image: [{ required: true, message: "请选择需要上传的图片", trigger: "blur" }],
  kind: [{ required: true, message: "请选择需要货品的种类", trigger: "blur" }],
  code: [
    { required: true, message: "请填写货品的编号", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        const reg = /^S-(0[1-9]|1[0-4])-[\d]{4}$/;
        if (!reg.test(value)) {
          callback(new Error("货品编号格式不正确"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
  packageSpe: [
    { required: true, message: "请填写货品包装规格", trigger: "blur" },
  ],
  goodsStatus: [{ required: true, message: "请填写货品状态", trigger: "blur" }],
};

const open = async (row: any, title: string) => {
  tile.value = title;
  if (tile.value === "编辑货品") {
    const res = await goodsChaService(row.id);
    formInline.value = { ...res.data.data };
  } else {
    setFormInline();
  }
  dialogVisible.value = true;
  if (ruleFormRef.value) {
    ruleFormRef.value.resetFields();
  }
};

defineExpose({
  open,
});

const emit = defineEmits(["success"]);

const beforeAvatarUpload = (file: File) => {
  const isJpgOrPng =
    file.name.endsWith(".jpg") ||
    file.name.endsWith(".jpeg") ||
    file.name.endsWith(".png");
  const isSizeValid = file.size / 1024 / 1024 < 2;
  if (!isJpgOrPng) {
    ElMessage.error("格式错误，上传失败,仅能上传PNG JPG JPEG类型图片");
    return false;
  } else if (!isSizeValid) {
    ElMessage.error("图片过大，上传失败");
    return false;
  }
  return true;
};

const onSelectFile = async (uploadFile) => {
  if (await beforeAvatarUpload(uploadFile)) {
    const formData = new FormData();
    formData.append("image", uploadFile.raw);
    const res = await imagePostService(formData);
    formInline.value.image = res.data.data;
  }
};
const onSubmit = async () => {
  await ruleFormRef.value.validate();
  if (formInline.value.id === "") {
    console.log(formInline.value);
    await goodsPostService(formInline.value);
  } else {
    console.log(formInline.value);
    await goodsPutService(formInline.value);
  }
  dialogVisible.value = false;
  emit("success");
};
</script>

<template>
  <el-dialog v-model="dialogVisible" width="545">
    <div class="title">
      <h3>{{ tile }}</h3>
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
        <el-input
          v-model="formInline.name"
          placeholder="请输入货品名称"
          clearable
        />
      </el-form-item>
      <el-form-item label="货品进价" prop="inPrice">
        <el-input
          v-model="formInline.inPrice"
          placeholder="请输入货品进价"
          clearable
        />
      </el-form-item>
      <el-form-item label="货品售价" prop="outPrice">
        <el-input
          v-model="formInline.outPrice"
          placeholder="请输入货品售价"
          clearable
        />
      </el-form-item>

      <el-form-item label="货品图片" prop="image">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onSelectFile"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="formInline.image" :src="formInline.image" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>

      <el-form-item label="货品种类" v-if="formInline.id === ''" prop="kind">
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

      <el-form-item v-if="formInline.id === ''" label="货品编号" prop="code">
        <el-input
          v-model="formInline.code"
          placeholder="编号示例:S-02-5534,02是种类编号(从01-14),后四位数字任意"
          clearable
        />
      </el-form-item>

      <el-form-item label="货品包装规格" prop="packageSpe">
        <el-input
          v-model="formInline.packageSpe"
          placeholder="请输入货品包装规格"
          clearable
        />
      </el-form-item>

      <el-form-item label="货品状态" prop="goodsStatus">
        <el-input
          v-model="formInline.goodsStatus"
          placeholder="请输入货品状态"
          clearable
        />
      </el-form-item>

      <div
        style="display: flex; justify-content: space-between; margin-top: 30px"
      >
        <div class="button" @click="onSubmit">保存</div>
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

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 140px;
  height: 140px;
  text-align: center;
}
</style>
