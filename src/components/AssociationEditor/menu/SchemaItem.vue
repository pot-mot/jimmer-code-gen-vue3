<script lang="ts" setup>
import {ref, watch} from "vue";
import {GenSchemaView, GenTableCommonView} from "../../../api/__generated/model/static";
import {api} from "../../../api";
import {useTableEditorGraphStore} from "../../../store/tableEditorGraph";

const store = useTableEditorGraphStore()

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
	api.tableService.query({query: {schemaIds: [schemaId]}}).then(res => {
		tables.value = res
	})
}

watch(() => props.schema, () => {
	getTables()
}, {immediate: true})

const deleteSchema = () => {
	api.schemaService.delete({ids: [props.schema.id]}).then(res => {
		if (res > 0) {
			emits("delete", props.schema.id)
		}
	})
}

const keywords = ref("")

const query = () => {
	api.tableService.query({
		query: {
			keywords: keywords.value.split(" "),
			schemaIds: [props.schema.id]
		}
	}).then(res => {
		tables.value = res
	})
}

</script>

<template>
	<div>
		<span class="hover-item"
			  @click.prevent="store.importSchema([...tables.map(table => table.id)])">{{ schema.name }}</span>
		<button @click.prevent="deleteSchema">删除</button>
	</div>
	<details style="padding-left: 1em;">
		<summary>
			TABLE
		</summary>
		<table style="padding-left: 1em;">
			<tr>
				<td colspan="2">
					<input v-model="keywords" @change="query">
					<button @click="query">搜索</button>
				</td>
			</tr>
			<tr v-for="table in tables" :class="table.type" class="hover-item"
				@click.prevent="store.importTable(table.id)">
				<td>{{ table.name }}</td>
				<td>{{ table.comment }}</td>
			</tr>
		</table>
	</details>
</template>