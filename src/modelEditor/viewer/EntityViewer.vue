<script setup lang="ts">
import NameCommentViewer from "@/modelEditor/nameComment/NameCommentViewer.vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";

const props = withDefaults(defineProps<{
    entity: DeepReadonly<Entity>
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
    modelSelection.selectEntity(props.entity.id)
    focusNode(props.entity.id)
}
</script>

<template>
    <NameCommentViewer
        :data="entity"
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
