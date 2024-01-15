<script lang="ts" setup>
import {computed, ref} from 'vue'
import CodePreview from "./CodePreview.vue";
import {Pair} from "@/api/__generated/model/static";
import LeftRightLayout from "@/components/global/layout/LeftRightLayout.vue";

interface MultiCodePreviewProps {
	codeFiles: Array<Pair<string, string>> | undefined,
	width?: string
	height?: string
	showLineCounts?: boolean
}

const props = withDefaults(defineProps<MultiCodePreviewProps>(), {
	width: "100%",
	height: "100%",
	showLineCounts: true
})

const currentIndex = ref<number>(0)

const currentCodeFile = computed(() => props.codeFiles?.[currentIndex.value])
</script>

<template>
	<LeftRightLayout v-if="codeFiles && codeFiles.length > 0">
		<template #left>
			<div style="padding: 0.5em;">
				<div v-for="(item, index) in codeFiles"
					 :class="[currentIndex == index ? 'selected-menu-item' : '']"
					 @click="currentIndex = index">
					<el-button link>
						{{ item.first }}
					</el-button>
				</div>
			</div>
		</template>

		<template #right v-if="currentCodeFile">
			<CodePreview :code="currentCodeFile.second"
						 :language="currentCodeFile.first.split('.')[currentCodeFile.first.split.length - 1]"
						 :show-line-counts="showLineCounts"></CodePreview>
		</template>
	</LeftRightLayout>
	<el-empty v-else></el-empty>
</template>
