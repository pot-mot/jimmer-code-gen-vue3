<script setup lang="ts">
import IconCopy from "@/components/icons/IconCopy.vue";
import IconCut from "@/components/icons/IconCut.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import {translate} from "@/store/i18nStore.ts";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {useModelContextMenu} from "@/modelEditor/contextMenu/useModelContextMenu.ts";
import {computed, watch} from "vue";
import IconAim from "@/components/icons/IconAim.vue";

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

const entity = computed(() => {
    return contextData.entityMap.get(props.id)
})

const node = computed(() => {
    return getNode(props.id)
})

const entityAndNodeExisted = computed(() => entity.value && node.value)

watch(() => entityAndNodeExisted.value, (value) => {
    if (!value) {
        close()
    }
}, {immediate: true})

const handleFocus = () => {
    focusNode(props.id)
    close()
}

const handleCopyClick = async () => {
    if (entity.value && node.value) {
        await copy({
            entities: [{
                data: entity.value,
                position: node.value.position
            }]
        })
        close()
    }
}

const handleCutClick = async () => {
    if (entity.value && node.value) {
        await cut({
            entities: [{
                data: entity.value,
                position: node.value.position
            }]
        })
        close()
    }
}

const handleDeleteClick = () => {
    remove({entityIds: [props.id]})
    close()
}
</script>

<template>
    <ul class="context-menu-item-list">
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
