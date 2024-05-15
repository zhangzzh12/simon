import { defineStore } from 'pinia'
import { ref,reactive } from 'vue';

export const useWareDataStore = defineStore('waredata', () => {
  const formInline = reactive({
    id:0,
    name: '',
    number: '',
    kind: '',
    //必要数据
    location: 0,
    code: '',
    inPrice: '',
    time:''
  });
  const houseNumber = ref(0) 
  return {
    formInline,
    houseNumber
  }
})