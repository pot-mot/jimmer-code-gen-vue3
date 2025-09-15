<script setup lang="ts">
import {initDeviceStore} from "@/store/deviceStore.ts";
import {initThemeStore} from "@/store/themeStore.ts";
import {initFocusTargetStore} from "@/store/focusTargetStore.ts";

initDeviceStore()
initThemeStore()
initFocusTargetStore()
</script>

<template>
    <RouterView/>
</template>
