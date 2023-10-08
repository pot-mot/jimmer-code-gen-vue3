import {createApp} from 'vue'
import App from './App.vue'
import {router} from './router'
import {pinia} from './store'

import './assets/base.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/button-overwrite.css'

const app = createApp(App)

app.use(router)
app.use(pinia)

app.use(ElementPlus, { size: 'small', zIndex: 5000 })

app.mount('#app')
