<template>
	<div ref="wrapper" class="wrapper" id="AssociationEditor">
		<div ref="container"></div>

		<ul v-if="store.isLoaded" class="toolbar left-bottom">
			<li>
				<el-button @click="toggleMinimap">minimap</el-button>
			</li>
		</ul>
		<ul v-if="store.isLoaded" class="toolbar right-top">
			<li>
				<el-button @click="graph.undo()">undo</el-button>
			</li>
			<li>
				<el-button @click="graph.redo()">redo</el-button>
			</li>
			<li>
				<el-button @click="store.fit">适应画布</el-button>
			</li>
			<li>
				<el-button @click="graph.centerContent()">居中</el-button>
			</li>
			<li>
				<el-slider v-model="store.formatScaling"
						   :step="0.25"
						   :min="Math.log2(defaultZoomRange.minScale)"
						   :max="Math.log2(defaultZoomRange.maxScale)"
						   :show-tooltip="false">
				</el-slider>
			</li>
			<li>
				<el-input-number v-model="store.formatScaling" :step="0.25" :precision="2" :min="Math.log2(defaultZoomRange.minScale)"
								 :max="Math.log2(defaultZoomRange.maxScale)">
				</el-input-number>
			</li>
			<li>
				<el-button @click="store.removeAllOrSelectedCells()">
					{{ store.isSelectionEmpty ? "清除所有" : "清除选中" }}
				</el-button>
			</li>
			<li>
				<el-button @click="store.removeAllOrSelectedAssociations()">
					{{ store.isSelectionEmpty ? "清除关联" : "清除选中关联" }}
				</el-button>
			</li>
		</ul>
		<ul v-if="store.isLoaded" class="toolbar left-top">
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
		</ul>

		<Searcher></Searcher>

		<div v-if="store.isLoaded" class="toolbar right-bottom">
			<MiniMap ref="minimap"></MiniMap>
		</div>
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
import {useAssociationEditorGraphStore} from "../../store/AssociationEditorGraphStore.ts";
import {useTableEditorMatch} from "./graph/useMatch.ts";
import {useSave} from "./graph/useSave.ts";
import Searcher from "./graph/Searcher.vue";
import MiniMap from "./graph/MiniMap.vue";
import {defaultZoomRange} from "./graph/scale.ts";

const container = ref<HTMLElement>();
const wrapper = ref<HTMLElement>();

let graph: Graph

const store = useAssociationEditorGraphStore()

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

const minimap = ref()

const toggleMinimap = () => {
	minimap.value.toggle()
}

const {match, matchTypes, matchType} = useTableEditorMatch(() => graph)

const handleLayout = () => {
	store.layout()
	nextTick(() => {
		graph.centerContent()
	})
}
</script>