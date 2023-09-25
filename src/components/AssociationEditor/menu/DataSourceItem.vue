<script lang="ts" setup>
import { ref, watch } from "vue";
import { GenDataSourceView, GenSchemaView } from "../../../api/__generated/model/static";

import SchemaItem from "./SchemaItem.vue";
import { api } from "../../../api";
import { GenSchemaDto } from "../../../api/__generated/model/dto";
import DataSourceDialog from "./DataSourceDialog.vue";

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

const viewSchemas = (dataSourceId: number) => {
	if (!showAllSchemas.value) {
		api.dataSourceService.viewSchemas({ dataSourceId }).then(res => {
			allSchemas.value = res
		})
	} else {
		allSchemas.value = []
	}
	showAllSchemas.value = !showAllSchemas.value
}

const schemas = ref<GenSchemaView[]>([])

const getSchemas = (dataSourceId: number = props.dataSource.id) => {
	api.schemaService.list({ dataSourceId }).then(res => {
		schemas.value = res
	})
}

watch(() => props.dataSource, () => {
	getSchemas()
}, { immediate: true })

const deleteDataSource = (dataSourceId: number = props.dataSource.id) => {
	api.dataSourceService.delete({ ids: [dataSourceId] }).then(res => {
		if (res == 1) {
			emits("delete", dataSourceId)
		}
	})
}

const importSchema = (name: string, dataSourceId: number = props.dataSource.id) => {
	api.dataSourceService.importSchema({
		dataSourceId,
		name
	}).then(res => {
		if (res > 0) {
			getSchemas()
		}
	})
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
	alert(`删除 schema ${id} 成功`)
	getSchemas()
}
</script>

<template>
	<details open>
		<summary>
			<span>{{ dataSource.name }}</span>
			<button @click="viewSchemas(dataSource.id)">全部 schema</button>
			<button @click="handleEdit">编辑</button>
			<button @click="deleteDataSource()">删除</button>
		</summary>
		<div v-show="showAllSchemas" style="padding-left: 3em">
			<div v-for="schema in allSchemas">
				<span class="hover-item" @click="importSchema(schema.name)">{{ schema.name }}</span>
			</div>
		</div>
		<template v-for="schema in schemas">
			<SchemaItem :schema="schema" @delete="handleSchemaDelete" />
		</template>
	</details>
	<DataSourceDialog v-if="isEdit" :data-source="dataSource" :id="dataSource.id" @edit="handleEditFinish" :x="x" :y="y"
		@close="isEdit = false"></DataSourceDialog>
</template>