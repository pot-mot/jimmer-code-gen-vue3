<script setup lang="ts">
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
    getEdge,
    remove,
    focusEdge,
} = useModelEditor()

const {
    close
} = useModelContextMenu()

const association = computed(() => {
    return contextData.associationMap.get(props.id)
})

const edge = computed(() => {
    return getEdge(props.id)
})

const associationAndEdgeExisted = computed(() => association.value && edge.value)

watch(() => associationAndEdgeExisted.value, (value) => {
    if (!value) {
        close()
    }
}, {immediate: true})

const handleFocus = () => {
    focusEdge(props.id)
    close()
}

const handleDeleteClick = () => {
    remove({associationIds: [props.id]})
    close()
}
</script>

<template>
    <ul class="context-menu-item-list">
        <li @click="handleFocus">
            <IconAim class="icon"/>
            <span class="label">{{ translate('focus') }}</span>
        </li>
        <li @click="handleDeleteClick">
            <IconDelete class="icon"/>
            <span class="label">{{ translate('delete') }}</span>
            <span class="shortcut">[Delete]</span>
        </li>
    </ul>
</template>
