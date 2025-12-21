<script setup lang="ts">
import IconCopy from "@/components/icons/IconCopy.vue";
import IconCut from "@/components/icons/IconCut.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import {translate} from "@/store/i18nStore.ts";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {useModelContextMenu} from "@/modelEditor/contextMenu/useModelContextMenu.ts";
import {computed, watch} from "vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import {useGroupEditDialog} from "@/modelEditor/group/useGroupEditDialog.ts";
import IconPaste from "@/components/icons/IconPaste.vue";
import {overrideGroupProducer, useModelEditorPaste} from "@/modelEditor/contextMenu/item/useModelEditorPaste.ts";

const props = defineProps<{
    id: string
}>()

const {
    contextData,
    copy,
    cut,
    remove,
} = useModelEditor()

const {
    close
} = useModelContextMenu()

const {
    open: openGroupEditDialog
} = useGroupEditDialog()

const group = computed(() => {
    return contextData.groupMap.get(props.id)
})

watch(() => group.value, (value) => {
    if (!value) {
        close()
    }
}, {immediate: true})

const {canPaste, handlePaste} = useModelEditorPaste(
    overrideGroupProducer(() => props.id)
)

const handleEditClick = () => {
    if (group.value) {
        openGroupEditDialog(group.value)
    }
    close()
}

const handleCopyClick = async () => {
    if (group.value) {
        await copy({
            groups: [group.value]
        })
        close()
    }
}

const handleCutClick = async () => {
    if (group.value) {
        await cut({
            groups: [group.value]
        })
        close()
    }
}

const handleDeleteClick = () => {
    remove({groupIds: [props.id]})
    close()
}
</script>

<template>
    <ul class="context-menu-item-list">
        <li @click="handlePaste" :class="{disabled: !canPaste}">
            <IconPaste class="icon"/>
            <span class="label">{{ translate('paste') }}</span>
            <span class="shortcut">[Ctrl + V]</span>
        </li>
        <li @click="handleEditClick">
            <IconEdit class="icon"/>
            <span class="label">{{ translate('edit') }}</span>
        </li>
        <li @click="handleCopyClick">
            <IconCopy class="icon"/>
            <span class="label">{{ translate('copy') }}</span>
            <span class="shortcut">[Ctrl + C]</span>
        </li>
        <li @click="handleCutClick">
            <IconCut class="icon"/>
            <span class="label">{{ translate('cut') }}</span>
            <span class="shortcut">[Ctrl + X]</span>
        </li>
        <li @click="handleDeleteClick">
            <IconDelete class="icon"/>
            <span class="label">{{ translate('delete') }}</span>
            <span class="shortcut">[Delete]</span>
        </li>
    </ul>
</template>
