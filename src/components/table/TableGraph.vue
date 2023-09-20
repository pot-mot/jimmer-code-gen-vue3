<template>
	<div ref="wrapper" class="wrapper">
		<div ref="container"/>
		<ul class="tool-list">
			<li @click="handleUndo">undo</li>
			<li @click="handleRedo">redo</li>
			<li @click="handleSave">保存</li>
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
	useEdgeMouseEnterChangeEdgeColor,
	useMouseEnterNodeToFront
} from "./graphEditor/eventListen.ts";
import {useSwitchAssociationType} from "./edge/AssociationEdge.ts";
import {getAssociations} from "./graphEditor/table.ts";
import {loadGraph, saveGraph} from "./graphEditor/localStorage.ts";

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

const handleSave = () => {
	if (graph.value) {
		getAssociations(graph.value)
		saveGraph(graph.value)
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
		useSwitchAssociationType(graph.value)

		document.documentElement.addEventListener('keydown', (e: KeyboardEvent) => {
			if (e.ctrlKey || e.metaKey) {
				if (e.key == 'z') {
					e.preventDefault()
					handleUndo()
				} else if (e.key == 'Z') {
					e.preventDefault()
					handleRedo()
				} else if (e.key == 's') {
					e.preventDefault()
					handleSave()
				}
			}
		})

		document.documentElement.addEventListener('keydown', (event) => {
			if (graph.value && event.key === 'Delete') {
				const selectedCells = graph.value.getSelectedCells()

				// 删除选中的元素
				graph.value?.removeCells(selectedCells)
			}
		});

		loadGraph(graph.value)

		window.addEventListener('beforeunload', () => {
			handleSave()
		})
	})
});
</script>