<script setup lang="ts">
import IconCopy from "@/components/icons/IconCopy.vue";
import IconPaste from "@/components/icons/IconPaste.vue";
import IconCut from "@/components/icons/IconCut.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import {translate} from "@/store/i18nStore.ts";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {useModelContextMenu} from "@/modelEditor/contextMenu/useModelContextMenu.ts";
import {subIdSetToSubIds} from "@/type/context/utils/ModelSubIds.ts";
import {validatePartialModelGraphSubData} from "@/type/context/jsonSchema/PartialModelGraphSubData.ts";
import {readText} from "clipboard-polyfill";
import {onMounted, ref} from "vue";

const {
    modelSelection,
    modelSelectionCount,
    paste,
    copy,
    cut,
    remove,
} = useModelEditor()

const {
    close
} = useModelContextMenu()

const canPaste = ref(false)

const calcCanPaste = async () => {
    try {
        const text = await readText()
        const json = JSON.parse(text)
        canPaste.value = validatePartialModelGraphSubData(json)
    } catch (e) {
        console.warn(e)
        canPaste.value = false
    }
}

onMounted(() => {
    calcCanPaste()
})

const handlePasteClick = async () => {
    await calcCanPaste()
    if (!canPaste.value) return
    await paste()
    close()
}

const handleCopyClick = async () => {
    if (modelSelectionCount.value === 0) return
    await copy()
    close()
}

const handleCutClick = async () => {
    if (modelSelectionCount.value === 0) return
    await cut()
    close()
}

const handleDeleteClick = () => {
    if (modelSelectionCount.value === 0) return
    remove(subIdSetToSubIds(modelSelection.selectedIdSets.value))
    close()
}
</script>

<template>
    <ul class="context-menu-item-list">
        <li @click="handlePasteClick" :class="{disabled: !canPaste}">
            <IconPaste class="icon"/>
            <span class="label">{{ translate('paste') }}</span>
            <span class="shortcut">[Ctrl + V]</span>
        </li>
        <li @click="handleCopyClick" :class="{disabled: modelSelectionCount === 0}">
            <IconCopy class="icon"/>
            <span class="label">{{ translate('copy') }}</span>
            <span class="shortcut">[Ctrl + C]</span>
        </li>
        <li @click="handleCutClick" :class="{disabled: modelSelectionCount === 0}">
            <IconCut class="icon"/>
            <span class="label">{{ translate('cut') }}</span>
            <span class="shortcut">[Ctrl + X]</span>
        </li>
        <li @click="handleDeleteClick" v-if="modelSelectionCount !== 0">
            <IconDelete class="icon"/>
            <span class="label">{{ translate('delete') }}</span>
            <span class="shortcut">[Delete]</span>
        </li>
    </ul>
</template>
