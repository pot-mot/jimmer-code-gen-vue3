<script setup lang="ts">
import Details from "@/components/global/common/Details.vue";
import {ref} from "vue";
import {GenTableCommonView} from "@/api/__generated/model/static";
import {useLoading} from "@/utils/useLoading.ts";
import {api} from "@/api";
import {AssociationItemProps} from "@/components/business/model/menu/ModelMenuProps.ts";
import TableItem from "@/components/business/model/menu/ModelTableItem.vue";
import AssociationIcon from "@/components/global/icons/database/AssociationIcon.vue";

const props = withDefaults(defineProps<AssociationItemProps>(), {
	showConfig(props) {
		return {
			showAssociationTables: true,
			...props.showConfig
		}
	},
})

const tables = ref<GenTableCommonView[]>()

const tablesLoading = useLoading('ModelAssociationItem.tablesLoading')

const getData = tablesLoading.withLoading('get', async () => {
		tables.value = await api.tableService.queryCommonView({
			body: {
				ids: [
					props.association.sourceTable.id,
					props.association.targetTable.id,
				]
			}
		})
	}
)
</script>

<template>
	<Details v-loading="tablesLoading.isLoading.value" @open="getData" :disabled="!showConfig.showAssociationTables">
		<template #title>
			<el-button @click="eventBus.emit('clickAssociation', {id: association.id})" link>
				<AssociationIcon
					:type="association.type"
					:fake="association.fake"
				/>
				{{ association.name }}
			</el-button>
		</template>

		<ul style="padding: 0 0 0.5em 0.5em;">
			<li v-for="table in tables" :key="table.id">
				<TableItem :table="table" :event-bus="eventBus" :show-config="showConfig"/>
			</li>
		</ul>
	</Details>
</template>
