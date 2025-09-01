<script setup lang="ts">
import {initDeviceStore} from "@/store/deviceStore.ts";
import {initThemeStore} from "@/store/themeStore.ts";
import {initFocusTargetStore} from "@/store/focusTargetStore.ts";
import JsonEditor from "@/components/code/jsonEditor/JsonEditor.vue";

initDeviceStore()
initThemeStore()
initFocusTargetStore()
</script>

<template>
    <JsonEditor json-type="EntityProperty"/>
    <!--    <RouterView/>-->
</template>
