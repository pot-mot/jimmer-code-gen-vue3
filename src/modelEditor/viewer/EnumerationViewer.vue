<script setup lang="ts">
import NameCommentViewer from "@/modelEditor/nameComment/NameCommentViewer.vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";

const props = withDefaults(defineProps<{
    enumeration: DeepReadonly<Enumeration>
    ctrlFocus?: boolean
}>(), {
    ctrlFocus: false
})

const {
    modelSelection,
    focusNode,
} = useModelEditor()

const handleFocus = () => {
    if (!props.ctrlFocus) return
    modelSelection.unselectAll()
    modelSelection.selectEnumeration(props.enumeration.id)
    focusNode(props.enumeration.id)
}
</script>

<template>
    <NameCommentViewer
        :data="enumeration"
        :class="{'ctrl-focus': ctrlFocus}"
        @click.ctrl.stop="handleFocus"
    />
</template>

<style scoped>
.ctrl-down .name-comment-viewer.ctrl-focus:hover,
.ctrl-down .name-comment-viewer.ctrl-focus:hover > :deep(.comment) {
    color: var(--primary-color);
}
</style>
