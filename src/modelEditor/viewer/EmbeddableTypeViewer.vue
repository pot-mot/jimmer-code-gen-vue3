<script setup lang="ts">
import NameCommentViewer from "@/modelEditor/nameComment/NameCommentViewer.vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";

const props = withDefaults(defineProps<{
    embeddableType: DeepReadonly<EmbeddableType> | undefined,
    ctrlFocus?: boolean
}>(), {
    ctrlFocus: false
})

const {
    modelSelection,
    focusNode,
} = useModelEditor()

const handleFocus = () => {
    if (!props.embeddableType) return
    if (!props.ctrlFocus) return
    modelSelection.unselectAll()
    modelSelection.selectEmbeddableType(props.embeddableType.id)
    focusNode(props.embeddableType.id)
}
</script>

<template>
    <NameCommentViewer
        class="embeddable-type-viewer"
        v-if="embeddableType"
        :data="embeddableType"
        :class="{'ctrl-focus': ctrlFocus}"
        @click.ctrl.stop="handleFocus"
    />
    <span
        v-else
        class="embeddable-type-viewer not-existed-info"
    >
        [Embeddable not existed]
    </span>
</template>

<style scoped>
.embeddable-type-viewer.not-existed-info {
    color: var(--danger-color);
}

.ctrl-down .embeddable-type-viewer.ctrl-focus:hover,
.ctrl-down .embeddable-type-viewer.ctrl-focus:hover > :deep(.comment) {
    color: var(--primary-color);
}
</style>
