<script setup lang="ts">
import {initDeviceStore} from "@/store/deviceStore.ts";
import {initThemeStore} from "@/store/themeStore.ts";
import {initFocusTargetStore} from "@/store/focusTargetStore.ts";
import {validateAssociation} from "@/type/__generated/jsonSchema/items/Association.ts";

initDeviceStore()
initThemeStore()
initFocusTargetStore()
</script>

<template>
    {{ validateAssociation({
    id: '1',
    name: '1',
    type: 'MANY_TO_ONE',
    sourceEntityId: '1',
    targetEntityId: '1',
    sourcePropertyId: '1',
    targetPropertyId: '1',
}) }}

    <!--    <RouterView/>-->
</template>
