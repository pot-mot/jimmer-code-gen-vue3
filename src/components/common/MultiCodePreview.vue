<script setup lang="ts">
import CodePreview from "./CodePreview.vue";

interface MultiCodePreviewProps {
	codesMap: { [key: string]: string }
}

defineProps<MultiCodePreviewProps>()
</script>

<template>
	<el-tabs type="border-card">
		<el-tab-pane v-for="name in Object.keys(codesMap)" :label="name">
			<CodePreview :language="name.split('.')[name.split.length - 1]"
						 :code="codesMap[name]"></CodePreview>
		</el-tab-pane>
	</el-tabs>
</template>