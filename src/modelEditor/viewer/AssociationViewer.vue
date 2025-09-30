<script setup lang="ts">
import NameCommentViewer from "@/modelEditor/nameComment/NameCommentViewer.vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";

const props = withDefaults(defineProps<{
    association: DeepReadonly<AssociationIdOnly> | undefined
    ctrlFocus?: boolean
}>(), {
    ctrlFocus: false
})

const {
    modelSelection,
} = useModelEditor()

const handleFocus = () => {
    if (!props.association) return
    if (!props.ctrlFocus) return
    modelSelection.unselectAll()
    modelSelection.selectAssociation(props.association.id)
}
</script>

<template>
    <NameCommentViewer
        class="association-viewer"
        v-if="association"
        :data="association"
        :class="{'ctrl-focus': ctrlFocus}"
        @click.ctrl.stop="handleFocus"
    />
    <span
        v-else
        class="association-viewer not-existed-info"
    >
        [Association not existed]
    </span>
</template>

<style scoped>
.association-viewer.not-existed-info {
    color: var(--danger-color);
}

.ctrl-down .association-viewer.ctrl-focus:hover,
.ctrl-down .association-viewer.ctrl-focus:hover > :deep(.comment) {
    color: var(--primary-color);
}
</style>
