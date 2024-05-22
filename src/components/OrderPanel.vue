<script setup lang="ts">
import { ref, reactive } from "vue";
import { type FormInstance } from "element-plus";
import { useOrderDataStore } from "@/stores/orderData";
import { saveOrderpostService } from "@/api/order";

const { formInline, dynamicValidateForm } = useOrderDataStore();

const formRef = ref<FormInstance>(); //获取表单dom
function debounce(func, delay) {
  let timerId;

  return function () {
    const context = this;
    const args = arguments;

    clearTimeout(timerId);

    timerId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

interface DomainItem {
  key: number;
  value: string;
  number: number;
}

const removeDomain = (item: DomainItem) => {
  const index = dynamicValidateForm.domains.indexOf(item);
  if (index !== -1) {
    dynamicValidateForm.domains.splice(index, 1);
  }
};

const addDomain = () => {
  
  dynamicValidateForm.domains.push({
    key: Date.now(),
    value: "",
    number: 1,
  });
};

const emits = defineEmits(["getvisible"]);

const loading = ref(false);

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  if (dynamicValidateForm.domains.length < 1) {
    ElMessage.warning("没有任何货品呢");
    return;
  }
  loading.value = true;
  for (let i = 0; i < dynamicValidateForm.domains.length; ++i) {
    formInline.goodList[i] = dynamicValidateForm.domains[i].value;
    formInline.numberList[i] = dynamicValidateForm.domains[i].number;
  }

  await saveOrderpostService(formInline).then(()=>{
    ElMessage.success('新增成功！');
  }).catch(()=>{
    ElMessage.error('新增失败！');
  });
  loading.value = false;
  emits("getvisible", false);

};

// 使用 debounce 函数创建一个防抖版本的 submit 函数
const debouncedSubmit = debounce(submitForm, 5000); // 设置延迟时间为 5000秒

const resetForm = (formEl: FormInstance | undefined) => {
  dynamicValidateForm.domains.forEach((element) => {
    element.number = 1;
  });
  if (!formEl) return;
  formEl.resetFields();
};

const props = defineProps({
  title: String,
});
</script>

<template>
  <div class="background"  :v-loading="loading">
    <div class="title">
      <h3>{{ props.title }}</h3>
    </div>
    <el-form ref="formRef" style="max-width: 600px" :model="dynamicValidateForm" label-width="auto"
      class="demo-dynamic">
      <el-form-item v-for="(domain, index) in dynamicValidateForm.domains" :key="domain.key" :label="'货品' + (index + 1)"
        :prop="'domains.' + index + '.value'" :inline="true" class="wareItem">
        <span>货品编号</span><el-input v-model="domain.value" style="width: 120px" />
        <span>交易数量</span><el-input-number v-model="domain.number" :min="1" :max="1000" style="width: 90px"
          size="small" />
        <el-button @click.prevent="removeDomain(domain)" style="border-radius: 50%; padding: 8px; margin-left: 15px"><i
            class="bx bx-x"></i></el-button>
      </el-form-item>
      <el-form-item>
        <div class="button-box">
          <div class="button submit" @click="debouncedSubmit(formRef)">
            收银结账
          </div>
          <div class="button" @click="addDomain">新增货品项</div>
          <div class="button" @click="resetForm(formRef)">撤销所有记录</div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.background {
  padding: 30px;

  .title {
    border-left: 4px solid;
    @include border_color("accent-200");
    padding: 5px 10px;
    margin-bottom: 5px;
    @include font_color("primary-100");
  }

  span {
    margin-right: 12px;
    @include font_color("accent-200");
    font-weight: 600;
    font-size: 16px;
  }

  .el-form-item.wareItem {
    padding: 10px 5px;
    margin-bottom: 25px;
    border-bottom: 3px solid;
    @include border_color("primary-300");

    .el-input {
      margin-right: 20px;
    }
  }

  .button-box {
    user-select: none;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .button {
      min-width: 120px;
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

      &.submit {
        @include background_color("primary-300");
      }

      &:hover {
        scale: 1.03;
        opacity: 0.8;
      }

      &:active {
        scale: 0.98;
      }
    }
  }
}
</style>
