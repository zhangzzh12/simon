<script setup lang="ts">
import { onMounted, ref } from 'vue'
import GoodsPanel from '@/components/GoodsPanel.vue'
import { useMenuStore } from '@/stores/menuData';
import { goodsGetService, goodsDeleteService } from '@/api/goods';
const total = ref(0)
const dialog = ref()
const form = ref()
const goodsList = ref([])
const idList = ref([])
const loading = ref(false)
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
const formModel = ref({
   page: 1,
   pageSize: 10,
   name: '',
   kind: '',
   outPriceLow: '',
   outPriceHigh: '',
   inPriceLow: '',
   inPriceHigh: ''
})

const countValidator = (rule, value, callback) => {
   if (value !== '' && !/^\d+(\.\d+)?$/.test(value)) {
      return callback(new Error('请输入正数'))
   } else {
      return callback()
   }
}
const minValidator = (rule, value, callback) => {
   const lowPrice = Number(value);
   const highPrice = Number(formModel.value.outPriceHigh);
   if (!highPrice || lowPrice <= highPrice) {
      return callback();
   }
   callback(new Error('售价最小值不得大于售价最大值'));
};

const maxValidator = (rule, value, callback) => {
   const highPrice = Number(value);
   const lowPrice = Number(formModel.value.outPriceLow);
   if (!lowPrice || lowPrice <= highPrice) {
      return callback();
   }
   else {
      callback(new Error('售价最大值不得小于售价最小值'));
   }
};
const minValidator1 = (rule, value, callback) => {
   const lowPrice = Number(value);
   const highPrice = Number(formModel.value.inPriceHigh);
   if (!highPrice || lowPrice <= highPrice) {
      return callback();
   }
   callback(new Error('售价最小值不得大于售价最大值'));
}
const maxValidator1 = (rule, value, callback) => {
   const highPrice = Number(value);
   const lowPrice = Number(formModel.value.inPriceLow);
   if (!lowPrice || lowPrice <= highPrice) {
      return callback();
   }
   else {
      callback(new Error('售价最大值不得小于售价最小值'));
   }
}
const rules = {
   outPriceLow: [
      { validator: countValidator, trigger: 'blur' },
      { validator: minValidator, trigger: 'blur' }
   ],
   outPriceHigh: [
      { validator: countValidator, trigger: 'blur' },
      { validator: maxValidator, trigger: 'blur' }
   ],
   inPriceLow: [
      { validator: countValidator, trigger: 'blur' },
      { validator: minValidator1, trigger: 'blur' }
   ],
   inPriceHigh: [
      { validator: countValidator, trigger: 'blur' },
      { validator: maxValidator1, trigger: 'blur' }
   ]
}
const selectionLineChangeHandle = (rows) => {
   rows.forEach(row => {
      const id = row.id;
      if (!idList.value.includes(id)) {
         idList.value.push(id);
      }
   });
}

const findById = (id: number) => {
   const kind = goodsKind.value.find(item => item.id === id);
   return kind ? kind.name : '';
}
const getGoods = async () => {
   loading.value = true
   const res = await goodsGetService(formModel.value)
   total.value = res.data.data.total
   goodsList.value = res.data.data.rows
   goodsList.value.forEach(item => {
      item.kind = findById(item.kind)
   })
   loading.value = false
}

const onSizeChange = (size: number) => {
   formModel.value.page = 1
   formModel.value.pageSize = size
   getGoods()
}
const onCurrentChange = (page: number) => {
   formModel.value.page = page
   getGoods()
}
const addClick = (row) => {
   dialog.value.open(row, '新增货品')
}
const editClick = (row) => {
   dialog.value.open(row, '编辑货品')
}
const delClick = async (row) => {
   await ElMessageBox.confirm('您确定要删除该货品信息吗', '删除货品信息', {
      type: 'warning',
      confirmButtonText: '确定',
      cancelButtonText: '取消'
   })
   await goodsDeleteService(row.id)
   getGoods()
}
const delAllClick = async () => {
   if (idList.value.length === 0) {
      ElMessage.warning('请选择要删除的员工')
   } else {
      await ElMessageBox.confirm('您确定要删除该货品信息吗', '删除货品信息', {
         type: 'warning',
         confirmButtonText: '确定',
         cancelButtonText: '取消'
      })
      await goodsDeleteService(idList.value)
      getGoods()
   }
}
const Query = async () => {
   await getGoods()
}
const onSuccess = () => {
   getGoods()
}

//面包屑
const { title } = useMenuStore();
onMounted(() => {
   title.first = '货品管理';
   title.second = '';
   getGoods();
});
</script>

<template>
   <div class="common-layout home-section">
      <el-scrollbar>
         <el-main>
            <el-form :rules="rules" ref="form" :model="formModel" style="display: flex; 
         align-items: center;">

               <el-form-item label="名称">
                  <el-input placeholder="请输入货品名称" clearable v-model="formModel.name" style="width: 120px"></el-input>
               </el-form-item>

               <el-form-item label="售价" prop="outPriceLow">
                  <el-input v-model="formModel.outPriceLow" style="width: 100px" clearable></el-input>
               </el-form-item>
               <span style="margin:0 -15px;">-</span>
               <el-form-item prop="outPriceHigh">
                  <el-input v-model="formModel.outPriceHigh" style="width: 100px" clearable></el-input>
               </el-form-item>

               <el-form-item label="种类">
                  <el-select style="width: 200px" placeholder="请选择货品的种类" v-model="formModel.kind">
                     <el-option v-for="goods in goodsKind" style="margin-left: 10px;" :value="goods.id" :key="goods.id"
                        :label="goods.name">
                     </el-option>
                  </el-select>
               </el-form-item>

               <el-form-item label="进价" prop="inPriceLow">
                  <el-input v-model="formModel.inPriceLow" style="width: 100px" clearable></el-input>
               </el-form-item>
               <span style="margin: 0 -15px;">-</span>
               <el-form-item prop="inPriceHigh">
                  <el-input v-model="formModel.inPriceHigh" style="width: 100px" clearable></el-input>
               </el-form-item>

               <div class="button" style="width:100px" @click="Query">查询</div>
            </el-form>
            <div class="button-box" style="display: flex;align-items: center;">

               <div class="button" style="margin-top: 20px; margin-bottom: 15px; width:100px " @click="addClick">新增货品
               </div>

               <div class="button" style="margin-top: 20px; margin-bottom: 15px;width:100px" @click="delAllClick">批量删除
               </div>
            </div>

      <div class="table-box">
         <el-table border fit v-loading="loading" :data="goodsList" @selection-change="selectionLineChangeHandle"> 
            <el-table-column type="selection" align="center"  prop="id"></el-table-column>
            <el-table-column align="center" label="货品名称" prop="name"></el-table-column>
            <el-table-column align="center" label="货品编号" prop="code"></el-table-column>
            <el-table-column align="center" label="售价" prop="outPrice"></el-table-column>
            <el-table-column align="center" label="种类" prop="kind"></el-table-column>
            <el-table-column align="center" label="进价" prop="inPrice"></el-table-column>
            <el-table-column align="center" label="售价" prop="outPrice"></el-table-column>
            <el-table-column align="center" label="图片" prop="image">
               <template #default="{ row }">
                  <el-image 
                     :zoom-rate="1.2" 
                     :max-scale="7" 
                     :src="row.image"
                     fit="cover"
                     :min-scale="0.2"
                  ></el-image>
               </template>
            </el-table-column>
            <el-table-column align="center" label="货品包装规格" prop="packageSpe"></el-table-column>
            <el-table-column align="center" label="货品状态" prop="goodsStatus"></el-table-column>
            <el-table-column align="center" label="操作">
               <template #default="{ row }">
                  <el-button link type="primary" size="small" style="color: rgb(255, 153, 0)" @click="editClick(row)">编辑
                  </el-button>
                  <el-button link type="primary" size="small" style="color: rgb(255, 153, 0)" @click="delClick(row)">删除</el-button>
               </template>
            </el-table-column>
         </el-table>
      </div>
         <GoodsPanel ref="dialog" @success="onSuccess"></GoodsPanel>
      <div class="page-box">
         <el-pagination v-model:current-page="formModel.page" v-model:page-size="formModel.pageSize"
            :page-sizes="[10, 20, 50, 100]" :background="true" layout="total, sizes, prev, pager, next, jumper"
            :total="total" @size-change="onSizeChange" @current-change="onCurrentChange"
            style="margin-top: 20px; justify-content: end" />
      </div>
         </el-main>
         <el-footer>
      <div class="copyright">Copyright © , All Rights Reserved.</div>
      <div class="more">
         <span>Simon</span>
         <el-divider direction="vertical" />
         <span>Web</span>
         <el-divider direction="vertical" />
         <span>Watermark</span>
      </div>
         </el-footer>
      </el-scrollbar>
   </div>
</template>

<style scoped lang="scss">
.scrollbar-demo-item {
   display: flex;
   align-items: center;
   justify-content: center;
   height: 50px;
   margin: 10px;
   text-align: center;
   border-radius: 4px;
   background: var(--el-color-primary-light-9);
   color: var(--el-color-primary);
}

.home-section {
   position: relative;
   height: 100%;
   width: 100%;

   .el-main {
      margin-top: 50px;
      margin-bottom: 60px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 60px 30px;
      gap: 20px;

      .el-form {
         display: flex;
         justify-content: space-between;
         margin-right: 5vh;
         padding: 15px 25px;
         border-radius: 12px;
         box-shadow: inset 0 0 10px rgba(49, 61, 68, .8);
      }

      .table-box {
         position: relative;
         box-shadow: -2px -2px 5px rgba(49, 61, 68, .5);
         border-top: 6px solid;
         @include border_color('accent-200');
      }

   }

   .el-footer {
      padding: 0 !important;

      .copyright {
         height: 80px;
         width: 100%;
         @include background_color('bg-300');
         display: flex;
         justify-content: center;
         align-items: center;
         color: white;
         box-shadow: 0 -5px 10px rgba(49, 61, 68, .6);
      }

      .more {
         padding-top: 60px;
         @include font_color('text-200');
         font-size: 25px;
         font-weight: 500;
         display: flex;
         justify-content: center;
         align-items: center;
      }
   }
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
</style>