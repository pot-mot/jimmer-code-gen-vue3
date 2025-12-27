<script lang="ts" setup>
import {computed, nextTick, reactive, ref, toRaw, watch} from 'vue'
import IconFullScreen from "@/components/icons/IconFullScreen.vue";
import IconClose from "@/components/icons/IconClose.vue";
import ResizeWrapper from "@/components/resizer/ResizeWrapper.vue";
import {judgeTarget, judgeTargetIsInteraction} from "@/utils/event/judgeEventTarget.ts";
import {useDialogZIndex} from "@/components/dialog/DialogZIndex.ts";
import type {ResizeEventArgs} from "@/components/resizer/ResizeWrapperType.ts";

const openState = defineModel<boolean>({
    required: true
})

const props = withDefaults(defineProps<{
    to?: HTMLElement | string
    initX?: number
    initY?: number
    initW?: number
    initH?: number
    minWidth?: number
    maxWidth?: number
    minHeight?: number
    maxHeight?: number
    limitByParent?: boolean
    modal?: boolean
    canResize?: boolean
    canDrag?: boolean
    canFullScreen?: boolean
    canExitFullScreen?: boolean
    initFullScreen?: boolean
}>(), {
    initW: window.innerWidth * 0.8,
    initH: window.innerHeight * 0.8,
    to: "body",
    canResize: false,
    canDrag: true,
    canFullScreen: true,
    canExitFullScreen: true,
    limitByParent: false,
    modal: false
})

const emits = defineEmits<{
    (event: "open"): void
    (event: "opened"): void
    (event: "close"): void
    (event: "closed"): void
    (event: "fullScreenToggle"): void
    (event: "fullScreenToggled"): void
}>()

const draggable = ref(props.canDrag)
const resizable = ref(props.canResize)

const position = reactive({
    x: 0,
    y: 0
})
const positionX = computed(() => position.x + 'px')
const positionY = computed(() => position.y + 'px')
const size = reactive({
    width: 0,
    height: 0
})

const {zIndex, toFront} = useDialogZIndex()

const getParent = (): HTMLElement | null => {
    let parent: HTMLElement | null

    const to: string | HTMLElement = toRaw(props.to)

    if (typeof to === "string") {
        parent = document.querySelector(to)
    } else {
        parent = to
    }

    return parent
}

const initXW = () => {
    let tempX = position.x
    let tempW = size.width

    let maxWidth: number

    if (props.limitByParent) {
        const parent = getParent()
        if (!parent) {
            return
        }
        maxWidth = parent.clientWidth
    } else {
        maxWidth = document.documentElement.clientWidth
    }
    if (maxWidth < props.initW) {
        tempX = 0
        tempW = maxWidth
    } else if (props.initX !== undefined) {
        tempX = props.initW + props.initX > maxWidth ? maxWidth - props.initW : props.initX
        tempW = props.initW
    } else {
        tempX = (maxWidth - props.initW) / 2
        tempW = props.initW
    }

    position.x = tempX
    size.width = tempW
}

const initYH = () => {
    let tempY = position.y
    let tempH = size.height

    let maxHeight: number

    if (props.limitByParent) {
        const parent = getParent()
        if (!parent) return

        maxHeight = parent.clientHeight
    } else {
        maxHeight = document.documentElement.clientHeight
    }
    if (maxHeight < props.initH) {
        tempY = 0
        tempH = maxHeight
    } else if (props.initY !== undefined) {
        tempY = props.initY
        tempH = props.initH
    } else {
        tempY = (maxHeight - props.initH) / 2
        tempH = props.initH
    }

    position.y = tempY
    size.height = tempH
}

const isFullScreen = computed<boolean>(() =>
    position.x === 0 &&
    position.y === 0 &&
    size.height === document.documentElement.offsetHeight &&
    size.width === document.documentElement.offsetWidth
)

watch(() => isFullScreen.value, (value) => {
    if (value) {
        draggable.value = false
    } else {
        draggable.value = props.canDrag
    }
})

const enterFullScreen = () => {
    position.x = 0
    position.y = 0
    size.height = document.documentElement.offsetHeight
    size.width = document.documentElement.offsetWidth
}

const exitFullScreen = () => {
    initXW()
    initYH()
}

const initSizePosition = () => {
    if (props.canFullScreen && props.initFullScreen) {
        enterFullScreen()
    } else {
        exitFullScreen()
    }
}

const handleOpen = async () => {
    emits('open')

    toFront()
    initSizePosition()

    await nextTick()
    emits('opened')
}

const handleClose = async () => {
    emits("close")

    openState.value = false

    await nextTick()
    emits('closed')
}

const toggleFullScreen = async () => {
    if (!props.canFullScreen) return

    emits("fullScreenToggle")

    toFront()

    if (isFullScreen.value) {
        exitFullScreen()
    } else {
        enterFullScreen()
    }

    if (props.limitByParent) {
        await nextTick()
        position.x = -position.x
        position.y = -position.y

        await nextTick()
        position.x = -position.x
        position.y = -position.y
    }

    emits("fullScreenToggled")
}

watch(() => openState.value, (value) => {
    if (value) handleOpen()
}, {immediate: true})

const handleResize = ({currentPositionDiff}: ResizeEventArgs) => {
    position.x += currentPositionDiff.x
    position.y += currentPositionDiff.y
}

const handleInnerOver = (e: PointerEvent) => {
    if (!props.canDrag) {
        draggable.value = false
        return
    }

    if (isFullScreen.value) {
        return
    }

    draggable.value = !judgeTargetIsInteraction(e) && !judgeTarget(e, (el) => el.classList.contains('no-drag'))
}

const handleInnerLeave = () => {
    if (!props.canDrag) {
        draggable.value = false
        return
    }

    if (isFullScreen.value) {
        return
    }

    draggable.value = true
}

const isDragging = ref(false)
let initX = 0
let initY = 0

const onDragStart = (event: PointerEvent) => {
    if (!draggable.value) return

    isDragging.value = true
    initX = position.x - event.clientX
    initY = position.y - event.clientY
    document.documentElement.addEventListener('pointermove', onDragMove)
    document.documentElement.addEventListener('pointerup', onDragEnd)
}

const onDragMove = (event: PointerEvent) => {
    if (!draggable.value) {
        onDragEnd()
        return
    }

    if (isDragging.value) {
        position.x = initX + event.clientX
        position.y = initY + event.clientY

        window.getSelection()?.removeAllRanges()
    }
}

const onDragEnd = () => {
    isDragging.value = false
    initX = 0
    initY = 0
    document.documentElement.removeEventListener('pointermove', onDragMove)
    document.documentElement.removeEventListener('pointerup', onDragEnd)
}
</script>

<template>
    <Teleport to="body">
        <template v-if="openState">
            <div v-if="modal" class="modal">
                <slot name="modal">
                    <div class="modal-content"/>
                </slot>
            </div>

            <ResizeWrapper
                v-model="size"
                class="dialog"
                :class="{'full-screen': isFullScreen}"
                handle-size="8px"
                border-width="8px"
                @resize="handleResize"
                :disabled="!resizable"
                :min-width="minWidth"
                :max-width="maxWidth"
                :min-height="minHeight"
                :max-height="maxHeight"

                @pointerdown="onDragStart"
                @pointerover="handleInnerOver"
                @pointerleave="handleInnerLeave"
            >
                <div class="dialog-header">
                    <div>
                        <slot name="title"/>
                    </div>
                    <div>
                        <button class="toggle-full-screen" @click="toggleFullScreen" v-if="canFullScreen && canExitFullScreen">
                            <IconFullScreen/>
                        </button>
                        <button class="close" @click="handleClose">
                            <IconClose/>
                        </button>
                    </div>
                </div>

                <div class="dialog-content">
                    <slot/>
                </div>
            </ResizeWrapper>
        </template>
    </Teleport>
</template>

<style scoped>
.dialog {
    position: absolute;
    left: v-bind(positionX);
    top: v-bind(positionY);
    z-index: v-bind(zIndex);
    border: var(--border);
    border-color: var(--border-color-light);
    border-radius: var(--border-radius);
    background-color: var(--background-color);
    overflow: hidden;
}

.dialog.full-screen {
    border: none;
}

.dialog-header {
    display: flex;
    justify-content: space-between;
    height: 2rem;
    line-height: 2rem;
    padding-left: 0.5rem;
}

.dialog-header button {
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    height: 2rem;
}

.dialog-header button > svg {
    vertical-align: top;
}

.dialog-header button.toggle-full-screen:hover {
    background-color: var(--background-color-hover);
}

.dialog-header button.close:hover {
    background-color: var(--danger-color);
    --icon-color: #fff;
}

.dialog-content {
    height: calc(100% - 2rem);
    width: 100%;
    overflow: auto;
}

.modal {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: v-bind(zIndex);
}

.modal-content {
    height: 100%;
    width: 100%;
    background-color: var(--mask-color);
}

:deep(.resize-border),
:deep(.resize-handle) {
    background-color: transparent;
}
</style>
