<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import MappedSuperClassPropertyViewer from "@/modelEditor/viewer/property/MappedSuperClassPropertyViewer.vue";

const {contextData} = useModelEditor()

const props = withDefaults(defineProps<{
    mappedSuperClassId: string
    id: string
    ctrlFocus?: boolean
    hideComment?: boolean
}>(), {
    ctrlFocus: false
})

const property = computed(() => {
    return contextData.mappedSuperClassMap.get(props.mappedSuperClassId)?.properties.find(p => p.id === props.id)
})
</script>

<template>
    <MappedSuperClassPropertyViewer
        :mapped-super-class-id="mappedSuperClassId"
        :property="property"
        :hide-comment="hideComment"
        :ctrl-focus="ctrlFocus"
    />
</template>
