<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import ColorInput from "@/components/color/ColorInput.vue";
import {presetColor} from "@/type/context/default/modelDefaults.ts";
import NameCommentEditor from "@/modelEditor/nameComment/NameCommentEditor.vue";
import type {DiagnoseMessage} from "@/modelEditor/diagnostic/ModelDiagnoseInfo.ts";
import DiagnoseCount from "@/modelEditor/diagnostic/DiagnoseCount.vue";

const group = defineModel<Group>({required: true})

const {
    modelDiagnoseInfo,
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

const allDiagnoseMessages = computed(() => {
    const messages: DiagnoseMessage[] = []
    const diagnoseInfo = modelDiagnoseInfo.groupMap.get(group.value.id)
    if (diagnoseInfo !== undefined) {
        messages.push(...diagnoseInfo.group)
    }
    return messages
})
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
        </div>

        <DiagnoseCount
            :messages="allDiagnoseMessages"
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
