<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import AssociationViewer from "@/modelEditor/viewer/AssociationViewer.vue";

const {contextData} = useModelEditor()

const props = defineProps<{
    id: string
}>()

const association = computed(() => {
    return contextData.value?.associationMap.get(props.id)
})
</script>

<template>
    <AssociationViewer v-if="association" :association="association"/>
    <span v-else style="color: var(--danger-color);">[Association not existed]</span>
</template>
