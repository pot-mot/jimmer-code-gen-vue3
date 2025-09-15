import {createApp} from 'vue'
import App from './App.vue'
import {router} from './router'

import "@vue-flow/core/dist/style.css"
import "@vue-flow/core/dist/theme-default.css"

import './assets/theme.css'
import './assets/base.css'

import {useCodeEditor} from "@/components/code/CodeEditorWorkers.ts";
import {initMonacoTsScriptEditor} from "@/components/code/scriptEditor/TsScriptExecutor.ts";

const app = createApp(App)

app.use(router)

useCodeEditor()
initMonacoTsScriptEditor()

app.mount('#app')
