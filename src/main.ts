import {createApp} from 'vue'
import App from './App.vue'
import {router} from './router'

import "@vue-flow/core/dist/style.css"
import "@vue-flow/core/dist/theme-default.css"

import './assets/theme.css'
import './assets/base.css'

import {useCodeEditorWorker} from "@/components/code/worker/CodeEditorWorkers.ts";
import {registerTypeDeclareForMonacoEditor} from "@/components/code/language/typescript.ts";

const app = createApp(App)

app.use(router)

useCodeEditorWorker()
registerTypeDeclareForMonacoEditor()

app.mount('#app')
