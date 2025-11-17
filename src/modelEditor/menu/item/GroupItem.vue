<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import ColorInput from "@/components/color/ColorInput.vue";
import {presetColor} from "@/type/context/default/modelDefaults.ts";
import NameCommentEditor from "@/modelEditor/nameComment/NameCommentEditor.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import DiagnoseViewer from "@/modelEditor/diagnostic/DiagnoseViewer.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import {useGroupEditDialog} from "@/modelEditor/group/useGroupEditDialog.ts";

const group = defineModel<Group>({required: true})

const {
    modelDiagnoseInfo,
    selectedIdSets,
    currentGroupId,
    toggleCurrentGroup,
    remove,
} = useModelEditor()

const {
    open: handleEdit,
} = useGroupEditDialog()

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
        <div class="menu-label">
            <ColorInput
                v-model="group.color"
                :preset-colors="presetColor"
                class="menu-icon"
            />
            <NameCommentEditor
                v-model="group"
                :font-size="14"
            />

            <div class="tool">
                <button @click.stop="handleEdit(group)">
                    <IconEdit/>
                </button>
                <button @click.stop="handleRemove">
                    <IconDelete/>
                </button>
            </div>
        </div>

        <DiagnoseViewer
            :messages="modelDiagnoseInfo.groupMap.get(group.id)?.group"
        />
    </div>
</template>

<style scoped>
.group-item.current .name-comment-editor :deep(.name) > input {
    color: var(--primary-color);
}

.group-item.selected .name-comment-editor :deep(.name) > input,
.selected .group-item .name-comment-editor :deep(.name) > input{
    color: inherit;
}
</style>
