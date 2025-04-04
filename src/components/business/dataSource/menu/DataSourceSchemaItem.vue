<script lang="ts" setup>
import {ref} from "vue";
import {GenTableCommonView} from "@/api/__generated/model/static";
import {api} from "@/api";
import Details from "../../../global/common/Details.vue";
import {Delete} from "@element-plus/icons-vue";
import DataSourceTableItem from "./DataSourceTableItem.vue";
import SchemaIcon from "../../../global/icons/database/SchemaIcon.vue";
import {sendMessage} from "@/message/message.ts";
import {SchemaItemSlots} from "@/components/business/dataSource/menu/DataSourceMenuSlotProps.ts";
import Searcher from "@/components/global/search/Searcher.vue";
import {useLoading} from "@/utils/useLoading.ts";
import {SchemaItemProps} from "@/components/business/dataSource/menu/DataSourceMenuProps.ts";
import {deleteConfirm} from "@/message/confirm.ts";
import {matchByKeywords} from "@/components/global/match/matchByKeywords.ts";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";

const i18nStore = useI18nStore()

const props = defineProps<SchemaItemProps>()

const container = ref<HTMLElement>()

const tables = ref<GenTableCommonView[]>([])

const tablesLoading = useLoading('SchemaItem.tablesLoading')

const getTables = tablesLoading.withLoading('get',
	async (schemaId: number = props.schema.id) => {
		tables.value = await api.tableService.queryCommonView({
			body: {
				schemaIds: [schemaId]
			}
		})
	}
)

const handleDelete = () => {
	deleteConfirm(`${i18nStore.translate('LABEL_DeleteTarget_Schema')}【${props.schema.name}】`,
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
				<div class="menu-item hover-show">
					<slot :eventBus="eventBus" :schema="schema" :tables="tables">
						<el-text @click="eventBus.emit('clickSchema', {id: schema.id})">
							<SchemaIcon/>
							{{ schema.name }}
						</el-text>
					</slot>

					<slot :eventBus="eventBus" :schema="schema" :tables="tables" name="operations">
						<span class="hover-show-item" style="padding-left: 0.5em;">
							<el-button :icon="Delete" link type="danger" @click="handleDelete"/>
						</span>
					</slot>
				</div>
			</template>

			<div style="padding-left: 0.5em;" ref="tablesContainer">
				<slot :eventBus="eventBus" :schema="schema" :tables="tables" name="tables">
					<ul style="padding: 0 0 0.5em 0.5em;">
						<li v-for="table in tables" :key="table.id">
							<slot :eventBus="eventBus" :schema="schema" :table="table" :tables="tables" name="table">
								<DataSourceTableItem :event-bus="eventBus" :table="table"/>
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
							<DataSourceTableItem :event-bus="eventBus" :table="item"/>
						</slot>
					</template>
				</Searcher>
			</template>
		</Details>
	</div>
</template>
