<template>
	<div class="container">
		<div class="toolbar">
			<el-button style="padding: 0.3em 0.5em;">
				<CopyIcon :finish="copyFinish" @click="handleCopy"></CopyIcon>
			</el-button>
		</div>
		<div class="wrapper">
			<div class="line-counts" v-text="lineCounts"></div>
			<pre class="code"><code :class="`language-${language}`" ref="container" v-text="code"></code></pre>
		</div>
	</div>
</template>

<script setup lang="ts">
import * as Prism from 'prismjs';
import "prismjs/themes/prism.css";
import {computed, nextTick, onMounted, ref, watch} from "vue";
import CopyIcon from "../../icons/toolbar/CopyIcon.vue";
import {sendMessage} from "../../../utils/message.ts";

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

const copyFinish = ref(false)

const handleCopy = () => {
	navigator.clipboard.writeText(props.code)
	sendMessage('复制成功', 'success')
	copyFinish.value = true
}
</script>

<style scoped>
.container {
	position: relative;
	height: 100%;
	width: 100%;
	overflow: hidden;
}

.wrapper {
	display: grid;
	grid-template-columns: 3em 1fr;
	max-height: 100%;
	overflow-y: auto;
	overflow-x: hidden;
	scrollbar-gutter: stable;
}

.code {
	padding: 0.3em 0.5em 0.3em 1em;
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

.toolbar {
	position: absolute;
	top: 0.2em;
	right: 1.2em;
}
</style>