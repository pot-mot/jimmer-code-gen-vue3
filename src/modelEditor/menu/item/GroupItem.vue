<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import GroupViewer from "@/modelEditor/viewer/GroupViewer.vue";
import {computed} from "vue";

const props = defineProps<{
    group: Group
}>()

const {selectedIdSets, selectGroup, unselectGroup} = useModelEditor()

const isSelected = computed(() => {
    return selectedIdSets.value.groupIdSet.has(props.group.id)
})

const handleClick = (event: MouseEvent) => {
    const id = props.group.id
    if (event.ctrlKey) {
        selectGroup(id)
    } else {
        if (isSelected.value) {
            unselectGroup(id)
        } else {
            selectGroup(id)
        }
    }
}
</script>

<template>
    <div class="menu-item group-item" :class="{selected: isSelected}" @click="handleClick($event)">
        <GroupViewer :group="group"/>
    </div>
</template>
