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

					<el-button :icon="SaveIcon" @click="handleSaveAll"></el-button>
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
						   style="width: 4em;"
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
				<el-tooltip :content="store.isSelectionEmpty ? '匹配关联' : '在选中范围内匹配关联'">
					<el-button :icon="AssociationIcon" class="cling-right" @click="handleMatch"></el-button>
				</el-tooltip>

				<el-select v-model="matchType" class="cling-left" @change="handleMatch">
					<el-option v-for="type in AssociationMatchType_CONSTANTS" :value="type">{{ type }}</el-option>
				</el-select>
			</li>

			<li>
				<el-tooltip content="预览代码">
					<el-button :icon="PreviewIcon" @click="async () => {
						await handleSaveAll()
						await handleCodePreview()
					}"></el-button>
				</el-tooltip>

				<el-dialog v-model="codePreviewDialogOpenState" :z-index="2000" fullscreen>
					<div style="height: calc(100vh - 5em); overflow: auto;">
						<MultiCodePreview :code-files="codeFiles"></MultiCodePreview>
					</div>

					<div style="position: absolute; bottom: 2em; right: 2em">
						<el-tooltip content="下载代码">
							<el-button :icon="DownloadIcon" round size="large" @click="handleCodeDownload"></el-button>
						</el-tooltip>
					</div>
				</el-dialog>
			</li>

			<li>
				<el-tooltip content="生成代码（获得 zip 压缩包）">
					<el-button :icon="DownloadIcon" @click="async () => {
						await handleSaveAll()
						await handleCodeDownload()
					}"></el-button>
				</el-tooltip>
			</li>
		</ul>

		<div v-if="store.isLoaded" class="toolbar right-bottom" style="width:  max(15vw, 200px);">
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
import {computed, onMounted, onUnmounted, ref, watch} from "vue";
import {Graph} from "@antv/x6";
import {initAssociationEditor} from "./init.ts";
import {useSwitchAssociationType} from "./associationEdge.ts";
import {nodeIdToTableId} from "./tableNode.ts";
import {saveAs} from "file-saver";
import {useAssociationEditorStore} from "@/components/pages/AssociationEditor/store/AssociationEditorStore.ts";
import {useGlobalLoadingStore} from "@/components/global/loading/GlobalLoadingStore.ts";
import {useSaveOperation} from "@/components/business/graphEditor/storage/useSave.ts";
import {saveAssociations} from "../business/graphOperation.ts";
import {handleHistoryKeyEvent} from "@/components/business/graphEditor/history/useHistory.ts";
import {handleSelectionKeyEvent} from "@/components/business/graphEditor/selection/useSelection.ts";
import {useAssociationMatch} from "../business/associationMatch.ts";
import {api} from "@/api";
import SaveIcon from "@/components/global/icons/toolbar/SaveIcon.vue";
import UndoIcon from "@/components/global/icons/toolbar/UndoIcon.vue";
import RedoIcon from "@/components/global/icons/toolbar/RedoIcon.vue";
import LayoutIcon from "@/components/global/icons/toolbar/LayoutIcon.vue";
import FitIcon from "@/components/global/icons/toolbar/FitIcon.vue";
import CenterIcon from "@/components/global/icons/toolbar/CenterIcon.vue";
import EraserIcon from "@/components/global/icons/toolbar/EraserIcon.vue";
import AssociationOffIcon from "@/components/global/icons/toolbar/AssociationOffIcon.vue";
import AssociationIcon from "@/components/global/icons/toolbar/AssociationIcon.vue";
import PreviewIcon from "@/components/global/icons/toolbar/PreviewIcon.vue";
import MultiCodePreview from "@/components/global/code/MultiCodePreview.vue";
import DownloadIcon from "@/components/global/icons/toolbar/DownloadIcon.vue";
import ScaleBar from "@/components/business/graphEditor/tools/ScaleBar.vue";
import GraphSearcher from "@/components/business/graphEditor/tools/GraphSearcher.vue";
import {AssociationMatchType_CONSTANTS} from "@/api/__generated/model/enums";
import {Pair} from "@/api/__generated/model/static";

const container = ref<HTMLElement>();
const wrapper = ref<HTMLElement>();

let graph: Graph

const store = useAssociationEditorStore()

const loadingStore = useGlobalLoadingStore()

const {
	handleSaveAll,
	loadGraph,
} = useSaveOperation(
	() => graph,
	"AssociationEditorGraph",
	[
		{
			auto: false,
			fn: async (graph) => {
				await saveAssociations(graph)
			}
		}
	]
)

store.addEventListener('keydown', handleHistoryKeyEvent)

store.addEventListener('keydown', handleSelectionKeyEvent)

onMounted(() => {
	graph = initAssociationEditor(container.value!, wrapper.value!)

	useSwitchAssociationType(graph)
	loadGraph()
	store.load(graph)
})

onUnmounted(() => {
	store.unload()
})

const {
	handleMatch,
	matchType
} = useAssociationMatch(() => graph)

const tableIds = computed(() => {
	return store.isSelectionEmpty ?
		store.tables().map(it => it.id) : store.selectedNodeIds.map(it => nodeIdToTableId(it))
})

const handleCodeDownload = async () => {
	loadingStore.add()
	const res = (await api.generateService.generateByTable({body: tableIds.value})) as any as Blob
	const file = new File([res], "entities.zip")
	saveAs(file)
	loadingStore.sub()
}

const codePreviewDialogOpenState = ref(false)

const codeFiles = ref<Array<Pair<string, string>>>([])

const handleCodePreview = async () => {
	loadingStore.add()
	codeFiles.value = await api.generateService.previewByTable({tableIds: tableIds.value})
	codePreviewDialogOpenState.value = true
	loadingStore.sub()
}

watch(() => codePreviewDialogOpenState.value, async (openState) => {
	if (!openState) {
		codeFiles.value = []
	}
})
</script>
