<script lang="ts" setup>
import {ref, watch} from 'vue'
import {api} from '../../api'
import {GenTableAssociationView} from '../../api/__generated/model/static'
import DragDialog from "../common/DragDialog.vue"
import {useTableEditorGraphStore} from "../../store/tableEditorGraph.ts";
import {focusNode, getTableNode} from "../AssociationEditor/node/TableNode.ts";
import {Graph} from "@antv/x6";
import {MANY_TO_ONE, ONE_TO_ONE} from "../AssociationEditor/constant";
import {ElInput, ElSelect, ElOption, ElButton, ElForm, ElFormItem, ElTable, ElTableColumn} from "element-plus";

const store = useTableEditorGraphStore()

interface TableDialogProps {
	id: number
}

const props = defineProps<TableDialogProps>()

interface TableDialogEmits {
	(event: "close"): void
}

const emits = defineEmits<TableDialogEmits>()

const table = ref<GenTableAssociationView | undefined>()

watch(() => props.id, async (id) => {
	table.value = await api.tableService.getAssociationView({id})
}, {immediate: true})

const focusTable = (id: number | undefined) => {
	if (!id) return

	const graph: Graph = store._graph()
	if (!graph) return

	const node = getTableNode(graph, id)
	if (node) focusNode(graph, node)
}

const previewEntities = ref<{
	name: string,
	value: string
}[]>([])

const previewShow = ref(false)

const handlePreview = async () => {
	if (table.value) {
		const res = await store.preview([table.value.id])
		previewEntities.value = []
		Object.entries(res).forEach(([key, value]) => {
			previewEntities.value?.push({
				name: key,
				value
			})
		})
		previewShow.value = true
	}
}

const handleGenerate = () => {
	if (table.value) {
		store.generate([table.value.id])
	}
}

const handleSaveTable = () => {

}
</script>

<template>
	<DragDialog :x="200" :y="100" :init-w="800" @close="emits('close')">
		<div v-if="table" class="wrapper">
			<el-form size="small">
				<el-form-item label="name">
					{{ table.name }}
				</el-form-item>
				<el-form-item label="type">
					{{ table.type }}
				</el-form-item>
				<el-form-item label="comment">
					{{ table.comment }}
				</el-form-item>
				<el-form-item label="remark">
					<el-input v-model="table.remark" type="textarea"></el-input>
				</el-form-item>
				<el-form-item>
					<el-table :data="table.columns">
						<el-table-column fixed type="expand">
							<template #default="scope">
								<div>{{ scope.row }}</div>

								<div v-for="association in scope.row.inAssociations">
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

								<div v-for="association in scope.row.outAssociations">
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
							</template>
						</el-table-column>
						<el-table-column fixed prop="name"></el-table-column>
						<el-table-column>
							<template #default="scope">
							<span>{{
									`${scope.row.type}(${scope.row.displaySize}, ${scope.row.numericPrecision})`
								}}</span>
							</template>
						</el-table-column>
						<el-table-column prop="comment" show-overflow-tooltip></el-table-column>
						<el-table-column prop="remark">
							<template #default="scope">
								<el-input v-model="scope.row.remark"></el-input>
							</template>
						</el-table-column>
					</el-table>
				</el-form-item>
				<el-form-item>
					<el-button @click.prevent.self="handleSaveTable">保存变更</el-button>
					<el-button @click.prevent.self="handlePreview">预览实体</el-button>
					<el-button @click.prevent.self="handleGenerate">生成实体</el-button>
				</el-form-item>
			</el-form>

			<DragDialog v-if="previewShow" @close="previewShow = false">
				<div style="height: 60vh; width: 60vw; overflow: auto; scrollbar-gutter: stable; padding: 1em;">
					<div v-for="item in previewEntities">
						<div>{{ item.name }}</div>
						<div v-text="item.value" style="white-space: pre; cursor: auto;"></div>
					</div>
				</div>
			</DragDialog>
		</div>
		<div v-else>
			Table 不在数据库中
		</div>
	</DragDialog>
</template>

<style lang="scss" scoped>
.wrapper {
	max-height: 60vh;
	overflow: auto;
}

:deep(.el-tabs__active-bar) .is-left {
	display: none;
}
</style>