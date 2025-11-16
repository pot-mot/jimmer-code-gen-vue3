<script setup lang="ts">
import NameCommentViewer from "@/modelEditor/nameComment/NameCommentViewer.vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";

const props = withDefaults(defineProps<{
    enumerationId: string
    item: DeepReadonly<EnumerationItem> | undefined
    ctrlFocus?: boolean
    hideComment?: boolean
}>(), {
    ctrlFocus: false
})

const {
    modelSelection,
    focusEnumerationItem,
} = useModelEditor()

const handleFocus = () => {
    if (!props.item) return
    if (!props.ctrlFocus) return
    modelSelection.unselectAll()
    modelSelection.selectEnumeration(props.enumerationId)
    focusEnumerationItem({enumerationId: props.enumerationId, itemId: props.item.id})
}
</script>

<template>
    <NameCommentViewer
        v-if="item"
        class="property-viewer"
        :data="item"
        :hide-comment="hideComment"
        :class="{'ctrl-focus': ctrlFocus}"
        @click.ctrl.stop="handleFocus"
    />
    <span
        v-else
        class="property-viewer not-existed-info"
    >
        [Property not existed]
    </span>
</template>

<style scoped>
.property-viewer.not-existed-info {
    color: var(--danger-color);
}

.ctrl-down .property-viewer.ctrl-focus:hover,
.ctrl-down .property-viewer.ctrl-focus:hover > :deep(.comment) {
    color: var(--primary-color);
}
</style>
