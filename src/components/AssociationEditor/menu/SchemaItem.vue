<script lang="ts" setup>
import {ref, watch} from "vue";
import {GenSchemaView, GenTableCommonView} from "../../../api/__generated/model/static";
import {api} from "../../../api";
import {useTableEditorGraphStore} from "../../../store/tableEditorGraph";
import Details from "../../common/Details.vue";

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
	<Details>
		<template #title>
			<div style="height: 2.5em; line-height: 2.5em;">
				<span
					@click.prevent.stop="store.importSchema([...tables.map(table => table.id)])">{{
						schema.name
					}}</span>
				<el-button @click.prevent.stop="deleteSchema">删除</el-button>
			</div>
		</template>
		<table style="padding-left: 1em;">
			<tr>
				<td colspan="2">
					<el-input v-model="keywords" @change="query">
						<template #append>
							<el-button @click="query">搜索</el-button>
						</template>
					</el-input>
				</td>
			</tr>
			<tr v-for="table in tables" :class="table.type"
				@click.prevent.stop="store.importTable(table.id)">
				<td>{{ table.name }}</td>
				<td>{{ table.comment }}</td>
			</tr>
		</table>
	</Details>
</template>