<script lang="ts" setup>
import { ref, watch } from "vue";
import { GenSchemaView, GenTableCommonView } from "../../../api/__generated/model/static";
import { api } from "../../../api";
import { useTableEditorGraphStore } from "../../../store/tableEditorGraph";

interface SchemaItemProps {
	schema: GenSchemaView
}

const props = defineProps<SchemaItemProps>()

interface SchemaItemEmits {
	(event: "delete", schemaId: number): void
}

const emits = defineEmits<SchemaItemEmits>()

const tables = ref<GenTableCommonView[]>([])

const getTables = (schemaId: number = props.schema.id) => {
	api.tableService.query({ query: { schemaIds: [schemaId] } }).then(res => {
		tables.value = res
	})
}

watch(() => props.schema, () => {
	getTables()
}, { immediate: true })

const deleteSchema = (schemaId: number = props.schema.id) => {
	api.schemaService.delete({ ids: [schemaId] }).then(res => {
		if (res >= 1) {
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
				<span @click.prevent="store.importSchema([...tables.map(table => table.id)])">{{ schema.name }}</span>
				<button @click.prevent="deleteSchema()">删除</button>
			</summary>
			<table style="padding-left: 2em;" class="tableList">
				<tr v-for="table in tables" :class="table.type" @click.prevent="store.importTable(table.id)">
					<td>{{ table.name }}</td>
					<td>{{ table.comment }}</td>
				</tr>
			</table>
		</details>
	</div>
</template>

<style scoped lang="scss">
.tableList {
	td {
		min-width: 3em;
		max-width: 10em;
		text-overflow: ellipsis;
		overflow: hidden;
	}
}
</style>