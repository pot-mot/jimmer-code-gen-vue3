<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import MappedSuperClassViewer from "@/modelEditor/viewer/MappedSuperClassViewer.vue";

const {contextData} = useModelEditor()

const props = defineProps<{
    id: string
}>()

const mappedSuperClass = computed(() => {
    return contextData.value?.mappedSuperClassMap.get(props.id)
})
</script>

<template>
    <MappedSuperClassViewer v-if="mappedSuperClass" :mapped-super-class="mappedSuperClass"/>
    <span v-else style="color: var(--danger-color);">[MappedSuperClass not existed]</span>
</template>
