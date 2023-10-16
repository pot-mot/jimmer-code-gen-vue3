<script lang="ts" setup>
import {ref, watch} from "vue";
import {GenSchemaView, GenTableCommonView} from "../../../api/__generated/model/static";
import {api} from "../../../api";
import {useAssociationEditorGraphStore} from "../../../store/AssociationEditorGraphStore.ts";
import Details from "../../common/Details.vue";
import {Delete, Search} from "@element-plus/icons-vue";
import {ElMessageBox} from 'element-plus'
import TableItem from "./TableItem.vue";
import SchemaIcon from "../../icons/database/SchemaIcon.vue";

const store = useAssociationEditorGraphStore()

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
	ElMessageBox.confirm(
		`确定要删除 ${props.schema.name} 吗？`,
		{
			confirmButtonText: 'Yes',
			cancelButtonText: 'No',
			icon: Delete,
			type: "error"
		}
	).then(() => {
		api.schemaService.delete({ids: [props.schema.id]}).then(res => {
			if (res > 0) {
				emits("delete", props.schema.id)
			}
		})
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
			<div style="height: 1.8em; line-height: 1.8em;">
				<el-text>
					<SchemaIcon></SchemaIcon>

					<el-button @click="store.loadSchema([...tables.map(table => table.id)])" link>
						{{ schema.name }}
					</el-button>

					<el-button @click="deleteSchema" title="删除" :icon="Delete"
							   type="danger" link>
					</el-button>
				</el-text>
			</div>
		</template>

		<div style="padding-left: 0.5em;">
			<el-input v-model="keywords" @change="query" clearable>
				<template #append>
					<el-button @click="query" title="搜索" :icon="Search"></el-button>
				</template>
			</el-input>
			<ul style="padding: 0 0 0.5em 0.5em;">
				<li v-for="table in tables">
					<TableItem :table="table"></TableItem>
				</li>
			</ul>
		</div>
	</Details>
</template>