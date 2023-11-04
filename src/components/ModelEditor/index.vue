<template>
	<div ref="wrapper" class="wrapper">
		<div ref="container"></div>

		<ul v-if="store.isLoaded" class="toolbar left-top">
			<li>
				<el-tooltip>
					<template #content>
						保存模型 [Ctrl + s]
					</template>

					<el-button @click="handleSaveModel" :icon="SaveIcon"></el-button>
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
				<el-select style="width: 4em;" class="cling-left" v-model="store.layoutDirection" @change="store.layoutAndFit()"
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

			<li>
				<el-tooltip :content="(store.isSelectionEmpty ? '清理画布' : '移除选中节点与关联') +'[Delete]'">
					<el-button @click="store.isSelectionEmpty ? store.removeAllCells() : store.removeSelectedCells()" :icon="EraserIcon"></el-button>
				</el-tooltip>
			</li>
			<li>
				<el-tooltip :content="(store.isSelectionEmpty ? '清除关联' : '移除选中关联') + '[Shift + Delete]'">
					<el-button @click="store.isSelectionEmpty ? store.removeAllEdges() : store.removeSelectedEdges()" :icon="AssociationOffIcon"></el-button>
				</el-tooltip>
			</li>
		</ul>

		<div v-if="store.isLoaded" class="toolbar right-bottom" style="width: max(15vw, 200px);">
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

	<ModelDialog v-if="openModelDialog" @submit="(model) => {
		listStore.currentModel = model
		handleSaveModel()
		openModelDialog = false
	}" @close="openModelDialog = false"></ModelDialog>
</template>

<style scoped>
@import "../../assets/graph-common.css";
</style>

<script setup lang="ts">
import {useModelEditorStore} from "./store/ModelEditorStore.ts";
import {ref, onMounted, onUnmounted} from "vue";
import {Graph} from "@antv/x6";
import ScaleBar from "../common/graph/ScaleBar.vue";
import Searcher from "../common/graph/Searcher.vue";
import {tableNodeMatchMethod} from "../AssociationEditor/node/TableNode.ts";
import Comment from "../common/Comment.vue";
import {register} from "@antv/x6-vue-shape";
import ModelNode from "./node/ModelNode.vue";
import {useHistoryKeyEvent} from "../../utils/graphEditor/useHistory.ts";
import {useSelectionKeyEvent} from "../../utils/graphEditor/useSelection.ts";
import SaveIcon from "../icons/toolbar/SaveIcon.vue";
import UndoIcon from "../icons/toolbar/UndoIcon.vue";
import RedoIcon from "../icons/toolbar/RedoIcon.vue";
import LayoutIcon from "../icons/toolbar/LayoutIcon.vue";
import FitIcon from "../icons/toolbar/FitIcon.vue";
import CenterIcon from "../icons/toolbar/CenterIcon.vue";
import EraserIcon from "../icons/toolbar/EraserIcon.vue";
import AssociationOffIcon from "../icons/toolbar/AssociationOffIcon.vue";
import {initModelEditor} from "./init.ts";
import {saveModel} from "./api.ts";
import ModelDialog from "./menu/ModelDialog.vue";
import {sendMessage} from "../../utils/message.ts";
import {useModelListStore} from "./store/ModelListStore.ts";
import {useAutoSave, useSaveKeyEvent} from "../../utils/graphEditor/useSave.ts";

const container = ref<HTMLElement>();
const wrapper = ref<HTMLElement>();

let graph: Graph

const store = useModelEditorStore()

const listStore = useModelListStore()

register({
	shape: "model",
	component: ModelNode
});

const openModelDialog = ref(false)

const handleSaveModel = () => {
	if (!listStore.currentModel) {
		openModelDialog.value = true
	} else {
		sendMessage("模型保存成功", "success")
		saveModel(listStore.currentModel, JSON.stringify(graph.toJSON()))
	}
}

onMounted(() => {
	graph = initModelEditor(container.value!, wrapper.value!)

	try {
		if (listStore.currentModel && listStore.currentModel.value) {
			graph.fromJSON(JSON.parse(listStore.currentModel.value))
		} else if (!listStore.isNew){
			loadGraph()
		}
	} catch (e) {
		sendMessage('后端获取的模型加载失败', 'error')
	}

	store.load(graph)
	store.fit()
})

const {loadGraph} = useAutoSave(() => graph, "ModelEditor")

useSaveKeyEvent(handleSaveModel)

onUnmounted(() => {
	store.unload()
})

useHistoryKeyEvent(() => graph)

useSelectionKeyEvent(() => graph)
</script>