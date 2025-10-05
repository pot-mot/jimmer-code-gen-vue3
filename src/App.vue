<script setup lang="ts">
import {initDeviceStore} from "@/store/deviceStore.ts";
import {initThemeStore, useThemeStore} from "@/store/themeStore.ts";
import {initFocusTargetStore} from "@/store/focusTargetStore.ts";
import IconLight from "@/components/icons/IconLight.vue";
import IconDark from "@/components/icons/IconDark.vue";
import {initKeyboardStore} from "@/store/keyBoardStore.ts";
import {initModelGenerator} from "@/modelEditor/generator/useModelGenerator.ts";
import {withLoading} from "@/components/loading/loadingApi.ts";

withLoading("Initialize...", async () => {
    initDeviceStore()
    initThemeStore()
    initFocusTargetStore()
    initKeyboardStore()
    await initModelGenerator()
})

const themeStore = useThemeStore()
</script>

<template>
    <div @click="themeStore.toggleTheme()" style="position: absolute; bottom: 0; left: 0;">
        <IconLight v-if="themeStore.theme.value === 'light'"/>
        <IconDark v-else-if="themeStore.theme.value === 'dark'"/>
    </div>
    <RouterView/>
</template>
