<script lang="ts" setup>
import DragResize from 'vue3-draggable-resizable'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
import {nextTick, onMounted, ref} from 'vue'
import {ElButton} from "element-plus";
import {Close} from "@element-plus/icons-vue";

interface DragResizeProps {
	x?: number
	y?: number
	initH?: number
	initW?: number
	minW?: number
	minH?: number
	maxW?: number
	maxH?: number
	to?: string
	canResize?: boolean
	canDrag?: boolean
}

const props = withDefaults(defineProps<DragResizeProps>(), {
	to: "body",
	canResize: false,
	canDrag: true,
	initW: 800,
})

const x = ref(0)
const w = ref(0)

onMounted(() => {
	const maxWidth = document.documentElement.clientWidth

	if (maxWidth < props.initW) {
		x.value = 0
		w.value = maxWidth
	} else if (props.x) {
		w.value = props.initW

		if (props.initW + props.x > maxWidth) {
			x.value = maxWidth - props.x - 20
		} else {
			x.value = props.x
		}
	} else {
		w.value = props.initW
		x.value = (maxWidth - w.value) / 2
	}
})

interface DragDialogEmits {
	(event: "close"): void
}

const emits = defineEmits<DragDialogEmits>()

const close = () => {
	emits("close")
}

const draggable = ref(true)

const wrapper = ref<HTMLElement>()
const content = ref<HTMLElement>()
const h = ref(0)
let resizeFlag = false

onMounted(() => {
	nextTick(() => {
		if (content.value && wrapper.value) {
			const contentResizeOb = new ResizeObserver(() => {
				if (content.value) {
					if (resizeFlag) {
						resizeFlag = false
					} else {
						h.value = content.value.scrollHeight + 35
					}
				}
			})

			contentResizeOb.observe(content.value)

			const wrapperResizeOb = new ResizeObserver(() => {
				if (wrapper.value && content.value) {
					content.value.style.height = wrapper.value.offsetHeight - 35 + 'px'
					resizeFlag = true
				}
			})

			wrapperResizeOb.observe(wrapper.value)
		}
	})
})

const handleContentMouseEnter = () => {
	draggable.value = props.canDrag && false
}

const handleContentMouseLeave = () => {
	draggable.value = props.canDrag && true
}
</script>

<template>
	<Teleport :to="to">
		<DragResize :active="true" :draggable="draggable" :parent="true" :resizable="canResize"
					:h="h" :w="w" :initH="initH" :initW="initW" :minH="minH" :minW="minW" :maxH="maxH" :maxW="maxW"
					:x="x" :y="y"
					style="border: none; z-index: 2000;">
			<div ref="wrapper" class="wrapper" :style="draggable ? 'cursor: all-scroll;' : 'cursor: default;'">
				<div class="close" @click="close">
					<slot name="close">
						<el-button type="danger" :icon="Close" size="large" link></el-button>
					</slot>
				</div>
				<div ref="content"  class="content"
					 @mouseenter="handleContentMouseEnter" @mouseleave="handleContentMouseLeave">
					<slot></slot>
				</div>
			</div>
		</DragResize>
	</Teleport>
</template>

<style scoped>
.close {
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
	cursor: default;
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
</style>