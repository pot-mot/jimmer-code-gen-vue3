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

				<DragDialog v-model="openSQLPreviewDialog" :init-w="700" :init-x="5000" can-drag
							can-resize disabled-h disabled-y>
					<MultiCodePreview :code-files="sqlFiles" height="calc(100vh - 5em - 30px)"
									  style="height: calc(100vh - 30px); width: 100%;"
									  width="100%"></MultiCodePreview>
				</DragDialog>
			</li>

			<li>
				<el-tooltip content="业务代码">
					<el-button :icon="CodeIcon" @click="async () => {
						await handleSaveModel()
						await handleCodePreview()
					}"></el-button>
				</el-tooltip>

				<DragDialog v-model="codePreviewDialogOpenState" :init-w="700" :init-x="5000"
							can-drag can-resize disabled-h disabled-y>
					<MultiCodePreview :code-files="codeFiles" height="calc(100vh - 5em - 30px)"
									  style="height: calc(100vh - 30px); width: 100%;"
									  width="100%"></MultiCodePreview>

					<div style="position: absolute; bottom: 2em; right: 2em;">
						<el-tooltip content="下载代码">
							<el-button :icon="DownloadIcon" round size="large" @click="handleCodeDownload"></el-button>
						</el-tooltip>
					</div>
				</DragDialog>
			</li>

			<li>
				<el-tooltip content="生成代码（获得 zip 压缩包）">
					<el-button :icon="DownloadIcon" @click="async () => {
						await handleSaveModel()
						await handleCodeDownload()
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
import {handleTableNodeClipBoardKeyEvent} from "@/components/pages/ModelEditor/graph/clipBoard.ts";
import {ModelEditorEventBus} from "@/components/pages/ModelEditor/store/ModelEditorEventBus.ts";

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
		debugLog('history change log', args)
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

// 全局的操作
useSaveKeyEvent(() => {handleSaveModel()})

const handleCodeDownload = async () => {
	loadingStore.add()

	const res = (await api.generateService.generateByModel({
		body: store._currentModel().id, language: store._currentModel().language
	})) as any as Blob
	const file = new File([res], "entities.zip")
	saveAs(file)

	loadingStore.sub()
}

const codePreviewDialogOpenState = ref(false)

const codeFiles = ref<Array<Pair<string, string>>>([])

const handleCodePreview = async () => {
	loadingStore.add()

	codeFiles.value = await api.generateService.previewByModel({
		modelId: store._currentModel().id, language: store._currentModel().language
	})
	codePreviewDialogOpenState.value = true

	loadingStore.sub()
}

watch(() => codePreviewDialogOpenState.value, async (openState) => {
	if (!openState) {
		codeFiles.value = []
	}
})

const openSQLPreviewDialog = ref(false)

const sqlFiles = ref<Array<Pair<string, string>>>([])

const handleSQLPreview = async () => {
	loadingStore.add()

	openSQLPreviewDialog.value = true
	sqlFiles.value = await api.modelService.previewSql({
		id: store._currentModel().id, type: store._currentModel().dataSourceType
	})
	loadingStore.sub()
}
</script>
