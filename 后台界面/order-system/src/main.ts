import { createApp } from 'vue'
import { createPinia } from 'pinia'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import piniaPersist from 'pinia-plugin-persist'
// import './style.css'
//echarts
import * as echarts from 'echarts'
import router from './router'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import myConfirm from './utils/myConfirm'
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// createApp(App).mount('#app')
const pinia = createPinia()
//使用持久化插件
pinia.use(piniaPersist)
const app = createApp(App);
app.use(router).use(ElementPlus, {
    locale: zhCn,
  }).use(pinia).mount('#app')
//全局注册图标，在页面就可以直接使用
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component)
// }
//全局注册
app.config.globalProperties.$myconfirm = myConfirm
app.config.globalProperties.$echarts = echarts;
