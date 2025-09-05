<script setup lang="ts">
import {initDeviceStore} from "@/store/deviceStore.ts";
import {initThemeStore} from "@/store/themeStore.ts";
import {initFocusTargetStore} from "@/store/focusTargetStore.ts";
import TsScriptEditor from "@/components/code/scriptEditor/TsScriptEditor.vue";
import {TsScriptExecutor} from "@/components/code/scriptEditor/TsScriptExecutor.ts";

initDeviceStore()
initThemeStore()
initFocusTargetStore()

const executor = new TsScriptExecutor("TableGenerator")
</script>

<template>
    <TsScriptEditor :executor="executor"/>
    <RouterView/>
</template>
