<script lang="ts" setup>
import {ref, watch} from "vue";
import {GenSchemaView, GenTableCommonView} from "@/api/__generated/model/static";
import {api} from "@/api";
import Details from "../../../global/common/Details.vue";
import {Delete} from "@element-plus/icons-vue";
import TableItem from "./TableItem.vue";
import SchemaIcon from "../../../global/icons/database/SchemaIcon.vue";
import {DataSourceMenuEventsProps} from "./DataSourceMenuEvents.ts";
import {deleteConfirm, sendMessage} from "@/utils/message.ts";
import {SchemaItemSlots} from "@/components/business/dataSource/menu/DataSourceMenuSlots.ts";
import Searcher from "@/components/global/common/Searcher.vue";
import {matchByKeywords} from "@/components/business/graphEditor/common/search.ts";

interface SchemaItemProps {
	schema: GenSchemaView
}

const props = defineProps<SchemaItemProps & DataSourceMenuEventsProps>()

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
		async () => {
			const id = props.schema.id
			const count = await api.schemaService.delete({ids: [id]})

			if (count > 0) {
				sendMessage(`删除 schema ${id} 成功`, "success")
				props.eventBus.emit('deleteSchema', {id})
			} else {
				sendMessage('删除 schema 失败', 'error')
			}
		}
	)
}

const tablesContainer = ref()

const handleQueryTables = (keyword: String) => {
	return tables.value.filter(table => matchByKeywords(table, keyword.split(/\s+/)))
}

defineSlots<SchemaItemSlots>()
</script>

<template>
	<Details>
		<template #title>
			<div style="height: 1.8em; line-height: 1.8em;">
				<el-text class="hover-show">
					<SchemaIcon></SchemaIcon>

					<slot :eventBus="eventBus" :schema="schema" :tables="tables">
						<el-button link @click="eventBus.emit('clickSchema', {id: schema.id})">
							{{ schema.name }}
						</el-button>
					</slot>

					<slot :eventBus="eventBus" :schema="schema" :tables="tables" name="operations">
						<el-button :icon="Delete" class="hover-show-item" link
								   title="删除" type="danger" @click="handleDelete">
						</el-button>
					</slot>
				</el-text>
			</div>
		</template>

		<Searcher v-if="tablesContainer"
				  :init-x="tablesContainer.offsetX"
				  :init-y="tablesContainer.offsetY"
				  :init-w="300"
				  :target="tablesContainer"
				  :search="handleQueryTables">
			<template #buttonContent="{item}">
				<slot :eventBus="eventBus" :schema="schema" :table="item" :tables="tables" name="table">
					<TableItem :event-bus="eventBus" :table="item"></TableItem>
				</slot>
			</template>
		</Searcher>

		<div style="padding-left: 0.5em;" ref="tablesContainer">
			<slot :eventBus="eventBus" :schema="schema" :tables="tables" name="tables">
				<ul style="padding: 0 0 0.5em 0.5em;">
					<li v-for="table in tables">
						<slot :eventBus="eventBus" :schema="schema" :table="table" :tables="tables" name="table">
							<TableItem :event-bus="eventBus" :table="table"></TableItem>
						</slot>
					</li>
				</ul>
			</slot>
		</div>
	</Details>
</template>