<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import EmbeddableTypeViewer from "@/modelEditor/viewer/EmbeddableTypeViewer.vue";

const {contextData} = useModelEditor()

const props = defineProps<{
    id: string
}>()

const embeddableType = computed(() => {
    return contextData.value?.embeddableTypeMap.get(props.id)
})
</script>

<template>
    <EmbeddableTypeViewer v-if="embeddableType" :embeddable-type="embeddableType"/>
    <span v-else style="color: var(--danger-color);">[EmbeddableType not existed]</span>
</template>
