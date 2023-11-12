<script lang="ts" setup>
import {ref, watch} from "vue";
import {GenDataSourceView, GenSchemaView} from "../../../api/__generated/model/static";
import SchemaItem from "./SchemaItem.vue";
import {api} from "../../../api";
import {GenSchemaDto} from "../../../api/__generated/model/dto";
import DataSourceDialog from "./DataSourceDialog.vue";
import Details from "../../common/Details.vue";
import {useLoading} from "../../../hooks/useLoading.ts";
import {Delete, EditPen} from "@element-plus/icons-vue";
import DataSourceIcon from "../../icons/database/DataSourceIcon.vue";
import {DataSourceMenuEventBusProps} from "./DataSourceMenuEventBus.ts";
import {deleteConfirm, sendMessage} from "../../../utils/message.ts";

const genSchemaLoading = useLoading()

const previewSchemaLoading = useLoading()

interface DataSourceItemProps {
	dataSource: GenDataSourceView
}

const props = defineProps<DataSourceItemProps & DataSourceMenuEventBusProps>()

const previewSchemas = ref<GenSchemaDto['DEFAULT'][]>([])

const getPreviewSchemas = async (dataSourceId: number) => {
	previewSchemaLoading.start()
	previewSchemas.value = await api.schemaService.preview({dataSourceId})
	previewSchemaLoading.end()
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
		await getPreviewSchemas(dataSourceId)
	} else {
		previewSchemas.value = []
	}
}

const closeAllSchemas = () => {
	showAllSchemas.value = false
	previewSchemas.value = []
}

watch(() => props.dataSource, () => {
	getSchemas()
}, {immediate: true})

const handleDelete = () => {
	deleteConfirm(`数据源【${props.dataSource.name}】`,
		() => {
			const id = props.dataSource.id

			api.dataSourceService.delete({ids: [id]}).then(res => {
				if (res > 0) {
					sendMessage(`删除 dataSource ${id} 成功`, "success")
					props.eventBus.emit('deleteDataSource', {id})
				}
			})
		}
	)
}

const loadSchema = async (name: string, dataSourceId: number = props.dataSource.id) => {
	genSchemaLoading.add()

	const loadIds = await api.schemaService.load({
		dataSourceId,
		name
	})

	if (loadIds.length > 0) {
		const newSchemas = await api.schemaService.list({schemaIds: loadIds, dataSourceId: dataSourceId})

		newSchemas.forEach(newSchema => {
			const index = schemas.value.findIndex(schema => schema.id == newSchema.id)

			if (index == -1) {
				schemas.value.push(newSchema)
			} else {
				schemas.value[index] = newSchema
			}
		})

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
	props.eventBus.emit('editDataSource', {id: props.dataSource.id})
}

props.eventBus.on('deleteSchema', ({id}) => {
	if (schemas.value.map(schema => schema.id).includes(id)) {
		schemas.value = schemas.value.filter(schema => schema.id != id)
	}
})
</script>

<template>
	<Details open>
		<template #title>
			<div style="height: 2em; line-height: 2em;">
				<el-text class="hover-show">
					<DataSourceIcon :type="dataSource.type"></DataSourceIcon>

					{{ dataSource.name }}

					<el-popover :visible="showAllSchemas" width="300px" placement="bottom-end">
						<template #reference>
							<el-button @click="toggleShowAllSchemas(dataSource.id)">
								schemas
							</el-button>
						</template>

						<div v-loading="previewSchemaLoading.isLoading()">
							<div v-for="schema in previewSchemas">
								<el-text>
									<el-button @click="loadSchema(schema.name)" link>{{ schema.name }}</el-button>
								</el-text>
							</div>
						</div>
					</el-popover>

					<span style="padding-left: 0.5em;" class="hover-show-item">
						<el-button @click="handleEdit" title="编辑" :icon="EditPen" type="warning" link></el-button>
						<el-button @click="handleDelete" title="删除" :icon="Delete" type="danger" link></el-button>
					</span>
				</el-text>
			</div>
		</template>
		<div v-loading="genSchemaLoading.isLoading()" style="padding: 0 0 0.5em 0.5em;">
			<SchemaItem v-for="schema in schemas" :schema="schema" :event-bus="eventBus"/>
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