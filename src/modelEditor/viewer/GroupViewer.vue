<script setup lang="ts">
import NameCommentViewer from "@/modelEditor/nameComment/NameCommentViewer.vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";

const props = withDefaults(defineProps<{
    group: DeepReadonly<Group> | undefined
    ctrlFocus?: boolean
}>(), {
    ctrlFocus: false
})

const {
    modelSelection,
} = useModelEditor()

const handleFocus = () => {
    if (!props.group) return
    if (!props.ctrlFocus) return
    modelSelection.unselectAll()
    modelSelection.selectGroup(props.group.id)
}
</script>

<template>
    <NameCommentViewer
        class="group-viewer"
        v-if="group"
        :data="group"
        :class="{'ctrl-focus': ctrlFocus}"
        @click.ctrl.stop="handleFocus"
    />
    <span
        v-else
        class="group-viewer not-existed-info"
    >
        [Group not existed]
    </span>
</template>

<style scoped>
.group-viewer.not-existed-info {
    color: var(--danger-color);
}

.ctrl-down .group-viewer.ctrl-focus:hover,
.ctrl-down .group-viewer.ctrl-focus:hover > :deep(.comment) {
    color: var(--primary-color);
}
</style>
