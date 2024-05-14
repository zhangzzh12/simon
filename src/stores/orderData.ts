import { ref, reactive } from "vue"
import { defineStore } from "pinia"

interface DomainItem {
  key: number
  value: string
  number: number
}

export const useOrderDataStore = defineStore('order', () => {
  const formInline = ref<{
    id: string
    goodList: string[]
    numberList: number[]
    priceList: number[]
    totalPrice: number
    status: number
    time: string
  }>({
    id: '',
    goodList: [],
    numberList: [],
    priceList: [],
    totalPrice: 0,
    status: 0,
    time: '',
  });
  const dynamicValidateForm = reactive<{
    domains: DomainItem[]
  }>({
    domains: [
      {
        key: 1,
        value: '',
        number: 1,
      },
    ],
  });
  return {
    formInline,
    dynamicValidateForm
  }
})