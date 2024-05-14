<script lang="ts" setup>
import DragResize from 'vue3-draggable-resizable'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
import {nextTick, onMounted, ref, toRaw, watch} from 'vue'
import {ElButton, useZIndex} from "element-plus";
import {Close, FullScreen} from "@element-plus/icons-vue";
import {DragDialogProps} from "./DragDialogProps.ts";
import {DragDialogEmits} from "./DragDialogEmits.ts";
import {sendMessage} from "@/message/message.ts";
import {judgeTargetIsInteraction} from "@/utils/clickUtils.ts";

const openState = defineModel<boolean>()

const props = withDefaults(defineProps<DragDialogProps>(), {
	to: "body",
	canResize: false,
	canDrag: true,
	canFullScreen: true,
	initW: 800,
	limitByParent: false,
	modal: true
})

const emits = defineEmits<DragDialogEmits>()

const wrapper = ref<HTMLElement>()
const content = ref<HTMLElement>()

const draggable = ref(props.canDrag)
const resizable = ref(props.canResize)

const x = ref(0)
const y = ref(0)
const w = ref(0)
const h = ref(0)

const currentZIndex = ref<number>()

const zIndexManager = useZIndex()

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
	let tempX = x.value
	let tempW = w.value

	let maxWidth: number

	if (props.limitByParent) {
		let parent = getParent()
		if (!parent) {
			sendMessage('DragDialog has no match parent', 'error')
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

	x.value = tempX
	w.value = tempW
}

const initYH = () => {
	if (props.initY) {
		y.value = props.initY
	}
	if (props.initH) {
		h.value = props.initH
	}
}

const toFront = () => {
	currentZIndex.value = zIndexManager.nextZIndex()
}

const isFullScreen = (): boolean =>
	x.value === 0 &&
	y.value === 0 &&
	h.value === document.documentElement.offsetHeight &&
	w.value === document.documentElement.offsetWidth

const fullScreenPositionAndSize = () => {
	x.value = 0
	y.value = 0
	h.value = document.documentElement.offsetHeight
	w.value = document.documentElement.offsetWidth
}

const handleOpen = () => {
	emits('open')
	initXW()
	initYH()
	toFront()
	nextTick(() => {
		emits('opened')
	})
}

const handleClose = () => {
	emits("close")
	openState.value = false
	nextTick(() => {
		emits('closed')
	})
}

const handleToggleFullScreen = () => {
	emits("fullScreenToggle")

	if (!props.canFullScreen) {
		sendMessage('DragDialog can not be full-screen when props.canFullScreen is false', 'error')
		return
	}

	toFront()

	if (isFullScreen()) {
		initXW()
		initYH()
	} else {
		fullScreenPositionAndSize()
	}

	if (props.limitByParent) {
		// FIX 修复 limitByParent 时 x y 作用问题
		nextTick(() => {
			x.value = -x.value
			y.value = -y.value
			nextTick(() => {
				x.value = -x.value
				y.value = -y.value
			})
		})
		emits("fullScreenToggled")
	} else {
		emits("fullScreenToggled")
	}
}

watch(() => openState.value, () => {
	if (openState.value) {
		handleOpen()
	}
})

const syncDialogHeight = () => {
	if (content.value) {
		if (props.fitContent) {
			content.value.style.height = '0'
			content.value.style.height = 'auto'
		}

		h.value = content.value.scrollHeight + 35
	}
}

const updateContentSizeByWrapper = () => {
	if (wrapper.value && content.value) {
		content.value.style.height = wrapper.value.offsetHeight - 35 + 'px'
		content.value.style.width = wrapper.value?.offsetWidth - 20 + 'px'
	}
}

const wrapperResizeOb = new ResizeObserver(updateContentSizeByWrapper)

onMounted(() => {
	if (openState.value) {
		handleOpen()
	}
	if (props.canFullScreen && props.initFullScreen) {
		fullScreenPositionAndSize()
	}
	nextTick(() => {
		if (content.value && wrapper.value) {
			wrapperResizeOb.observe(wrapper.value)
		}
	})
})

const handleContentMouseOver = (e: MouseEvent) => {
	if (!props.canDrag) {
		draggable.value = false
		return
	}

	draggable.value = !judgeTargetIsInteraction(e);
}

const handleContentMouseLeave = () => {
	if (!props.canDrag) {
		draggable.value = false
		return
	}

	draggable.value = true
}

defineExpose({
	syncDialogHeight
})
</script>

<template>
	<Teleport :to="to">
		<div v-if="openState && modal" class="modal" :style="`z-index: ${currentZIndex};`"></div>

		<DragResize v-if="openState"
					:active="true"
					:draggable="draggable"
					:resizable="resizable"
					:parent="limitByParent"
					:x="x" :disabledX="disabledX"
					:y="y" :disabledY="disabledY"
					:h="h" :maxH="maxH" :minH="minH" :disabledH="disabledH"
					:w="w" :maxW="maxW" :minW="minW" :disabledW="disabledW"
					:style="`border: none; z-index: ${currentZIndex};`"
					:class="{disabledW, disabledH, disabledX, disabledY}">
			<div ref="wrapper" class="wrapper" style="cursor: all-scroll;" @mouseenter="toFront">
				<div class="right-top">
					<el-button :icon="FullScreen" link size="large" @click="handleToggleFullScreen"
							   v-if="canFullScreen"></el-button>
					<el-button :icon="Close" link size="large" type="danger" @click="handleClose"></el-button>
				</div>

				<div ref="content" class="content"
					 @mouseover="handleContentMouseOver" @mouseleave="handleContentMouseLeave">
					<slot></slot>
				</div>
			</div>
		</DragResize>
	</Teleport>
</template>

<style scoped>
.right-top {
	position: absolute;
	top: 0;
	right: 0;
	cursor: pointer;
	padding: 0 5px;
	font-weight: 600;
}

.wrapper {
	height: 100%;
	width: 100%;
	overflow: hidden;
	padding: 20px 10px 10px;
	background-color: #fff;
	border-radius: var(--el-border-radius-base);
	box-shadow: var(--el-box-shadow);
	position: relative;
}

.content {
	height: 100%;
	width: 100%;
	overflow: auto;
	scrollbar-gutter: stable;
}

.modal {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	opacity: var(--el-popup-modal-opacity);
	backdrop-filter: brightness(0.6);
}

:deep(.handle) {
	width: 8px;
	height: 8px;
	border: none;
	background-color: transparent;
}

:deep(.handle-tl),
:deep(.handle-tm),
:deep(.handle-tr) {
	top: 0;
}

:deep(.handle-bl),
:deep(.handle-bm),
:deep(.handle-br) {
	bottom: 0;
}

:deep(.handle-tl),
:deep(.handle-ml),
:deep(.handle-bl) {
	left: 0;
}

:deep(.handle-tr),
:deep(.handle-mr),
:deep(.handle-br) {
	right: 0;
}

:deep(.handle-tm) {
	width: calc(100% - 16px);
	left: 11px;
}

:deep(.handle-bm) {
	width: calc(100% - 16px);
	left: 12px;
}

:deep(.handle-ml),
:deep(.handle-mr) {
	height: calc(100% - 16px);
	top: 11px;
}

.disabledH > :deep(.handle-tl),
.disabledH > :deep(.handle-tm),
.disabledH > :deep(.handle-tr),
.disabledH > :deep(.handle-bl),
.disabledH > :deep(.handle-bm),
.disabledH > :deep(.handle-br) {
	display: none !important;
}

.disabledW > :deep(.handle-tl),
.disabledW > :deep(.handle-ml),
.disabledW > :deep(.handle-bl),
.disabledW > :deep(.handle-tr),
.disabledW > :deep(.handle-mr),
.disabledW > :deep(.handle-br) {
	display: none !important;
}
</style>
