import { reactive,ref } from "vue";
import { defineStore } from "pinia";


export const useMenuStore = defineStore('menu',()=>{
    const title = reactive({
        'first':'首页',
        'second':'',
    });

    const asideList_id = ref(['active','','','','','','']);

    return {
        title,
        asideList_id
    }
},{
    persist:true,// 是否选择持续化存储
});