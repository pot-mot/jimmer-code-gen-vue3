<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import EmbeddableTypePropertyViewer from "@/modelEditor/viewer/property/EmbeddableTypePropertyViewer.vue";

const {contextData} = useModelEditor()

const props = withDefaults(defineProps<{
    embeddableTypeId: string
    id: string
    ctrlFocus?: boolean
    hideComment?: boolean
}>(), {
    ctrlFocus: false
})

const property = computed(() => {
    return contextData.embeddableTypeMap.get(props.embeddableTypeId)?.properties.find(p => p.id === props.id)
})
</script>

<template>
    <EmbeddableTypePropertyViewer
        :embeddable-type-id="embeddableTypeId"
        :property="property"
        :hide-comment="hideComment"
        :ctrl-focus="ctrlFocus"
    />
</template>
