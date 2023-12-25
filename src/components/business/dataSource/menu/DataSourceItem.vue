<script lang="ts" setup>
import {nextTick, ref, watch} from "vue";
import {GenSchemaView} from "@/api/__generated/model/static";
import SchemaItem from "./SchemaItem.vue";
import {api} from "@/api";
import {GenSchemaDto} from "@/api/__generated/model/dto";
import DataSourceDialog from "../dialog/DataSourceDialog.vue";
import Details from "../../../global/common/Details.vue";
import {useLoading} from "@/hooks/useLoading.ts";
import {Delete, EditPen} from "@element-plus/icons-vue";
import DataSourceIcon from "../../../global/icons/database/DataSourceIcon.vue";
import {deleteConfirm, sendMessage} from "@/utils/message.ts";
import {DataSourceItemSlots} from "@/components/business/dataSource/menu/DataSourceMenuSlotProps.ts";
import {DataSourceItemProps} from "@/components/business/dataSource/menu/DataSourceMenuProps.ts";
import {useGlobalLoadingStore} from "@/components/global/loading/GlobalLoadingStore.ts";

const loadingStore = useGlobalLoadingStore()

const loadedSchemaLoading = useLoading()

const previewSchemaLoading = useLoading()

const props = defineProps<DataSourceItemProps>()

const previewSchemas = ref<GenSchemaDto['DEFAULT'][]>([])

const getPreviewSchemas = async () => {
	previewSchemaLoading.start()
	await nextTick()

	previewSchemas.value = await api.schemaService.preview({dataSourceId: props.dataSource.id})

	await nextTick()
	previewSchemaLoading.end()
}

const previewSchemaTooltipOpenState = ref(false)

watch(() => previewSchemaTooltipOpenState.value, (value) => {
	if (value) {
		getPreviewSchemas()
	} else {
		previewSchemas.value = []
	}
}, {immediate: true})

const loadedSchemas = ref<GenSchemaView[]>([])

const getSchemas = async (schemaIds: number[] = []) => {
	loadedSchemaLoading.add()
	loadedSchemas.value = await api.schemaService.list({dataSourceId: props.dataSource.id, schemaIds})
	loadedSchemaLoading.sub()
}

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
	loadingStore.add()

	const loadIds = await api.schemaService.load({
		dataSourceId,
		name
	})

	if (loadIds.length > 0) {
		const newSchemas = await api.schemaService.list({schemaIds: loadIds, dataSourceId: dataSourceId})

		newSchemas.forEach(newSchema => {
			const index = loadedSchemas.value.findIndex(schema => schema.id == newSchema.id)

			if (index == -1) {
				loadedSchemas.value.push(newSchema)
			} else {
				loadedSchemas.value[index] = newSchema
			}
		})
	}

	loadingStore.sub()
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
	if (loadedSchemas.value.map(schema => schema.id).includes(id)) {
		loadedSchemas.value = loadedSchemas.value.filter(schema => schema.id != id)
	}
})

defineSlots<DataSourceItemSlots>()
</script>

<template>
	<Details v-loading="previewSchemaLoading.isLoading() || loadedSchemaLoading.isLoading()" open @open="getSchemas()">
		<template #title>
			<div style="height: 2em; line-height: 2em;">
				<el-text class="hover-show">
					<DataSourceIcon :type="dataSource.type"></DataSourceIcon>

					<slot
						:dataSource="dataSource" :eventBus="eventBus"
						:loadedSchemaLoading="loadedSchemaLoading.isLoading()"
						:schemas="loadedSchemas"
						:previewSchemaLoading="previewSchemaLoading.isLoading()"
						:previewSchemas="previewSchemas">
						{{ dataSource.name }}
					</slot>

					<el-tooltip v-model:visible="previewSchemaTooltipOpenState" trigger="click" placement="bottom-start" width="300px" effect="light">
						<el-button style="margin-left: 0.3em;">schemas</el-button>

						<template #content>
							<div v-for="schema in previewSchemas">
								<slot
									name="previewSchema"
									:dataSource="dataSource" :eventBus="eventBus"
									:loadedSchemaLoading="loadedSchemaLoading.isLoading()"
									:schemas="loadedSchemas"
									:previewSchemaLoading="previewSchemaLoading.isLoading()"
									:previewSchemas="previewSchemas" :previewSchema="schema">
									<el-button link @click="loadSchema(schema.name)">{{ schema.name }}</el-button>
								</slot>
							</div>
						</template>

					</el-tooltip>

					<slot
						name="operations"
						:dataSource="dataSource" :eventBus="eventBus"
						:loadedSchemaLoading="loadedSchemaLoading.isLoading()"
						:schemas="loadedSchemas"
						:previewSchemaLoading="previewSchemaLoading.isLoading()"
						:previewSchemas="previewSchemas">
						<span class="hover-show-item" style="padding-left: 0.5em;">
							<el-button :icon="EditPen" link title="编辑" type="warning" @click="handleEdit"></el-button>
							<el-button :icon="Delete" link title="删除" type="danger" @click="handleDelete"></el-button>
						</span>
					</slot>
				</el-text>
			</div>
		</template>

		<ul style="padding: 0 0 0.5em 0.5em;">
			<li v-for="schema in loadedSchemas">
				<slot
					name="loadedSchema"
					:dataSource="dataSource" :eventBus="eventBus"
					:loadedSchemaLoading="loadedSchemaLoading.isLoading()"
					:schemas="loadedSchemas" :schema="schema"
					:previewSchemaLoading="previewSchemaLoading.isLoading()"
					:previewSchemas="previewSchemas">
					<SchemaItem :event-bus="eventBus" :schema="schema"/>
				</slot>
			</li>
		</ul>
	</Details>

	<DataSourceDialog
		v-model="isEdit"
		:id="dataSource.id"
		:data-source="dataSource"
		:init-x="x" :init-y="y"
		@updated="handleEditFinish">
	</DataSourceDialog>
</template>
