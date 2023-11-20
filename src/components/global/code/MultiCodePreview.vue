<script lang="ts" setup>
import CodePreview from "./CodePreview.vue";

interface MultiCodePreviewProps {
	codesMap: { [key: string]: string },
	width?: string
	height?: string
}

withDefaults(defineProps<MultiCodePreviewProps>(), {
	width: "100%",
	height: "100%"
})
</script>

<template>
	<el-tabs type="border-card">
		<el-tab-pane v-for="name in Object.keys(codesMap)" :label="name">
			<div :style="`width: ${width}; height: ${height}; overflow: auto;`">
				<CodePreview :code="codesMap[name]"
							 :language="name.split('.')[name.split.length - 1]"></CodePreview>
			</div>
		</el-tab-pane>
	</el-tabs>
</template>