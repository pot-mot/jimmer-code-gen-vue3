<template>
	<div class="code-preview">
		<div class="code-preview-content-wrapper" ref="contentWrapperRef">
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
	showLineCounts?: boolean,
    noHighlightLimit?: number,
}>(), {
	showLineCounts: true,
    noHighlightLimit: 10000,
})

const contentWrapperRef = ref<HTMLDivElement>()
const codeRef = ref<HTMLDivElement>()

const worker = new Worker(new URL("./worker/prism-worker.js", import.meta.url))

onBeforeUnmount(() => {
    worker.postMessage('close')
})

const showCode = () => {
    if (contentWrapperRef.value !== undefined && codeRef.value !== undefined) {
        const wrapper = contentWrapperRef.value
        const element = codeRef.value
        element.innerText = props.code
        wrapper.scrollTop = 0
    }
}

const highlightCode = () => {
	if (contentWrapperRef.value !== undefined && codeRef.value !== undefined) {
		const wrapper = contentWrapperRef.value
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
		worker.onerror = showCode
	}
}

onMounted(() => {
	nextTick(() => {
        if (props.code.length > props.noHighlightLimit) {
            showCode()
        } else {
            highlightCode()
        }
    })
})

watch(() => props.code, () => {
    if (props.code.length > props.noHighlightLimit) {
        showCode()
    } else {
        highlightCode()
    }
})

const lineCounts = computed(() => {
	const length = props.code.split("\n").length

	const counts = []

	for (let i = 0; i < length; i++) {
		counts.push(i + 1)
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

.code-preview-content-wrapper {
	width: 100%;
	height: 100%;
	overflow: scroll;
    display: grid;
    grid-template-columns: auto 1fr;
    padding: 0.5em 0;
}

.code {
    padding-left: 0.5em;

	font-size: var(--el-font-size-extra-small);
	line-height: 1.7;
	background-color: transparent;
	overflow: visible;
	cursor: text;
}

.line-counts {
    padding-left: 0.5em;
    padding-right: 1em;

    user-select: none;
    text-align: right;

    font-size: var(--el-font-size-extra-small);
	line-height: 1.7;

	border-right: 1px solid var(--el-color-info-light-7);
	color: var(--el-text-color-placeholder);
	white-space: pre;
}

.toolbar {
	position: absolute;
	top: 0.2em;
	right: 1.2em;
}
</style>
