<script setup lang="ts">
import NameCommentViewer from "@/modelEditor/nameComment/NameCommentViewer.vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {useIdViewNameComment} from "@/modelEditor/viewer/association/nameComment.ts";

const props = withDefaults(defineProps<{
    association: DeepReadonly<AssociationIdOnly> | undefined
    ctrlFocus?: boolean
    hideComment?: boolean
}>(), {
    ctrlFocus: false
})

const {
    focusEdge,
} = useModelEditor()

const handleFocus = () => {
    if (!props.association) return
    if (!props.ctrlFocus) return
    focusEdge(props.association.id)
}

const associationNameComment = useIdViewNameComment(() => props.association)
</script>

<template>
    <NameCommentViewer
        class="association-viewer"
        v-if="associationNameComment"
        :data="associationNameComment"
        :hide-comment="hideComment"
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
    cursor: pointer;
    color: var(--primary-color);
}
</style>
