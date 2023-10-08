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
import {unionWith} from "lodash";

const {loading, startLoading, endLoading} = useLoading()

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

const showAllSchemas = ref(false)

const toggleShowAllSchemas = async (dataSourceId: number) => {
	showAllSchemas.value = !showAllSchemas.value

	if (showAllSchemas.value) {
		allSchemas.value = await api.schemaService.preview({dataSourceId})
	} else {
		allSchemas.value = []
	}
}

const closeAllSchemas = () => {
	showAllSchemas.value = false
	allSchemas.value = []
}

const schemas = ref<GenSchemaView[]>([])

const getSchemas = async (schemaIds: number[] = []) => {
	startLoading()
	const res = await api.schemaService.list({dataSourceId: props.dataSource.id, schemaIds})
	schemas.value = unionWith(schemas.value, res, (a, b) => {return a.id == b.id})
	endLoading()
}

watch(() => props.dataSource, () => {
	getSchemas()
}, {immediate: true})

const deleteDataSource = (dataSourceId: number = props.dataSource.id) => {
	api.dataSourceService.delete({ids: [dataSourceId]}).then(res => {
		if (res > 0) {
			emits("delete", dataSourceId)
		}
	})
}

const importSchema = async (name: string, dataSourceId: number = props.dataSource.id) => {
	const importIds = await api.schemaService.import({
		dataSourceId,
		name
	})

	if (importIds.length > 0) {
		await getSchemas(importIds)
		closeAllSchemas()
	}
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

const handleSchemaDelete = (id: number) => {
	sendMessage(`删除 schema ${id} 成功`, "Success")
	getSchemas()
}
</script>

<template>
	<Details :open="true">
		<template #title>
			<div style="height: 3em; line-height: 3em;">
				<span>{{ dataSource.name }}</span>
				<el-button @click.prevent.stop="handleEdit">编辑</el-button>
				<el-button @click.prevent.stop="deleteDataSource()">删除</el-button>

				<el-popover :visible="showAllSchemas">
					<template #reference>
						<el-button @click.prevent.stop="toggleShowAllSchemas(dataSource.id)">schemas</el-button>
					</template>
					<div v-for="schema in allSchemas" @click.prevent.stop="importSchema(schema.name)">{{ schema.name }}</div>
				</el-popover>
			</div>
		</template>
		<div v-loading="loading" style="padding-left: 1em;">
			<SchemaItem v-for="schema in schemas" :schema="schema" @delete="handleSchemaDelete"/>
		</div>
	</Details>
	<DataSourceDialog
		v-if="isEdit"
		:id="dataSource.id"
		:data-source="dataSource"
		:x="x" :y="y"
		@close="isEdit = false"
		@edit="handleEditFinish">
	</DataSourceDialog>
</template>