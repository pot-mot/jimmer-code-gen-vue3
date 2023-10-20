<script setup lang="ts">
import CodePreview from "../../common/CodePreview.vue";
import {ref, watch} from "vue";
import {previewEntities} from "../../AssociationEditor/node/TableNode.ts";

interface TableDialogProps {
	id: number
}

const props = defineProps<TableDialogProps>()

const previewCodesMap = ref<{ [key: string]: string }>({})

watch(() => props.id, async (id) => {
	previewCodesMap.value = await previewEntities([id])
}, {immediate: true})
</script>

<template>
	<el-tabs type="border-card">
		<el-tab-pane v-for="name in Object.keys(previewCodesMap)" :label="name">
			<CodePreview :code="previewCodesMap[name]"></CodePreview>
		</el-tab-pane>
	</el-tabs>
</template>