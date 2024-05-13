import { ref} from "vue"
import { defineStore } from "pinia"
export const useGoodsDataStore = defineStore('goods',()=>{
  const formInline = ref({
    id:'',
    name:'',
    outPrice:'',
    inPrice:'',
    image:'',
    kind:'',
    code:''
  });
  return {
  formInline,
}
})

