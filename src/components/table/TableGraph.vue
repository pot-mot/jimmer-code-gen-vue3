<template>
	<div ref="wrapper" class="wrapper">
		<div ref="container"></div>

		<ul class="toolbar left-bottom">
			<li>
				<button @click="toggleMinimap">minimap</button>
			</li>
			<li>
				<button @click="toggleLog">log</button>
			</li>
		</ul>
		<div class="toolbar right-bottom">
			<template v-if="minimapShow">
				<div class="minimap" ref="minimap"></div>
			</template>

			<DragResizeBox v-if="logShow">
				<div></div>
			</DragResizeBox>
		</div>
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
				<button @click="handleMatch">匹配关联</button>
				<select v-model="matchType">
					<option v-for="type in matchTypes" :value="type">{{ type }}</option>
				</select>
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

	.minimap {
		width: max(15vw, 200px);
		height: max(20vh, 200px);
	}
}

.x6-node-selected .node-wrapper {
	border: 2px solid var(--highlight-color);
}

.x6-highlight-stroke {
	stroke: var(--highlight-color) !important;
}
</style>

<script lang="ts" setup>
import { onMounted, Ref, ref, nextTick } from "vue";
import { Graph } from "@antv/x6";

import { ColumnPort } from "./port/ColumnPort.ts";

import { register } from "@antv/x6-vue-shape";
import TableNode from "./node/TableNode.vue";
import { initGraph } from "./graphEditor/init.ts";
import { COLUMN_PORT } from "./constant";
import { useHistory } from "./graphEditor/history.ts";
import { useSelection } from "./graphEditor/selection.ts";
import {
	useEdgeColor,
	useHoverToFront
} from "./graphEditor/eventListen.ts";
import { addAssociationEdges, matchAssociations, useSwitchAssociationType } from "./edge/AssociationEdge.ts";
import { clearGraph, loadGraph, saveGraph } from "./graphEditor/localStorage.ts";
import { useTableEditorGraphStore } from "../../store/tableEditorGraph.ts";
import { byTreeLayout } from "./graphEditor/layout.ts";
import { useMiniMap } from "./graphEditor/miniMap.ts";
import DragResizeBox from '../common/DragResizeBox.vue'
import { api } from "../../api";
import {AssociationMatchType} from "../../api/__generated/model/enums";

const container = ref<HTMLDivElement | null>(null);
const wrapper = ref<HTMLDivElement | null>(null);
const minimap = ref<HTMLDivElement | null>(null);

let graph: Graph

const store = useTableEditorGraphStore()

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
			} else if (e.key == 'a') {
				e.preventDefault()
				handleSelectAll()
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

const handleSave = () => {
	if (graph) {
		saveGraph(graph)
	}
}

const handleSaveAssociation = () => {
	store.saveAssociations()
}

const matchTypes: Ref<ReadonlyArray<AssociationMatchType>> = ref([])

const matchType: Ref<AssociationMatchType> = ref('SIMPLE_PK')

onMounted(async () => {
	matchTypes.value = await api.associationService.listMatchType()
	matchType.value = matchTypes.value[0]
})

const handleMatch = () => {
	matchAssociations(store.tables().map(table => table.id), matchType.value).then(res => {
		addAssociationEdges(graph, res)
	})
}

const handleRefresh = () => {
	graph.removeCells(graph.getCells())
}

const handleRefreshAssociation = () => {
	graph.removeCells(graph.getEdges())
}

const handleSelectAll = () => {
	graph.resetSelection(graph.getCells())
}

const layoutDirection: Ref<"LR" | "TB" | "RL" | "BT"> = ref("LR")

const handleLayout = () => {
	if (graph) byTreeLayout(graph, layoutDirection.value)
}

const logShow = ref(false)

const toggleLog = () => {
	logShow.value = !logShow.value
}

const minimapShow = ref(false)

const toggleMinimap = () => {
	minimapShow.value = !minimapShow.value
	if (minimapShow.value) {
		nextTick(() => {
			if (minimap.value) {
				useMiniMap(graph, minimap.value)
			}
		})
	}
}

onMounted(() => {
	init()

	addEventListener()

	load()

	if (minimapShow.value) {
		nextTick(() => {
			if (minimap.value) {
				useMiniMap(graph, minimap.value)
			}
		})
	}
});
</script>