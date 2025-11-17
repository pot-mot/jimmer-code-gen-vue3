<script setup lang="ts">
import NameCommentViewer from "@/modelEditor/nameComment/NameCommentViewer.vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";

const props = withDefaults(defineProps<{
    enumeration: DeepReadonly<Enumeration> | undefined
    ctrlFocus?: boolean
    hideComment?: boolean
}>(), {
    ctrlFocus: false
})

const {
    modelSelection,
    focusNode,
} = useModelEditor()

const handleFocus = () => {
    if (!props.enumeration) return
    if (!props.ctrlFocus) return
    modelSelection.unselectAll()
    modelSelection.selectEnumeration(props.enumeration.id)
    focusNode(props.enumeration.id)
}
</script>

<template>
    <NameCommentViewer
        class="enumeration-viewer"
        v-if="enumeration"
        :data="enumeration"
        :hide-comment="hideComment"
        :class="{'ctrl-focus': ctrlFocus}"
        @click.ctrl.stop="handleFocus"
    />
    <span
        v-else
        class="enumeration-viewer not-existed-info"
    >
        [Enum not existed]
    </span>
</template>

<style scoped>
.enumeration-viewer.not-existed-info {
    color: var(--danger-color);
}

.ctrl-down .enumeration-viewer.ctrl-focus:hover,
.ctrl-down .enumeration-viewer.ctrl-focus:hover > :deep(.comment) {
    cursor: pointer;
    color: var(--primary-color);
}
</style>
