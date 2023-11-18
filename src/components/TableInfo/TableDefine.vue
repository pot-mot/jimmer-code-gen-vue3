<script setup lang="ts">
import CodePreview from "../common/CodePreview/CodePreview.vue";
import {ref, watch} from "vue";
import {api} from "../../api";

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
			<CodePreview language="sql" :code="tableDefineMap[name]"></CodePreview>
		</el-tab-pane>
	</el-tabs>
</template>