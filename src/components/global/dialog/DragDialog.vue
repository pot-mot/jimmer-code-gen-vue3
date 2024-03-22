<script lang="ts" setup>
import DragResize from 'vue3-draggable-resizable'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
import {nextTick, onBeforeMount, onMounted, ref, toRaw, watch} from 'vue'
import {ElButton} from "element-plus";
import {Close, FullScreen} from "@element-plus/icons-vue";
import {DragDialogProps} from "./DragDialogProps.ts";
import {DragDialogEmits, ModelValueEmits} from "./DragDialogEmits.ts";
import {sendMessage} from "@/message/message.ts";
import {useZIndex} from "element-plus";
import {judgeTargetIsInteraction} from "@/utils/clickUtils.ts";

const props = withDefaults(defineProps<DragDialogProps>(), {
	to: "body",
	canResize: false,
	canDrag: true,
	initW: 800,
	limitByParent: false,
	modal: true
})

const wrapper = ref<HTMLElement>()
const content = ref<HTMLElement>()

const draggable = ref(props.canDrag)
const resizable = ref(props.canResize)

const x = ref(0)
const y = ref(0)
const w = ref(0)
const h = ref(0)

const zIndexManager = useZIndex()

const initPositionAndSize = () => {
	let maxWidth: number

	if (props.limitByParent) {
		let parent: HTMLElement | null

		const to: string | HTMLElement = toRaw(props.to)

		if (typeof to === "string") {
			parent = document.querySelector(to)
		} else {
			parent = to
		}

		if (!parent) {
			sendMessage('dialog 创建失败', 'error')
			return
		}

		maxWidth = parent.clientWidth
	} else {
		maxWidth = document.documentElement.clientWidth
	}

	if (maxWidth < props.initW) {
		x.value = 0
		w.value = maxWidth
	} else if (props.initX !== undefined) {
		w.value = props.initW

		if (props.initW + props.initX > maxWidth) {
			x.value = maxWidth - props.initW
		} else {
			x.value = props.initX
		}
	} else {
		w.value = props.initW
		x.value = (maxWidth - w.value) / 2
	}

	if (props.initH) {
		h.value = props.initH
	}

	if (props.initY) {
		y.value = props.initY
	}
}

const emits = defineEmits<DragDialogEmits & ModelValueEmits<boolean>>()

const currentZIndex = ref<number>()

const handleOpen = () => {
	emits('open')
	initPositionAndSize()
	currentZIndex.value = zIndexManager.nextZIndex()
	emits('opened')
}

const handleClose = () => {
	emits("close")
	emits('update:modelValue', false)
	emits("closed")
}

const handleToggleFullScreen = () => {
	currentZIndex.value = zIndexManager.nextZIndex()

	if (
		x.value === 0 &&
		y.value === 0 &&
		h.value - document.documentElement.offsetHeight === 0 &&
		w.value - document.documentElement.offsetWidth === 0
	) {
		initPositionAndSize()
	} else {
		x.value = 0
		y.value = 0
		h.value = document.documentElement.offsetHeight
		w.value = document.documentElement.offsetWidth
	}
}

onBeforeMount(() => {
	if (props.modelValue) {
		handleOpen()
	}
})

watch(() => props.modelValue, (modelValue) => {
	if (modelValue) {
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
		<div v-if="modelValue && modal" class="modal" :style="`z-index: ${currentZIndex};`"></div>

		<DragResize v-if="modelValue"
					:active="true"
					:draggable="draggable"
					:resizable="resizable"
					:x="x" :disabledX="disabledX"
					:y="y" :disabledY="disabledY"
					:parent="limitByParent"
					:h="h" :maxH="maxH" :minH="minH" :disabledH="disabledH"
					:w="w" :maxW="maxW" :minW="minW" :disabledW="disabledW"
					:style="`border: none; z-index: ${currentZIndex};`"
					:class="{disabledW, disabledH, disabledX, disabledY}">
			<div ref="wrapper" class="wrapper" style="cursor: all-scroll;">
				<div class="right-top" >
					<el-button :icon="FullScreen" link size="large" @click="handleToggleFullScreen"></el-button>
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
	background-color: var(--el-popup-modal-bg-color);
	opacity: var(--el-popup-modal-opacity);
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
