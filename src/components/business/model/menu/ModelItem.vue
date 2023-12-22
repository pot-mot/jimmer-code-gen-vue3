<script setup lang="ts">
import Details from "@/components/global/common/Details.vue";
import {ref} from "vue";
import {GenTableCommonView} from "@/api/__generated/model/static";
import {useLoading} from "@/hooks/useLoading.ts";
import {api} from "@/api";
import {ModelItemProps} from "@/components/business/model/menu/ModelMenuProps.ts";
import TableItem from "@/components/business/model/menu/TableItem.vue";

const props = defineProps<ModelItemProps>()

const tables = ref<GenTableCommonView[]>()

const loading = useLoading()

const getData = async () => {
	loading.add()
	tables.value = await api.tableService.queryCommonView({query: {modelIds: [props.model.id]}})
	loading.sub()
}
</script>

<template>
	<Details v-loading="loading.isLoading()" @open="getData">
		<template #title>
			<el-text>{{ model.name }}</el-text>
		</template>

		<ul v-for="table in tables">
			<TableItem :table="table"></TableItem>
		</ul>
	</Details>
</template>
