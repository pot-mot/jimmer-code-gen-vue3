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
					<MultiCodePreview :code-files="codeFiles"
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
				<el-tooltip content="生成代码（获得 zip 压缩包）">
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
import {useSaveKeyEvent} from "@/components/business/graphEditor/storage/useSave.ts";
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
import {saveAs} from "file-saver";
import ScaleBar from "@/components/business/graphEditor/tools/ScaleBar.vue";
import GraphSearcher from "@/components/business/graphEditor/tools/GraphSearcher.vue";
import CodeIcon from "@/components/global/icons/toolbar/CodeIcon.vue";
import {EditPen} from "@element-plus/icons-vue";
import {
	useTableModifyDialogsStore
} from "@/components/business/modelGraphEditor/tableEditDialog/TableModifyDialogsStore.ts";
import {debugLog} from "@/utils/debugLog.ts";
import {handleTableNodeClipBoardKeyEvent} from "@/components/business/modelGraphEditor/clipBoard/clipBoard.ts";
import {ModelEditorEventBus} from "@/components/pages/ModelEditor/store/ModelEditorEventBus.ts";
import {handleHistoryKeyEvent} from "@/components/business/graphEditor/history/useHistory.ts";
import RedoIcon from "@/components/global/icons/toolbar/RedoIcon.vue";
import UndoIcon from "@/components/global/icons/toolbar/UndoIcon.vue";

const container = ref<HTMLElement>()
const wrapper = ref<HTMLElement>()

let graph: Graph

const store = useModelEditorStore()

const loadingStore = useGlobalLoadingStore()

const tableModifyDialogsStore = useTableModifyDialogsStore()

onMounted(async () => {
	loadingStore.add()

	graph = initModelEditor(container.value!, wrapper.value!)
	await store.load(graph)

	graph.on('node:dblclick', ({node}) => {
		tableModifyDialogsStore.open(node.id, node.getData().table)
	})

	graph.on('history:change', (args) => {
		debugLog(args.options.name, args)
	})

	graph.on('blank:dblclick', ({e}) => {
		ModelEditorEventBus.emit('createTable', {x: e.offsetX, y: e.offsetY})
	})

	loadingStore.sub()
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

		sendMessage("模型保存成功", "success")
	} catch (e) {
		sendMessage(`模型保存失败，原因：${e}`, 'error', e)
	}

	loadingStore.sub()
}

onUnmounted(() => {
	store.unload()
})

// 仅在图内允许的操作
store.addEventListener('keydown', handleSelectionKeyEvent)

store.addEventListener('keydown', handleTableNodeClipBoardKeyEvent)

store.addEventListener('keydown', handleHistoryKeyEvent)

// 全局的操作
useSaveKeyEvent(() => {
	handleSaveModel()
})


const entityPreviewDialogOpenState = ref(false)

const codeFiles = ref<Array<Pair<string, string>>>([])

const handleEntityPreview = async () => {
	loadingStore.add()

	codeFiles.value = await api.previewService.previewModelEntity({
		id: store._currentModel().id
	})
	entityPreviewDialogOpenState.value = true

	loadingStore.sub()
}

watch(() => entityPreviewDialogOpenState.value, async (openState) => {
	if (!openState) {
		codeFiles.value = []
	}
})

const handleEntityDownload = async () => {
	loadingStore.add()

	const currentModel = store._currentModel()

	const res = (await api.generateService.generateModelEntity({
		body: currentModel.id
	})) as any as Blob
	const file = new File([res], `[${currentModel.name}]-entities.zip`)
	saveAs(file)

	loadingStore.sub()
}


const sqlPreviewDialogOpenState = ref(false)

const sqlFiles = ref<Array<Pair<string, string>>>([])

const handleSQLPreview = async () => {
	loadingStore.add()

	sqlPreviewDialogOpenState.value = true
	sqlFiles.value = await api.previewService.previewModelSql({
		id: store._currentModel().id
	})
	loadingStore.sub()
}

const handleSQLDownload = async () => {
	loadingStore.add()

	const currentModel = store._currentModel()

	const res = (await api.generateService.generateModelSql({
		body: currentModel.id
	})) as any as Blob
	const file = new File([res], `[${currentModel.name}]-tables.zip`)
	saveAs(file)

	loadingStore.sub()
}


const handleModelDownload = async () => {
	loadingStore.add()

	const currentModel = store._currentModel()

	const res = (await api.generateService.generateModel({
		body: currentModel.id
	})) as any as Blob
	const file = new File([res], `[${currentModel.name}]-model.zip`)
	saveAs(file)

	loadingStore.sub()
}


watch(() => store.isModelLoaded, (loaded) => {
	if (loaded) {
		if (sqlPreviewDialogOpenState.value) {
			handleSQLPreview()
		}

		if (entityPreviewDialogOpenState.value) {
			handleEntityPreview()
		}
	}
})
</script>
