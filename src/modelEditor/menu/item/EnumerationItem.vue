<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import EnumerationViewer from "@/modelEditor/viewer/EnumerationViewer.vue";
import {computed} from "vue";

const props = defineProps<{
    enumeration: Enumeration
}>()

const {selectedIdSets} = useModelEditor()

const isSelected = computed(() => {
    return selectedIdSets.value.enumerationIdSet.has(props.enumeration.id)
})
</script>

<template>
    <div class="menu-item enumeration-item" :class="{selected: isSelected}">
        <EnumerationViewer :enumeration="enumeration"/>
    </div>
</template>
