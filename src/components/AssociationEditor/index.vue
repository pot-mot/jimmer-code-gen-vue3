<template>
	<div ref="wrapper" class="wrapper">
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

					<el-button @click="handleSaveAll" :icon="SaveIcon"></el-button>
				</el-tooltip>
			</li>

			<li>
				<el-tooltip content="撤回 [Ctrl + z]" :disabled="!store.canUndo">
					<el-button :disabled="!store.canUndo" @click="store.undo()" :icon="UndoIcon"></el-button>
				</el-tooltip>
				<el-tooltip content="重做 [Ctrl + Shift + z]" :disabled="!store.canRedo">
					<el-button :disabled="!store.canRedo" @click="store.redo()" :icon="RedoIcon"></el-button>
				</el-tooltip>
			</li>

			<li>
				<el-tooltip content="整理布局">
					<el-button @click="store.layoutAndFit()" class="cling-right" :icon="LayoutIcon"></el-button>
				</el-tooltip>
				<el-select style="width: 4em;" class="cling-left" v-model="store.layoutDirection"
						   @change="store.layoutAndFit()"
						   size="small">
					<el-option value="LR" label="→">左至右</el-option>
					<el-option value="RL" label="←">右至左</el-option>
					<el-option value="TB" label="↓">上至下</el-option>
					<el-option value="BT" label="↑">下至上</el-option>
				</el-select>
			</li>

			<li>
				<el-tooltip content="适应画布">
					<el-button @click="store.fit()" :icon="FitIcon"></el-button>
				</el-tooltip>
			</li>
			<li>
				<el-tooltip content="居中">
					<el-button @click="store.center()" :icon="CenterIcon"></el-button>
				</el-tooltip>
			</li>
		</ul>

		<ul v-if="store.isLoaded" class="toolbar left-bottom">
			<li>
				<el-tooltip :content="(store.isSelectionEmpty ? '清理画布' : '移除选中节点与关联') +'[Delete]'">
					<el-button @click="store.isSelectionEmpty ? store.removeAllCells() : store.removeSelectedCells()"
							   :icon="EraserIcon"></el-button>
				</el-tooltip>
			</li>
			<li>
				<el-tooltip :content="(store.isSelectionEmpty ? '清除关联' : '移除选中关联') + '[Shift + Delete]'">
					<el-button @click="store.isSelectionEmpty ? store.removeAllEdges() : store.removeSelectedEdges()"
							   :icon="AssociationOffIcon"></el-button>
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

		<div v-if="store.isLoaded" class="toolbar right-bottom" style="width:  max(15vw, 200px);">
			<ScaleBar :graph="store._graph()"></ScaleBar>
		</div>

		<template v-if="store.isLoaded">
			<Searcher :graph="store._graph()" :search-method="tableNodeMatchMethod">
				<template v-slot="{node}">
					<el-button
						@click="store.focus(node.id)"
						size="default"
						link>
						{{ node.data.table.name }}
						<Comment :comment="node.data.table.comment"></Comment>
					</el-button>
				</template>
			</Searcher>
		</template>
	</div>
</template>

<style scoped>
@import "../../assets/graph-common.css";
</style>

<script lang="ts" setup>
import {onMounted, onUnmounted, ref} from "vue";
import {Graph} from "@antv/x6";
import {columnPortPosition} from "./node/ColumnPort.ts";
import {register} from "@antv/x6-vue-shape";
import TableNode from "./node/TableNode.vue";
import {initAssociationEditor} from "./init.ts";
import {COLUMN_PORT} from "../../utils/graphEditor/constant.ts";
import {useSwitchAssociationType} from "./edge/AssociationEdge.ts";
import {useAssociationEditorStore} from "./store/AssociationEditorStore.ts";
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
import {generateEntitiesByTable, saveAssociations} from "./api.ts";
import {useAssociationMatch} from "./AssociationMatch.ts";
import {nodeIdToTableId, tableNodeMatchMethod} from "./node/TableNode.ts";
import {useHistoryKeyEvent} from "../../utils/graphEditor/useHistory.ts";
import {useSelectionKeyEvent} from "../../utils/graphEditor/useSelection.ts";
import {useSave} from "../../utils/graphEditor/useSave.ts";
import ScaleBar from "../common/graph/ScaleBar.vue";
import Searcher from "../common/graph/Searcher.vue";
import Comment from "../common/Comment.vue";

const container = ref<HTMLElement>();
const wrapper = ref<HTMLElement>();

let graph: Graph

const store = useAssociationEditorStore()

Graph.registerPortLayout(
	COLUMN_PORT,
	columnPortPosition,
	true
)

register({
	shape: "table",
	component: TableNode
});

const {
	handleSaveAll,
	loadGraph,
} = useSave(() => graph, "AssociationEditorGraph", [
	{
		auto: false,
		fn: (graph) => {
			saveAssociations(graph)
		}
	}
])

onMounted(() => {
	graph = initAssociationEditor(container.value!, wrapper.value!)

	useSwitchAssociationType(graph)
	loadGraph()
	store.load(graph)
})

onUnmounted(() => {
	store.unload()
})

useHistoryKeyEvent(() => graph)

useSelectionKeyEvent(() => graph)

const {
	handleMatch,
	matchTypes,
	matchType
} = useAssociationMatch(() => graph)

const handleGenerateEntities = () => {
	generateEntitiesByTable(
		store.isSelectionEmpty ?
			store.tables().map(it => it.id) : store.selectedNodeIds.map(it => nodeIdToTableId(it))
	)
}
</script>