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

			<li style="padding-left: 1em;">
				<el-tooltip content="操作方式切换为拖曳">
					<el-button :icon="Rank"></el-button>
				</el-tooltip>
			</li>
		</ul>

		<ul v-if="store.isLoaded" class="toolbar left-bottom">
			<li>
				<el-tooltip :content="store.isSelectionEmpty ? '清理画布' : '移除选中节点与关联[Delete]'">
					<el-button @click="store.isSelectionEmpty ? store.removeAllCells() : store.removeSelectedCells()"
							   :icon="EraserIcon"></el-button>
				</el-tooltip>
			</li>
			<li>
				<el-tooltip :content="store.isSelectionEmpty ? '清除关联' : '移除选中关联[Shift + Delete]'">
					<el-button @click="store.isSelectionEmpty ? store.removeAllEdges() : store.removeSelectedEdges()"
							   :icon="AssociationOffIcon"></el-button>
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
	}" @cancel="openModelDialog = false"></ModelDialog>
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
import ModelDialog from "./dialog/ModelDialog.vue";
import {sendMessage} from "../../utils/message.ts";
import {useModelListStore} from "./store/ModelListStore.ts";
import {useSaveKeyEvent} from "../../utils/graphEditor/useSave.ts";
import {useLocalStorageOperation} from "../../utils/graphEditor/localStorage.ts";
import {Rank} from "@element-plus/icons-vue";
import {COLUMN_PORT} from "../../utils/graphEditor/constant.ts";
import {columnPortPosition} from "../AssociationEditor/node/ColumnPort.ts";

const container = ref<HTMLElement>();
const wrapper = ref<HTMLElement>();

let graph: Graph

const store = useModelEditorStore()

const listStore = useModelListStore()

Graph.registerPortLayout(
	COLUMN_PORT,
	columnPortPosition,
	true
)

register({
	shape: "model",
	component: ModelNode
});

const openModelDialog = ref(false)


const {
	toDataJSONStr,
	loadGraphByJSONStr
} = useLocalStorageOperation(() => graph)

/**
 * 保存模型
 * 涉及两步操作：
 * 1. 使用 api saveModel 使后端保存当前模型的数据
 * 2. 修改当前 listStore 中保存的当前模型，确保数据一致，并缓存这个当前模型
 */
const handleSaveModel = async () => {
	if (!listStore.currentModel) {
		openModelDialog.value = true
	} else {
		listStore.currentModel.value = toDataJSONStr()

		await saveModel(listStore.currentModel)

		localStorage.setItem('currentModel', JSON.stringify(listStore.currentModel))

		sendMessage("模型保存成功", "success")
	}
}

/**
 * 加载模型
 * 同样两步操作：
 * 1. 将本地缓存中的这个模型读取出来录入 listStore 的 currentModel
 * 2. 将读出的模型载入当前的 graph
 *
 * 其中第一步操作需要判断 listStore 中是否已经有 currentModel，如果有，则不进行覆盖
 */
const handleLoadModel = () => {
	// 从缓存中读取 currentModel
	if (!listStore.currentModel) {
		const currentModelJSONStr = localStorage.getItem('currentModel')
		if (currentModelJSONStr) {
			listStore.currentModel = JSON.parse(currentModelJSONStr)
		}
	}

	// 加载 currentModel
	if (listStore.currentModel && listStore.currentModel.value) {
		loadGraphByJSONStr(listStore.currentModel.value)
	}
}

onMounted(() => {
	graph = initModelEditor(container.value!, wrapper.value!)

	try {
		if (!listStore.isNew) {
			handleLoadModel()
		} else {
			// 新模型，则移除全部缓存
			localStorage.removeItem('currentModel')
		}
	} catch (e) {
		sendMessage('后端获取的模型加载失败', 'error')
	}

	store.load(graph)
})

useSaveKeyEvent(handleSaveModel)

onUnmounted(() => {
	store.unload()
})

useHistoryKeyEvent(() => graph)

useSelectionKeyEvent(() => graph)
</script>