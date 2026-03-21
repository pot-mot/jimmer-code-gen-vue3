import {createApp} from 'vue';
import App from './App.vue';
import {router} from './router';

import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';

import '@potmot/list/es/index.css';
import {ListGlobalConfig} from '@potmot/list';

import './assets/theme.css';
import './assets/base.css';

import {useCodeEditorWorker} from '@/components/code/worker/CodeEditorWorkers.ts';
import {registerTypeDeclareForMonacoEditor} from '@/components/code/language/typescript.ts';
import {interactionClassNames} from '@/utils/event/judgeEventTarget.ts';
import {sendMessage} from '@/components/message/messageApi.ts';
import {translate} from '@/store/i18nStore.ts';

const app = createApp(App);

app.use(router);

useCodeEditorWorker();
registerTypeDeclareForMonacoEditor();

ListGlobalConfig.ignoreClassNames = interactionClassNames;
ListGlobalConfig.pasteErrorHandler = () => {
    sendMessage(translate('paste_fail_tip'));
};

app.mount('#app');
