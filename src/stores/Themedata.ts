import { reactive } from "vue";
import { defineStore } from "pinia";


export const useThemeStyleStore = defineStore('theme',()=>{
    const themeStyle = reactive({
        model:'light',
        btn_icon:'bxs-sun',
    });

    return {
        themeStyle,
    }
},{
    persist:true,// 是否选择持续化存储
});