<template>
	<div ref="wrapper" class="wrapper">
		<div ref="container"></div>

		<ul v-if="store.isLoaded" class="toolbar left-top">
			<li>
				<el-tooltip>
					<template #content>
						保存模型 [Ctrl + s]
					</template>

					<el-button :icon="SaveIcon" @click="handleSaveModel"></el-button>
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

		<ul v-if="store.isLoaded && listStore.currentModel" class="toolbar right-top">
			<li>
				<el-tooltip content="预览 SQL">
					<el-button :icon="SQLIcon" @click="async () => {
						await handleSaveModel()
						await handleSQLPreview()
					}"></el-button>
				</el-tooltip>

				<DragDialog v-model="openSQLPreviewDialog" :init-w="700" :init-x="5000" can-drag
							can-resize disable-h>
					<MultiCodePreview :codes-map="sqlMap" height="calc(100vh - 5em - 30px)" style="height: calc(100vh - 30px); width: 100%;"
									  width="100%"></MultiCodePreview>
				</DragDialog>
			</li>

			<li>
				<el-tooltip content="预览代码">
					<el-button :icon="PreviewIcon" @click="async () => {
						await handleSaveModel()
						await handleCodePreview()
					}"></el-button>
				</el-tooltip>

				<DragDialog v-model="codePreviewDialogOpenState" :init-w="700" :init-x="5000"
							can-drag can-resize disable-h>
					<MultiCodePreview :codes-map="codesMap" height="calc(100vh - 5em - 30px)" style="height: calc(100vh - 30px); width: 100%;"
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

	<ModelDialog v-if="openModelDialog" @cancel="openModelDialog = false"
				 @submit="handleSaveDialogSubmit"></ModelDialog>

	<DragDialog v-model="store.openDataSourceLoadMenu" :init-w="500" :init-x="100"
				:init-y="10" :init-h="600" can-resize>
		<DataSourceMenu ref="dataSourceLoadMenu"></DataSourceMenu>
	</DragDialog>
</template>

<style scoped>
@import "../../../../assets/graph-common.css";
</style>

<script lang="ts" setup>
import {onMounted, onUnmounted, ref, watch} from "vue"
import {Graph} from "@antv/x6"
import {register} from "@antv/x6-vue-shape"
import ModelNode from "./node/ModelNode.vue"
import {initModelEditor} from "./init.ts"
import ModelDialog from "@/components/pages/ModelEditor/menu/ModelDialog.vue"
import {Emitter} from "mitt";
import {useModelEditorStore} from "../store/ModelEditorStore.ts";
import {useModelListStore} from "../../ModelList/store/ModelListStore.ts";
import {useGlobalLoadingStore} from "@/components/global/loading/GlobalLoadingStore.ts";
import {COLUMN_PORT} from "@/components/business/graphEditor/constant.ts";
import {columnPortPosition} from "../../AssociationEditor/graph/node/ColumnPort.ts";
import {useGraphDataOperation} from "@/components/business/graphEditor/storage/localStorage.ts";
import {api} from "@/api";
import {sendMessage} from "@/utils/message.ts";
import {GenModelInput} from "@/api/__generated/model/static";
import {handleHistoryKeyEvent} from "@/components/business/graphEditor/history/useHistory.ts";
import {handleSelectionKeyEvent} from "@/components/business/graphEditor/selection/useSelection.ts";
import {useSwitchAssociationType} from "../../AssociationEditor/graph/edge/AssociationEdge.ts";
import {useSaveKeyEvent} from "@/components/business/graphEditor/storage/useSave.ts";
import {DataSourceMenuEvents} from "@/components/business/dataSource/menu/DataSourceMenuEvents.ts";
import SaveIcon from "@/components/global/icons/toolbar/SaveIcon.vue";
import UndoIcon from "@/components/global/icons/toolbar/UndoIcon.vue";
import RedoIcon from "@/components/global/icons/toolbar/RedoIcon.vue";
import LayoutIcon from "@/components/global/icons/toolbar/LayoutIcon.vue";
import MultiCodePreview from "@/components/global/code/MultiCodePreview.vue";
import DragDialog from "@/components/global/dialog/DragDialog.vue";
import SQLIcon from "@/components/global/icons/toolbar/SQLIcon.vue";
import FitIcon from "@/components/global/icons/toolbar/FitIcon.vue";
import CenterIcon from "@/components/global/icons/toolbar/CenterIcon.vue";
import EraserIcon from "@/components/global/icons/toolbar/EraserIcon.vue";
import AssociationOffIcon from "@/components/global/icons/toolbar/AssociationOffIcon.vue";
import PreviewIcon from "@/components/global/icons/toolbar/PreviewIcon.vue";
import DownloadIcon from "@/components/global/icons/toolbar/DownloadIcon.vue";
import {saveAs} from "file-saver";
import ScaleBar from "@/components/business/graphEditor/tools/ScaleBar.vue";
import GraphSearcher from "@/components/business/graphEditor/tools/GraphSearcher.vue";
import DataSourceMenu from "@/components/business/dataSource/menu/DataSourceMenu.vue";
import {ModelEditorEventBus} from "@/components/pages/ModelEditor/store/ModelEditorEventBus.ts";

const container = ref<HTMLElement>()
const wrapper = ref<HTMLElement>()

let graph: Graph

const store = useModelEditorStore()

const listStore = useModelListStore()

const loadingStore = useGlobalLoadingStore()

Graph.registerPortLayout(
	COLUMN_PORT,
	columnPortPosition,
	true
)

register({
	shape: "model",
	component: ModelNode
})

const openModelDialog = ref(false)

const {
	toDataJSONStr,
	loadGraphByJSONStr
} = useGraphDataOperation(() => graph)

/**
 * 保存模型
 * 涉及两步操作：
 * 1. 使用 api saveModel 使后端保存当前模型的数据
 * 2. 修改当前 listStore 中保存的当前模型，确保数据一致，并缓存这个当前模型
 */
const handleSaveModel = async () => {
	loadingStore.add()

	try {
		if (!listStore.currentModel) {
			openModelDialog.value = true
		} else {
			listStore.currentModel.value = toDataJSONStr()

			await api.modelService.save({body: listStore.currentModel})

			localStorage.setItem('currentModel', JSON.stringify(listStore.currentModel))

			sendMessage("模型保存成功", "success")
		}
	} catch (e) {
		sendMessage(`模型保存失败，原因：${e}`, 'error', e)
	}

	loadingStore.sub()
}

const handleSaveDialogSubmit = async (model: GenModelInput) => {
	try {
		model.value = toDataJSONStr()

		const id = await api.modelService.save({body: model})

		listStore.currentModel = (await api.modelService.get({id}))!

		openModelDialog.value = false

		sendMessage("模型保存成功", "success")
	} catch (e) {
		sendMessage(`模型保存失败，原因：${e}`, 'error', e)
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

store.addEventListener('keydown', handleHistoryKeyEvent)

store.addEventListener('keydown', handleSelectionKeyEvent)

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

	useSwitchAssociationType(graph)
	store.load(graph)
})

onUnmounted(() => {
	store.unload()
})

useSaveKeyEvent(() => {
	handleSaveModel()
})

const handleCodeDownload = async () => {
	loadingStore.add()

	if (!listStore.currentModel) {
		sendMessage('当前模型未保存至数据库，无法生成', 'error')
		return
	}
	const res = (await api.generateService.generateByModel({body: listStore.currentModel.id})) as any as Blob
	const file = new File([res], "entities.zip")
	saveAs(file)

	loadingStore.sub()
}

const codePreviewDialogOpenState = ref(false)

const codesMap = ref<{ [key: string]: string }>({})

const handleCodePreview = async () => {
	loadingStore.add()

	if (!listStore.currentModel) {
		sendMessage('当前模型未保存至数据库，无法预览', 'error')
		return
	}
	codesMap.value = await api.generateService.previewByModel({modelId: listStore.currentModel.id})
	codePreviewDialogOpenState.value = true

	loadingStore.sub()
}

watch(() => codePreviewDialogOpenState.value, async (openState) => {
	if (!openState) {
		codesMap.value = {}
	}
})

const dataSourceLoadMenu = ref()

watch(() => dataSourceLoadMenu.value, () => {
	if (!dataSourceLoadMenu.value) return

	const eventBus: Emitter<DataSourceMenuEvents> = dataSourceLoadMenu.value.eventBus

	eventBus.on('clickSchema', async ({id}) => {
		loadingStore.add()
		await store.loadSchema(id)
		loadingStore.sub()
	})

	eventBus.on('clickTable', async ({id}) => {
		loadingStore.add()
		await store.loadTable(id)
		loadingStore.sub()
	})
})

const openSQLPreviewDialog = ref(false)

const sqlMap = ref<{ [key: string]: string }>({})

const handleSQLPreview = async () => {
	if (!listStore.currentModel) return

	loadingStore.add()

	openSQLPreviewDialog.value = true
	sqlMap.value = await api.modelService.previewSql({id: listStore.currentModel.id})
	loadingStore.sub()
}
</script>