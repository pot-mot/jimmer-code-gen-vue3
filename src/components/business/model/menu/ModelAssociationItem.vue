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

const loading = useLoading()

const getData = async () => {
	loading.add()
	tables.value = await api.tableService.queryCommonView({
		body: {
			ids: [
				props.association.sourceTable.id,
				props.association.targetTable.id,
			]
		}
	})
	loading.sub()
}
</script>

<template>
	<Details v-loading="loading.isLoading()" @open="getData" :disabled="!showConfig.showAssociationTables">
		<template #title>
			<el-text>
				<AssociationIcon :association-type="association.associationType"
								 :fake="association.fake"></AssociationIcon>

				<el-button @click="eventBus.emit('clickAssociation', {id: association.id})" link>
					{{ association.name }}
				</el-button>
			</el-text>
		</template>

		<ul style="padding: 0 0 0.5em 0.5em;">
			<li v-for="table in tables">
				<TableItem :table="table" :event-bus="eventBus" :show-config="showConfig"></TableItem>
			</li>
		</ul>
	</Details>
</template>
