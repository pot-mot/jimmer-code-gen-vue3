<script lang="ts" setup>
import {ref, watch} from "vue";
import {GenSchemaView, GenTableCommonView} from "../../../api/__generated/model/static";
import {api} from "../../../api";
import Details from "../../common/Details.vue";
import {Delete, Search} from "@element-plus/icons-vue";
import {ElMessageBox} from 'element-plus'
import TableItem from "./TableItem.vue";
import SchemaIcon from "../../icons/database/SchemaIcon.vue";
import {useAssociationEditorGraphStore} from "../../../store/AssociationEditorGraphStore.ts";
import {AssociationEditorMenuEventBus} from "../../../eventBus/AssociationEditorMenuEventBus.ts";
import {sendMessage} from "../../../utils/message.ts";
import {tableIdToNodeId} from "../node/TableNode.ts";

const store = useAssociationEditorGraphStore()

interface SchemaItemProps {
	schema: GenSchemaView
}

const props = defineProps<SchemaItemProps>()

const tables = ref<GenTableCommonView[]>([])

const getTables = (schemaId: number = props.schema.id) => {
	api.tableService.query({query: {schemaIds: [schemaId]}}).then(res => {
		tables.value = res
	})
}

watch(() => props.schema, () => {
	getTables()
}, {immediate: true})

const handleLoadOrSelect = () => {
	const tables = store.tables().filter(table => table.schema.id == props.schema.id)

	const graph = store._graph()

	if (tables.length > 0) {
		graph.unselect(graph.getCells())
		graph.select(tables.map(table => tableIdToNodeId(table.id)))
	} else {
		graph.unselect(graph.getCells())
		store.loadSchema(props.schema.id, true)
	}
}

const handleDelete = () => {
	ElMessageBox.confirm(
		`确定要删除 ${props.schema.name} 吗？`,
		{
			confirmButtonText: 'Yes',
			cancelButtonText: 'No',
			icon: Delete,
			type: "error"
		}
	).then(() => {
		const id = props.schema.id
		api.schemaService.delete({ids: [id]}).then(res => {
			if (res > 0) {
				sendMessage(`删除 schema ${id} 成功`, "success")
				AssociationEditorMenuEventBus.emit('deleteSchema', {id})
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

					<el-button @click="handleLoadOrSelect" link>
						{{ schema.name }}
					</el-button>

					<el-button @click="handleDelete" title="删除" :icon="Delete"
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