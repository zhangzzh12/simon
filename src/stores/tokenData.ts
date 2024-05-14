import { defineStore } from "pinia"
import { ref } from 'vue'
export const tokenStore = defineStore(
  'tokenData',
  () => {
    const token = ref('')

    const setToken = (newToken: string) => {
      token.value = newToken;
    };

    const removeToken = () => {
      token.value = ''
    }

    return {
      token,
      setToken,
      removeToken
    }
  }, {
  persist: true
});