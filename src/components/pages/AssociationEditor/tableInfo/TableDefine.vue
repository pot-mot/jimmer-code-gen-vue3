<script lang="ts" setup>
import CodePreview from "@/components/global/code/CodePreview.vue";
import {ref, watch} from "vue";
import {api} from "@/api";

interface TableEntityDialogProps {
	id: number
}

const props = defineProps<TableEntityDialogProps>()

const tableDefineMap = ref<{ [key: string]: string }>({})

watch(() => props.id, async (id) => {
	tableDefineMap.value = await api.tableService.getTableDefine({id})
}, {immediate: true})
</script>

<template>
	<el-tabs type="border-card">
		<el-tab-pane v-for="name in Object.keys(tableDefineMap)" :label="name">
			<CodePreview :code="tableDefineMap[name]" language="sql"></CodePreview>
		</el-tab-pane>
	</el-tabs>
</template>