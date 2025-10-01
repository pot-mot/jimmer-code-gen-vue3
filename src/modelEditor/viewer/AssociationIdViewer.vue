<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import AssociationViewer from "@/modelEditor/viewer/AssociationViewer.vue";

const {contextData} = useModelEditor()

const props = withDefaults(defineProps<{
    id: string
    ctrlFocus?: boolean
}>(), {
    ctrlFocus: false
})

const association = computed(() => {
    return contextData.value?.associationMap.get(props.id)?.association
})
</script>

<template>
    <AssociationViewer
        :association="association"
        :ctrl-focus="ctrlFocus"
    />
</template>
