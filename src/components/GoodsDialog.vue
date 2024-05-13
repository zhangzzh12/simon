<script setup>
import { ref, defineEmits } from 'vue'

const dialogVisible = ref(false)
const tile = ref('')
const formRef = ref()
const DepList = ref([])
const diaVisible = ref(false)

const rules = {
  
}
const defaultForm = ref({
  image:''
})

const open = (row,title) => {
  tile.value=title
  defaultForm.value= { ...row }
  dialogVisible.value=true
} 
const getDep = async () => {

}
defineExpose({
  open
})

const emit = defineEmits(['success'])

const onSubmit = async () => {
  await formRef.value.validate()
  const isEdit = defaultForm.value.id
  if(!isEdit){    
   
  }else{

  }
  dialogVisible.value=false
  emit('success')
}

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

const onSelectFile =async (uploadFile) => {
  if(await beforeAvatarUpload(uploadFile)){
      const formData = new FormData()
      formData.append('image',uploadFile.raw) 
  }
}

getDep()
</script>

<template>
   <el-dialog v-model="dialogVisible" :title="tile" width="500" style="color: rgb(2, 188, 247);">
    <el-form :model="defaultForm" label-width="100px" style="padding-right: 30px" ref="formRef" 
    >
    <el-form-item label="图像">
      <el-upload
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onSelectFile"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="defaultForm.image" :src="defaultForm.image"/>
          <el-icon v-else><Plus /></el-icon>
      </el-upload>
      <el-dialog v-model="diaVisible">
        <img :src="defaultForm.image" alt="">
      </el-dialog>
    </el-form-item>

    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.dialog-footer {
  display:flex;
  justify-content: space-around
}
</style>
