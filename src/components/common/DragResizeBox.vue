<script lang="ts" setup>
import DragResize from 'vue3-draggable-resizable'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
import {ref} from 'vue'

interface DragResizeProps {
	x?: number
	y?: number
	initH?: number
	initW?: number
	minW?: number
	minH?: number
}

withDefaults(
	defineProps<DragResizeProps>(),
	{
		x: 0,
		y: 0,
		initH: 350,
		initW: 450,
		minH: 150,
		minW: 200
	}
)

const draggable = ref(true)
</script>

<template>
	<DragResize 
		:parent="true" :draggable="draggable" 
		style="border: none;"
		:x="x" :y="y"
		:initH="initH" :initW="initW" 
		:minH="minH" :minW="minW" 
		>
		<div class="wrapper">
			<div @mouseenter="draggable = false" @mouseleave="draggable = true" 
			style="cursor: default; position: relative; overflow: auto;">
				<slot></slot>
			</div>
		</div>
	</DragResize>
</template>

<style scoped>
.wrapper {
	height: calc(100% - 8px);
	width: calc(100% - 8px);
	margin: 4px;
	padding: 10px;
	border: 1px solid rgba(0, 0, 0, .5);
	cursor: all-scroll;
	background-color: #fff;
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