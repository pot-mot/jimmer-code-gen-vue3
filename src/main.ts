import {createApp} from 'vue'
import App from './App.vue'
import {router} from './router'

import './assets/theme.css'
import './assets/base.css'

import {useCodeEditor} from "@/components/code/CodeEditorWorkers.ts";
import {initTsScriptEditor} from "@/components/code/templateEditor/ts-script-executor.ts";

const app = createApp(App)

app.use(router)

useCodeEditor()
initTsScriptEditor()

app.mount('#app')
