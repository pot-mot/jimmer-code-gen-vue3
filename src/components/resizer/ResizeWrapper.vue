<script setup lang="ts">
import {readonly, ref, watch} from 'vue'
import {
    resizeBorderKeys,
    resizeHandleKeys,
    type ResizeDirection,
    type ResizeEventArgs,
    type ResizeOrigin,
    type ResizeStartEventArgs,
    type ResizeStopEventArgs
} from "@/components/resizer/ResizeWrapperType.ts";

const size = defineModel<{
    width: number,
    height: number,
}>({
    required: true
})

const props = withDefaults(defineProps<{
    zoom?: number,
    disabled?: boolean,
    handleSize?: string,
    borderWidth?: string,

    minWidth?: number
    maxWidth?: number
    minHeight?: number
    maxHeight?: number
}>(), {
    zoom: 1,
    disabled: false,
    handleSize: '8px',
    borderWidth: '2px',
})

watch(() => size.value.width, (newValue) => {
    if (props.minWidth !== undefined) {
        size.value.width = Math.max(newValue, props.minWidth)
    }
    if (props.maxWidth !== undefined) {
        size.value.width = Math.min(newValue, props.maxWidth)
    }
}, {immediate: true})

watch(() => size.value.height, (newValue) => {
    if (props.minHeight !== undefined) {
        size.value.height = Math.max(newValue, props.minHeight)
    }
    if (props.maxHeight !== undefined) {
        size.value.height = Math.min(newValue, props.maxHeight)
    }
}, {immediate: true})

const emits = defineEmits<{
    (event: "resize-start", args: ResizeStartEventArgs): void
    (event: "resize", args: ResizeEventArgs): void
    (event: "resize-stop", args: ResizeStopEventArgs): void
}>()


const isResizing = ref(false)

const resizeOrigin = ref<ResizeOrigin>()
const resizeDirection = ref<ResizeDirection>()

const startResize = (direction: ResizeDirection, e: MouseEvent | TouchEvent) => {
    if (isResizing.value) return

    const isTouchEvent = e instanceof TouchEvent
    const mouseOrTouch = isTouchEvent ? e.touches[0] : e
    if (!mouseOrTouch) return

    isResizing.value = true
    resizeDirection.value = direction
    resizeOrigin.value = {
        clientX: mouseOrTouch.clientX,
        clientY: mouseOrTouch.clientY,
        width: size.value.width,
        height: size.value.height,
    }

    if (isTouchEvent) {
        document.addEventListener('touchmove', scheduleResizeUpdateByTouch)
        document.addEventListener('touchend', stopResizeByTouch)
        document.addEventListener('touchcancel', stopResizeByTouch)
    } else {
        document.addEventListener('mousemove', scheduleResizeUpdate)
        document.addEventListener('mouseup', stopResize)
    }

    emits("resize-start", {
        origin: resizeOrigin.value,
        direction: resizeDirection.value
    })
}

const cleanResizeEvent = () => {
    document.removeEventListener('mousemove', scheduleResizeUpdate)
    document.removeEventListener('mouseup', stopResize)
    document.removeEventListener('touchmove', scheduleResizeUpdateByTouch)
    document.removeEventListener('touchend', stopResizeByTouch)
    document.removeEventListener('touchcancel', stopResizeByTouch)
}

const handleResizing = (position: { clientX: number, clientY: number }) => {
    if (!isResizing.value || !resizeOrigin.value || !resizeDirection.value) {
        cleanResizeEvent()
        return
    }

    // 偏移量
    const dx = (position.clientX - resizeOrigin.value.clientX) / props.zoom
    const dy = (position.clientY - resizeOrigin.value.clientY) / props.zoom

    const previousHeight = size.value.height
    const previousWidth = size.value.width
    let currentHeight = previousHeight
    let currentWidth = previousWidth

    switch (resizeDirection.value) {
        case 'top':
            currentHeight = resizeOrigin.value.height - dy
            break
        case 'left':
            currentWidth = resizeOrigin.value.width - dx
            break
        case 'right':
            currentWidth = resizeOrigin.value.width + dx
            break
        case 'bottom':
            currentHeight = resizeOrigin.value.height + dy
            break

        case 'top-left':
            currentWidth = resizeOrigin.value.width - dx
            currentHeight = resizeOrigin.value.height - dy
            break
        case 'top-right':
            currentWidth = resizeOrigin.value.width + dx
            currentHeight = resizeOrigin.value.height - dy
            break
        case 'bottom-left':
            currentWidth = resizeOrigin.value.width - dx
            currentHeight = resizeOrigin.value.height + dy
            break
        case 'bottom-right':
            currentWidth = resizeOrigin.value.width + dx
            currentHeight = resizeOrigin.value.height + dy
            break
    }

    // 预先计算范围
    if (props.minWidth !== undefined) {
        currentWidth = Math.max(currentWidth, props.minWidth)
    }
    if (props.maxWidth !== undefined) {
        currentWidth = Math.min(currentWidth, props.maxWidth)
    }
    if (props.minHeight !== undefined) {
        currentHeight = Math.max(currentHeight, props.minHeight)
    }
    if (props.maxHeight !== undefined) {
        currentHeight = Math.min(currentHeight, props.maxHeight)
    }

    size.value.width = currentWidth
    size.value.height = currentHeight

    const totalSizeDiff ={
        x: currentWidth - resizeOrigin.value.width,
        y: currentHeight - resizeOrigin.value.height
    }

    const currentSizeDiff = {
        x: currentWidth - previousWidth,
        y: currentHeight - previousHeight,
    }

    // 计算偏移量
    const totalPositionDiff = {x: 0, y: 0}
    const currentPositionDiff = {x: 0, y: 0}

    switch (resizeDirection.value) {
        case "top":
        case "top-left":
        case "top-right":
            totalPositionDiff.y = -totalSizeDiff.y
            currentPositionDiff.y = -currentSizeDiff.y
            break
    }

    switch (resizeDirection.value) {
        case "left":
        case "top-left":
        case "bottom-left":
            totalPositionDiff.x = -totalSizeDiff.x
            currentPositionDiff.x = -currentSizeDiff.x
            break
    }

    emits('resize', {
        origin: resizeOrigin.value,
        direction: resizeDirection.value,
        currentSize: {
            width: currentWidth,
            height: currentHeight,
        },
        totalSizeDiff,
        currentSizeDiff,
        totalPositionDiff,
        currentPositionDiff,
    })
}

let requestAnimationFrameId: number | undefined = undefined
const scheduleResizeUpdate = (position: { clientX: number; clientY: number }) => {
    if (!isResizing.value || !resizeOrigin.value || !resizeDirection.value) {
        cleanResizeEvent()
        return
    }

    if (requestAnimationFrameId === undefined) {
        requestAnimationFrameId = requestAnimationFrame(() => {
            handleResizing(position)
            requestAnimationFrameId = undefined
        })
    }
}

const scheduleResizeUpdateByTouch = (e: TouchEvent) => {
    const touch = e.changedTouches[0] ?? e.touches[0]
    if (!touch) return
    scheduleResizeUpdate(touch)
}

const stopResize = (position: { clientX: number, clientY: number }) => {
    if (!isResizing.value || !resizeOrigin.value || !resizeDirection.value) {
        cleanResizeEvent()
        return
    }

    isResizing.value = false
    cleanResizeEvent()

    emits("resize-stop", {
        origin: resizeOrigin.value,
        direction: resizeDirection.value,
        currentSize: {
            width: size.value.width,
            height: size.value.height,
        },
        totalSizeDiff: {
            x: (position.clientX - resizeOrigin.value.clientX) / props.zoom,
            y: (position.clientY - resizeOrigin.value.clientY) / props.zoom,
        }
    })

    resizeDirection.value = undefined
    resizeOrigin.value = undefined
}

const stopResizeByTouch = (e: TouchEvent) => {
    const touch = e.changedTouches[0] ?? e.touches[0]
    if (!touch) return
    stopResize(touch)
}

defineExpose({
    isResizing: readonly(isResizing),
})
</script>

<template>
    <div
        class="resize-wrapper"
        :style="{
          width: `${size.width}px`,
          height: `${size.height}px`,
        }"
    >
        <slot/>

        <template v-if="!disabled">
            <div
                v-for="key of resizeBorderKeys"
                :class="`resize-border ${key}`"
                @mousedown.capture.stop.prevent="startResize(key, $event)"
                @touchstart.capture.stop.passive="startResize(key, $event)"
            />

            <div
                v-for="key of resizeHandleKeys"
                :class="`resize-handle ${key}`"
                @mousedown.capture.stop.prevent="startResize(key, $event)"
                @touchstart.capture.stop.passive="startResize(key, $event)"
            />
        </template>
    </div>
</template>

<style scoped>
.resize-wrapper {
    position: relative;
    --resize-handle-size: v-bind(handleSize);
    --resize-border-width: v-bind(borderWidth);
    will-change: width, height;
}

.resize-border {
    position: absolute;
    width: var(--resize-border-width);
    height: var(--resize-border-width);
    background-color: var(--primary-color);
}

.resize-border.top {
    width: calc(100% - var(--resize-handle-size));

    top: calc(var(--resize-border-width) * -1 / 2);
    left: 50%;
    transform: translateX(-50%);
    cursor: n-resize;
}

.resize-border.left {
    height: calc(100% - var(--resize-handle-size));

    top: 50%;
    left: calc(var(--resize-border-width) * -1 / 2);
    transform: translateY(-50%);
    cursor: w-resize;
}

.resize-border.right {
    height: calc(100% - var(--resize-handle-size));

    top: 50%;
    right: calc(var(--resize-border-width) * -1 / 2);
    transform: translateY(-50%);
    cursor: e-resize;
}

.resize-border.bottom {
    width: calc(100% - var(--resize-handle-size));

    bottom: calc(var(--resize-border-width) * -1 / 2);
    left: 50%;
    transform: translateX(-50%);
    cursor: s-resize;
}

.resize-handle {
    position: absolute;
    width: calc(var(--resize-handle-size));
    height: calc(var(--resize-handle-size));
    background-color: var(--primary-color);
}

.resize-handle.top-left {
    top: calc(var(--resize-handle-size) * -1 / 2);
    left: calc(var(--resize-handle-size) * -1 / 2);
    cursor: nw-resize;
}

.resize-handle.top-right {
    top: calc(var(--resize-handle-size) * -1 / 2);
    right: calc(var(--resize-handle-size) * -1 / 2);
    cursor: ne-resize;
}

.resize-handle.bottom-left {
    bottom: calc(var(--resize-handle-size) * -1 / 2);
    left: calc(var(--resize-handle-size) * -1 / 2);
    cursor: sw-resize;
}

.resize-handle.bottom-right {
    bottom: calc(var(--resize-handle-size) * -1 / 2);
    right: calc(var(--resize-handle-size) * -1 / 2);
    cursor: se-resize;
}
</style>