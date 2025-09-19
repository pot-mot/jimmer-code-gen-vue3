<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import MappedSuperClassViewer from "@/modelEditor/viewer/MappedSuperClassViewer.vue";
import {computed} from "vue";

const props = defineProps<{
    mappedSuperClass: MappedSuperClassWithProperties
}>()

const {selectedIdSets, selectMappedSuperClass, unselectMappedSuperClass} = useModelEditor()

const isSelected = computed(() => {
    return selectedIdSets.value.mappedSuperClassIdSet.has(props.mappedSuperClass.id)
})

const handleClick = (event: MouseEvent) => {
    const id = props.mappedSuperClass.id
    if (event.ctrlKey) {
        selectMappedSuperClass(id)
    } else {
        if (isSelected.value) {
            unselectMappedSuperClass(id)
        } else {
            selectMappedSuperClass(id)
        }
    }
}
</script>

<template>
    <div class="menu-item mapped-super-class-item" :class="{selected: isSelected}" @click="handleClick($event)">
        <MappedSuperClassViewer :mappedSuperClass="mappedSuperClass"/>
    </div>
</template>
