<script setup lang="ts">
import { ref, defineEmits, onMounted } from 'vue'
import { useGoodsDataStore } from '@/stores/goodsData'
import { goodsPostService, goodsPutService, goodsChaService } from '@/api/goods';
import { imagePostService } from '@/api/upload';
import { Plus } from '@element-plus/icons-vue'
const { formInline } = useGoodsDataStore()
const dialogVisible = ref(false)
const tile = ref('')
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
const validatePrice = (rule, value, callback) => {
  if (value !== '' && !/^\d+(\.\d+)?$/.test(value)) {
    return callback(new Error('请输入正数'))
  } else {
    return callback()
  }
}
const rules = {
  outPrice: [{ validator: validatePrice, trigger: 'blur' }],
  inPrice: [{ validator: validatePrice, trigger: 'blur' }],
  code: []
}

const open = async (row, title) => {
  tile.value = title
  formInline.id = ''
  formInline.name = ''
  formInline.outPrice = ''
  formInline.inPrice = ''
  formInline.image = ''
  formInline.kind = ''
  formInline.code = ''
  formInline.packageSpe = ''
  formInline.goodsStatus = ''
  if (tile.value === '编辑货品') {
    const res = await goodsChaService(row.id)
    formInline.id = res.data.data.id
    formInline.name = res.data.data.name
    formInline.outPrice = res.data.data.outPrice
    formInline.inPrice = res.data.data.inPrice
    formInline.image = res.data.data.image
    formInline.kind = res.data.data.kind
    formInline.code = res.data.data.code
    formInline.packageSpe = res.data.data.packageSpe
    formInline.goodsStatus = res.data.data.goodsStatus
  }
  dialogVisible.value = true
}

defineExpose({
  open
})

const emit = defineEmits(['success'])

const beforeAvatarUpload = (file) => {
  const isJpgOrPng = file.name.endsWith('.jpg') || file.name.endsWith('.jpeg') || file.name.endsWith('.png');
  const isSizeValid = file.size / 1024 / 1024 < 2
  if (!isJpgOrPng) {
    ElMessage.error('格式错误，上传失败,仅能上传PNG JPG JPEG类型图片')
    return false
  } else if (!isSizeValid) {
    ElMessage.error('图片过大，上传失败')
    return false
  }
  return true
}

const onSelectFile = async (uploadFile) => {
  if (await beforeAvatarUpload(uploadFile)) {
    const formData = new FormData()
    formData.append('image', uploadFile.raw)
    const res = await imagePostService(formData)
    formInline.image = res.data.data
  }
}
const onSubmit = async () => {
  if (formInline.id === '') {
    await goodsPostService(formInline)
  }
  else {
    await goodsPutService(formInline)
  }
  dialogVisible.value = false
  emit('success')
}
</script>

<template>
  <el-dialog v-model="dialogVisible" width="480">
    <div class="title">
      <h3>{{ tile }}</h3>
    </div>
    <el-form :model="formInline" class="demo-form-inline" label-position="right" label-width="auto" ref="ruleFormRef"
      :rules=rules>
      <el-form-item label="货品名称">
        <el-input v-model="formInline.name" placeholder="请输入货品名称" clearable />
      </el-form-item>
      <el-form-item label="货品进价" prop="inPrice">
        <el-input v-model="formInline.inPrice" placeholder="请输入货品进价" clearable />
      </el-form-item>
      <el-form-item label="货品售价" prop="outPrice">
        <el-input v-model="formInline.outPrice" placeholder="请输入货品售价" clearable />
      </el-form-item>

      <el-form-item label="货品图片">
        <el-upload class="avatar-uploader" :show-file-list="false" :auto-upload="false" :on-change="onSelectFile"
          :before-upload="beforeAvatarUpload">
          <img v-if="formInline.image" :src="formInline.image" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>

      <el-form-item label="货品种类">
        <el-select placeholder="请选择货品的种类" v-model="formInline.kind">
          <el-option v-for="goods in goodsKind" style="margin-left: 10px;" :value="goods.id" :key="goods.id"
            :label="goods.name">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="货品编号" prop="code">
        <el-input v-model="formInline.code" placeholder="请输入货品编号" clearable />
      </el-form-item>

      <el-form-item label="货品包装规格">
        <el-input v-model="formInline.packageSpe" placeholder="请输入货品包装规格" clearable />
      </el-form-item>

      <el-form-item label="货品状态">
        <el-input v-model="formInline.goodsStatus" placeholder="请输入货品状态" clearable />
      </el-form-item>

      <div style="display: flex; justify-content: space-between; margin-top: 30px;">
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
  @include background_color('bg-300');
  color: white;
  font-size: 16px;
  border-radius: 5px;
  transition: all .3s ease;
  margin-right: 80px;
  box-shadow: 0 0 4px rgba(49, 61, 68, .5);
  text-align: center;
  line-height: 35px;

  &:hover {
    scale: 1.03;
    opacity: .8;
  }

  &:active {
    scale: 0.98;
  }
}

.title {
  border-left: 4px solid;
  @include border_color('accent-200');
  padding: 5px 10px;
  margin-bottom: 5px;
  @include font_color('text-100');
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