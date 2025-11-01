<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import MappedSuperClassViewer from "@/modelEditor/viewer/MappedSuperClassViewer.vue";

const {contextData} = useModelEditor()

const props = withDefaults(defineProps<{
    id: string
    ctrlFocus?: boolean
    hideComment?: boolean
}>(), {
    ctrlFocus: false
})

const mappedSuperClass = computed(() => {
    return contextData.mappedSuperClassMap.get(props.id)
})
</script>

<template>
    <MappedSuperClassViewer
        :mapped-super-class="mappedSuperClass"
        :hide-comment="hideComment"
        :ctrl-focus="ctrlFocus"
    />
</template>
