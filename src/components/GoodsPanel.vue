<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { useGoodsDataStore } from '@/stores/goodsData'
const dialogVisible = ref(false)
const tile = ref('')
const useGoodsData = useGoodsDataStore()
const formRef = ref()
const diaVisible = ref(false)
const { id, name, outPrice, inPrice, image, kind, code } ={ ...useGoodsData.formInline}
const goodsKind = ref([
   {
      id:1,
      name:'食品类'
   },
   {
      id:2,
      name:'服装类'
   },
   {
      id:3,
      name:'鞋帽类'
   },
   {
      id:4,
      name:'日用品类'
   },
   {
      id:5,
      name:'家具类'
   },
   {
      id:6,
      name:'家用电器类'
   },
   {
      id:7,
      name:'纺织品类'     
   }
])
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
</script>

<template>
   <el-dialog v-model="dialogVisible" :title="tile" width="500" style="color: rgb(2, 188, 247);">
    <el-form :model="useGoodsData.formInline" label-width="100px" style="padding-right: 30px" ref="formRef" 
    >

    <el-form-item label="货品名称">
      <el-input placeholder="请输入货品名称" v-model="name"></el-input>
    </el-form-item>

    <el-form-item label="货品售价">
      <el-input placeholder="请输入货品售价" v-model="outPrice"></el-input>
    </el-form-item>

    <el-form-item label="货品进价">
      <el-input placeholder="请输入货品进价" v-model="inPrice"></el-input>
    </el-form-item>

    <el-form-item label="图像">
      <el-upload
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onSelectFile"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="image" :src="image"/>
          <el-icon v-else><Plus /></el-icon>
      </el-upload>
      <el-dialog v-model="diaVisible">
        <img :src="defaultForm.image" alt="">
      </el-dialog>
    </el-form-item>

    <el-form-item label="货品种类">
      <el-select style="width: 200px" placeholder="请选择货品的种类" v-model="kind">
         <el-option v-for="goods in goodsKind" style="margin-left: 10px;"
            :value="goods.id" :key="goods.id" :label="goods.name">
         </el-option>
      </el-select>      
    </el-form-item>

    <el-form-item label="货品编号">
      <el-input placeholder="请输入货品编号" v-model="code"></el-input>
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