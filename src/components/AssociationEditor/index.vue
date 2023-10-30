<template>
	<div ref="wrapper" class="wrapper" id="AssociationEditor">
		<div ref="container"></div>

		<ul v-if="store.isLoaded" class="toolbar left-top">
			<li>
				<el-tooltip>
					<template #content>
						保存编辑区与关联变更 [ctrl + s]<br>
						注意！！<br>
						此处保存的关联<strong>仅</strong>是<strong>目前编辑器中的表</strong>之间的关联<br>
						<strong>不包括编辑器历史编辑过的关联</strong><br>
						因此请尽量保证编辑器中为全部你所需要的表，关联为全部你所需要的关联<br>
					</template>

					<el-button @click="handleSave" :icon="SaveIcon"></el-button>
				</el-tooltip>
			</li>

			<li>
				<el-tooltip content="撤回 [ctrl + z]" :disabled="!store.canUndo">
					<el-button :disabled="!store.canUndo" @click="handleUndo" :icon="UndoIcon"></el-button>
				</el-tooltip>
				<el-tooltip content="重做 [ctrl + shift + z]" :disabled="!store.canRedo">
					<el-button :disabled="!store.canRedo" @click="handleRedo" :icon="RedoIcon"></el-button>
				</el-tooltip>
			</li>

			<li>
				<el-tooltip content="布局">
					<el-button @click="handleLayout" class="cling-right" :icon="LayoutIcon"></el-button>
				</el-tooltip>
				<el-select style="width: 4em;" class="cling-left" v-model="store.layoutDirection" @change="handleLayout"
						   size="small">
					<el-option value="LR" label="→"></el-option>
					<el-option value="RL" label="←"></el-option>
					<el-option value="TB" label="↓"></el-option>
					<el-option value="BT" label="↑"></el-option>
				</el-select>
			</li>

			<li>
				<el-tooltip content="适应画布">
					<el-button @click="handleFit" :icon="FitIcon"></el-button>
				</el-tooltip>
			</li>
			<li>
				<el-tooltip content="居中">
					<el-button @click="handleCenterContent" :icon="CenterIcon"></el-button>
				</el-tooltip>
			</li>

			<li>
				<el-tooltip :content="(store.isSelectionEmpty ? '清理画布' : '移除选中节点与关联') +'[Delete]'">
					<el-button @click="store.isSelectionEmpty ? store.removeAllCells() : store.removeSelectedCells()" :icon="EraserIcon"></el-button>
				</el-tooltip>
			</li>
			<li>
				<el-tooltip :content="(store.isSelectionEmpty ? '清除关联' : '移除选中关联') + '[Shift + Delete]'">
					<el-button @click="store.isSelectionEmpty ? store.removeAllAssociations() : store.removeSelectedAssociations()" :icon="AssociationOffIcon"></el-button>
				</el-tooltip>
			</li>
		</ul>

		<ul v-if="store.isLoaded" class="toolbar right-top">
			<li>
				<el-tooltip :content="store.isSelectionEmpty ? '匹配关联' : '在选中范围内匹配关联'">
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
import {useSwitchAssociationType} from "./edge/AssociationEdge.ts";
import {loadGraph} from "./graph/localStorage.ts";
import {useAssociationEditorGraphStore} from "./store/AssociationEditorGraphStore.ts";
import {useTableEditorMatch} from "./graph/useMatch.ts";
import {useSave} from "./graph/useSave.ts";
import Searcher from "./graph/Searcher.vue";
import MiniMap from "./graph/MiniMap.vue";
import {defaultZoomRange} from "./graph/scale.ts";
import {generateEntitiesByTable} from "./node/TableNode.ts";
import {Minus, Plus} from "@element-plus/icons-vue";
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

const {handleSave} = useSave(() => graph)

useHistoryKeyEvent(() => graph)
useSelectionKeyEvent(() => graph)

const {handleMatch, matchTypes, matchType} = useTableEditorMatch(() => graph)

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