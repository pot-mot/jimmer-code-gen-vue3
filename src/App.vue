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
    <TypeScriptTemplateEditor/>
<!--    <RouterView/>-->
</template>
