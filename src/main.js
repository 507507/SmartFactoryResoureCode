import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// import './assets/main.css'
import './style.css' //自定义样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue' // 引入所有图标，并命名为 Icons
const app = createApp(App)
for (let i in Icons) {
  app.component(i, Icons[i])
}
app.use(ElementPlus)
app.use(createPinia())
app.use(router)
app.mount('#app')
