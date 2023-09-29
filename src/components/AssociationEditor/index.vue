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
				<button @click="store.fit">适应画布</button>
			</li>
			<li>
				<button @click="graph.centerContent()">居中</button>
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
				<button @click="handleLayout">布局</button>
				<select v-model="store.layoutDirection">
					<option value="LR">左右</option>
					<option value="RL">右左</option>
					<option value="TB">上下</option>
					<option value="BT">下上</option>
				</select>
			</li>
			<li>
				<button @click="match">匹配关联</button>
				<select v-model="matchType">
					<option v-for="(type) in matchTypes" :value="type">{{ type }}</option>
				</select>
			</li>
			<li>
				<button @click="saveAssociations(graph)">保存关联（入库）</button>
			</li>
		</ul>
		<div class="toolbar right-bottom">
			<template v-if="showMinimap">
				<div ref="minimap" class="minimap"></div>
			</template>
		</div>
		<DragDialog v-if="showSearch" @close="showSearch = false" :x="400" :y="100">
			<div class="search-box">
				<input v-model="keyword" autofocus @keydown.enter="search">
				<button @click="search">搜索</button>
				<div v-if="searchResult.length == 0">
					暂无数据
				</div>
				<div style="max-height: 60vh; overflow: auto; min-width: 20em;">
					<table>
						<tr v-for="node in searchResult" :class="node.data.table.type" class="hover-item"
							@click="focusNode(graph, node)">
							<td>{{ node.data.table.name }}</td>
							<td>{{ node.data.table.comment }}</td>
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
}

.x6-node-selected .node-wrapper {
	border: 2px solid var(--highlight-color);
}

.x6-highlight-stroke {
	stroke: var(--highlight-color) !important;
}
</style>

<script lang="ts" setup>
import {nextTick, onMounted, ref} from "vue";
import {Graph} from "@antv/x6";

import {ColumnPort} from "./port/ColumnPort.ts";

import {register} from "@antv/x6-vue-shape";
import TableNode from "./node/TableNode.vue";
import {initGraph} from "./graph/init.ts";
import {COLUMN_PORT} from "./constant";
import {useHistory, useHistoryKeyEvent} from "./graph/useHistory.ts";
import {useSelection, useSelectionKeyEvent} from "./graph/useSelection.ts";
import {saveAssociations, useSwitchAssociationType} from "./edge/AssociationEdge.ts";
import {loadGraph} from "./graph/localStorage.ts";
import {useTableEditorGraphStore} from "../../store/tableEditorGraph.ts";
import {useMiniMap} from "./graph/useMiniMap.ts";
import DragDialog from "../common/DragDialog.vue";
import {useTableEditorMatch} from "./graph/useMatch.ts";
import {useTableEditorSearch} from "./graph/useSearch.ts";
import {useSave} from "./graph/useSave.ts";
import {focusNode} from "./node/TableNode.ts";

const container = ref<HTMLElement>();
const wrapper = ref<HTMLElement>();
const minimap = ref<HTMLElement>();

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

onMounted(() => {
	graph = initGraph(container.value!, wrapper.value!)

	useSwitchAssociationType(graph)
	loadGraph(graph)
	store.load(graph)

	useHistory(graph)
	useSelection(graph)
})

useSave(() => graph)

useHistoryKeyEvent(() => graph)
useSelectionKeyEvent(() => graph)

const showLog = ref(false)

const toggleLog = () => {
	showLog.value = !showLog.value
}

const {toggleMinimap, showMinimap} = useMiniMap(() => graph, () => minimap.value)

const {search, keyword, searchResult, showSearch} = useTableEditorSearch(() => graph)

const {match, matchTypes, matchType} = useTableEditorMatch(() => graph)

const handleLayout = () => {
	store.layout()
	nextTick(() => {
		graph.centerContent()
	})
}
</script>