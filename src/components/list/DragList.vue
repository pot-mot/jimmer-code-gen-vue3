<script setup lang="ts" generic="T">
import {computed, onBeforeUnmount, onMounted, ref, useTemplateRef} from "vue";
import {useTouchEnterLeave} from "@/utils/event/useTouchEnterLeave.ts";
import {getMatchedElementOrParent} from "@/utils/event/judgeEventTarget.ts";
import {useDeviceStore} from "@/store/deviceStore.ts";

const props = defineProps<{
    data: ReadonlyArray<T>,
    currentItem: T | undefined,
    toKey: (item: T) => string,
}>()
const currentKey = computed(() => props.currentItem ? props.toKey(props.currentItem) : undefined)

const emits = defineEmits<{
    (e: 'remove', item: T): void,
    (e: 'swap', oldIndex: number, newIndex: number): void,
    (e: 'drag', oldIndex: number, newIndex: number): void,
}>()

defineSlots<{
    default(props: {item: T}): any,
    dragView(props: {data: {item: T, index: number}}): any,
}>()

const {isTouchDevice} = useDeviceStore()

const lastItem = computed<T | undefined>(() => props.data[props.data.length - 1])

const container = useTemplateRef<HTMLDivElement>("container")

const handleKeyDown = (e: KeyboardEvent) => {
    if (props.currentItem === undefined) return

    if (e.key === "Delete") {
        e.preventDefault()
        emits("remove", props.currentItem)
    } else if (e.key === "ArrowUp") {
        const currentIndex = props.data.findIndex(it => it === props.currentItem)
        if (props.data.length > 1 && currentIndex !== -1 && currentIndex !== 0) {
            e.preventDefault()
            emits("swap", currentIndex, currentIndex - 1)
        }
    } else if (e.key === "ArrowDown") {
        const currentIndex = props.data.findIndex(it => it === props.currentItem)
        if (props.data.length > 1 && currentIndex !== -1 && currentIndex !== props.data.length - 1) {
            e.preventDefault()
            emits("swap", currentIndex, currentIndex + 1)
        }
    }
}

// 拖拽行为和状态
const isDragging = ref(false)
const draggingItem = ref<{ item: T, index: number }>()
const overTarget = ref<{ item: T, index: number, type: 'item' | 'gap' }>()

const scrollWrapper = useTemplateRef<HTMLDivElement>("scrollWrapper")
const scrollTop = ref(0)

const handleScroll = () => {
    scrollTop.value = scrollWrapper.value?.scrollTop ?? 0
}

let dragStartElementXY: { x: number, y: number } | undefined = undefined
let dragStartClientXY: { x: number, y: number } | undefined = undefined
const dragMoveClientXY = ref<{ x: number, y: number }>()

const resetDragState = () => {
    draggingItem.value = undefined
    overTarget.value = undefined
    dragStartElementXY = undefined
    dragStartClientXY = undefined
    dragMoveClientXY.value = undefined
}

const handleLeaveContainer = () => {
    if (isDragging.value) {
        overTarget.value = undefined
    }
}

const handleDragStart = (index: number, item: T, clientXY: {
    x: number,
    y: number
}, target: HTMLElement) => {
    draggingItem.value = {index, item: item}
    isDragging.value = true

    dragStartElementXY = {
        x: target.offsetLeft - (scrollWrapper.value?.scrollLeft ?? 0),
        y: target.offsetTop - (scrollWrapper.value?.scrollTop ?? 0),
    }
    dragStartClientXY = {
        x: clientXY.x,
        y: clientXY.y,
    }
    dragMoveClientXY.value = {
        x: dragStartElementXY.x,
        y: dragStartElementXY.y,
    }
}

const handleDragMove = (clientXY: { x: number, y: number }) => {
    if (isDragging.value && scrollWrapper.value && dragStartClientXY !== undefined && dragStartElementXY !== undefined) {
        dragMoveClientXY.value = {
            x: dragStartElementXY.x + clientXY.x - dragStartClientXY.x,
            y: dragStartElementXY.y + clientXY.y - dragStartClientXY.y,
        }
    }
}

const handleDragEnd = () => {
    if (isDragging.value) {
        isDragging.value = false

        if (draggingItem.value && overTarget.value && props.toKey(draggingItem.value.item) !== props.toKey(overTarget.value.item)) {
            const draggingIndex = draggingItem.value.index
            const targetIndex = overTarget.value.index
            const type = overTarget.value.type
            if (type === 'item') {
                emits("swap", draggingIndex, targetIndex)
            } else if (type === 'gap') {
                emits("drag", draggingIndex, targetIndex)
            }
        }
    }

    resetDragState()
}

const mouseDragStartFlag = new Set<number>()
const handleDragStartByMouse = (index: number, item: T, event: MouseEvent) => {
    if (!(event.target instanceof HTMLElement)) return
    const target = getMatchedElementOrParent(event.target, el => el.classList.contains('drag-list-item'))
    if (!target || !(target instanceof HTMLElement)) return

    mouseDragStartFlag.add(index)
    const deleteFlag = () => {
        mouseDragStartFlag.delete(index)
    }
    setTimeout(() => {
        if (!mouseDragStartFlag.has(index)) {
            document.documentElement.removeEventListener("mousemove", deleteFlag)
            document.documentElement.removeEventListener("mouseup", deleteFlag)
            return
        }
        handleDragStart(index, item, {x: event.clientX, y: event.clientY}, target)

        document.documentElement.addEventListener("mousemove", handleDraggingByMouse)
        document.documentElement.addEventListener("mouseup", handleDragEndByMouse)
    }, 100)

    document.documentElement.addEventListener("mousemove", deleteFlag, {once: true})
    document.documentElement.addEventListener("mouseup", deleteFlag, {once: true})
}

const handleDraggingByMouse = (event: MouseEvent) => {
    handleDragMove({x: event.clientX, y: event.clientY})
}

const handleDragEndByMouse = () => {
    document.documentElement.removeEventListener("mousemove", handleDraggingByMouse)
    document.documentElement.removeEventListener("mouseup", handleDragEndByMouse)

    handleDragEnd()
}


const {handleTouchMove} = useTouchEnterLeave()

const handleTouchMoveToEmitTouchEnter = (e: TouchEvent) => {
    if (container.value) {
        const clientXY = {x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY}

        const handles = container.value.querySelectorAll('.drag-list-scroll-handle')
        const items = container.value.querySelectorAll('.drag-list-item')
        const gaps = container.value.querySelectorAll('.drag-gap')

        handleTouchMove([...handles, ...items, ...gaps], clientXY)
    }
}

onMounted(() => {
    if (isTouchDevice.value && container.value) {
        container.value.addEventListener('touchmove', handleTouchMoveToEmitTouchEnter, {passive: true})
    }
})
onBeforeUnmount(() => {
    container.value?.removeEventListener('touchmove', handleTouchMoveToEmitTouchEnter)
})

const touchDragStartFlag = new Set<number>()
const handleDragStartByTouch = (index: number, item: T, event: TouchEvent) => {
    if (!(event.target instanceof HTMLElement)) return
    const target = getMatchedElementOrParent(event.target, el => el.classList.contains('drag-list-item'))
    if (!target || !(target instanceof HTMLElement)) return

    touchDragStartFlag.add(index)
    const deleteFlag = () => {
        touchDragStartFlag.delete(index)
    }
    setTimeout(() => {
        if (!touchDragStartFlag.has(index)) {
            document.documentElement.removeEventListener("touchmove", deleteFlag)
            document.documentElement.removeEventListener("touchend", deleteFlag)
            document.documentElement.removeEventListener("touchcancel", deleteFlag)
            return
        }
        handleDragStart(index, item, {x: event.touches[0].clientX, y: event.touches[0].clientY}, target)

        document.documentElement.addEventListener("touchmove", handleDraggingByTouch, {passive: false})
        document.documentElement.addEventListener("touchend", handleDragEndByMouseByTouch)
        document.documentElement.addEventListener("touchcancel", handleDragEndByMouseByTouch)
    }, 100)

    document.documentElement.addEventListener("touchmove", deleteFlag, {once: true})
    document.documentElement.addEventListener("touchend", deleteFlag, {once: true})
    document.documentElement.addEventListener("touchcancel", deleteFlag, {once: true})
}

const handleDraggingByTouch = (event: TouchEvent) => {
    event.preventDefault()
    handleDragMove({x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY})
}

const handleDragEndByMouseByTouch = () => {
    document.documentElement.removeEventListener("touchmove", handleDraggingByTouch)
    document.documentElement.removeEventListener("touchend", handleDragEndByMouseByTouch)
    document.documentElement.removeEventListener("touchcancel", handleDragEndByMouseByTouch)

    handleDragEnd()
}

const handleItemDragEnter = (index: number, item: T) => {
    if (!isDragging.value) return
    if (overTarget.value === undefined ||
        props.toKey(overTarget.value.item) !== props.toKey(item) ||
        overTarget.value.type !== 'item'
    ) {
        overTarget.value = {index, item: item, type: 'item'}
    }
}

const handleGapDragEnter = (index: number, item: T) => {
    if (!isDragging.value) return
    if (overTarget.value === undefined ||
        props.toKey(overTarget.value.item) !== props.toKey(item) ||
        overTarget.value.type !== 'gap'
    ) {
        overTarget.value = {index, item: item, type: 'gap'}
    }
}

// 当拖拽至两端时，触发滚动
const canDragUp = computed(() => {
    if (!scrollWrapper.value) return false
    if (!isDragging.value) return false
    return scrollTop.value > 0
})
const canDragDown = computed(() => {
    if (!scrollWrapper.value) return false
    if (!isDragging.value) return false
    return scrollTop.value < (scrollWrapper.value.scrollHeight - scrollWrapper.value.clientHeight)
})

let dragUpTimer: number | undefined = undefined
const startDragUp = () => {
    dragUpTimer = setInterval(() => {
        if (!canDragUp.value) {
            clearInterval(dragUpTimer)
            return
        }
        if (!scrollWrapper.value) return
        scrollWrapper.value?.scrollBy({top: -20})
    }, 50)
}
const stopDragUp = () => {
    clearInterval(dragUpTimer)
}

let dragDownTimer: number | undefined = undefined
const startDragDown = () => {
    dragDownTimer = setInterval(() => {
        if (!canDragDown.value) {
            clearInterval(dragDownTimer)
            return
        }
        if (!scrollWrapper.value) return
        scrollWrapper.value.scrollBy({top: 20})
    }, 50)
}
const stopDragDown = () => {
    clearInterval(dragDownTimer)
}
</script>

<template>
    <div
        tabindex="-1" @keydown="handleKeyDown"
        class="drag-list-container"
        ref="container"
        @mouseleave="handleLeaveContainer"
        @touchleave="handleLeaveContainer"
    >
        <div
            v-if="isDragging && draggingItem && dragMoveClientXY"
            class="drag-view"
            :style="{
                top: dragMoveClientXY.y + 'px',
                left: dragMoveClientXY.x + 'px',
            }">
            <slot name="dragView" :data="draggingItem"/>
        </div>

        <div
            class="drag-list-scroll-wrapper"
            ref="scrollWrapper"
            @scroll="handleScroll"
        >
            <TransitionGroup name="drag-list" tag="div">
                <template v-for="(item, index) in data" :key="toKey(item)">
                    <div
                        class="drag-gap"
                        :class="{
                            over: overTarget?.index === index && overTarget?.type === 'gap'
                        }"
                        @mouseenter="handleGapDragEnter(index, item)"
                        @touchenter="handleGapDragEnter(index, item)"
                    />

                    <div
                        class="drag-list-item"
                        :class="{
                            current: currentKey === toKey(item),
                            dragged: draggingItem?.index === index,
                            over: overTarget?.index === index && overTarget?.type === 'item'
                        }"

                        @mousedown="handleDragStartByMouse(index, item, $event)"
                        @mouseenter="handleItemDragEnter(index, item)"

                        @touchstart.passive="handleDragStartByTouch(index, item, $event)"
                        @touchenter="handleItemDragEnter(index, item)"
                    >
                        <slot :item="item"/>
                    </div>
                </template>
            </TransitionGroup>

            <div
                v-if="lastItem"
                class="drag-gap"
                :class="{
                    over: overTarget?.index === data.length && overTarget?.type === 'gap'
                }"
                @mouseenter="handleGapDragEnter(data.length, lastItem)"
                @touchenter="handleGapDragEnter(data.length, lastItem)"
            />
        </div>

        <div
            v-if="canDragUp"
            class="drag-list-scroll-handle up"
            style="position: absolute; top: 0; left: 0; right: 0;"

            @mouseenter="startDragUp"
            @mouseleave="stopDragUp"
            @mouseup="stopDragUp"

            @touchenter="startDragUp"
            @touchleave="stopDragUp"
            @touchstop="stopDragUp"
            @touchcancel="stopDragUp"
        />

        <div
            v-if="canDragDown"
            class="drag-list-scroll-handle down"
            style="position: absolute; bottom: 0; left: 0; right: 0;"

            @mouseenter="startDragDown"
            @mouseleave="stopDragDown"
            @mouseup="stopDragDown"

            @touchenter="startDragDown"
            @touchleave="stopDragDown"
            @touchstop="stopDragDown"
            @touchcancel="stopDragDown"
        />
    </div>
</template>

<style scoped>
.drag-list-container {
    position: relative;
    height: calc(100% - 2rem);
    overflow: hidden;
}

.drag-list-scroll-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    padding-bottom: 3rem;
    overflow-x: hidden;
    overflow-y: auto;
}

.drag-list-item {
    background-color: var(--background-color);
    width: 100%;
    transition: background-color 0.5s;
}

.drag-list-item.current {
    background-color: var(--primary-color);
}

.drag-list-item.dragged {
    opacity: 0;
}

.drag-list-item.over {
    outline: 2px dashed var(--primary-color);
    outline-offset: -2px;
}

.drag-view {
    position: absolute;
    width: 100%;
    pointer-events: none;
    z-index: var(--drag-view-z-index);
}

.drag-list-scroll-handle {
    height: 2rem;
    z-index: var(--drag-view-z-index);
}

.drag-list-scroll-handle.up {
    background: linear-gradient(to top, transparent, var(--background-color-hover));
}

.drag-list-scroll-handle.down {
    background: linear-gradient(to bottom, transparent, var(--background-color-hover));
}


.drag-gap {
    height: 0.3rem;
    transition: height 0.5s, background-color 0.5s;
}

.drag-gap.over {
    height: 3rem;
    background-color: var(--primary-color);
    opacity: 0.6;
    cursor: default;
}


/* drag-list 过渡动画 */
.drag-list-move,
.drag-list-enter-active,
.drag-list-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
}

.drag-list-enter-from,
.drag-list-leave-to {
    opacity: 0;
    transform: scaleY(0.3);
}

.drag-list-leave-active {
    position: absolute;
    pointer-events: none;
}
</style>
