<script lang="ts" setup>
import {ref} from "vue";
import {GenTableCommonView} from "@/api/__generated/model/static";
import {api} from "@/api";
import Details from "../../../global/common/Details.vue";
import {Delete} from "@element-plus/icons-vue";
import TableItem from "./TableItem.vue";
import SchemaIcon from "../../../global/icons/database/SchemaIcon.vue";
import {deleteConfirm, sendMessage} from "@/utils/message.ts";
import {SchemaItemSlots} from "@/components/business/dataSource/menu/DataSourceMenuSlotProps.ts";
import Searcher from "@/components/global/common/Searcher.vue";
import {matchByKeywords} from "@/components/global/graphEditor/common/search.ts";
import {useLoading} from "@/utils/useLoading.ts";
import {SchemaItemProps} from "@/components/business/dataSource/menu/DataSourceMenuProps.ts";

const props = defineProps<SchemaItemProps>()

const container = ref<HTMLElement>()

const tables = ref<GenTableCommonView[]>([])

const tablesLoading = useLoading('SchemaItem:tablesLoading')

const getTables = async (schemaId: number = props.schema.id) => {
	const flag = tablesLoading.add('get')

	tables.value = await api.tableService.queryCommonView({
		body: {
			schemaIds: [schemaId]
		}
	})

	tablesLoading.sub(flag)
}

const handleDelete = () => {
	deleteConfirm(`架构【${props.schema.name}】`,
		async () => {
			const id = props.schema.id
			const count = await api.schemaService.delete({ids: [id]})

			if (count > 0) {
				sendMessage(`删除 schema ${id} 成功`, "success")
				props.eventBus.emit('deleteSchema', {id})
			} else {
				sendMessage('删除 schema 失败', 'error', props.schema)
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
	<div ref="container" style="position: relative;" v-loading="tablesLoading.isLoading.value">
		<Details @open="getTables()">
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

			<template v-if="tablesContainer && container">
				<Searcher :target="tablesContainer"
						  :search="handleQueryTables"
						  :init-w="300">
					<template #buttonContent="{item}">
						<slot :eventBus="eventBus" :schema="schema" :table="item" :tables="tables" name="table">
							<TableItem :event-bus="eventBus" :table="item"></TableItem>
						</slot>
					</template>
				</Searcher>
			</template>
		</Details>
	</div>
</template>
