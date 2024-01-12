<script setup lang="ts">
import Details from "@/components/global/common/Details.vue";
import {ref} from "vue";
import {GenTableCommonView} from "@/api/__generated/model/static";
import {useLoading} from "@/utils/useLoading.ts";
import {api} from "@/api";
import {ModelItemProps} from "@/components/business/model/menu/ModelMenuProps.ts";
import TableItem from "@/components/business/model/menu/TableItem.vue";

const props = withDefaults(defineProps<ModelItemProps>(), {
	showConfig(props) {
		return {showModelTables: true, ...props.showConfig}
	},
})


const tables = ref<GenTableCommonView[]>()

const loading = useLoading()

const getData = async () => {
	if (!props.showConfig.showModelTables) return
	loading.add()
	tables.value = await api.tableService.queryCommonView({
		body: {
			modelIds: [props.model.id]
		}
	})
	loading.sub()
}
</script>

<template>
	<Details v-loading="loading.isLoading()" @open="getData" :disabled="!showConfig.showModelTables">
		<template #title>
			<div style="height: 2em; line-height: 2em;">
				<el-button @click="eventBus.emit('clickModel', {id: model.id})" size="default" link>
					{{ model.name }}
				</el-button>
			</div>
		</template>

		<ul style="padding: 0 0 0.5em 0.5em;">
			<li v-for="table in tables">
				<TableItem :table="table" :event-bus="eventBus" :show-config="showConfig"></TableItem>
			</li>
		</ul>
	</Details>
</template>
