import {createApp} from 'vue'
import App from './App.vue'
import {router} from './router'
// 仓库
import {createPinia} from 'pinia'

// 创建仓库
export const pinia = createPinia()

import './assets/base.css'
import './assets/util.css'

import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import './assets/element-overwrite.css'
import './assets/prism-overwrite.css'

const app = createApp(App)

app.use(router)
app.use(pinia)

app.use(ElementPlus, { size: 'small', zIndex: 2000 })
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')