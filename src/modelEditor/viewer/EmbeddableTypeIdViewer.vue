<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import EmbeddableTypeViewer from "@/modelEditor/viewer/EmbeddableTypeViewer.vue";

const {contextData} = useModelEditor()

const props = withDefaults(defineProps<{
    id: string
    ctrlFocus?: boolean
    hideComment?: boolean
}>(), {
    ctrlFocus: false
})

const embeddableType = computed(() => {
    return contextData.embeddableTypeMap.get(props.id)
})
</script>

<template>
    <EmbeddableTypeViewer
        :embeddable-type="embeddableType"
        :hide-comment="hideComment"
        :ctrl-focus="ctrlFocus"
    />
</template>
