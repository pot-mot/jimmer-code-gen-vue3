<script setup lang="ts">
import {initDeviceStore} from "@/store/deviceStore.ts";
import {initThemeStore, useThemeStore} from "@/store/themeStore.ts";
import {initFocusTargetStore} from "@/store/focusTargetStore.ts";
import {ref, useTemplateRef} from "vue";
import DiffJsonEditor from "@/components/code/jsonEditor/DiffJsonEditor.vue";
import JsonEditor from "@/components/code/jsonEditor/JsonEditor.vue";

initDeviceStore()
initThemeStore()
initFocusTargetStore()

const themeStore = useThemeStore()

const originValue = ref('')
const modifiedValue = ref('')

const diffJsonEditorRef = useTemplateRef('diffJsonEditorRef')
const jsonEditorRef = useTemplateRef('jsonEditorRef')

const validate = () => {
    alert(JSON.stringify(diffJsonEditorRef.value?.validate()))
    alert(JSON.stringify(jsonEditorRef.value?.validate()))
}
</script>

<template>
    <button @click="themeStore.toggleTheme()">toggle</button>
    <button @click="validate">validate</button>
    <div style="height: 100px;">
        <DiffJsonEditor ref="diffJsonEditorRef" :json-type="'MyType'" :origin-value="originValue" v-model="modifiedValue"/>
    </div>
    <div style="height: 100px;">
        <JsonEditor ref="jsonEditorRef" :json-type="'MyType'" v-model="modifiedValue"/>
    </div>

    <!--    <RouterView/>-->
</template>
