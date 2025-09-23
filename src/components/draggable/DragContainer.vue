<script setup lang="ts">
import {ref, provide, readonly} from 'vue'
import {DragContainerKey} from './DragContainerInjectKey'

const props = withDefaults(defineProps<{
    dragStartTimeout?: number
}>(), {
    dragStartTimeout: 200
})

const emits = defineEmits<{
    (e: 'drag-start', sourceId: string, event: PointerEvent): void
    (e: 'drag-move', sourceId: string, event: PointerEvent): void
    (e: 'drag-enter', targetId: string, event: PointerEvent): void
    (e: 'drag-leave', targetId: string, event: PointerEvent): void
    (e: 'drag-end', sourceId: string, targetId: string | null | undefined, event: PointerEvent): void
}>()

const isDragging = ref(false)
const dragSourceId = ref<string | null | undefined>()
const dragTargetId = ref<string | null | undefined>()
const dragViewX = ref('0')
const dragViewY = ref('0')

const onDragMove = (event: PointerEvent) => {
    if (isDragging.value && dragSourceId.value) {
        dragViewX.value = event.clientX + 'px'
        dragViewY.value = event.clientY + 'px'
        emits('drag-move', dragSourceId.value, event)
    }
}

const onDragStart = (sourceId: string, event: PointerEvent) => {
    isDragging.value = true
    dragSourceId.value = sourceId
    dragViewX.value = event.clientX + 'px'
    dragViewY.value = event.clientY + 'px'
    document.documentElement.addEventListener('pointermove', onDragMove)
    document.documentElement.addEventListener('pointerup', onDragEnd)
    emits('drag-start', dragSourceId.value, event)
}

const onDragEnd = (event: PointerEvent) => {
    const savedDragSourceId = dragSourceId.value
    const savedDragTargetId = dragTargetId.value
    isDragging.value = false
    dragSourceId.value = null
    dragTargetId.value = null
    document.documentElement.removeEventListener('pointermove', onDragMove)
    document.documentElement.removeEventListener('pointerup', onDragEnd)
    if (savedDragSourceId) {
        emits('drag-end', savedDragSourceId, savedDragTargetId, event)
    }
}

const onDragEnter = (targetId: string, event: PointerEvent) => {
    if (isDragging.value) {
        dragTargetId.value = targetId
        emits('drag-enter', targetId, event)
    }
}

const onDragLeave = (targetId: string, event: PointerEvent) => {
    if (isDragging.value && dragTargetId.value === targetId) {
        dragTargetId.value = null
        emits('drag-leave', targetId, event)
    }
}

provide(DragContainerKey, {
    dragSourceId: readonly(dragSourceId),
    dragTargetId: readonly(dragTargetId),
    isDragging: readonly(isDragging),
    onDragStart,
    onDragEnter,
    onDragLeave,
    dragStartTimeout: props.dragStartTimeout
})
</script>

<template>
    <div class="drag-container">
        <slot/>
        <Teleport to="body">
            <div class="drag-view" v-if="isDragging">
                <slot name="dragView"/>
            </div>
        </Teleport>
    </div>
</template>

<style scoped>
.drag-container {
    position: relative;
}

.drag-view {
    pointer-events: none;
    user-select: none;
    position: fixed;
    left: v-bind(dragViewX);
    top: v-bind(dragViewY);
    z-index: var(--drag-view-z-index);
}
</style>