<script lang="ts" setup>
import DragResize from 'vue3-draggable-resizable'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
import { onMounted, ref } from 'vue'

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
	const resizeOb = new ResizeObserver(() => {
		h.value = content.value!.scrollHeight + 20
	})
	resizeOb.observe(content.value!)
})
</script>

<template>
	<Teleport to="body">
		<DragResize :parent="true" :draggable="draggable" :resizable="false" style="border: none;" :x="x" :y="y"
			:initH="initH" :initW="initW" :minH="minH" :minW="minW" :h="h">
			<div class="wrapper">
				<div class="close" @click="close">x</div>
				<div @mouseenter="draggable = false" @mouseleave="draggable = true"
					style="cursor: default; overflow: auto; scrollbar-gutter: stable;" ref="content">
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

.dragging>.wrapper {
	border-color: #000;
}
</style>