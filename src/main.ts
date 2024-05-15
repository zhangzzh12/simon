import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import '@/assets/style/reset.scss'
import { tokenStore } from './stores/tokenData'
import router from './router'

const app = createApp(App);
const pinia =createPinia();

pinia.use(piniaPluginPersistedstate);
app.use(router);
app.use(pinia);

const token = tokenStore();

// 全局前置路由守卫 
router.beforeEach((to, from, next) => {
    // 判断是否为存在的路径 不是则回到主页路由
    let check = router.getRoutes().filter((item) => {
      return item.path == to.path
    }).length
    if (!check) {
      next('/')
    }
   
    // 已登录
    if (token.token) {
      // 不能再跳转到login
      if (to.fullPath == '/login') {
        next(from.path)
      } else {
        next()
      }
    } else { // 未登录
      if (to.path != '/login') {
        // 不能访问登录页以外的页面
        next('/login')
      } else {
        next()
      }
    }
  })

app.mount('#app');
