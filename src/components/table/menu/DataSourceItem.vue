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

const viewSchemas = (dataSourceId: number) => {
	api.dataSourceService.viewSchemas({ dataSourceId }).then(res => {
		allSchemas.value = res
	})
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
		schemas.value = [
			...schemas.value,
			...res.map(it => <GenSchemaView>it),
		]
	})
}

const isEdit = ref(false)

const handleEdit = () => {
	isEdit.value = true
}

const handleEditFinish = () => {
	isEdit.value = false
	emits("change", props.dataSource.id)
}

const handleSchemaDelete = (id: number) => {
	alert(`删除 schema ${id} 成功`)
	console.log("change");
	
	getSchemas()
}
</script>

<template>
	<DataSourceDialog v-if="isEdit" :data-source="dataSource" :id="dataSource.id" @edit="handleEditFinish"
		@close="isEdit = false"></DataSourceDialog>
	<details open>
		<summary>
			<span>{{ dataSource.name }}</span>
			<button @click="viewSchemas(dataSource.id)">查看全部</button>
			<button @click="handleEdit">编辑</button>
			<button @click="deleteDataSource()">删除</button>
		</summary>
		<div v-if="allSchemas.length > 0" style="padding-left: 3em">
			<details open>
				<div v-for="schema in allSchemas">
					<span>{{ schema.name }}</span>
					<button @click="importSchema(schema.name)">导入</button>
				</div>
			</details>
		</div>
		<template v-for="schema in schemas">
			<SchemaItem :schema="schema" @delete="handleSchemaDelete" />
		</template>
	</details>
</template>

<style scoped></style>