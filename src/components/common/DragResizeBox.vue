<script lang="ts" setup>
import DragResize from 'vue3-draggable-resizable'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'

interface DragResizeProps {
	initH?: number
	initW?: number
	minW?: number
	minH?: number
}

withDefaults(
	defineProps<DragResizeProps>(),
	{
		initH: 350,
		initW: 450,
		minH: 150,
		minW: 200
	}
)

</script>

<template>
	<DragResize :initH="initH" :initW="initW" :minH="minH" :minW="minW" style="border: none;">
		<div class="wrapper">
			<slot></slot>
		</div>
	</DragResize>
</template>

<style scoped>
.wrapper {
	height: calc(100% - 8px);
	width: calc(100% - 8px);
	margin: 4px;
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