<script setup lang="ts">
import {initDeviceStore} from "@/store/deviceStore.ts";
import {initThemeStore} from "@/store/themeStore.ts";
import {initFocusTargetStore} from "@/store/focusTargetStore.ts";
import TypeScriptTemplateEditor from "@/components/code/templateEditor/TypeScriptTemplateEditor.vue";

initDeviceStore()
initThemeStore()
initFocusTargetStore()
</script>

<template>
    <TypeScriptTemplateEditor
        :function-param-types="['string', 'MyType']"
        :param-type-files="new Map([['MyType.ts', 'export type MyType = {name: string, type: string}']])"
    />
<!--    <RouterView/>-->
</template>
