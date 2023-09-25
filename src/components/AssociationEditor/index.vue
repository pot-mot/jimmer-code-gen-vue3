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
				<button @click="store.undo">undo</button>
			</li>
			<li>
				<button @click="store.redo">redo</button>
			</li>
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
			<div class="search-box">
				<input autofocus v-model="keyword" @change="handleSearch">
				<div v-if="searchResult.length == 0">
					暂无数据
				</div>
				<div style="max-height: 60vh; overflow: auto;">
					<table>
						<tr class="hover-item" :class="node.data.table.type" v-for="node in searchResult" @click="store.focusNode(node)">
							<td style="white-space: nowrap;">{{ node.data.table.name }}</td>
							<td style="white-space: nowrap;">{{ node.data.table.comment }}</td>
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
	font-size: 12px;
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

.search-box {
	padding-left: 10px; 
	font-size: 12px;
	width: 25em;
}

.x6-node-selected .node-wrapper {
	border: 2px solid var(--highlight-color);
}

.x6-highlight-stroke {
	stroke: var(--highlight-color) !important;
}
</style>

<script lang="ts" setup>
import { onMounted, ref, nextTick, onBeforeUnmount, onUnmounted } from "vue";
import { Graph, Node } from "@antv/x6";

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
}

const showSearch = ref(false)

const handleKeyEvent = (e: KeyboardEvent) => {
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
			searchResult.value = []
			showSearch.value = true
		}
	}

	if (graph && e.key === 'Delete') {
		const selectedCells = graph.getSelectedCells()
		graph.cleanSelection()

		// 删除选中的元素
		graph?.removeCells(selectedCells)
	}
}

const handlePopState = () => {
	store.save()
}

onMounted(() => {
	document.documentElement.addEventListener('keydown', handleKeyEvent)
	window.addEventListener('popstate', handlePopState)
	window.addEventListener('unload', handlePopState)
})

onBeforeUnmount(() => {
	document.documentElement.removeEventListener('keydown', handleKeyEvent)
})

/** 需要在卸载后略微延迟 */
onUnmounted(() => {
	window.removeEventListener('unload', handlePopState)
	setTimeout(() => {
		window.removeEventListener('popstate', handlePopState)
	}, 0)
})

const load = () => {
	try {
		loadGraph(graph)
		store.load(graph)
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

const keyword = ref("")

const searchResult = ref<Node[]>([])

const handleSearch = () => {
	searchResult.value = store.searchNodes(keyword.value.split(" "))
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