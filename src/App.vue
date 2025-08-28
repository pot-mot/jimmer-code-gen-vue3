<script setup lang="ts">
import {initDeviceStore} from "@/store/deviceStore.ts";
import {initThemeStore} from "@/store/themeStore.ts";
import {initFocusTargetStore} from "@/store/focusTargetStore.ts";
import JsonEditor from "@/components/code/jsonEditor/JsonEditor.vue";
import {ref} from "vue";

initDeviceStore()
initThemeStore()
initFocusTargetStore()

const lazyShow = ref(false)
setTimeout(() => {
    lazyShow.value = true
}, 1000)
</script>

<template>
    <div style="height: 200px">
        <JsonEditor :json-type="'MyType'"/>
    </div>
    <div style="height: 200px" v-if="lazyShow">
        <JsonEditor :json-type="'MyType'"/>
    </div>

<!--    <RouterView/>-->
</template>
