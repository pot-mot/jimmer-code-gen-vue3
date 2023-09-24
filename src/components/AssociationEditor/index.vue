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
		<ul class="toolbar right-top">
			<li>
				<button @click="store.fit">缩放居中</button>
			</li>
			<li>
				<button @click="store.removeAll">清除所有</button>
			</li>
			<li>
				<button @click="store.removeAssociation">清除关联</button>
			</li>
		</ul>
		<ul class="toolbar left-top">
			<li>
				<button @click="store.undo">undo</button>
			</li>
			<li>
				<button @click="store.redo">redo</button>
			</li>
			<li>
				<button @click="store.layout">布局</button>
				<select v-model="store.layoutDirection">
					<option value="LR">左右</option>
					<option value="RL">右左</option>
					<option value="TB">上下</option>
					<option value="BT">下上</option>
				</select>
			</li>
			<li>
				<button @click="store.match">匹配关联</button>
				<select v-model="store.matchType">
					<option v-for="(type) in store.matchTypes" :value="type">{{ type }}</option>
				</select>
			</li>
			<li>
				<button @click="store.saveAssociations()">保存关联（入库）</button>
			</li>
		</ul>
		<div class="toolbar right-bottom">
			<template v-if="showMinimap">
				<div class="minimap" ref="minimap"></div>
			</template>
		</div>
		<DragDialog v-if="showSearch" @close="showSearch = false">
			<div style="padding-left: 10px; font-size: 0.8em;">
				<input autofocus v-model="store.keyword" @change="store.searchNodes()">
				<div v-if="store.searchResult.length == 0">
					暂无数据
				</div>
				<div style="max-height: 60vh; overflow: auto;">
					<table>
						<tr v-for="node in store.searchResult" @click="store.focusNode(node)">
							<td :class="node.data.table.type"></td>
							<td>{{ node.data.table.name }}</td>
							<td>{{ node.data.table.name }}</td>
						</tr>
					</table>
				</div>
			</div>
		</DragDialog>
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
import { onMounted, ref, nextTick } from "vue";
import { Graph } from "@antv/x6";

import { ColumnPort } from "./port/ColumnPort.ts";

import { register } from "@antv/x6-vue-shape";
import TableNode from "./node/TableNode.vue";
import { initGraph } from "./graph/init.ts";
import { COLUMN_PORT } from "./constant/index.ts";
import { useHistory } from "./graph/history.ts";
import { useSelection } from "./graph/selection.ts";
import {
	useEdgeColor,
	useHoverToFront
} from "./graph/eventListen.ts";
import { useSwitchAssociationType } from "./edge/AssociationEdge.ts";
import { clearGraph, loadGraph } from "./graph/localStorage.ts";
import { useTableEditorGraphStore } from "../../store/tableEditorGraph.ts";
import { useMiniMap } from "./graph/miniMap.ts";
import DragDialog from "../common/DragDialog.vue";

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
	useKeyEvent()
}

const showSearch = ref(false)

const useKeyEvent = () => {
	document.documentElement.addEventListener('keydown', (e: KeyboardEvent) => {
		if (e.ctrlKey || e.metaKey) {
			if (e.key == 'z') {
				e.preventDefault()
				store.undo()
			} else if (e.key == 'Z') {
				e.preventDefault()
				store.redo()
			} else if (e.key == 's') {
				e.preventDefault()
				store.save()
			} else if (e.key == 'a') {
				e.preventDefault()
				store.selectAll()
			} else if (e.key == 'f') {
				e.preventDefault()
				store.searchResult = []
				showSearch.value = true
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
			store.save()
		})
	} catch (e) {
		clearGraph(graph)
	}
}

const showLog = ref(false)

const toggleLog = () => {
	showLog.value = !showLog.value
}

const showMinimap = ref(false)

const toggleMinimap = () => {
	showMinimap.value = !showMinimap.value
	if (showMinimap.value) {
		nextTick(() => {
			if (minimap.value) {
				useMiniMap(graph, minimap.value)
			}
		})
	}
}

onMounted(() => {
	init()

	load()

	if (showMinimap.value) {
		nextTick(() => {
			if (minimap.value) {
				useMiniMap(graph, minimap.value)
			}
		})
	}
});
</script>