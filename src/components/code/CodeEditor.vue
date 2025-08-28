<script setup lang="ts">
/**
 * 参照以下博客实现
 * https://blog.csdn.net/yyXieDaiMa/article/details/125371318
 */

import {editor, languages} from 'monaco-editor'
import {onMounted, onUnmounted, ref, shallowRef, watch} from "vue";
import {type CodeEditorLanguage} from "@/components/code/CodeEditorLanguages.ts";
import {useThemeStore} from "@/store/themeStore.ts";
type IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
type IStandaloneEditorConstructionOptions = editor.IStandaloneEditorConstructionOptions;

const themeStore = useThemeStore()

const textValue = defineModel<string>({
    required: true
})

const props = defineProps<{
	language?: CodeEditorLanguage | string,
	options?: Omit<Partial<IStandaloneEditorConstructionOptions>, 'language' | 'value'>
}>()

languages.typescript.typescriptDefaults.setEagerModelSync(true);

const editorContainer = ref<HTMLElement>()

const options: IStandaloneEditorConstructionOptions = {
	value: textValue.value, // 初始显示文字
	language: props.language, // 语言支持
	theme: themeStore.theme.value === "dark" ? "vs-dark" : "vs", // 主题色官方自带： vs, hc-black , vs-dark
	automaticLayout: true, // 自适应布局 默认true
	renderLineHighlight: 'all', // 行亮方式 默认all
	selectOnLineNumbers: true, // 显示行号 默认true
	minimap: {
		enabled: false,
	},
	readOnly: false, // 只读
	fontSize: 16, // 字体大小
	scrollBeyondLastLine: true, // 代码后面的空白
	overviewRulerBorder: false, // 不要滚动条的边框
    tabSize: 4,
}

const editorInstance = shallowRef<IStandaloneCodeEditor>()

onMounted(() => {
    if (!editorContainer.value) {
        throw new Error('editorContainer is null')
    }

	editorInstance.value = editor.create(editorContainer.value, {...options, ...props.options})

	editorInstance.value.onDidChangeModelContent(() => {
        if (editorInstance.value) {
            textValue.value = editorInstance.value.getValue()
        }
	})
})

watch(() => textValue.value, (newValue) => {
    if (editorInstance.value && editorInstance.value.getValue() !== newValue) {
        editorInstance.value.setValue(newValue)
    }
})

onUnmounted(() => {
    if (editorInstance.value) {
        editorInstance.value.dispose();
    }
})

defineExpose({
    editorInstance
})
</script>

<template>
	<div ref="editorContainer" class="code-editor"/>
</template>

<style scoped>
.code-editor {
    height: 100%;
    width: 100%;
}
</style>
