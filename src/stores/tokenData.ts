import { defineStore } from "pinia"
import { reactive, ref } from 'vue'
export const tokenStore = defineStore(
  'tokenData',
  () => {
    const token = ref('')
    const user = reactive({
      username: '',
      identity: 0,
    });

    const setToken = (newToken: string) => {
      token.value = newToken;
    };

    const removeToken = () => {
      token.value = ''
    }

    const setUser = (username:string, id:number) =>{
      user.username = username;
      user.identity = id;
    };

    const removeUser = () =>{
      user.username = '';
      user.identity = 0;
    };

    return {
      token,
      user,
      setToken,
      removeToken,
      setUser,
      removeUser,
    }
  }, {
  persist: true
});