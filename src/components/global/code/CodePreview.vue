<template>
	<div class="code-preview">
		<div class="code-preview-wrapper" ref="wrapperRef">
			<div v-if="showLineCounts" class="line-counts" v-text="lineCounts"/>
			<pre class="code"><code ref="codeRef" :class="`language-${language}`"/></pre>
		</div>
		<div class="toolbar">
			<slot name="toolbar" v-bind="props">
				<el-button style="padding: 0.3em 0.5em;">
					<CopyIcon :finish="copyFinish" @click="handleCopy"/>
				</el-button>
			</slot>
		</div>
	</div>
</template>

<script lang="ts" setup>
import {prism} from "@/components/global/code/prismjs-index.ts"
import {computed, nextTick, onBeforeUnmount, onMounted, ref, watch} from "vue";
import CopyIcon from "../icons/toolbar/CopyIcon.vue";
import {sendMessage} from "@/message/message.ts";

const props = withDefaults(defineProps<{
	code: string,
	language: string,
	showLineCounts?: boolean
}>(), {
	showLineCounts: true
})

const wrapperRef = ref<Element>()
const codeRef = ref<Element>()

const worker = new Worker(new URL("./worker/prism-worker.js", import.meta.url))

onBeforeUnmount(() => {
    worker.terminate()
})

const highlightContainer = () => {
	if (wrapperRef.value !== undefined && codeRef.value !== undefined) {
		const wrapper = wrapperRef.value
		const element = codeRef.value
		worker.postMessage({
			code: props.code,
			grammar: prism.languages[props.language],
			language: props.language,
		})
		worker.onmessage = (e) => {
			element.innerHTML = e.data
			wrapper.scrollTop = 0
		}
		worker.onerror = () => {
			element.textContent = props.code
			wrapper.scrollTop = 0
		}
	}
}

onMounted(() => {
	nextTick(() => {
        if (codeRef.value !== undefined) {
            codeRef.value.textContent = props.code
        }
        highlightContainer()
    })
})

watch(() => props.code, highlightContainer)

const lineCounts = computed(() => {
	const length = props.code.split("\n").length

	const counts = []

	for (let i = 1; i <= length - 1; i++) {
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
.code-preview {
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;
}

.code-preview-wrapper {
	position: relative;
	width: 100%;
	height: 100%;
	overflow: scroll;
}

.code {
	padding: 0.3em 0.5em 0.3em 4em;
	font-size: var(--el-font-size-extra-small);
	line-height: 1.7;
	background-color: transparent;
	overflow: visible;
	cursor: text;
}

.line-counts {
	position: absolute;
	top: 0;
	left: 0;

	width: 3em;
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
