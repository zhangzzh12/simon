import { ref } from "vue";
import { defineStore } from "pinia";
export const useGoodsDataStore = defineStore(
  "goods",
  () => {
    const formInline = ref({
      id: "",
      name: "",
      username: "",
      password: "",
      gender: "",
      job: "",
    });
    return {
      formInline,
    };
  },
  {
    persist: true, // 是否选择持续化存储
  }
);
