<script lang="ts" setup>
import {ref, watch} from "vue";
import {GenSchemaView, GenTableCommonView} from "../../api/__generated/model/static";
import {api} from "../../api";
import {useTableEditorGraphStore} from "../../store/tableEditorGraph.ts";

interface SchemaItemProps {
	schema: GenSchemaView
}

const props = defineProps<SchemaItemProps>()

interface SchemaItemEmits {
	(event: "delete", schemaId: number): void
}

const emits = defineEmits<SchemaItemEmits>()

const tables = ref<readonly GenTableCommonView[]>([])

const getTables = (schemaId: number = props.schema.id) => {
	api.tableService.query({query: {schemaIds: [schemaId]}}).then(res => {
		tables.value = res
	})
}

watch(() => props.schema, () => {
	getTables()
}, {immediate: true})

const deleteSchema = (schemaId: number = props.schema.id) => {
	api.schemaService.delete({ids: [schemaId]}).then(res => {
		if (res == 1) {
			alert("删除成功")
			emits("delete", schemaId)
		}
	})
}

const store = useTableEditorGraphStore()
</script>

<template>
	<div style="padding-left: 2em;">
		<details>
			<summary>
				<span>{{ schema.name }}</span>
				<button @click="store.addTables([...tables.map(table => table.id)])">导入画布</button>
				<button @click="deleteSchema()">删除</button>
			</summary>
			<template v-for="table in tables">
				<div style="padding-left: 2em;">
					<span>
						{{ table.name }} {{ table.comment }} {{ table.type }}
					</span>
					<button @click="store.addTables([table.id])">导入画布</button>
				</div>
			</template>
		</details>
	</div>
</template>