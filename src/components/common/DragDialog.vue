<script lang="ts" setup>
import DragResize from 'vue3-draggable-resizable'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
import {nextTick, onMounted, ref} from 'vue'

interface DragResizeProps {
	x?: number
	y?: number
	initH?: number
	initW?: number
	minW?: number
	minH?: number
}

defineProps<DragResizeProps>()

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
	<Teleport to="body">
		<DragResize :active="true" :draggable="draggable" :parent="true" :resizable="true"
					:h="h" :initH="initH" :initW="initW" :minH="minH" :minW="minW" :x="x" :y="y"
					style="border: none;">
			<div class="wrapper">
				<div class="close" @click="close">x</div>
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

.close:hover {
	color: red;
}

.wrapper {
	height: calc(100% - 8px);
	width: calc(100% - 8px);
	margin: 4px;
	padding: 10px;
	border: 1px solid rgba(0, 0, 0, .5);
	cursor: all-scroll;
	background-color: #fff;
	position: relative;
}

.dragging > .wrapper {
	border-color: #000;
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