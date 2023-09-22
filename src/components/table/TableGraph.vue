<template>
	<div ref="wrapper" class="wrapper">
		<div ref="container"/>
		<ul class="tool-list">
			<li @click="handleRefresh">重置</li>
			<li @click="handleRefreshAssociation">清空关联</li>
			<li @click="handleLayout">布局</li>
			<li @click="handleUndo">undo</li>
			<li @click="handleRedo">redo</li>
			<li @click="handleSave">保存</li>
			<li @click="handleScan">扫描关联</li>
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
import {nextTick, onMounted, ref} from "vue";
import {Graph} from "@antv/x6";

import {ColumnPort} from "./port/ColumnPort.ts";

import {register} from "@antv/x6-vue-shape";
import TableNode from "./node/TableNode.vue";
import {initGraph} from "./graphEditor/init.ts";
import {COLUMN_PORT} from "./constant";
import {useHistory} from "./graphEditor/history.ts";
import {useSelection} from "./graphEditor/selection.ts";
import {
	useEdgeMouseEnterChangeEdgeColor,
	useMouseEnterNodeToFront
} from "./graphEditor/eventListen.ts";
import {addAssociationEdges, scanAssociations, useSwitchAssociationType} from "./edge/AssociationEdge.ts";
import {clearGraph, loadGraph, saveGraph} from "./graphEditor/localStorage.ts";
import {useTableEditorStore} from "../../store/tableEditor.ts";
import {layout} from "./graphEditor/layout.ts";

const container = ref<HTMLDivElement | null>(null);
const wrapper = ref<HTMLDivElement | null>(null);

let graph: Graph

const store = useTableEditorStore()

Graph.registerPortLayout(
	COLUMN_PORT,
	ColumnPort,
	true
)

register({
	shape: "table",
	component: TableNode
});

const init = () => {
	graph = initGraph(container.value!, wrapper.value!)
	useHistory(graph)
	useSelection(graph)

	useMouseEnterNodeToFront(graph)
	useEdgeMouseEnterChangeEdgeColor(graph)
	useSwitchAssociationType(graph)
}

const addEventListener = () => {
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
		if (graph && event.key === 'Delete') {
			const selectedCells = graph.getSelectedCells()

			// 删除选中的元素
			graph?.removeCells(selectedCells)
		}
	});
}

const load = () => {
	try {
		loadGraph(graph)
		store.load(graph)

		window.addEventListener('beforeunload', () => {
			handleSave()
		})
	} catch (e) {
		clearGraph(graph)
	}
}

const handleUndo = () => {
	if (graph && graph.canUndo()) {
		graph.undo()
	}
}

const handleRedo = () => {
	if (graph && graph.canRedo()) {
		graph.redo()
	}
}

const handleSave = () => {
	if (graph) {
		saveGraph(graph)
	}
}

const handleScan = () => {
	scanAssociations(store.tables().map(table => table.id)).then(res => {
		addAssociationEdges(graph, res)
	})
}

const handleRefresh = () => {
	init()
}

const handleRefreshAssociation = () => {
	graph.removeCells(graph.getEdges())
}

const handleLayout = () => {
	layout(graph)
}

onMounted(() => {
	nextTick(() => {
		init()

		addEventListener()

		load()
	})
});
</script>