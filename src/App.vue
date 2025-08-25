<script setup lang="ts">
import {useDeviceStore} from "@/store/deviceStore.ts";
import {useThemeStore} from "@/store/themeStore.ts";
import {useFocusTargetStore} from "@/store/focusTargetStore.ts";

useDeviceStore()
useThemeStore()
useFocusTargetStore()
</script>

<template>
    <RouterView/>
</template>
