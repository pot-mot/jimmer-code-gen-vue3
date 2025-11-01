<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import GroupViewer from "@/modelEditor/viewer/GroupViewer.vue";
import EnumerationViewer from "@/modelEditor/viewer/EnumerationViewer.vue";

const {contextData} = useModelEditor()

const props = withDefaults(defineProps<{
    id: string
    ctrlFocus?: boolean
    hideComment?: boolean
}>(), {
    ctrlFocus: false
})

const group = computed(() => {
    return contextData.groupMap.get(props.id)
})
</script>

<template>
    <GroupViewer
        :group="group"
        :hide-comment="hideComment"
        :ctrl-focus="ctrlFocus"
    />
</template>
