<script lang="ts" setup>
import {ref, watch} from "vue";
import {GenDataSourceView, GenSchemaView} from "../../api/__generated/model/static";

import SchemaItem from "./SchemaItem.vue";
import {api} from "../../api";
import {GenSchemaDto} from "../../api/__generated/model/dto";

interface DataSourceItemProps {
	dataSource: GenDataSourceView
}

const props = defineProps<DataSourceItemProps>()

interface SchemaItemEmits {
	(event: "delete", dataSourceId: number): void
}

const emits = defineEmits<SchemaItemEmits>()

const allSchemas = ref<ReadonlyArray<GenSchemaDto['DEFAULT']>>([])

const viewSchemas = (dataSourceId: number) => {
	api.dataSourceService.viewSchemas({dataSourceId}).then(res => {
		allSchemas.value = res
	})
}

const schemas = ref<readonly GenSchemaView[]>([])

const getSchemas = (dataSourceId: number = props.dataSource.id) => {
	api.schemaService.list({dataSourceId}).then(res => {
		schemas.value = res
	})
}

watch(() => props.dataSource, () => {
	getSchemas()
}, {immediate: true})

const deleteDataSource = (dataSourceId: number = props.dataSource.id) => {
	api.dataSourceService.delete({ids: [dataSourceId]}).then(res => {
		if (res == 1) {
			alert("删除成功")
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
</script>

<template>
	<div>
		<details open>
			<summary>
				<span>{{ dataSource.name }}</span>
				<button @click="viewSchemas(dataSource.id)">查看全部</button>
				<button>编辑</button>
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
				<SchemaItem :schema="schema" @delete="getSchemas"/>
			</template>
		</details>
	</div>
</template>

<style scoped>

</style>