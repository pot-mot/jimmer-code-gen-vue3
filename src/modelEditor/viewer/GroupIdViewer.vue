<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import GroupViewer from "@/modelEditor/viewer/GroupViewer.vue";
import EnumerationViewer from "@/modelEditor/viewer/EnumerationViewer.vue";

const {contextData} = useModelEditor()

const props = withDefaults(defineProps<{
    id: string
    ctrlFocus?: boolean
}>(), {
    ctrlFocus: false
})

const group = computed(() => {
    return contextData.value?.groupMap.get(props.id)
})
</script>

<template>
    <GroupViewer
        :group="group"
        :ctrl-focus="ctrlFocus"
    />
</template>
