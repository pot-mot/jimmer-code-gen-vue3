<script lang="ts" setup>
import CodePreview from "./CodePreview.vue";
import {Pair} from "@/api/__generated/model/static";

interface MultiCodePreviewProps {
	codeFiles: Array<Pair<string, string>> | undefined,
	width?: string
	height?: string
	showLineCounts?: boolean
}

withDefaults(defineProps<MultiCodePreviewProps>(), {
	width: "100%",
	height: "100%",
	showLineCounts: true
})
</script>

<template>
	<el-tabs type="border-card">
		<el-tab-pane v-for="codeFile in codeFiles" :label="codeFile.first">
			<div :style="`width: ${width}; height: ${height}; overflow: auto;`">
				<CodePreview :code="codeFile.second"
							 :language="codeFile.first.split('.')[codeFile.first.split.length - 1]"
							 :show-line-counts="showLineCounts"></CodePreview>
			</div>
		</el-tab-pane>
		<el-tab-pane v-if="!codeFiles">
			<el-empty></el-empty>
		</el-tab-pane>
	</el-tabs>
</template>
