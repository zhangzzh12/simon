import { defineStore } from 'pinia'
import { ref,reactive } from 'vue';

export const useWareDataStore = defineStore('waredata', () => {
  const formInline = reactive({
    id: 0,
    name: '',
    number: '',
    gender: '',
    //必要数据
    image: '',
    job: '',
    entrydate: '',
    deptId: '',
  });

  return {
    formInline,
  }
})