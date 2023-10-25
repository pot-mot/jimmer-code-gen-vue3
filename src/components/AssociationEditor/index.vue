<template>
	<div ref="wrapper" class="wrapper" id="AssociationEditor">
		<div ref="container"></div>

		<ul v-if="store.isLoaded" class="toolbar left-top">
			<li>
				<el-button @click="handleSaveGraph">保存编辑区</el-button>
			</li>
			<li>
				<el-button v-show="store.canUndo" @click="handleUndo">undo</el-button>
			</li>
			<li>
				<el-button v-show="store.canRedo" @click="handleRedo">redo</el-button>
			</li>
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
				<el-button @click="handleFit">适应画布</el-button>
			</li>
			<li>
				<el-button @click="handleCenterContent">居中</el-button>
			</li>
			<li>
				<el-button @click="store.removeAllCells()">清理画布</el-button>
			</li>
			<li>
				<el-button @click="store.removeAllAssociations()">清除所有关联</el-button>
			</li>
			<template v-if="!store.isSelectionEmpty">
				<li>
					<el-button @click="store.removeSelectedCells()">移除选中节点及关联</el-button>
				</li>
				<li>
					<el-button @click="store.removeSelectedAssociations()">清除选中关联与选中节点关联</el-button>
				</li>
			</template>
		</ul>

		<ul v-if="store.isLoaded" class="toolbar right-top">
			<li>
				<el-button @click="match">
					{{ store.isSelectionEmpty ? "匹配关联" : "匹配选中表的关联" }}
				</el-button>
				<el-select v-model="matchType">
					<el-option v-for="(type) in matchTypes" :value="type">{{ type }}</el-option>
				</el-select>
			</li>
			<li>
				<el-tooltip>
					<template #content>
						注意！！<br>
						此处保存的关联变更<strong>仅</strong>是<strong>目前编辑器中的表</strong>之间的关联的更新<br>
						<strong>不包括历史编辑的关联</strong><br>
						因此请尽量保证编辑器中为全部你所需要的表<br>
					</template>
					<el-button @click="saveAssociations(graph)">保存关联变更</el-button>
				</el-tooltip>
			</li>
			<li>
				<el-button @click="handleGenerateEntities">生成实体</el-button>
			</li>
		</ul>

		<Searcher></Searcher>

		<div v-if="store.isLoaded" class="toolbar right-bottom" style="width:  max(15vw, 200px);">
			<MiniMap ref="minimap"></MiniMap>
			<el-button @click="toggleMinimap">minimap</el-button>

			<div style="display: grid; grid-template-columns: 4em 3em 1fr 3em; line-height: 2em; height: 2em;">
				<div>
					{{ (store.scaling * 100).toFixed(2) }}%
				</div>
				<div style="text-align: center;">
					<el-button :icon="Minus" link @click="store.formatScaling -= 0.25"></el-button>
				</div>
				<div>
					<el-slider v-model="store.formatScaling"
							   :step="0.25"
							   :min="Math.log2(defaultZoomRange.minScale)"
							   :max="Math.log2(defaultZoomRange.maxScale)"
							   :show-tooltip="false">
					</el-slider>
				</div>
				<div style="text-align: center;">
					<el-button :icon="Plus" link @click="store.formatScaling += 0.25"></el-button>
				</div>
			</div>
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
import {generateEntitiesByTable} from "./node/TableNode.ts";
import {Minus, Plus} from "@element-plus/icons-vue";

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

const handleSaveGraph = () => {
	saveGraph(graph)
}

const handleUndo = () => {
	graph.undo()
}

const handleRedo = () => {
	graph.redo()
}

const handleLayout = () => {
	store.layout()
	nextTick(() => {
		graph.centerContent()
	})
}

const handleFit = () => {
	store.fit()
}

const handleCenterContent = () => {
	graph.centerContent()
}

const handleGenerateEntities = () => {
	generateEntitiesByTable(
		store.isSelectionEmpty ?
			store.tables().map(table => table.id) :
			store.selectedTables.map(table => table.id)
	)
}
</script>