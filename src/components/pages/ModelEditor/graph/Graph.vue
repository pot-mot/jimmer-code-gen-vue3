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
					<el-button :icon="EditPen" @click="handleEdit()"></el-button>
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

	<ModelDialog :model-value="!!editModel"
				 :model="editModel"
				 edit-value
				 @cancel="editModel = undefined"
				 @submit="handleSubmit"></ModelDialog>

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
import {initModelEditor} from "./init.ts"
import ModelDialog from "@/components/business/model/dialog/ModelDialog.vue"
import {Emitter} from "mitt";
import {useModelEditorStore} from "../store/ModelEditorStore.ts";
import {useGlobalLoadingStore} from "@/components/global/loading/GlobalLoadingStore.ts";
import {api} from "@/api";
import {sendMessage} from "@/utils/message.ts";
import {GenModelInput, GenModelView, Pair} from "@/api/__generated/model/static";
import {handleHistoryKeyEvent} from "@/components/business/graphEditor/history/useHistory.ts";
import {handleSelectionKeyEvent} from "@/components/business/graphEditor/selection/useSelection.ts";
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
import DownloadIcon from "@/components/global/icons/toolbar/DownloadIcon.vue";
import {saveAs} from "file-saver";
import ScaleBar from "@/components/business/graphEditor/tools/ScaleBar.vue";
import GraphSearcher from "@/components/business/graphEditor/tools/GraphSearcher.vue";
import DataSourceMenu from "@/components/business/dataSource/menu/DataSourceMenu.vue";
import CodeIcon from "@/components/global/icons/toolbar/CodeIcon.vue";
import {useGraphDataOperation} from "@/components/business/graphEditor/storage/graphData.ts";
import {useRoute, useRouter} from "vue-router";
import {EditPen} from "@element-plus/icons-vue";
import {cloneDeep} from "lodash";

const container = ref<HTMLElement>()
const wrapper = ref<HTMLElement>()

let graph: Graph

const store = useModelEditorStore()

const loadingStore = useGlobalLoadingStore()

const route = useRoute()
const router = useRouter()

const currentModel = ref<GenModelView>()

const _currentModel = (): GenModelView => {
	if (!currentModel.value) {
		sendMessage('当前模型不存在', 'error')
		router.push('/models')
		throw currentModel
	}
	return currentModel.value
}

const {
	toDataJSONStr,
	loadGraphByJSONStr
} = useGraphDataOperation(() => graph)

onMounted(async () => {
	loadingStore.add()

	let paramId: string | string[] | undefined = route.params.id
	if (paramId instanceof Array) paramId = paramId[0]
	const id = parseInt(paramId)
	currentModel.value = await api.modelService.get({id})

	graph = initModelEditor(container.value!, wrapper.value!)
	if (_currentModel().value.length > 0) {
		try {
			loadGraphByJSONStr(_currentModel().value)
		} catch (e) {
			sendMessage('模型数据解析出错', 'error', e)
		}
	}
	await store.load(graph)

	loadingStore.sub()
})

const handleSaveModel = async () => {
	loadingStore.add()

	try {
		const model = _currentModel()

		if (model.value != toDataJSONStr()) {
			model.value = toDataJSONStr()
			await api.modelService.save({body: model})
		} else {
			await api.modelService.save({body: {...model, value: undefined}})
		}

		sendMessage("模型保存成功", "success")
	} catch (e) {
		sendMessage(`模型保存失败，原因：${e}`, 'error', e)
	}

	loadingStore.sub()
}

const editModel = ref<GenModelInput>()

const handleEdit = (model: GenModelInput = cloneDeep(_currentModel())) => {
	model.value = toDataJSONStr()
	editModel.value = model
}

const handleSubmit = async (model: GenModelInput) => {
	loadingStore.add()

	try {
		// 尽可能规避编辑 json value
		if (model.value && model.value == toDataJSONStr()) {
			model.value = undefined
		}

		const id = await api.modelService.save({body: model})
		currentModel.value = (await api.modelService.get({id}))!
		loadGraphByJSONStr(_currentModel().value)
		editModel.value = undefined
		sendMessage("模型保存成功", "success")
	} catch (e) {
		sendMessage(`模型保存失败，原因：${e}`, 'error', e)
	}

	loadingStore.sub()
}

store.addEventListener('keydown', handleHistoryKeyEvent)

store.addEventListener('keydown', handleSelectionKeyEvent)

onUnmounted(() => {
	store.unload()
})

useSaveKeyEvent(() => {
	handleSaveModel()
})

const handleCodeDownload = async () => {
	loadingStore.add()

	const res = (await api.generateService.generateByModel({
		body: _currentModel().id, language: _currentModel().language
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
		modelId: _currentModel().id, language: _currentModel().language
	})
	codePreviewDialogOpenState.value = true

	loadingStore.sub()
}

watch(() => codePreviewDialogOpenState.value, async (openState) => {
	if (!openState) {
		codeFiles.value = []
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

const sqlFiles = ref<Array<Pair<string, string>>>([])

const handleSQLPreview = async () => {
	loadingStore.add()

	openSQLPreviewDialog.value = true
	sqlFiles.value = await api.modelService.previewSql({
		id: _currentModel().id, type: _currentModel().dataSourceType
	})
	loadingStore.sub()
}
</script>
