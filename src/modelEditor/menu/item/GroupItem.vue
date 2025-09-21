<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import GroupViewer from "@/modelEditor/viewer/GroupViewer.vue";
import {computed} from "vue";
import ColorInput from "@/components/color/ColorInput.vue";
import {presetColor} from "@/type/context/default/modelDefaults.ts";

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
        class="group-item"
        :class="{
            selected: isSelected,
            current: currentGroupId === group.id
        }"
        @click="setToCurrentGroup"
    >
        <GroupViewer :group="group"/>

        <ColorInput v-model="group.color" :preset-colors="presetColor"/>
    </div>
</template>

<style scoped>
.group-item.current {
    color: var(--primary-color);
}

.group-item.selected.current {
    color: var(--text-color);
}
</style>
