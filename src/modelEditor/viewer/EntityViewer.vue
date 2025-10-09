<script setup lang="ts">
import NameCommentViewer from "@/modelEditor/nameComment/NameCommentViewer.vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";

const props = withDefaults(defineProps<{
    entity: DeepReadonly<Entity> | undefined
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
    if (!props.entity) return
    if (!props.ctrlFocus) return
    modelSelection.unselectAll()
    modelSelection.selectEntity(props.entity.id)
    focusNode(props.entity.id)
}
</script>

<template>
    <NameCommentViewer
        class="entity-viewer"
        v-if="entity"
        :data="entity"
        :hide-comment="hideComment"
        :class="{'ctrl-focus': ctrlFocus}"
        @click.ctrl.stop="handleFocus"
    />
    <span
        v-else
        class="entity-viewer not-existed-info"
    >
        [Entity not existed]
    </span>
</template>

<style scoped>
.entity-viewer.not-existed-info {
    color: var(--danger-color);
}

.ctrl-down .entity-viewer.ctrl-focus:hover,
.ctrl-down .entity-viewer.ctrl-focus:hover > :deep(.comment) {
    color: var(--primary-color);
}
</style>
