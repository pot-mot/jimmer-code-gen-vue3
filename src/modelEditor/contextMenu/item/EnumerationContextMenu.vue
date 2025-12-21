<script setup lang="ts">
import IconCopy from "@/components/icons/IconCopy.vue";
import IconCut from "@/components/icons/IconCut.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import {translate} from "@/store/i18nStore.ts";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {useModelContextMenu} from "@/modelEditor/contextMenu/useModelContextMenu.ts";
import {computed, watch} from "vue";
import IconAim from "@/components/icons/IconAim.vue";
import {overrideGroupProducer, useModelEditorPaste} from "@/modelEditor/contextMenu/item/useModelEditorPaste.ts";
import IconPaste from "@/components/icons/IconPaste.vue";

const props = defineProps<{
    id: string
}>()

const {
    contextData,
    getNode,
    copy,
    cut,
    remove,
    focusNode,
} = useModelEditor()

const {
    close
} = useModelContextMenu()

const enumeration = computed(() => {
    return contextData.enumerationMap.get(props.id)
})

const node = computed(() => {
    return getNode(props.id)
})

const enumerationAndNodeExisted = computed(() => enumeration.value && node.value)

watch(() => enumerationAndNodeExisted.value, (value) => {
    if (!value) {
        close()
    }
}, {immediate: true})

const {canPaste, handlePaste} = useModelEditorPaste(
    overrideGroupProducer(() => enumeration.value?.groupId)
)

const handleFocus = () => {
    focusNode(props.id)
    close()
}

const handleCopyClick = async () => {
    if (enumeration.value && node.value) {
        await copy({
            enumerations: [{
                data: enumeration.value,
                position: node.value.position
            }]
        })
        close()
    }
}

const handleCutClick = async () => {
    if (enumeration.value && node.value) {
        await cut({
            enumerations: [{
                data: enumeration.value,
                position: node.value.position
            }]
        })
        close()
    }
}

const handleDeleteClick = () => {
    remove({enumerationIds: [props.id]})
    close()
}
</script>

<template>
    <ul class="context-menu-item-list">
        <li @click="handlePaste" v-if="canPaste">
            <IconPaste class="icon"/>
            <span class="label">{{ translate('paste') }}</span>
            <span class="shortcut">[Ctrl + V]</span>
        </li>
        <li @click="handleFocus">
            <IconAim class="icon"/>
            <span class="label">{{ translate('focus') }}</span>
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
