<template>
	<div ref="wrapper" class="model-editor-graph" :class="isDragging ? '' : 'non-drag'">
		<div ref="container"/>

		<ul v-if="GRAPH.isLoaded" class="toolbar left-top">
			<li>
				<el-tooltip :content="`${i18nStore.translate('LABEL_ModelEditorGraph_saveModel')} [Ctrl + s]`">
					<el-button :icon="SaveIcon" @click="handleSaveModel"/>
				</el-tooltip>
			</li>

			<li>
				<el-tooltip :content="i18nStore.translate('LABEL_ModelEditorGraph_editModel')">
					<el-button :icon="EditPen" @click="handleEditModel"/>
				</el-tooltip>
			</li>

			<li>
				<el-tooltip :disabled="!GRAPH.canUndo"
							:content="`${i18nStore.translate('LABEL_ModelEditorGraph_undo')} [Ctrl + z]`">
					<el-button :disabled="!GRAPH.canUndo" :icon="UndoIcon" @click="HISTORY.undo()"/>
				</el-tooltip>
				<el-tooltip :disabled="!GRAPH.canRedo"
							:content="`${i18nStore.translate('LABEL_ModelEditorGraph_redo')} [Ctrl + Shift + z]`">
					<el-button :disabled="!GRAPH.canRedo" :icon="RedoIcon" @click="HISTORY.redo()"/>
				</el-tooltip>
			</li>

			<li>
				<el-tooltip :content="i18nStore.translate('LABEL_ModelEditorGraph_layoutAndFit')">
					<el-button :icon="LayoutIcon" class="cling-right" @click="() => {
						VIEW.layout()
						if (graph.isSelectionEmpty()) {
							VIEW.fit()
						}
					}"/>
				</el-tooltip>
				<el-select v-model="VIEW.layoutDirection.value" @change="VIEW.layout()"
                           class="cling-left" size="small" style="width: 4em">
					<el-option label="→" value="LR">→ {{ i18nStore.translate('LABEL_ModelEditorGraph_layout_LR') }}
					</el-option>
					<el-option label="←" value="RL">← {{ i18nStore.translate('LABEL_ModelEditorGraph_layout_RL') }}
					</el-option>
					<el-option label="↓" value="TB">↓ {{ i18nStore.translate('LABEL_ModelEditorGraph_layout_TB') }}
					</el-option>
					<el-option label="↑" value="BT">↑ {{ i18nStore.translate('LABEL_ModelEditorGraph_layout_BT') }}
					</el-option>
				</el-select>
			</li>

			<li>
				<el-tooltip :content="i18nStore.translate('LABEL_ModelEditorGraph_fit')">
					<el-button :icon="FitIcon" @click="VIEW.fit()"/>
				</el-tooltip>
			</li>
			<li>
				<el-tooltip :content="i18nStore.translate('LABEL_ModelEditorGraph_center')">
					<el-button :icon="CenterIcon" @click="VIEW.center()"/>
				</el-tooltip>
			</li>
		</ul>

		<ul v-if="GRAPH.isLoaded" class="toolbar left-bottom">
			<li>
				<el-tooltip
					:content="i18nStore.translate(
						GRAPH.isSelectionEmpty ?
							'LABEL_ModelEditorGraph_clean' :
							'LABEL_ModelEditorGraph_cleanSelected'
						) +
						' [Delete]'">
					<el-button :icon="EraserIcon"
							   @click="GRAPH.isSelectionEmpty ? REMOVE.removeAllCells() : REMOVE.removeSelectedCells()"/>
				</el-tooltip>
			</li>
			<li>
				<el-tooltip
					:content="i18nStore.translate(
						GRAPH.isSelectionEmpty ?
							'LABEL_ModelEditorGraph_cleanAssociation' :
							'LABEL_ModelEditorGraph_cleanSelectedAssociation'
						) +
						' [Shift + Delete]'">
					<el-button :icon="AssociationOffIcon"
							   @click="GRAPH.isSelectionEmpty ? REMOVE.removeAllEdges() : REMOVE.removeSelectedEdges()"/>
				</el-tooltip>
			</li>
		</ul>

		<ul v-if="GRAPH.isLoaded" class="toolbar right-top">
			<li>
				<el-tooltip :content="i18nStore.translate('LABEL_ModelEditorGraph_previewSql')">
					<el-button :icon="SQLIcon" @click="handleSQLPreview"/>
				</el-tooltip>

				<DragDialog v-model="sqlPreviewDialogOpenState"
							:init-w="700" :init-x="5000"
							can-drag can-resize
							disabled-h disabled-y
							limit-by-parent :modal="false">
					<MultiCodePreview :code-files="sqlFiles"
									  height="calc(100vh - 5em - 30px)"
									  width="100%"
									  class="multi-code-preview"/>
					<div class="code-download-button">
						<el-button :icon="DownloadIcon" round size="large"
								   @click="handleSQLDownload"/>
					</div>
				</DragDialog>
			</li>

			<li>
				<el-tooltip :content="i18nStore.translate('LABEL_ModelEditorGraph_previewEntity')">
					<el-button :icon="CodeIcon" @click="handleEntityPreview"/>
				</el-tooltip>

				<DragDialog v-model="entityPreviewDialogOpenState"
							:init-w="700" :init-x="5000"
							can-drag can-resize
							disabled-h disabled-y
							limit-by-parent :modal="false">
					<MultiCodePreview :code-files="entityFiles"
									  height="calc(100vh - 5em - 30px)"
									  width="100%"
									  class="multi-code-preview"/>
					<div class="code-download-button">
						<el-button :icon="DownloadIcon" round size="large"
								   @click="handleEntityDownload"/>
					</div>
				</DragDialog>
			</li>

			<li>
				<el-tooltip :content="i18nStore.translate('LABEL_ModelEditorGraph_exportModel')">
                        <el-button class="cling-right" :icon="ExportIcon" @click="handleModelExport"/>
				</el-tooltip>
                <el-select v-model="exportType"
                           class="cling-left" size="small" style="width: 6em">
                    <el-option v-for="type in exportType_CONSTANT" :value="type"/>
                </el-select>
			</li>

			<li>
				<el-tooltip :content="i18nStore.translate('LABEL_ModelEditorGraph_downloadAll')">
					<el-button :icon="DownloadIcon" @click="handleModelDownload"/>
				</el-tooltip>
			</li>
		</ul>

		<div v-if="GRAPH.isLoaded" class="toolbar right-bottom" style="width: max(15vw, 200px)">
			<MiniMap :graph="graph"/>
			<ScaleBar :graph="graph"/>
		</div>

		<template v-if="GRAPH.isLoaded">
			<GraphSearcher :graph="graph"/>
		</template>
	</div>
</template>

<style scoped>
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
import {Graph, Node} from "@antv/x6"
import {initModelEditor} from "./initModelEditor.ts"
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {useGlobalLoadingStore} from "@/store/loading/GlobalLoadingStore.ts";
import {sendMessage} from "@/message/message.ts";
import {GenTableModelInput, Pair} from "@/api/__generated/model/static";
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
import ScaleBar from "@/components/global/graphEditor/scale/ScaleBar.vue";
import GraphSearcher from "@/components/pages/ModelEditor/search/GraphSearcher.vue";
import CodeIcon from "@/components/global/icons/toolbar/CodeIcon.vue";
import {EditPen} from "@element-plus/icons-vue";
import {useClipBoard} from "@/components/pages/ModelEditor/graph/clipBoard/clipBoard.ts";
import {ModelEditorEventBus} from "@/store/modelEditor/ModelEditorEventBus.ts";
import RedoIcon from "@/components/global/icons/toolbar/RedoIcon.vue";
import UndoIcon from "@/components/global/icons/toolbar/UndoIcon.vue";
import ExportIcon from "@/components/global/icons/toolbar/ExportIcon.vue";
import {
	convertModel,
	downloadModelZip,
	downloadModelEntity,
	downloadModelSql,
	exportModelJson,
	previewModelEntity,
	previewModelSql
} from "@/components/pages/ModelEditor/file/modelFileOperations.ts";
import {cloneDeep} from "lodash";
import {TABLE_NODE} from "@/components/pages/ModelEditor/constant.ts";
import {useDocumentEvent} from "@/utils/useDocumentEvent.ts";
import MiniMap from "@/components/pages/ModelEditor/minimap/MiniMap.vue";
import {useDebugStore} from "@/store/debug/debugStore.ts";
import {handleModelEditorKeyEvent} from "@/components/pages/ModelEditor/graph/keyEvent/keyEvent.ts";
import {validateModel} from "@/components/business/model/form/validateModel.ts";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";
import {
    exportGraphPNG, exportGraphSVG,
} from "@/components/pages/ModelEditor/file/graphFileOperations.ts";
import {saveModel} from "@/components/pages/ModelEditor/save/saveModel.ts";

const i18nStore = useI18nStore()

const container = ref<HTMLElement>()
const wrapper = ref<HTMLElement>()

let graph: Graph

const {GRAPH, GRAPH_DATA, GRAPH_LOAD, MODEL, MODEL_EDIT_DIALOG, HISTORY, VIEW, REMOVE} = useModelEditorStore()

const loadingStore = useGlobalLoadingStore()

const debugStore = useDebugStore()

onMounted(loadingStore.withLoading('ModelEditorGraph onMounted', () => {
	graph = initModelEditor(container.value!, wrapper.value!)

	GRAPH_LOAD.load(graph)

	graph.on('history:change', (args) => {
		const message = args.options.name ?? 'history:change'
		debugStore.log('HISTORY', message, args.cmds)
	})

	graph.on('blank:dblclick', () => {
		ModelEditorEventBus.emit('createTable', {options: GRAPH.mousePosition})
	})

	graph.on('node:click', ({node}) => {
		handleNodeClick(node)
	})

	handleModelEditorKeyEvent(graph)

	useClipBoard(graph)
}))

onUnmounted(() => {
	GRAPH_LOAD.unload()
})

// 表编辑事件
const doubleClickWaitNodes = new Set<string>

const DOUBLE_CLICK_TIMEOUT = 300

const handleNodeClick = (node: Node) => {
	if (node.shape === TABLE_NODE && node.getData()?.table !== undefined) {
		const id = node.id
		const table = node.getData()?.table as GenTableModelInput

		if (doubleClickWaitNodes.has(id)) {
			doubleClickWaitNodes.delete(id)
			ModelEditorEventBus.emit('editTable', {id, table: cloneDeep(table)})
		} else {
			graph.select(node)
			doubleClickWaitNodes.add(id)
			setTimeout(() => {
				doubleClickWaitNodes.delete(id)
			}, DOUBLE_CLICK_TIMEOUT)
		}
	}
}


const handleSaveModel = loadingStore.withLoading('ModelEditorGraph handleSaveModel', async () => {
	try {
		let model = MODEL._model()

		MODEL.isLoaded = false

		if (model.graphData !== GRAPH_DATA.getGraphData()) {
			graph.cleanSelection()
			model.graphData = GRAPH_DATA.getGraphData()
		}

		const id = await saveModel(model)

        MODEL.isLoaded = true

        if (id === undefined) {
            sendMessage("模型保存失败，校验未通过", "success")
            return
        }

		sendMessage("模型保存成功", "success")
	} catch (e) {
		sendMessage(`模型保存失败，原因：${e}`, 'error', e)
	}
})

const handleSaveEvent = (e: KeyboardEvent) => {
	if (e.ctrlKey || e.metaKey) {
		if (e.key === 's') {
			e.preventDefault()
			handleSaveModel()
		}
	}
}

useDocumentEvent('keydown', handleSaveEvent)

const handleEditModel = () => {
    MODEL_EDIT_DIALOG.handleEdit()
}

const isDragging = ref(false)

useDocumentEvent('mousedown', (e) => {
	if (e.button === 2) {
		isDragging.value = true
	}
})

useDocumentEvent('mouseup', (e) => {
	if (e.button === 2) {
		isDragging.value = false
	}
})

watch(() => MODEL.isLoaded, async (value) => {
	if (value) {
		if (sqlPreviewDialogOpenState.value) {
			await handleSQLPreview()
		}

		if (entityPreviewDialogOpenState.value) {
			await handleEntityPreview()
		}
	}
})

/**
 * 代码预览与下载
 */

const judgeGraphDataIsChange = (): boolean => {
	if (GRAPH.isLoaded && MODEL.isLoaded) {
		if (
			JSON.stringify(JSON.parse(GRAPH_DATA.getGraphData())["json"]) ===
			JSON.stringify(JSON.parse(MODEL._model().graphData)["json"])
		) {
			return false
		}
	}
	return true
}

const preJudge = (): boolean => {
	const judge = judgeGraphDataIsChange()

	if (judge) {
		sendMessage('模型有变更尚未保存', 'warning')
		return false
	} else {
		const model = MODEL._model()
		const messageList = validateModel(model)

		if (messageList.length === 0) {
			return true
		} else {
			messageList.forEach(it => sendMessage(it, 'warning'))
			return false
		}
	}
}

const entityPreviewDialogOpenState = ref(false)

const entityFiles = ref<Array<Pair<string, string>>>([])

watch(() => entityPreviewDialogOpenState.value, async (openState) => {
	if (!openState) {
		entityFiles.value = []
	}
})

const handleEntityPreview = loadingStore.withLoading('ModelEditorGraph handleEntityPreview', async () => {
	if (!preJudge()) return

	const model = MODEL._model()
	await convertModel(model.id)
	entityFiles.value = await previewModelEntity(model.id)
	entityPreviewDialogOpenState.value = true
})

const sqlPreviewDialogOpenState = ref(false)

const sqlFiles = ref<Array<Pair<string, string>>>([])

watch(() => sqlPreviewDialogOpenState.value, async (openState) => {
	if (!openState) {
		sqlFiles.value = []
	}
})

const handleSQLPreview = loadingStore.withLoading('ModelEditorGraph handleSQLPreview', async () => {
	if (!preJudge()) return

	const model = MODEL._model()
	sqlPreviewDialogOpenState.value = true
	sqlFiles.value = await previewModelSql(model.id)
})

const handleEntityDownload = loadingStore.withLoading('ModelEditorGraph handleEntityDownload', async () => {
	if (!preJudge()) return

	const model = MODEL._model()
	await convertModel(model.id)
	await downloadModelEntity(model)
})

const handleSQLDownload = loadingStore.withLoading('ModelEditorGraph handleSQLDownload', async () => {
	if (!preJudge()) return

	const model = MODEL._model()
	await downloadModelSql(model)
})

const exportType_CONSTANT = ["JSON", "PNG", "SVG"]

type ExportType = typeof exportType_CONSTANT[number]

const exportType = ref<ExportType>('JSON')

const handleModelExport = loadingStore.withLoading('ModelEditorGraph handleModelExport', async () => {
	if (!preJudge()) return

	const model = MODEL._model()

    switch (exportType.value) {
        case 'JSON':
            await exportModelJson(model)
            break
        case 'PNG':
            exportGraphPNG(model, graph)
            break
        case 'SVG':
            exportGraphSVG(model, graph)
            break
    }

})

const handleModelDownload = loadingStore.withLoading('ModelEditorGraph handleModelDownload', async () => {
	if (!preJudge()) return

	const model = MODEL._model()
	await convertModel(model.id)
	await downloadModelZip(model)
})
</script>
