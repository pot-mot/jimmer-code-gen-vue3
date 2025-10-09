<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import EntityViewer from "@/modelEditor/viewer/EntityViewer.vue";

const {contextData} = useModelEditor()

const props = withDefaults(defineProps<{
    id: string
    ctrlFocus?: boolean
    hideComment?: boolean
}>(), {
    ctrlFocus: false
})

const entity = computed(() => {
    return contextData.value?.entityMap.get(props.id)
})
</script>

<template>
    <EntityViewer
        :entity="entity"
        :hide-comment="hideComment"
        :ctrl-focus="ctrlFocus"
    />
</template>
