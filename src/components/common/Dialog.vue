<script setup lang="ts">
import DragResize from 'vue3-draggable-resizable'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
</script>

<template>
	<DragResize :initH="500" :initW="450" style="border: none;">
		<div class="wrapper">
			<slot></slot>
		</div>
	</DragResize>
</template>

<style scoped>
.wrapper {
	height: 100%;
	width: 100%;
	border: 1px solid rgba(0, 0, 0, .5);
	cursor: all-scroll;
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

:deep(.handle-tm) {
	width: calc(100% - 8px);
	left: 7px;
}

:deep(.handle-bm) {
	width: calc(100% - 8px);
	left: 8px;
}

:deep(.handle-ml),
:deep(.handle-mr) {
	height: calc(100% - 8px);
	top: 7px;
}
</style>