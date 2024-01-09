<template>
	<div ref="wrapper" class="wrapper">
		<div ref="container"></div>

		<ul v-if="store.isLoaded" class="toolbar left-top">
			<li>
				<el-tooltip content="保存模型 [Ctrl + s]">
					<el-button :icon="SaveIcon" @click="handleSaveModel"></el-button>
				</el-tooltip>
			</li>

			<li>
				<el-tooltip content="编辑模型">
					<el-button :icon="EditPen" @click="store.handleEditModel"></el-button>
				</el-tooltip>
			</li>

			<li>
				<el-tooltip :disabled="!store.canUndo" content="撤回 [Ctrl + z]">
					<el-button :disabled="!store.canUndo" :icon="UndoIcon" @click="store.undo()"></el-button>
				</el-tooltip>
				<el-tooltip :disabled="!store.canRedo" content="重做 [Ctrl + Shift + z]">
					<el-button :disabled="!store.canRedo" :icon="RedoIcon" @click="store.redo()"></el-button>
				</el-tooltip>
			</li>

			<li>
				<el-tooltip content="整理布局">
					<el-button :icon="LayoutIcon" class="cling-right" @click="store.layoutAndFit()"></el-button>
				</el-tooltip>
				<el-select v-model="store.layoutDirection" class="cling-left" size="small"
						   style="width: 4em"
						   @change="store.layoutAndFit()">
					<el-option label="→" value="LR">左至右</el-option>
					<el-option label="←" value="RL">右至左</el-option>
					<el-option label="↓" value="TB">上至下</el-option>
					<el-option label="↑" value="BT">下至上</el-option>
				</el-select>
			</li>

			<li>
				<el-tooltip content="适应画布">
					<el-button :icon="FitIcon" @click="store.fit()"></el-button>
				</el-tooltip>
			</li>
			<li>
				<el-tooltip content="居中">
					<el-button :icon="CenterIcon" @click="store.center()"></el-button>
				</el-tooltip>
			</li>
		</ul>

		<ul v-if="store.isLoaded" class="toolbar left-bottom">
			<li>
				<el-tooltip :content="store.isSelectionEmpty ? '清理画布' : '移除选中节点与关联[Delete]'">
					<el-button :icon="EraserIcon"
							   @click="store.isSelectionEmpty ? store.removeAllCells() : store.removeSelectedCells()"></el-button>
				</el-tooltip>
			</li>
			<li>
				<el-tooltip :content="store.isSelectionEmpty ? '清除关联' : '移除选中关联[Shift + Delete]'">
					<el-button :icon="AssociationOffIcon"
							   @click="store.isSelectionEmpty ? store.removeAllEdges() : store.removeSelectedEdges()"></el-button>
				</el-tooltip>
			</li>
		</ul>

		<ul v-if="store.isLoaded" class="toolbar right-top">
			<li>
				<el-tooltip content="预览 SQL">
					<el-button :icon="SQLIcon" @click="async () => {
						await handleSaveModel()
						await handleSQLPreview()
					}"></el-button>
				</el-tooltip>

				<DragDialog v-model="sqlPreviewDialogOpenState" :init-w="700" :init-x="5000" can-drag
							can-resize disabled-h disabled-y>
					<MultiCodePreview :code-files="sqlFiles"
									  height="calc(100vh - 5em - 30px)"
									  width="100%"
									  class="multi-code-preview"></MultiCodePreview>
					<div class="code-download-button">
						<el-button :icon="DownloadIcon" round size="large"
								   @click="handleSQLDownload"></el-button>
					</div>
				</DragDialog>
			</li>

			<li>
				<el-tooltip content="业务代码">
					<el-button :icon="CodeIcon" @click="async () => {
						await handleSaveModel()
						await handleEntityPreview()
					}"></el-button>
				</el-tooltip>

				<DragDialog v-model="entityPreviewDialogOpenState" :init-w="700" :init-x="5000"
							can-drag can-resize disabled-h disabled-y>
					<MultiCodePreview :code-files="entityFiles"
									  height="calc(100vh - 5em - 30px)"
									  width="100%"
									  class="multi-code-preview"></MultiCodePreview>
					<div class="code-download-button">
						<el-button :icon="DownloadIcon" round size="large"
								   @click="handleEntityDownload"></el-button>
					</div>
				</DragDialog>
			</li>

			<li>
				<el-tooltip content="导出模型">
					<el-button :icon="ExportIcon" @click="async () => {
						await handleSaveModel()
						await handleModelExport()
					}"></el-button>
				</el-tooltip>
			</li>

			<li>
				<el-tooltip content="下载全部（获得 zip 压缩包）">
					<el-button :icon="DownloadIcon" @click="async () => {
						await handleSaveModel()
						await handleModelDownload()
					}"></el-button>
				</el-tooltip>
			</li>
		</ul>

		<div v-if="store.isLoaded" class="toolbar right-bottom" style="width: max(15vw, 200px)">
			<ScaleBar :graph="store._graph()"></ScaleBar>
		</div>

		<template v-if="store.isLoaded">
			<GraphSearcher :graph="store._graph()"></GraphSearcher>
		</template>
	</div>
</template>

<style scoped>
@import "../../../../assets/graph-common.css";

.multi-code-preview {
	height: calc(100vh - 30px);
	width: 100%;
}

.code-download-button {
	position: absolute;
	bottom: 2em;
	right: 2em;
}
</style>

<script lang="ts" setup>
import {onMounted, onUnmounted, ref, watch} from "vue"
import {Graph} from "@antv/x6"
import {initModelEditor} from "./init.ts"
import {useModelEditorStore} from "../store/ModelEditorStore.ts";
import {useGlobalLoadingStore} from "@/components/global/loading/GlobalLoadingStore.ts";
import {api} from "@/api";
import {sendMessage} from "@/utils/message.ts";
import {Pair} from "@/api/__generated/model/static";
import {handleSelectionKeyEvent} from "@/components/business/graphEditor/selection/useSelection.ts";
import SaveIcon from "@/components/global/icons/toolbar/SaveIcon.vue";
import LayoutIcon from "@/components/global/icons/toolbar/LayoutIcon.vue";
import MultiCodePreview from "@/components/global/code/MultiCodePreview.vue";
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import SQLIcon from "@/components/global/icons/toolbar/SQLIcon.vue";
import FitIcon from "@/components/global/icons/toolbar/FitIcon.vue";
import CenterIcon from "@/components/global/icons/toolbar/CenterIcon.vue";
import EraserIcon from "@/components/global/icons/toolbar/EraserIcon.vue";
import AssociationOffIcon from "@/components/global/icons/toolbar/AssociationOffIcon.vue";
import DownloadIcon from "@/components/global/icons/toolbar/DownloadIcon.vue";
import ScaleBar from "@/components/business/graphEditor/tools/ScaleBar.vue";
import GraphSearcher from "@/components/business/graphEditor/tools/GraphSearcher.vue";
import CodeIcon from "@/components/global/icons/toolbar/CodeIcon.vue";
import {EditPen} from "@element-plus/icons-vue";
import {
	useTableDialogsStore
} from "@/components/business/modelGraphEditor/tablesDialog/TableDialogsStore.ts";
import {debugLog} from "@/utils/debugLog.ts";
import {handleTableNodeClipBoardKeyEvent} from "@/components/business/modelGraphEditor/clipBoard.ts";
import {ModelEditorEventBus} from "@/components/pages/ModelEditor/store/ModelEditorEventBus.ts";
import {handleHistoryKeyEvent} from "@/components/business/graphEditor/history/useHistory.ts";
import RedoIcon from "@/components/global/icons/toolbar/RedoIcon.vue";
import UndoIcon from "@/components/global/icons/toolbar/UndoIcon.vue";
import ExportIcon from "@/components/global/icons/toolbar/ExportIcon.vue";
import {
	downloadModel,
	downloadModelEntity, downloadModelSql, exportModel,
	previewModelEntity,
	previewModelSql
} from "@/components/business/model/file/modelFileOperations.ts";
import {cloneDeep} from "lodash";
import {TABLE_NODE} from "@/components/business/modelGraphEditor/constant.ts";

const container = ref<HTMLElement>()
const wrapper = ref<HTMLElement>()

let graph: Graph

const store = useModelEditorStore()

const loadingStore = useGlobalLoadingStore()

const tableDialogsStore = useTableDialogsStore()

onMounted(async () => {
	loadingStore.add()

	graph = initModelEditor(container.value!, wrapper.value!)
	await store.load(graph)

	graph.on('node:dblclick', ({node}) => {
		if (node.shape == TABLE_NODE && node.getData()?.table != undefined) {
			tableDialogsStore.open(node.id, cloneDeep(node.getData().table))
		}
	})

	graph.on('history:change', (args) => {
		debugLog(args.options.name, args)
	})

	graph.on('blank:dblclick', ({e}) => {
		ModelEditorEventBus.emit('createTable', {x: e.offsetX, y: e.offsetY})
	})

	handleSelectionKeyEvent(graph)

	handleTableNodeClipBoardKeyEvent(graph)

	handleHistoryKeyEvent(graph)

	document.documentElement.addEventListener('keydown', handleSaveEvent)

	loadingStore.sub()
})

onUnmounted(() => {
	document.documentElement.removeEventListener('keydown', handleSaveEvent)

	store.unload()
})

const handleSaveModel = async () => {
	loadingStore.add()

	try {
		const model = store._currentModel()

		if (model.graphData != store.toDataJSONStr()) {
			model.graphData = store.toDataJSONStr()
			await api.modelService.save({body: model})
		} else {
			await api.modelService.save({body: {...model, graphData: undefined}})
		}

		if (sqlPreviewDialogOpenState.value) {
			await handleSQLPreview()
		}

		if (entityPreviewDialogOpenState.value) {
			await handleEntityPreview()
		}

		sendMessage("模型保存成功", "success")
	} catch (e) {
		sendMessage(`模型保存失败，原因：${e}`, 'error', e)
	}

	loadingStore.sub()
}

const handleSaveEvent = (e: KeyboardEvent) => {
	if (e.ctrlKey || e.metaKey) {
		if (e.key == 's') {
			e.preventDefault()
			handleSaveModel()
		}
	}
}


/**
 * 代码预览与下载
 */
const entityPreviewDialogOpenState = ref(false)

const entityFiles = ref<Array<Pair<string, string>>>([])

watch(() => entityPreviewDialogOpenState.value, async (openState) => {
	if (!openState) {
		entityFiles.value = []
	}
})

const handleEntityPreview = async () => {
	loadingStore.add()
	const currentModel = store._currentModel()
	entityFiles.value = await previewModelEntity(currentModel.id)
	entityPreviewDialogOpenState.value = true
	loadingStore.sub()
}

const sqlPreviewDialogOpenState = ref(false)

const sqlFiles = ref<Array<Pair<string, string>>>([])

watch(() => sqlPreviewDialogOpenState.value, async (openState) => {
	if (!openState) {
		sqlFiles.value = []
	}
})

const handleSQLPreview = async () => {
	loadingStore.add()
	const currentModel = store._currentModel()
	sqlPreviewDialogOpenState.value = true
	sqlFiles.value = await previewModelSql(currentModel.id)
	loadingStore.sub()
}


const handleEntityDownload = async () => {
	loadingStore.add()
	const currentModel = store._currentModel()
	await downloadModelEntity(currentModel)
	loadingStore.sub()
}

const handleSQLDownload = async () => {
	loadingStore.add()
	const currentModel = store._currentModel()
	await downloadModelSql(currentModel)
	loadingStore.sub()
}

const handleModelExport = async () => {
	loadingStore.add()
	const currentModel = store._currentModel()
	await exportModel(currentModel)
	loadingStore.sub()
}

const handleModelDownload = async () => {
	loadingStore.add()
	const currentModel = store._currentModel()
	await downloadModel(currentModel)
	loadingStore.sub()
}
</script>
