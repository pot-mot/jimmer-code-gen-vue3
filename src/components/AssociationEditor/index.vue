<template>
	<div ref="wrapper" class="wrapper" id="AssociationEditor">
		<div ref="container"></div>

		<ul v-if="store.isLoaded" class="toolbar left-top">
			<li>
				<el-tooltip>
					<template #content>
						保存编辑区与关联变更 [Ctrl + s]<br>
						注意！！<br>
						此处保存的关联<strong>仅</strong>是<strong>目前编辑器中的表</strong>之间的关联<br>
						<strong>不包括编辑器历史编辑过的关联</strong><br>
						因此请尽量保证编辑器中为全部你所需要的表，关联为全部你所需要的关联<br>
					</template>

					<el-button @click="handleSave" :icon="SaveIcon"></el-button>
				</el-tooltip>
			</li>

			<li>
				<el-tooltip content="撤回 [Ctrl + z]" :disabled="!canUndo">
					<el-button :disabled="!canUndo" @click="handleUndo" :icon="UndoIcon"></el-button>
				</el-tooltip>
				<el-tooltip content="重做 [Ctrl + Shift + z]" :disabled="!canRedo">
					<el-button :disabled="!canRedo" @click="handleRedo" :icon="RedoIcon"></el-button>
				</el-tooltip>
			</li>

			<li>
				<el-tooltip content="整理布局">
					<el-button @click="handleLayout" class="cling-right" :icon="LayoutIcon"></el-button>
				</el-tooltip>
				<el-select style="width: 4em;" class="cling-left" v-model="layoutDirection" @change="handleLayout"
						   size="small">
					<el-option value="LR" label="→">左至右</el-option>
					<el-option value="RL" label="←">右至左</el-option>
					<el-option value="TB" label="↓">上至下</el-option>
					<el-option value="BT" label="↑">下至上</el-option>
				</el-select>
			</li>

			<li>
				<el-tooltip content="适应画布">
					<el-button @click="handleFit" :icon="FitIcon"></el-button>
				</el-tooltip>
			</li>
			<li>
				<el-tooltip content="居中">
					<el-button @click="handleCenter" :icon="CenterIcon"></el-button>
				</el-tooltip>
			</li>

			<li>
				<el-tooltip :content="(isSelectionEmpty ? '清理画布' : '移除选中节点与关联') +'[Delete]'">
					<el-button @click="isSelectionEmpty ? store.removeAllCells() : store.removeSelectedCells()" :icon="EraserIcon"></el-button>
				</el-tooltip>
			</li>
			<li>
				<el-tooltip :content="(isSelectionEmpty ? '清除关联' : '移除选中关联') + '[Shift + Delete]'">
					<el-button @click="isSelectionEmpty ? store.removeAllEdges() : store.removeSelectedEdges()" :icon="AssociationOffIcon"></el-button>
				</el-tooltip>
			</li>
		</ul>

		<ul v-if="store.isLoaded" class="toolbar right-top">
			<li>
				<el-tooltip :content="isSelectionEmpty ? '匹配关联' : '在选中范围内匹配关联'">
					<el-button class="cling-right" @click="handleMatch" :icon="AssociationIcon"></el-button>
				</el-tooltip>

				<el-select v-model="matchType" class="cling-left" @change="handleMatch">
					<el-option v-for="(type) in matchTypes" :value="type">{{ type }}</el-option>
				</el-select>
			</li>
			<li>
				<el-tooltip content="生成实体（获得 zip 压缩包）">
					<el-button @click="handleGenerateEntities" :icon="DownloadIcon"></el-button>
				</el-tooltip>
			</li>
		</ul>

		<Searcher></Searcher>

		<div v-if="store.isLoaded" class="toolbar right-bottom" style="width:  max(15vw, 200px);">
			<MiniMap :graph="store._graph()" ref="minimap"></MiniMap>

			<ScaleBar :init-scaling="0.5" :graph="store._graph()"></ScaleBar>
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
import {initGraph} from "./init.ts";
import {COLUMN_PORT} from "./constant.ts";
import {useSwitchAssociationType} from "./edge/AssociationEdge.ts";
import {loadGraph} from "./store/localStorage.ts";
import {useAssociationEditorGraphStore} from "./store/AssociationEditorGraphStore.ts";
import SaveIcon from "../icons/toolbar/SaveIcon.vue";
import UndoIcon from "../icons/toolbar/UndoIcon.vue";
import RedoIcon from "../icons/toolbar/RedoIcon.vue";
import LayoutIcon from "../icons/toolbar/LayoutIcon.vue";
import FitIcon from "../icons/toolbar/FitIcon.vue";
import CenterIcon from "../icons/toolbar/CenterIcon.vue";
import AssociationOffIcon from "../icons/toolbar/AssociationOffIcon.vue";
import AssociationIcon from "../icons/toolbar/AssociationIcon.vue";
import EraserIcon from "../icons/toolbar/EraserIcon.vue";
import DownloadIcon from "../icons/toolbar/DownloadIcon.vue";
import MiniMap from "../../utils/graphEditor/components/MiniMap.vue";
import ScaleBar from "../../utils/graphEditor/components/ScaleBar.vue";
import Searcher from "./Searcher.vue";
import {generateEntitiesByTable} from "./api.ts";
import {useAssociationMatch} from "./AssociationMatch.ts";
import {useGraphReactiveState} from "../../utils/graphEditor/useReactiveState.ts";
import {nodeIdToTableId} from "./node/TableNode.ts";
import {useHistoryKeyEvent} from "../../utils/graphEditor/history/useHistory.ts";
import {useSelectionKeyEvent} from "../../utils/graphEditor/selection/useSelection.ts";
import {useSave} from "./useSave.ts";
import {useFitAndLayout} from "../../utils/graphEditor/layout/useFitAndLayout.ts";
import {AssociationEditorMenuEventBus} from "./eventBus/AssociationEditorMenuEventBus.ts";

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
})

const {
	isSelectionEmpty,
	canUndo,
	canRedo,
	selectedNodes
} = useGraphReactiveState(() => graph)

const {
	handleSave
} = useSave(() => graph)

const {
	handleMatch,
	matchTypes,
	matchType
} = useAssociationMatch(() => graph)

useHistoryKeyEvent(() => graph)
const handleUndo = () => {
	graph.undo()
}

const handleRedo = () => {
	graph.redo()
}

useSelectionKeyEvent(() => graph)

const {
	layoutDirection,
	layout,
	fit
} = useFitAndLayout(() => graph)

const handleLayout = () => {
	layout()
	nextTick(() => {
		graph.centerContent()
	})
}

const handleFit = () => {
	fit()
}

const handleCenter = () => {
	store.center()
}

const handleGenerateEntities = () => {
	generateEntitiesByTable(
		isSelectionEmpty.value ?
			store.tables().map(it => it.id) : selectedNodes.value.map(it => nodeIdToTableId(it.id))
	)
}

AssociationEditorMenuEventBus.on('deleteDataSource', ({id}) => {
	store.removeTables(table => table.schema?.dataSource.id == id)
})

AssociationEditorMenuEventBus.on('deleteSchema', ({id}) => {
	store.removeTables(table => table.schema?.id == id)
})
</script>