<script lang="ts" setup>
import {ref, watch} from "vue";
import {GenDataSourceView, GenSchemaView} from "@/api/__generated/model/static";
import SchemaItem from "./SchemaItem.vue";
import {api} from "@/api";
import {GenSchemaDto} from "@/api/__generated/model/dto";
import DataSourceDialog from "../dialog/DataSourceDialog.vue";
import Details from "../../common/Details.vue";
import {useLoading} from "../../../../hooks/useLoading.ts";
import {Delete, EditPen} from "@element-plus/icons-vue";
import DataSourceIcon from "../../icons/database/DataSourceIcon.vue";
import {DataSourceMenuEventBusProps} from "../events/DataSourceMenuEvents.ts";
import {deleteConfirm, sendMessage} from "@/utils/message.ts";

const genSchemaLoading = useLoading()

const previewSchemaLoading = useLoading()

interface DataSourceItemProps {
	dataSource: GenDataSourceView
}

const props = defineProps<DataSourceItemProps & DataSourceMenuEventBusProps>()

const previewSchemas = ref<GenSchemaDto['DEFAULT'][]>([])

const getPreviewSchemas = async () => {
	previewSchemaLoading.start()
	previewSchemas.value = await api.schemaService.preview({dataSourceId: props.dataSource.id})
	previewSchemaLoading.end()
}

const schemas = ref<GenSchemaView[]>([])

const getSchemas = async (schemaIds: number[] = []) => {
	genSchemaLoading.add()
	schemas.value = await api.schemaService.list({dataSourceId: props.dataSource.id, schemaIds})
	genSchemaLoading.sub()
}

const showAllSchemas = ref(false)

const toggleShowAllSchemas = async () => {
	showAllSchemas.value = !showAllSchemas.value

	if (showAllSchemas.value) {
		await getPreviewSchemas()
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
	getPreviewSchemas()
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
	<Details v-loading="previewSchemaLoading.isLoading() || genSchemaLoading.isLoading()" open>
		<template #title>
			<div style="height: 2em; line-height: 2em;">
				<el-text class="hover-show">
					<DataSourceIcon :type="dataSource.type"></DataSourceIcon>

					{{ dataSource.name }}

					<slot :dataSource="dataSource"
						  :eventBus="eventBus"
						  :genSchemaLoading="genSchemaLoading" :previewSchemaLoading="previewSchemaLoading"
						  :previewSchemas="previewSchemas" :schemas="schemas"
						  name="previewSchemas">
						<el-popover :visible="showAllSchemas" placement="bottom-end" width="300px">
							<template #reference>
								<el-button @click="toggleShowAllSchemas()">
									schemas
								</el-button>
							</template>

							<div>
								<div v-for="schema in previewSchemas">
									<el-text>
										<el-button link @click="loadSchema(schema.name)">{{ schema.name }}</el-button>
									</el-text>
								</div>
							</div>
						</el-popover>
					</slot>

					<slot :dataSource="dataSource"
						  :eventBus="eventBus"
						  :genSchemaLoading="genSchemaLoading" :previewSchemaLoading="previewSchemaLoading"
						  :previewSchemas="previewSchemas" :schemas="schemas"
						  name="operations">
						<span class="hover-show-item" style="padding-left: 0.5em;">
							<el-button :icon="EditPen" link title="编辑" type="warning" @click="handleEdit"></el-button>
							<el-button :icon="Delete" link title="删除" type="danger" @click="handleDelete"></el-button>
						</span>
					</slot>
				</el-text>
			</div>
		</template>
		<slot :dataSource="dataSource"
			  :eventBus="eventBus"
			  :genSchemaLoading="genSchemaLoading" :previewSchemaLoading="previewSchemaLoading"
			  :previewSchemas="previewSchemas" :schemas="schemas"
			  name="schemas">
			<ul style="padding: 0 0 0.5em 0.5em;">
				<li v-for="schema in schemas">
					<slot :dataSource="dataSource"
						  :eventBus="eventBus"
						  :genSchemaLoading="genSchemaLoading" :previewSchemaLoading="previewSchemaLoading" :previewSchemas="previewSchemas"
						  :schema="schema" :schemas="schemas"
						  name="schema">
						<SchemaItem :event-bus="eventBus" :schema="schema"/>
					</slot>
				</li>
			</ul>
		</slot>
	</Details>
	<DataSourceDialog
		v-if="isEdit"
		:id="dataSource.id"
		:data-source="dataSource"
		:init-x="x" :init-y="y"
		@close="isEdit = false"
		@updated="handleEditFinish">
	</DataSourceDialog>
</template>