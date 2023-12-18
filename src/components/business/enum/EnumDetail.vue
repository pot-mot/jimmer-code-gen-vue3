<script setup lang="ts">
import {ref} from "vue";
import {api} from "@/api";
import {GenEnumItemsView, GenEnumView} from "@/api/__generated/model/static";
import Details from "@/components/global/common/Details.vue";
import {sendMessage} from "@/utils/message.ts";
import Comment from "@/components/global/common/Comment.vue";
import {enumItemColumns} from "@/components/business/enum/enumItemColumns.ts";
import ViewList from "@/components/global/list/ViewList.vue";

const props = defineProps<{
	genEnum: GenEnumView
}>()

const genEnum = ref(
	<GenEnumItemsView>{
		...props.genEnum,
		items: []
	}
)

const handleGetItems = async () => {
	const tempEnum = await api.enumService.get({id: props.genEnum.id})
	if (tempEnum) {
		genEnum.value = tempEnum
	} else {
		sendMessage('该枚举可能已经被删除', 'error')
	}
}
</script>

<template>
	<Details @open="handleGetItems()">
		<template #title>
			<el-text>
				{{ genEnum.name }}
				<Comment :comment="genEnum.comment"></Comment>
			</el-text>
		</template>

		<ViewList :lines="genEnum.items" :columns="enumItemColumns"></ViewList>
	</Details>
</template>
