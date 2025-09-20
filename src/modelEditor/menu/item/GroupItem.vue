<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import GroupViewer from "@/modelEditor/viewer/GroupViewer.vue";
import {computed} from "vue";

const props = defineProps<{
    group: Group
}>()

const {
    selectedIdSets,
    currentGroupId,
    toggleCurrentGroup,
} = useModelEditor()

const isSelected = computed(() => {
    return selectedIdSets.value.groupIdSet.has(props.group.id)
})

const setToCurrentGroup = () => {
    toggleCurrentGroup({id: props.group.id})
}
</script>

<template>
    <div
        class="menu-item group-item"
        :class="{
            selected: isSelected,
            current: currentGroupId === group.id
        }"
        @click="setToCurrentGroup"
    >
        <GroupViewer :group="group"/>
    </div>
</template>
