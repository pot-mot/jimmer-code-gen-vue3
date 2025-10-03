<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import EnumerationViewer from "@/modelEditor/viewer/EnumerationViewer.vue";

const {contextData} = useModelEditor()

const props = withDefaults(defineProps<{
    id: string
    ctrlFocus?: boolean
}>(), {
    ctrlFocus: false
})

const enumeration = computed(() => {
    return contextData.value?.enumerationMap.get(props.id)
})
</script>

<template>
    <EnumerationViewer
        :enumeration="enumeration"
        :ctrl-focus="ctrlFocus"
    />
</template>
