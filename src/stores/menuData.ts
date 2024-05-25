import { reactive, ref } from "vue";
import { defineStore } from "pinia";

export const useMenuStore = defineStore(
  "menu",
  () => {
    const title = reactive({
      first: "首页",
      second: "",
    });

    const asideList_id = ref(["active", "", "", "", "", "", "", ""]);

    const warehouse = reactive({
      active_list: ["active", "", ""],
      number: 0,
      name: "店铺",
    });

    return {
      title,
      asideList_id,
      warehouse,
    };
  },
  {
    persist: true, // 是否选择持续化存储
  }
);
