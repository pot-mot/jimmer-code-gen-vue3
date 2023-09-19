<template>
	<div ref="wrapper" class="wrapper">
		<div ref="container"/>
		<ul class="tool-list">
			<li @click="handleUndo">undo</li>
			<li @click="handleRedo">redo</li>
		</ul>
	</div>
</template>

<style lang="scss">
.x6-graph-scroller-background {
	background-color: #ccc;
}

.x6-graph-background {
	background-color: #fff;
}

.x6-widget-selection {
	.x6-widget-selection-box {
		border: 1px dashed #239edd;
	}

	.x6-widget-selection-inner {
		border: 1px solid #239edd;
	}
}
</style>

<style lang="scss" scoped>
.wrapper {
	position: relative;
	height: 100%;
	width: 100%;
}

.tool-list {
	position: absolute;
	top: 0;
	right: 0;
}
</style>

<script lang="ts" setup>
import {nextTick, onMounted, Ref, ref} from "vue";
import {Graph} from "@antv/x6";

import {ColumnPortLayout} from "./port/ColumnPortLayout.ts";

import {register} from "@antv/x6-vue-shape";
import TableNode from "./shape/TableNode.vue";
import {initGraph} from "./graphEditor/init.ts";
import {useStoreEvents} from "./graphEditor/store.ts";
import {COLUMN_PORT} from "./constant";
import {useHistory} from "./graphEditor/history.ts";
import {useSelection} from "./graphEditor/selection.ts";
import {
	useEdgeClickToggleAssociationType,
	useEdgeMouseEnterChangeEdgeColor,
	useMouseEnterNodeToFront
} from "./graphEditor/eventListen.ts";

const container = ref<HTMLDivElement | null>(null);
const wrapper = ref<HTMLDivElement | null>(null);

const graph: Ref<Graph | undefined> = ref();

Graph.registerPortLayout(
	COLUMN_PORT,
	ColumnPortLayout,
	true
)

register({
	shape: "table",
	component: TableNode
});

const handleUndo = () => {
	if (graph.value && graph.value.canUndo()) {
		graph.value.undo()
	}
}

const handleRedo = () => {
	if (graph.value && graph.value.canRedo()) {
		graph.value.redo()
	}
}

onMounted(() => {
	nextTick(() => {
		graph.value = initGraph(container.value!, wrapper.value!)
		useStoreEvents(graph.value)
		useHistory(graph.value)
		useSelection(graph.value)

		useMouseEnterNodeToFront(graph.value)
		useEdgeMouseEnterChangeEdgeColor(graph.value)

		useEdgeClickToggleAssociationType(graph.value)

		document.documentElement.addEventListener('keydown', (e: KeyboardEvent) => {
			if (e.ctrlKey || e.metaKey) {
				if (e.key == 'z') {
					handleUndo()
				} else if (e.key == 'Z') {
					handleRedo()
				}
			}
		})

		document.documentElement.addEventListener('keydown', (event) => {
			if (graph.value && event.key === 'Delete') {
				const selectedCells = graph.value.getSelectedCells()

				// 删除选中的元素
				selectedCells.forEach((cell) => {
					graph.value?.removeCell(cell.id)
				});
			}
		});
	})
});
</script>