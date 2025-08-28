<script setup lang="ts">
import {initDeviceStore} from "@/store/deviceStore.ts";
import {initThemeStore} from "@/store/themeStore.ts";
import {initFocusTargetStore} from "@/store/focusTargetStore.ts";
import TsTemplateEditor from "@/components/code/templateEditor/TsTemplateEditor.vue";

initDeviceStore()
initThemeStore()
initFocusTargetStore()
</script>

<template>
    <TsTemplateEditor
        :function-param-types="['string', 'MyType']"
        :param-type-files="new Map([['MyType.d.ts', 'type MyType = {name: string, type: string}']])"
    />
<!--    <RouterView/>-->
</template>
