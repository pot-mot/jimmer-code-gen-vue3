<template>
	<div ref="wrapper" class="model-editor-graph" :class="isDragging ? '' : 'non-drag'">
		<div ref="container" @mousedown="handleMouseDown" @mouseup="handleMouseUp"/>

		<ul v-if="GRAPH.isLoaded" class="toolbar left-top">
			<li>
				<el-tooltip :content="`${i18nStore.translate('LABEL_ModelEditorGraph_saveModel')} [Ctrl + S]`">
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
							:content="`${i18nStore.translate('LABEL_ModelEditorGraph_undo')} [Ctrl + Z]`">
					<el-button :disabled="!GRAPH.canUndo" :icon="UndoIcon" @click="HISTORY.undo()"/>
				</el-tooltip>
				<el-tooltip :disabled="!GRAPH.canRedo"
							:content="`${i18nStore.translate('LABEL_ModelEditorGraph_redo')} [Ctrl + Shift + Z]`">
					<el-button :disabled="!GRAPH.canRedo" :icon="RedoIcon" @click="HISTORY.redo()"/>
				</el-tooltip>
			</li>

			<li>
				<el-tooltip :content="i18nStore.translate('LABEL_ModelEditorGraph_fit')">
					<el-button :icon="FitIcon" @click="VIEW.fit()"/>
				</el-tooltip>
			</li>
		</ul>

		<ul v-if="GRAPH.isLoaded" class="toolbar left-bottom">
		</ul>

		<ul v-if="GRAPH.isLoaded" class="toolbar right-top">
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
				<el-tooltip :content="i18nStore.translate('LABEL_ModelEditorGraph_previewCode')">
					<el-button :icon="CodeIcon" @click="handleCodePreview"/>
				</el-tooltip>

				<DragDialog
					v-model="codePreviewStore.openState"
					init-full-screen
					can-drag can-resize
					limit-by-parent
					:modal="true"
				>
					<MultiCodePreview
						ref="multiCodePreviewRef"
						@download-file="handleDownloadFile"
						@download-files="handleDownloadFiles"
					/>
				</DragDialog>
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

<script lang="ts" setup>
import {onBeforeUnmount, onMounted, ref, watch} from "vue"
import {Graph, Node} from "@antv/x6"
import {initModelEditor} from "./initModelEditor.ts"
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {useGlobalLoadingStore} from "@/store/loading/GlobalLoadingStore.ts";
import {sendI18nMessage} from "@/message/message.ts";
import {GenerateFile, GenTableModelInput} from "@/api/__generated/model/static";
import SaveIcon from "@/components/global/icons/toolbar/SaveIcon.vue";
import MultiCodePreview from "@/components/pages/ModelEditor/code/MultiCodePreview.vue";
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import FitIcon from "@/components/global/icons/toolbar/FitIcon.vue";
import DownloadIcon from "@/components/global/icons/download/DownloadIcon.vue";
import ScaleBar from "@/components/global/graphEditor/scale/ScaleBar.vue";
import GraphSearcher from "@/components/pages/ModelEditor/searcher/GraphSearcher.vue";
import CodeIcon from "@/components/global/icons/toolbar/CodeIcon.vue";
import {EditPen} from "@element-plus/icons-vue";
import RedoIcon from "@/components/global/icons/toolbar/RedoIcon.vue";
import UndoIcon from "@/components/global/icons/toolbar/UndoIcon.vue";
import ExportIcon from "@/components/global/icons/toolbar/ExportIcon.vue";
import {
	convertModel,
	downloadFile,
	downloadModelZip,
	downloadZip,
	exportModelJson,
} from "@/components/pages/ModelEditor/export/modelExport.ts";
import {TABLE_NODE} from "@/components/pages/ModelEditor/constant.ts";
import {useDocumentEvent} from "@/utils/useDocumentEvent.ts";
import MiniMap from "@/components/pages/ModelEditor/minimap/MiniMap.vue";
import {bindGraphKeyEvent} from "@/components/pages/ModelEditor/graph/graphKeyEvent.ts";
import {validateModel} from "@/components/business/model/form/validateModel.ts";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";
import {exportGraphPNG, exportGraphSVG,} from "@/components/pages/ModelEditor/export/graphExport.ts";
import {MODEL_VALID_NOT_PASS, saveModel} from "@/components/pages/ModelEditor/save/saveModel.ts";
import {useModelEditDialogStore} from "@/store/modelEditor/dialogs/ModelEditDialogStore.ts";
import {useMultiCodePreviewStore} from "@/store/modelEditor/MultiCodePreviewStore.ts";
import {jsonSortPropStringify} from "@/utils/json.ts";
import {api} from "@/api";
import {useModelEditorContextMenuStore} from "@/store/modelEditor/contextMenu/ModelEditorContextMenuStore.ts";
import {judgeTarget} from "@/utils/clickUtils.ts";
import {useTableDialogsStore} from "@/store/modelEditor/dialogs/TableDialogsStore.ts";

const i18nStore = useI18nStore()

const container = ref<HTMLElement>()
const wrapper = ref<HTMLElement>()

let graph: Graph

const {GRAPH, MODEL, MODEL_EDITOR, SELECT, HISTORY, VIEW} = useModelEditorStore()

const modelEditorDialog = useModelEditDialogStore()

const tableDialogs = useTableDialogsStore()

const loadingStore = useGlobalLoadingStore()

const contextMenuStore = useModelEditorContextMenuStore()

onMounted(loadingStore.withLoading('ModelEditorGraph onMounted', () => {
	graph = initModelEditor(container.value!, wrapper.value!)

	GRAPH.load(graph)

	graph.on('blank:click', () => {
		SELECT.unselectAll()
	})

	graph.on('blank:dblclick', () => {
		tableDialogs.create(GRAPH.mousePosition)
	})

	graph.on('node:click', ({node}) => {
		handleNodeClick(node)
	})

	bindGraphKeyEvent(graph)
}))

onBeforeUnmount(() => {
	GRAPH.unload()
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
			tableDialogs.edit(id, table)
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
		const model = MODEL._model()

		MODEL.isLoaded = false

		const currentGraphData = JSON.stringify(MODEL_EDITOR.getGraphData())

		if (model.graphData !== currentGraphData) {
			graph.cleanSelection()
			model.graphData = currentGraphData
		}

		const id = await saveModel(model)
		const newModel = await api.modelService.get({id})
		if (newModel !== undefined) {
			MODEL.load(newModel)
			sendI18nMessage("MESSAGE_ModelEditorGraph_modelSaveSuccess", "success")
		} else {
			sendI18nMessage({key: "MESSAGE_ModelEditorGraph_modelSaveError", args: [id]}, 'error', id)
		}
	} catch (e) {
		if (e === MODEL_VALID_NOT_PASS) return

		sendI18nMessage({key: "MESSAGE_ModelEditorGraph_modelSaveError", args: [e]}, 'error', e)
	}
})

useDocumentEvent('keydown', (e) => {
	if (e.ctrlKey || e.metaKey) {
		if (e.key === 's') {
			e.preventDefault()
			handleSaveModel()
		}
	}
})

const handleEditModel = () => {
	modelEditorDialog.handleEdit()
}

// 拖曳状态标记
const isDragging = ref(false)
// 右键菜单标记
const contextMenuFlag = ref(false)

const contextMenuWaitTime = 150

const handleMouseDown = (e: MouseEvent) => {
	if (e.button === 2) {
		if (isDragging.value) {
			isDragging.value = false
		}
		contextMenuFlag.value = true
		setTimeout(() => {
			if (contextMenuFlag.value) {
				isDragging.value = true
				contextMenuFlag.value = false
			}
		}, contextMenuWaitTime)
	}
}

const handleMouseUp = (e: MouseEvent) => {
	if (e.button === 2) {
		if (contextMenuFlag.value) {
			contextMenuFlag.value = false
			handleOpenContextMenu(e)
		}
		if (isDragging.value) {
			isDragging.value = false
		}
	}
}

const handleOpenContextMenu = (e: MouseEvent) => {
	let matchedEl: HTMLElement | undefined = undefined

	const options = {x: e.pageX, y: e.pageY}

	if (judgeTarget(e, (el) => {
		if (el.classList.contains("x6-node")) {
			matchedEl = el
			return true
		}
	})) {
		if (matchedEl) {
			const tableNodePair = MODEL.tableNodePairs.find(it => it.second.id === matchedEl?.getAttribute("data-cell-id"))
			if (tableNodePair !== undefined) {
				contextMenuStore.open(options, {type: "Table", tableNodePair})
				return
			}
		}
	}

	if (judgeTarget(e, (el) => {
		if (el.classList.contains("x6-edge") || el.classList.contains("x6-edge-tools")) {
			matchedEl = el
			return true
		}
	})) {
		if (matchedEl) {
			const associationEdgePair = MODEL.associationEdgePairs.find(it => it.second.id === matchedEl?.getAttribute("data-cell-id"))
			if (associationEdgePair !== undefined) {
				contextMenuStore.open(options, {type: "Association", associationEdgePair})
				return
			}
		}
	}

	contextMenuStore.open(options)
}

/**
 * 代码预览与下载
 */

const preJudge = (): boolean => {
	if (GRAPH.isLoaded && MODEL.isLoaded) {
		const modelData = jsonSortPropStringify(MODEL_EDITOR.getGraphData().json)
		const editorData = jsonSortPropStringify(JSON.parse(MODEL._model().graphData)["json"])
		if (modelData !== editorData) {
			sendI18nMessage({
				key: "MESSAGE_ModelEditorGraph_someChangeNotSave",
				args: [modelData, editorData]
			}, 'warning', [modelData, editorData])
			return false
		}
	} else {
		return false
	}

	const model = MODEL._model()
	const messageList = validateModel(model)

	if (messageList.length === 0) {
		return true
	} else {
		messageList.forEach(it => sendI18nMessage(it, 'warning'))
		return false
	}
}

const codePreviewStore = useMultiCodePreviewStore()

const handleCodePreview = loadingStore.withLoading('ModelEditorGraph handleCodePreview', async () => {
	if (!preJudge()) return

	const model = MODEL._model()
	await convertModel(model.id)
	await codePreviewStore.codeRefresh()
	codePreviewStore.open()
})

watch(() => MODEL.isLoaded, async (value) => {
	if (value) {
		if (codePreviewStore.openState) {
			await handleCodePreview()
		}
	}
})

const handleDownloadFile = loadingStore.withLoading('ModelEditorGraph handleCodeDownload', (file: GenerateFile) => {
	downloadFile(file)
})

const handleDownloadFiles = loadingStore.withLoading('ModelEditorGraph handleCodeDownload', async (files: Array<GenerateFile>) => {
	await downloadZip(files)
})

const exportType_CONSTANT = ["JSON", "PNG", "SVG"]

type ExportType = typeof exportType_CONSTANT[number]

const exportType = ref<ExportType>('JSON')

const handleModelExport = loadingStore.withLoading('ModelEditorGraph handleModelExport', () => {
	if (!preJudge()) return

	const model = MODEL._model()

	switch (exportType.value) {
		case 'JSON':
			exportModelJson(model)
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
