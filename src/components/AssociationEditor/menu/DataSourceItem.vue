<script lang="ts" setup>
import {ref, watch} from "vue";
import {GenDataSourceView, GenSchemaView} from "../../../api/__generated/model/static";
import SchemaItem from "./SchemaItem.vue";
import {api} from "../../../api";
import {GenSchemaDto} from "../../../api/__generated/model/dto";
import DataSourceDialog from "../../dialog/DataSourceDialog.vue";
import {sendMessage} from "../../../utils/message.ts";
import Details from "../../common/Details.vue";
import {useLoading} from "../../../hooks/useLoading.ts";
import {Delete, EditPen} from "@element-plus/icons-vue";
import {ElMessageBox} from 'element-plus'
import DataSourceIcon from "../../icons/database/DataSourceIcon.vue";

const genSchemaLoading = useLoading()

const viewSchemaLoading = useLoading()

interface DataSourceItemProps {
	dataSource: GenDataSourceView
}

const props = defineProps<DataSourceItemProps>()

interface SchemaItemEmits {
	(event: "change", dataSourceId: number): void

	(event: "delete", dataSourceId: number): void
}

const emits = defineEmits<SchemaItemEmits>()

const allSchemas = ref<GenSchemaDto['DEFAULT'][]>([])

const previewSchemas = async (dataSourceId: number) => {
	viewSchemaLoading.start()
	allSchemas.value = await api.schemaService.preview({dataSourceId})
	viewSchemaLoading.end()
}

const schemas = ref<GenSchemaView[]>([])

const getSchemas = async (schemaIds: number[] = []) => {
	genSchemaLoading.add()
	schemas.value = await api.schemaService.list({dataSourceId: props.dataSource.id, schemaIds})
	genSchemaLoading.sub()
}

const showAllSchemas = ref(false)

const toggleShowAllSchemas = async (dataSourceId: number) => {
	showAllSchemas.value = !showAllSchemas.value

	if (showAllSchemas.value) {
		previewSchemas(dataSourceId)
	} else {
		allSchemas.value = []
	}
}

const closeAllSchemas = () => {
	showAllSchemas.value = false
	allSchemas.value = []
}

watch(() => props.dataSource, () => {
	getSchemas()
}, {immediate: true})

const deleteDataSource = (dataSourceId: number = props.dataSource.id) => {
	ElMessageBox.confirm(
		`确定要删除 ${props.dataSource.name} 吗？`,
		{
			confirmButtonText: 'Yes',
			cancelButtonText: 'No',
			icon: Delete,
			type: "error"
		}
	).then(() => {
		api.dataSourceService.delete({ids: [dataSourceId]}).then(res => {
			if (res > 0) {
				emits("delete", dataSourceId)
			}
		})
	})
}

const loadSchema = async (name: string, dataSourceId: number = props.dataSource.id) => {
	genSchemaLoading.add()

	const loadIds = await api.schemaService.load({
		dataSourceId,
		name
	})

	if (loadIds.length > 0) {
		await getSchemas()
		closeAllSchemas()
	}

	genSchemaLoading.sub()
}

const isEdit = ref(false)
const x = ref(0)
const y = ref(0)

const handleEdit = (e: MouseEvent) => {
	isEdit.value = true
	x.value = e.clientX
	y.value = e.clientY
}

const handleEditFinish = () => {
	isEdit.value = false
	emits("change", props.dataSource.id)
}

const handleSchemaDelete = async (id: number) => {
	sendMessage(`删除 schema ${id} 成功`, "success")
	await getSchemas()
}
</script>

<template>
	<Details open>
		<template #title>
			<div style="height: 2em; line-height: 2em;">
				<el-text>
					<DataSourceIcon :type="dataSource.type"></DataSourceIcon>

					{{ dataSource.name }}

					<el-popover :visible="showAllSchemas" width="300px" placement="bottom-end">
						<template #reference>
							<el-button @click="toggleShowAllSchemas(dataSource.id)">
								schemas
							</el-button>
						</template>

						<div v-loading="viewSchemaLoading.isLoading()">
							<div v-for="schema in allSchemas">
								<el-text>
									<el-button @click="loadSchema(schema.name)" link>{{ schema.name }}</el-button>
								</el-text>
							</div>
						</div>
					</el-popover>

					<el-button @click="handleEdit" title="编辑" :icon="EditPen"
							   type="warning" link></el-button>
					<el-button @click="deleteDataSource()" title="删除" :icon="Delete"
							   type="danger" link></el-button>
				</el-text>
			</div>
		</template>
		<div v-loading="genSchemaLoading.isLoading()" style="padding: 0 0 0.5em 0.5em;">
			<SchemaItem v-for="schema in schemas" :schema="schema" @delete="handleSchemaDelete"/>
		</div>
	</Details>
	<DataSourceDialog
		v-if="isEdit"
		:id="dataSource.id"
		:data-source="dataSource"
		:x="x" :y="y"
		@close="isEdit = false"
		@updated="handleEditFinish">
	</DataSourceDialog>
</template>