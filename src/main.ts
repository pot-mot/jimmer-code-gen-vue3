import {createApp} from 'vue'
import App from './App.vue'
import {router} from './router'

import './assets/theme.css'
import './assets/base.css'

import {useCodeEditor} from "@/components/code/CodeEditorWorkers.ts";
import {initTsTemplateEditor} from "@/components/code/templateEditor/monaco-config.ts";

const app = createApp(App)

app.use(router)

useCodeEditor()
initTsTemplateEditor()

app.mount('#app')
