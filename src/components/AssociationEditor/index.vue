<template>
	<div ref="wrapper" class="wrapper" id="AssociationEditor">
		<div ref="container"></div>

		<ul class="toolbar left-bottom">
			<li>
				<el-button @click="toggleMinimap">minimap</el-button>
			</li>
			<li>
				<el-button @click="toggleLog">log</el-button>
			</li>
		</ul>
		<ul class="toolbar right-top">
			<li>
				<el-button @click="store.undo">undo</el-button>
			</li>
			<li>
				<el-button @click="store.redo">redo</el-button>
			</li>
			<li>
				<el-button @click="store.fit">适应画布</el-button>
			</li>
			<li>
				<el-button @click="graph.centerContent()">居中</el-button>
			</li>
			<li>
				<el-button @click="store.removeAll">清除所有</el-button>
			</li>
			<li>
				<el-button @click="store.removeAssociation">清除关联</el-button>
			</li>
		</ul>
		<ul class="toolbar left-top">
			<li>
				<el-button @click="handleLayout">布局</el-button>
				<el-select v-model="store.layoutDirection">
					<el-option value="LR">左右</el-option>
					<el-option value="RL">右左</el-option>
					<el-option value="TB">上下</el-option>
					<el-option value="BT">下上</el-option>
				</el-select>
			</li>
			<li>
				<el-button @click="match">匹配关联</el-button>
				<el-select v-model="matchType">
					<el-option v-for="(type) in matchTypes" :value="type">{{ type }}</el-option>
				</el-select>
			</li>
			<li>
				<el-button @click="saveGraph(graph)">保存编辑区</el-button>
			</li>
			<li>
				<el-button @click="saveAssociations(graph)">保存关联</el-button>
			</li>
			<li>
				<el-button @click="store.generate()">生成实体</el-button>
			</li>
		</ul>
		<div class="toolbar right-bottom">
			<template v-if="showMinimap">
				<div ref="minimap" class="minimap"></div>
			</template>
		</div>
	</div>
	<DragDialog v-if="showSearch" @close="showSearch = false" :y="100" to="#AssociationEditor">
		<div>
			<el-input v-model="keyword" autofocus @keydown.enter="search">
				<template #append>
					<el-button @click="search">搜索</el-button>
				</template>
			</el-input>
			<div v-if="searchResult.length == 0">
				暂无数据
			</div>
			<div style="max-height: 60vh; overflow: auto; min-width: 20em;">
				<table>
					<tr v-for="node in searchResult" :class="node.data.table.type"
						@click="focusNode(graph, node)">
						<td>{{ node.data.table.name }}</td>
						<td>{{ node.data.table.comment }}</td>
					</tr>
				</table>
			</div>
		</div>
	</DragDialog>
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
import {loadGraph, saveGraph} from "./graph/localStorage.ts";
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