<script setup lang="ts">
import Details from "@/components/global/common/Details.vue";
import EditList from "@/components/global/list/EditList.vue";
import {GenEnumItemsView, GenEnumView} from "@/api/__generated/model/static";
import {ref} from "vue";
import {api} from "@/api";
import {PropListColumn} from "@/components/global/list/ListProps.ts";
import {GenEnumItemsView_TargetOf_items} from "@/api/__generated/model/static/GenEnumItemsView.ts";

const props = defineProps<{
	id: number
}>()

const data = ref<GenEnumItemsView>()

const getData = async () => {
	data.value = await api.enumService.get({id: props.id})
}

const handleOpen = () => {
	getData()
}

const columns = <PropListColumn<GenEnumItemsView_TargetOf_items>[]>[
	{
		prop: "name",
		label: "枚举项"
	},
	{
		prop: "value",
		label: "值"
	},
	{
		prop: "comment",
		label: "注释"
	}
]

const defaultItem = {
	name: "",
	value: "",
	comment: ""
}
</script>

<template>
	<Details @open="handleOpen">
		<template #title>
			<el-text v-if="data">{{ data.name }}</el-text>
		</template>

		<EditList
			v-if="data"
			v-model:lines="data.items"
			:columns="columns"
			:default-line="defaultItem">
		</EditList>
	</Details>
</template>