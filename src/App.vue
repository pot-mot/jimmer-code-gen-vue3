<script setup lang="ts">
import {initDeviceStore} from "@/store/deviceStore.ts";
import {initThemeStore, useThemeStore} from "@/store/themeStore.ts";
import {initFocusTargetStore} from "@/store/focusTargetStore.ts";
import IconLight from "@/components/icons/IconLight.vue";
import IconDark from "@/components/icons/IconDark.vue";
import {initKeyboardStore} from "@/store/keyBoardStore.ts";
import {withLoading} from "@/components/loading/loadingApi.ts";
import {languageTypes, useI18nStore} from "@/store/i18nStore.ts";
import {initTypeMapping} from "@/modelEditor/typeMapping/useTypeMapping.ts";
import {initScriptDialog} from "@/modelEditor/script/useScriptDialog.ts";

withLoading("Initialize Store", async () => {
    initDeviceStore()
    initThemeStore()
    initFocusTargetStore()
    initKeyboardStore()
    await Promise.all([
        initScriptDialog(),
        initTypeMapping(),
    ])
})

const themeStore = useThemeStore()
const i18nStore = useI18nStore()
</script>

<template>
    <div class="global-config">
        <div @click="themeStore.toggleTheme()">
            <IconLight v-if="themeStore.theme.value === 'light'"/>
            <IconDark v-else-if="themeStore.theme.value === 'dark'"/>
        </div>

        <div style="display: flex; gap: 0.5rem;">
            <span
                v-for="language of languageTypes"
                @click="i18nStore.setLanguage(language)"
                style="cursor: pointer;"
                :style="{
                    color: i18nStore.language.value === language ? 'var(--primary-color)' : ''
                }"
            >
                {{ language }}
            </span>
        </div>
    </div>
    <RouterView/>
</template>

<style scoped>
.global-config {
    z-index: var(--message-z-index);
    position: fixed;
    bottom: 0.5rem;
    left: 0.5rem;
    display: flex;
    gap: 0.5rem;
    background-color: var(--background-color-hover);
    border-radius: var(--border-radius);
    overflow: hidden;
    padding: 0.25rem 0.5rem;
}
</style>
