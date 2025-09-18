<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import GroupViewer from "@/modelEditor/viewer/GroupViewer.vue";

const {contextData} = useModelEditor()

const props = defineProps<{
    id: string
}>()

const group = computed(() => {
    return contextData.value?.groupMap.get(props.id)
})
</script>

<template>
    <GroupViewer v-if="group" :group="group"/>
    <span v-else style="color: var(--danger-color);">[Group not existed]</span>
</template>
