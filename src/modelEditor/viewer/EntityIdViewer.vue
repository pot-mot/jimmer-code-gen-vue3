<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import EntityViewer from "@/modelEditor/viewer/EntityViewer.vue";

const {contextData} = useModelEditor()

const props = withDefaults(defineProps<{
    id: string
    ctrlFocus?: boolean
}>(), {
    ctrlFocus: false
})

const entity = computed(() => {
    return contextData.value?.entityMap.get(props.id)
})
</script>

<template>
    <EntityViewer v-if="entity" :entity="entity" :ctrl-focus="ctrlFocus"/>
    <span v-else style="color: var(--danger-color);">[Entity not existed]</span>
</template>
