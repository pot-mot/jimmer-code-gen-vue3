<template>
	<pre class="line-numbers"><code
		:class="`language-${language}`"
		ref="container"
		v-text="code"></code></pre>
</template>

<script setup lang="ts">
import * as Prism from 'prismjs';
import "prismjs/themes/prism.css";
import {nextTick, onMounted, ref} from "vue";

interface CodePreviewProps {
	code: string,
	language: string,
}

defineProps<CodePreviewProps>()

const container = ref()

onMounted(() => {
	nextTick(() => {
		Prism.highlightElement(container.value)
	})
})
</script>

<style scoped>
pre {
	padding: 0.3em 0;
	scrollbar-gutter: stable;
	height: 100%;
	width: 100%;
	overflow: auto;
	font-size: var(--el-font-size-extra-small);
	line-height: 1.7;
	background-color: transparent;
}

.line-numbers :deep(.line-numbers-rows) {
	line-height: 1.7;
}
</style>