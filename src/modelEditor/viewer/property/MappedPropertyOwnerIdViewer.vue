<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import EntityIdViewer from "@/modelEditor/viewer/EntityIdViewer.vue";

const {contextData} = useModelEditor()

const props = withDefaults(defineProps<{
    associationId: string
    ctrlFocus?: boolean
    hideComment?: boolean
}>(), {
    ctrlFocus: false
})

const association = computed(() => {
    return contextData.associationMap.get(props.associationId)?.association
})
</script>

<template>
    <EntityIdViewer
        v-if="association !== undefined"
        :id="association.referencedEntityId"
        :hide-comment="hideComment"
        :ctrl-focus="ctrlFocus"
    />
</template>
