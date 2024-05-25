import { ref } from "vue";
import { defineStore } from "pinia";
export const useGoodsDataStore = defineStore(
  "goods",
  () => {
    const formInline = ref({
      id: "",
      name: "",
      address: "",
      kind: "",
      phoneNum: "",
    });
    const setformInline = () => {
      formInline.value = {
        id: "",
        name: "",
        address: "",
        kind: "",
        phoneNum: "",
      };
    };
    return {
      formInline,
      setformInline,
    };
  },
  {
    persist: true, // 是否选择持续化存储
  }
);
