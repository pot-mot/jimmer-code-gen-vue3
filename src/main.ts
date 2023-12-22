import {createApp} from 'vue'
import App from './App.vue'
import {router} from './router'
import {createPinia} from 'pinia'

import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'

import './assets/base.css'
import './assets/util.css'
import './components/global/list/list.css'
import './assets/element-overwrite.css'
import './assets/antv-x6-animation.css'

import {registerModelShape} from "@/components/business/modelGraphEditor/register.ts";
import {useCodeEditor} from "@/components/global/code/CodeEditorWorkers.ts";

const app = createApp(App)

app.use(router)

export const pinia = createPinia()
app.use(pinia)

app.use(ElementPlus, { size: 'small', zIndex: 2000 })
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

registerModelShape()

useCodeEditor()

app.mount('#app')
