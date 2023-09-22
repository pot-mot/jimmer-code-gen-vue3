<template>
	<div ref="wrapper" class="wrapper">
		<div ref="container"/>
		<div class="toolbar right-bottom minimap" ref="minimap"></div>
		<ul class="toolbar left-top">
			<li>
				<button @click="handleUndo">undo</button>
			</li>
			<li>
				<button @click="handleRedo">redo</button>
			</li>
			<li>
				<button @click="handleSaveAssociation">保存关联（入库）</button>
			</li>
			<li>
				<button @click="handleLayout">布局</button>
				<select v-model="layoutDirection">
					<option value="LR">左右</option>
					<option value="RL">右左</option>
					<option value="TB">上下</option>
					<option value="BT">下上</option>
				</select>
			</li>
			<li>
				<button @click="handleScan">扫描关联</button>
			</li>
		</ul>
		<ul class="toolbar right-top">
			<li>
				<button @click="handleRefresh">清理画布</button>
			</li>
			<li>
				<button @click="handleRefreshAssociation">清除关联</button>
			</li>
		</ul>
	</div>
</template>

<style lang="scss" scoped>
.wrapper {
	position: relative;
	height: 100%;
	width: 100%;

	--highlight-color: #239edd;
	--common-color: #666;
}

.toolbar {
	position: absolute;
	border: 1px var(--common-color) solid;
	background-color: #fff;

	&.right-top {
		top: 0;
		right: 0;
	}

	&.left-top {
		top: 0;
		left: 0;
	}

	&.right-bottom {
		bottom: 0;
		right: 0;
	}

	&.left-bottom {
		bottom: 0;
		left: 0;
	}
}

.minimap {
	width: max(25vw, 200px);
	height: max(35vh, 200px);
}

.x6-node-selected .node-wrapper {
	border: 2px solid var(--highlight-color);
}

.x6-highlight-stroke {
	stroke: var(--highlight-color) !important;
}
</style>

<script lang="ts" setup>
import {nextTick, onMounted, Ref, ref} from "vue";
import {Graph} from "@antv/x6";

import {ColumnPort} from "./port/ColumnPort.ts";

import {register} from "@antv/x6-vue-shape";
import TableNode from "./node/TableNode.vue";
import {initGraph} from "./graphEditor/init.ts";
import {COLUMN_PORT} from "./constant";
import {useHistory} from "./graphEditor/history.ts";
import {useSelection} from "./graphEditor/selection.ts";
import {
	useEdgeColor,
	useHoverToFront
} from "./graphEditor/eventListen.ts";
import {addAssociationEdges, scanAssociations, useSwitchAssociationType} from "./edge/AssociationEdge.ts";
import {clearGraph, loadGraph, saveGraph} from "./graphEditor/localStorage.ts";
import {useTableEditorStore} from "../../store/tableEditor.ts";
import {byTreeLayout} from "./graphEditor/layout.ts";
import {useMiniMap} from "./graphEditor/miniMap.ts";

const container = ref<HTMLDivElement | null>(null);
const wrapper = ref<HTMLDivElement | null>(null);
const minimap = ref<HTMLDivElement | null>(null);

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
	useMiniMap(graph, minimap.value!)

	useHoverToFront(graph)
	useEdgeColor(graph)
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
			graph.cleanSelection()

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

const handleSaveAssociation = () => {
	store.saveAssociations()
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

const layoutDirection: Ref<"LR" | "TB" | "RL" | "BT"> = ref("LR")

const handleLayout = () => {
	if (graph) byTreeLayout(graph, layoutDirection.value)
}

onMounted(() => {
	nextTick(() => {
		init()

		addEventListener()

		load()
	})
});
</script>