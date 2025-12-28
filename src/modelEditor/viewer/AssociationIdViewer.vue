<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import AssociationIdOnlyViewer from "@/modelEditor/viewer/AssociationIdOnlyViewer.vue";

const {contextData} = useModelEditor()

const props = withDefaults(defineProps<{
    id: string
    ctrlFocus?: boolean
    hideComment?: boolean
}>(), {
    ctrlFocus: false
})

const association = computed(() => {
    return contextData.associationMap.get(props.id)?.association
})
</script>

<template>
    <AssociationIdOnlyViewer
        :association="association"
        :hide-comment="hideComment"
        :ctrl-focus="ctrlFocus"
    />
</template>
