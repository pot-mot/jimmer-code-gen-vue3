<script setup lang="ts">
import Details from "@/components/global/common/Details.vue";
import {ref} from "vue";
import {GenTableCommonView} from "@/api/__generated/model/static";
import {useLoading} from "@/hooks/useLoading.ts";
import {api} from "@/api";
import {AssociationItemProps} from "@/components/business/model/menu/ModelMenuProps.ts";
import TableItem from "@/components/business/model/menu/TableItem.vue";
import AssociationIcon from "@/components/global/icons/database/AssociationIcon.vue";

const props = defineProps<AssociationItemProps>()

const tables = ref<GenTableCommonView[]>()

const loading = useLoading()

const getData = async () => {
	loading.add()
	tables.value = await api.tableService.queryCommonView(
		{
			query: {
				ids: [
					props.association.sourceTable.id,
					props.association.targetTable.id,
				]
			}
		}
	)
	loading.sub()
}
</script>

<template>
	<Details v-loading="loading.isLoading()" @open="getData">
		<template #title>
			<el-text>
				<span><AssociationIcon :association-type="association.associationType" :fake="association.fake"></AssociationIcon></span>
				{{ association.name }}
			</el-text>
		</template>

		<ul v-for="table in tables">
			<TableItem :table="table"></TableItem>
		</ul>
	</Details>
</template>
