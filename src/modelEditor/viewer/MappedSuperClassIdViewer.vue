<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import MappedSuperClassViewer from "@/modelEditor/viewer/MappedSuperClassViewer.vue";

const {contextData} = useModelEditor()

const props = withDefaults(defineProps<{
    id: string
    ctrlFocus?: boolean
}>(), {
    ctrlFocus: false
})

const mappedSuperClass = computed(() => {
    return contextData.value?.mappedSuperClassMap.get(props.id)
})
</script>

<template>
    <MappedSuperClassViewer :mapped-super-class="mappedSuperClass"/>
</template>
