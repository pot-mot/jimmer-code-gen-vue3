<script setup lang="ts">
import NameCommentViewer from "@/modelEditor/nameComment/NameCommentViewer.vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";

const props = withDefaults(defineProps<{
    mappedSuperClass: DeepReadonly<MappedSuperClass> | undefined
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
    if (!props.mappedSuperClass) return
    if (!props.ctrlFocus) return
    modelSelection.unselectAll()
    modelSelection.selectMappedSuperClass(props.mappedSuperClass.id)
    focusNode(props.mappedSuperClass.id)
}
</script>

<template>
    <NameCommentViewer
        class="mapped-super-class-viewer"
        v-if="mappedSuperClass"
        :data="mappedSuperClass"
        :hide-comment="hideComment"
        :class="{'ctrl-focus': ctrlFocus}"
        @click.ctrl.stop="handleFocus"
    />
    <span
        v-else
        class="mapped-super-class-viewer not-existed-info"
    >
        [AbstractEntity not existed]
    </span>
</template>

<style scoped>
.mapped-super-class-viewer.not-existed-info {
    color: var(--danger-color);
}

.ctrl-down .mapped-super-class-viewer.ctrl-focus:hover,
.ctrl-down .mapped-super-class-viewer.ctrl-focus:hover > :deep(.comment) {
    cursor: pointer;
    color: var(--primary-color);
}
</style>
