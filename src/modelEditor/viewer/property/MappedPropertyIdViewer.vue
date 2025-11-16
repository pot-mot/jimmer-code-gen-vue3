<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import MappedPropertyViewer from "@/modelEditor/viewer/property/MappedPropertyViewer.vue";

const {contextData} = useModelEditor()

const props = withDefaults(defineProps<{
    associationId: string
    ctrlFocus?: boolean
    hideComment?: boolean
}>(), {
    ctrlFocus: false
})

const property = computed(() => {
    return contextData.associationMap.get(props.associationId)?.association.mappedProperty
})
</script>

<template>
    <MappedPropertyViewer
        :association-id="associationId"
        :property="property"
        :hide-comment="hideComment"
        :ctrl-focus="ctrlFocus"
    />
</template>
