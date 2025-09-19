<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import EnumerationViewer from "@/modelEditor/viewer/EnumerationViewer.vue";
import {computed} from "vue";

const props = defineProps<{
    enumeration: Enumeration
}>()

const {selectedIdSets, selectEnumeration, unselectEnumeration} = useModelEditor()

const isSelected = computed(() => {
    return selectedIdSets.value.enumerationIdSet.has(props.enumeration.id)
})

const handleClick = (event: MouseEvent) => {
    const id = props.enumeration.id
    if (event.ctrlKey) {
        selectEnumeration(id)
    } else {
        if (isSelected.value) {
            unselectEnumeration(id)
        } else {
            selectEnumeration(id)
        }
    }
}
</script>

<template>
    <div class="menu-item enumeration-item" :class="{selected: isSelected}" @click="handleClick($event)">
        <EnumerationViewer :enumeration="enumeration"/>
    </div>
</template>
