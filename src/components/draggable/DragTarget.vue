<script setup lang="ts">
import {inject} from 'vue'
import {DragContainerKey} from './DragContainerInjectKey'

const props = defineProps<{
    id: string
}>()

const dragContext = inject(DragContainerKey)!

const handlePointerEnter = (event: PointerEvent) => {
    if (dragContext.isDragging.value) {
        dragContext.onDragEnter(props.id, event)
    }
}

const handlePointerLeave = (event: PointerEvent) => {
    if (dragContext.isDragging.value && dragContext.dragTargetId.value === props.id) {
        dragContext.onDragLeave(props.id, event)
    }
}
</script>

<template>
    <div
        class="drag-target"
        :class="{active: dragContext.dragTargetId.value === id}"
        @pointerenter.self="handlePointerEnter"
        @pointerleave.self="handlePointerLeave"
    >
        <slot/>
    </div>
</template>

<style scoped>
.drag-target {
    width: 100%;
    height: 100%;
}

.drag-target.active {
    outline: 2px solid var(--primary-color);
    outline-offset: -2px;
}
</style>
