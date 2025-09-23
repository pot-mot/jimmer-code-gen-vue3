<script setup lang="ts">
import {inject} from 'vue'
import {DragContainerKey} from "./DragContainerInjectKey";

const props = defineProps<{
    id: string
}>()

const dragContext = inject(DragContainerKey)!

let longPressTimer: number | null = null

const handlePointerDown = (event: PointerEvent) => {
    if (longPressTimer) {
        clearTimeout(longPressTimer)
    }

    // 设置长按定时器（500ms）
    longPressTimer = window.setTimeout(() => {
        dragContext.onDragStart(props.id, event)
    }, dragContext.dragStartTimeout)
}

const handlePointerUp = () => {
    // 清除长按定时器
    if (longPressTimer) {
        clearTimeout(longPressTimer)
        longPressTimer = null
    }
}

const handlePointerLeave = () => {
    // 清除长按定时器
    if (longPressTimer) {
        clearTimeout(longPressTimer)
        longPressTimer = null
    }
}
</script>

<template>
    <div
        class="drag-source"
        :class="{active: dragContext.dragSourceId.value === id}"
        @pointerdown="handlePointerDown"
        @pointerup="handlePointerUp"
        @pointerleave="handlePointerLeave"
    >
        <slot/>
    </div>
</template>

<style scoped>
.drag-source {
    cursor: grab;
    width: 100%;
    height: 100%;
}

.drag-source:active {
    user-select: none;
    cursor: grabbing;
}
</style>
