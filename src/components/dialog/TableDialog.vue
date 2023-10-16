<script lang="ts" setup>
import {ref, watch} from 'vue'
import {api} from '../../api'
import {GenTableAssociationView} from '../../api/__generated/model/static'
import DragDialog from "../common/DragDialog.vue"
import {useAssociationEditorGraphStore} from "../../store/AssociationEditorGraphStore.ts";
import {focusNode, getTableNode} from "../AssociationEditor/node/TableNode.ts";
import {Graph} from "@antv/x6";
import {MANY_TO_ONE, ONE_TO_ONE} from "../AssociationEditor/constant";
import {
	ElText,
	ElInput,
	ElSelect,
	ElOption,
	ElButton,
	ElForm,
	ElFormItem,
	ElTabs,
	ElTabPane
} from "element-plus";
import {sendMessage} from "../../utils/message.ts";
import CodePreview from "../common/CodePreview.vue";
import Details from "../common/Details.vue";

const store = useAssociationEditorGraphStore()

interface TableDialogProps {
	id: number
	x?: number
	y?: number
	w?: number
}

const props = withDefaults(defineProps<TableDialogProps>(), {
	y: 100
})

interface TableDialogEmits {
	(event: "close"): void
	(event: "updated"): void
}

const emits = defineEmits<TableDialogEmits>()

const table = ref<GenTableAssociationView | undefined>()

const judgeTable = () => {
	if (!table.value) {
		sendMessage("Table not exist", "warning")
		throw new Error("Table not exist")
	}
}

watch(() => props.id, async (id) => {
	table.value = await api.tableService.getAssociationView({id})
	judgeTable()
}, {immediate: true})

const focusTable = (id: number | undefined) => {
	if (!id) return

	const graph: Graph = store._graph()
	if (!graph) return

	const node = getTableNode(graph, id)
	if (node) focusNode(graph, node)
}

const ddlShow = ref(false)

const ddlMap = ref<{ [key: string]: string }>({})

const handleDDLShow = async () => {
	judgeTable()

	if (table.value) {
		ddlMap.value = await api.tableService.getDDL({id: table.value.id})
		ddlShow.value = true
	}
}

const entityPreviewShow = ref(false)

const previewEntitiesMap = ref<{ [key: string]: string }>({})

const handleEntityPreview = async () => {
	judgeTable()

	if (table.value) {
		previewEntitiesMap.value = await store.preview([table.value.id])
		entityPreviewShow.value = true
	}
}

const handleGenerate = () => {
	judgeTable()

	if (table.value) {
		store.generate([table.value.id])
	}
}

const handleSaveTable = () => {
	emits("updated")
}
</script>

<template>
	<DragDialog :x="x" :y="y" :init-w="w" @close="emits('close')" :resizable="true">
		<el-form v-if="table" size="small">
			<el-text>
				{{ table.name }}
				{{ table.type }}
				{{ table.comment }}
			</el-text>

			<div style="max-height: 60vh; overflow-y: auto;">
				<el-input v-model="table.remark" type="textarea"></el-input>

				<Details v-for="column in table.columns">
					<template #title>
						{{ column }}
					</template>

					<div v-for="association in column.inAssociations">
						<span> {{ " <- " }} </span>
						<el-select v-model="association.associationType">
							<el-option :value="MANY_TO_ONE">{{ MANY_TO_ONE }}</el-option>
							<el-option :value="ONE_TO_ONE">{{ ONE_TO_ONE }}</el-option>
						</el-select>
						<span @click="focusTable(association.sourceColumn.table.id)">{{
								association.sourceColumn.table.name
							}}</span>
						<span>.</span>
						<span>{{ association.sourceColumn.name }}</span>
					</div>

					<div v-for="association in column.outAssociations">
						<span> {{ " -> " }} </span>
						<el-select v-model="association.associationType">
							<el-option :value="MANY_TO_ONE">{{ MANY_TO_ONE }}</el-option>
							<el-option :value="ONE_TO_ONE">{{ ONE_TO_ONE }}</el-option>
						</el-select>
						<span @click="focusTable(association.targetColumn.table.id)">{{
								association.targetColumn.table.name
							}}</span>
						<span>.</span>
						<span>{{ association.targetColumn.name }}</span>
					</div>
				</Details>
			</div>

			<el-form-item>
				<el-button @click="handleDDLShow">查看 DDL</el-button>

				<el-button @click="handleSaveTable">保存变更</el-button>

				<el-button @click="handleEntityPreview">预览实体</el-button>
				<el-button @click="handleGenerate">生成实体</el-button>
			</el-form-item>
		</el-form>

		<DragDialog v-if="ddlShow" @close="ddlShow = false" :resizable="true" :y="100">
			<el-tabs style="min-width: 60vw;">
				<el-tab-pane v-for="name in Object.keys(ddlMap)" :label="name">
					<CodePreview style="max-height: 60vh;" :code="ddlMap[name]"></CodePreview>
				</el-tab-pane>
			</el-tabs>
			<div v-if="Object.keys(ddlMap).length == 0">生成失败</div>
		</DragDialog>

		<DragDialog v-if="entityPreviewShow" @close="entityPreviewShow = false" :resizable="true" :y="100">
			<el-tabs style="min-width: 60vw;">
				<el-tab-pane v-for="name in Object.keys(previewEntitiesMap)" :label="name">
					<CodePreview style="max-height: 60vh;" :code="previewEntitiesMap[name]"></CodePreview>
				</el-tab-pane>
			</el-tabs>
			<div v-if="Object.keys(ddlMap).length == 0">生成失败</div>
		</DragDialog>
	</DragDialog>
</template>