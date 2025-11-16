<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import EntityPropertyViewer from "@/modelEditor/viewer/property/EntityPropertyViewer.vue";

const {contextData} = useModelEditor()

const props = withDefaults(defineProps<{
    entityId: string
    id: string
    ctrlFocus?: boolean
    hideComment?: boolean
}>(), {
    ctrlFocus: false
})

const property = computed(() => {
    return contextData.entityMap.get(props.entityId)?.properties.find(p => p.id === props.id)
})
</script>

<template>
    <EntityPropertyViewer
        :entity-id="entityId"
        :property="property"
        :hide-comment="hideComment"
        :ctrl-focus="ctrlFocus"
    />
</template>
