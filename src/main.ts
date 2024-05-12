import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import '@/assets/style/reset.scss'

const app = createApp(App);
const pinia =createPinia();

pinia.use(piniaPluginPersistedstate);
app.use(router);
app.use(pinia);
app.mount('#app');
