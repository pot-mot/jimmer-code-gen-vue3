<template>
	<div ref="wrapper" class="wrapper" id="AssociationEditor">
		<div ref="container"></div>

		<ul v-if="store.isLoaded" class="toolbar left-top">
			<li>
				<el-tooltip content="保存编辑区 [ctrl + s]">
					<el-button @click="handleSaveGraph">save</el-button>
				</el-tooltip>
			</li>
			<li>
				<el-tooltip content="撤回 [ctrl + z]">
					<el-button @click="handleUndo">undo</el-button>
				</el-tooltip>
			</li>
			<li>
				<el-tooltip content="重做 [ctrl + shift + z]">
					<el-button @click="handleRedo">redo</el-button>
				</el-tooltip>
			</li>
			<li>
				<el-tooltip content="布局">
					<el-button @click="handleLayout">layout</el-button>
				</el-tooltip>
				<el-select style="width: 6em;" v-model="store.layoutDirection" size="small">
					<el-option value="LR" label="左至右"></el-option>
					<el-option value="RL" label="右至左"></el-option>
					<el-option value="TB" label="上至下"></el-option>
					<el-option value="BT" label="下至上"></el-option>
				</el-select>
			</li>

			<li>
				<el-tooltip content="适应画布">
					<el-button @click="handleFit">fit graph</el-button>
				</el-tooltip>
			</li>
			<li>
				<el-tooltip content="居中">
					<el-button @click="handleCenterContent">center content</el-button>
				</el-tooltip>
			</li>

			<br>

			<li>
				<el-tooltip content="选中全部 [ctrl + a]">
					<el-button @click="store.selectAll()">selectAll</el-button>
				</el-tooltip>
			</li>

			<li>
				<el-tooltip content="清理画布 [delete]">
					<el-button @click="store.removeAllCells()">clear</el-button>
				</el-tooltip>
			</li>
			<li>
				<el-tooltip content="清除关联 [shift + delete]">
					<el-button @click="store.removeAllAssociations()">remove association</el-button>
				</el-tooltip>
			</li>
			<template v-if="!store.isSelectionEmpty">
				<li>
					<el-tooltip content="移除选中节点与关联">
						<el-button @click="store.removeSelectedCells()">remove selected</el-button>
					</el-tooltip>
				</li>
				<li>
					<el-tooltip content="清除选中关联">
						<el-button @click="store.removeSelectedAssociations()">remove selected associations</el-button>
					</el-tooltip>
				</li>
			</template>
		</ul>

		<ul v-if="store.isLoaded" class="toolbar right-top">
			<li>
				<el-tooltip :content="store.isSelectionEmpty ? '匹配关联' : '在选中范围内匹配关联'">
					<el-button @click="match">match</el-button>
				</el-tooltip>

				<el-select v-model="matchType">
					<el-option v-for="(type) in matchTypes" :value="type">{{ type }}</el-option>
				</el-select>
			</li>
			<li>
				<el-tooltip>
					<template #content>
						保存关联变更<br>
						注意！！<br>
						此处保存的关联<strong>仅</strong>是<strong>目前编辑器中的表</strong>之间的关联<br>
						<strong>不包括编辑器历史编辑过的关联</strong><br>
						因此请尽量保证编辑器中为全部你所需要的表，关联为全部你所需要的关联<br>
					</template>
					<el-button @click="saveAssociations(graph)">save associations</el-button>
				</el-tooltip>
			</li>
			<li>
				<el-tooltip content="生成实体（获得 zip 压缩包）">
					<el-button @click="handleGenerateEntities">generate</el-button>
				</el-tooltip>
			</li>
		</ul>

		<Searcher></Searcher>

		<div v-if="store.isLoaded" class="toolbar right-bottom" style="width:  max(15vw, 200px);">
			<MiniMap ref="minimap"></MiniMap>

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

	--highlight-color: var(--el-color-primary);
	--common-color: var(--el-color-info);
}

.toolbar {
	font-size: 12px;
	max-width: 50%;
	position: absolute;
	background-color: #fff;
	box-shadow: var(--el-box-shadow);

	li {
		display: inline;
		padding-right: 0.5em;
	}

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
import {useAssociationEditorGraphStore} from "./store/AssociationEditorGraphStore.ts";
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