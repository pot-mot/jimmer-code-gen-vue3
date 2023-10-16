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
	resizable?: boolean
}

const props = withDefaults(defineProps<DragResizeProps>(), {
	to: "body",
	resizable: false,
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

const content = ref<HTMLElement>()
const h = ref(0)

onMounted(() => {
	nextTick(() => {
		if (content.value) {
			const resizeOb = new ResizeObserver(() => {
				if (content.value) {
					h.value = content.value.scrollHeight + 20
				}
			})

			resizeOb.observe(content.value)
		}
	})
})
</script>

<template>
	<Teleport :to="to">
		<DragResize :active="true" :draggable="draggable" :parent="true" :resizable="resizable"
					:h="h" :w="w" :initH="initH" :initW="initW" :minH="minH" :minW="minW" :maxH="maxH" :maxW="maxW"
					:x="x" :y="y"
					style="border: none; z-index: 2000;">
			<div class="wrapper">
				<div class="close" @click="close">
					<slot name="close">
						<el-button type="danger" :icon="Close" size="default" link></el-button>
					</slot>
				</div>
				<div ref="content" style="cursor: default; overflow: auto; scrollbar-gutter: stable;"
					 @mouseenter="draggable = false" @mouseleave="draggable = true">
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
	height: calc(100% - 8px);
	width: calc(100% - 8px);
	margin: 4px;
	padding: 1em;
	border-radius: var(--el-border-radius-base);
	box-shadow: var(--el-box-shadow);
	background-color: #fff;
	cursor: all-scroll;
	position: relative;
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