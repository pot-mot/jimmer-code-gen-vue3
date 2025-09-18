<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import EnumerationViewer from "@/modelEditor/viewer/EnumerationViewer.vue";

const {contextData} = useModelEditor()

const props = defineProps<{
    id: string
}>()

const enumeration = computed(() => {
    return contextData.value?.enumerationMap.get(props.id)
})
</script>

<template>
    <EnumerationViewer v-if="enumeration" :enumeration="enumeration"/>
    <span v-else style="color: var(--danger-color);">[Enumeration not existed]</span>
</template>
