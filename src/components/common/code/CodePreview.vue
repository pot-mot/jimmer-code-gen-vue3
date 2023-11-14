<template>
	<div class="container">
		<div class="line-counts" v-text="lineCounts"></div>
		<pre class="code"><code :class="`language-${language}`" ref="container" v-text="code"></code></pre>
	</div>
</template>

<script setup lang="ts">
import * as Prism from 'prismjs';
import "prismjs/themes/prism.css";
import {computed, nextTick, onMounted, ref, watch} from "vue";

interface CodePreviewProps {
	code: string,
	language: string,
}

const props = defineProps<CodePreviewProps>()

const container = ref()

onMounted(() => {
	nextTick(() => {
		Prism.highlightElement(container.value)
	})
})

watch(() => props.code, () => {
	nextTick(() => {
		Prism.highlightElement(container.value)
	})
})

const lineCounts = computed(() => {
	const length = props.code.split("\n").length

	let counts = []

	for (let i = 1; i <= length; i++) {
		counts.push(i)
	}

	return counts.join("\n")
})
</script>

<style scoped>
.container {
	display: grid;
	grid-template-columns: 3em 1fr;
}

.code {
	padding: 0.3em 0.5em;
	scrollbar-gutter: stable;
	height: 100%;
	width: 100%;
	overflow: auto;
	font-size: var(--el-font-size-extra-small);
	line-height: 1.7;
	background-color: transparent;
}

.line-counts {
	padding: 0.3em 0.5em;
	line-height: 1.7;
	user-select: none;
	text-align: right;
	border-right: 1px solid var(--el-text-color-placeholder);
	color: var(--el-text-color-placeholder);
	white-space: pre;
	font-size: var(--el-font-size-extra-small);
	margin: 0.5em 0;
}
</style>