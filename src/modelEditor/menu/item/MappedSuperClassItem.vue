<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import MappedSuperClassViewer from "@/modelEditor/viewer/MappedSuperClassViewer.vue";
import {computed} from "vue";

const props = defineProps<{
    mappedSuperClass: MappedSuperClassWithProperties
}>()

const {selectedIdSets} = useModelEditor()

const isSelected = computed(() => {
    return selectedIdSets.value.mappedSuperClassIdSet.has(props.mappedSuperClass.id)
})
</script>

<template>
    <div class="menu-item mapped-super-class-item" :class="{selected: isSelected}">
        <MappedSuperClassViewer :mappedSuperClass="mappedSuperClass"/>
    </div>
</template>
