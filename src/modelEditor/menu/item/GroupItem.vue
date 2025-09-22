<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import ColorInput from "@/components/color/ColorInput.vue";
import {presetColor} from "@/type/context/default/modelDefaults.ts";
import NameCommentEditor from "@/modelEditor/nameEditor/NameCommentEditor.vue";

const group = defineModel<Group>({required: true})

const {
    selectedIdSets,
    currentGroupId,
    toggleCurrentGroup,
} = useModelEditor()

const isSelected = computed(() => {
    return selectedIdSets.value.groupIdSet.has(group.value.id)
})

const setToCurrentGroup = () => {
    toggleCurrentGroup({id: group.value.id})
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
        <ColorInput v-model="group.color" :preset-colors="presetColor" style="margin-top: 0.3rem; margin-right: 0.25rem;"/>
        <NameCommentEditor v-model="group"/>
    </div>
</template>

<style scoped>
.group-item.current,
.group-item.current > .name-comment-editor :deep(input) {
    color: var(--primary-color);
}

.group-item.selected.current,
.group-item.selected.current > .name-comment-editor :deep(input){
    color: var(--text-color);
}
</style>
