import { defineStore } from "pinia";
import { reactive } from "vue";

interface WarehouseItem {
  id: number;
  name: string;
  code: number;
}

export const useWareDataStore = defineStore("waredata", () => {
  const formInline = reactive({
    id: "",
    name: "",
    number: "",
    kind: "",
    //必要数据
    location: 0,
    code: "",
    inPrice: "",
    time: "",
    nextLocation: "",
  });
  const Warehouse = reactive<{
    index: string;
    WarehouseList: WarehouseItem[];
  }>({
    index: "店铺",
    WarehouseList: [],
  });
  return {
    formInline,
    Warehouse,
  };
});
