<script lang="ts" setup>
import {ref, watch} from "vue";
import {GenSchemaView, GenTableCommonView} from "../../api/__generated/model/static";
import {api} from "../../api";
import {useTableEditorStore} from "../../store/tableEditor.ts";

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

const editorStore = useTableEditorStore()
</script>

<template>
	<div style="padding-left: 2em;">
		<details>
			<summary>
				<span>{{ schema.name }}</span>
				<button @click="deleteSchema()">删除</button>
			</summary>
			<template v-for="table in tables">
				<div style="padding-left: 2em;" @click="editorStore.addTables([table.id])">
					{{ table.name }} {{ table.comment }} {{ table.type }}
				</div>
			</template>
		</details>
	</div>
</template>