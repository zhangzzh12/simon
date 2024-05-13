import axios from 'axios'
import { tokenStore } from '@/stores/tokenData.ts'
const baseURL = 'https://eel-rapid-grizzly.ngrok-free.app'
const instance = axios.create({
    baseURL,
    timeout: 5000
})
//请求拦截器
instance.interceptors.request.use(
    (config) => {
        const tokenstore = tokenStore()
        if (tokenstore.token) {
            config.headers.Authorization = tokenstore.token
        }
        return config
    },
    (err) => {
        return Promise.reject(err)
    }
)

//响应拦截器
instance.interceptors.response.use(
    (res) => {
        if (res.data.code === 1) {
            return res
        }
        ElMessage.error(res.data.msg)
        return Promise.reject(res.data)
    },
    (err) => {
        ElMessage.error(err.response.data.message)
        return Promise.reject(err)
    }
)
export default instance