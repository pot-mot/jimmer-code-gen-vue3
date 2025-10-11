<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import ColorInput from "@/components/color/ColorInput.vue";
import {presetColor} from "@/type/context/default/modelDefaults.ts";
import NameCommentEditor from "@/modelEditor/nameComment/NameCommentEditor.vue";
import IconDelete from "@/components/icons/IconDelete.vue";

const group = defineModel<Group>({required: true})

const {
    selectedIdSets,
    currentGroupId,
    toggleCurrentGroup,
    remove,
    groupNameSet,
} = useModelEditor()

const isSelected = computed(() => {
    return selectedIdSets.value.groupIdSet.has(group.value.id)
})

const setToCurrentGroup = () => {
    toggleCurrentGroup({id: group.value.id})
}

const handleRemove = () => {
    remove({groupIds: [group.value.id]})
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
        <ColorInput
            v-model="group.color"
            :preset-colors="presetColor"
            style="margin-top: 0.3rem; margin-right: 0.25rem;"
        />
        <NameCommentEditor
            v-model="group"
            :name-set="groupNameSet"
            :font-size="14"
        />

        <div class="tool">
            <button @click.stop="handleRemove">
                <IconDelete/>
            </button>
        </div>
    </div>
</template>

<style scoped>
.group-item.current > .name-comment-editor :deep(.name) > input {
    color: var(--primary-color);
}

.group-item.selected > .name-comment-editor :deep(.name) > input,
.selected .group-item > .name-comment-editor :deep(.name) > input{
    color: inherit;
}
</style>
