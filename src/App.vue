<script setup lang="ts">
import {initDeviceStore} from "@/store/deviceStore.ts";
import {initThemeStore, useThemeStore} from "@/store/themeStore.ts";
import {initFocusTargetStore} from "@/store/focusTargetStore.ts";
import CodeEditor from "@/components/code/CodeEditor.vue";
import {ref} from "vue";
import DiffJsonEditor from "@/components/code/diffEditor/DiffJsonEditor.vue";

initDeviceStore()
initThemeStore()
initFocusTargetStore()

const themeStore = useThemeStore()

const originValue = ref('')
const modifiedValue = ref('')
</script>

<template>
    <button @click="themeStore.toggleTheme()">toggle</button>
    <div style="height: 100px;">
        <DiffJsonEditor :json-type="'MyType'" v-model:origin="originValue" v-model:modified="modifiedValue"/>
    </div>
    <div style="height: 100px;">
        <CodeEditor v-model="modifiedValue"/>
    </div>

    {{ originValue }}
    {{ modifiedValue }}
    <!--    <RouterView/>-->
</template>
