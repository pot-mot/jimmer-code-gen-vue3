<script lang="ts" setup>
import {ref, watch} from "vue";
import {GenSchemaView, GenTableCommonView} from "../../../api/__generated/model/static";
import {api} from "../../../api";
import Details from "../../common/Details.vue";
import {Delete, Search} from "@element-plus/icons-vue";
import TableItem from "./TableItem.vue";
import SchemaIcon from "../../icons/database/SchemaIcon.vue";
import {DataSourceMenuEventBusProps} from "./DataSourceMenuEventBus.ts";
import {deleteConfirm, sendMessage} from "../../../utils/message.ts";

interface SchemaItemProps {
	schema: GenSchemaView
}

const props = defineProps<SchemaItemProps & DataSourceMenuEventBusProps>()

const tables = ref<GenTableCommonView[]>([])

const getTables = (schemaId: number = props.schema.id) => {
	api.tableService.queryCommonView({query: {schemaIds: [schemaId]}}).then(res => {
		tables.value = res
	})
}

watch(() => props.schema, () => {
	getTables()
}, {immediate: true})

const handleDelete = () => {
	deleteConfirm(`架构【${props.schema.name}】`,
		() => {
			const id = props.schema.id
			api.schemaService.delete({ids: [id]}).then(res => {
				if (res > 0) {
					sendMessage(`删除 schema ${id} 成功`, "success")
					props.eventBus.emit('deleteSchema', {id})
				}
			})
		}
	)
}

const keywords = ref("")

const query = () => {
	api.tableService.queryCommonView({
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
				<el-text class="hover-show">
					<SchemaIcon></SchemaIcon>

					<el-button @click="eventBus.emit('clickSchema', {id: schema.id})" link>
						{{ schema.name }}
					</el-button>

					<el-button @click="handleDelete" title="删除" :icon="Delete"
							   type="danger" class="hover-show-item" link>
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
					<TableItem :table="table" :event-bus="eventBus"></TableItem>
				</li>
			</ul>
		</div>
	</Details>
</template>