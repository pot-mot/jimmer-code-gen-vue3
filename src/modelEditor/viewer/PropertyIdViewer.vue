<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import PropertyViewer from "@/modelEditor/viewer/PropertyViewer.vue";

const {contextData} = useModelEditor()

const props = defineProps<{
    entityId: string
    id: string
}>()

const property = computed(() => {
    return contextData.value?.entityMap.get(props.entityId)?.properties.find(p => p.id === props.id)
})
</script>

<template>
    <PropertyViewer v-if="property" :property="property"/>
    <span v-else style="color: var(--danger-color);">[Property not existed]</span>
</template>
