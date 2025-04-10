<script setup lang="ts">
/**
 * 参照以下博客实现
 * https://blog.csdn.net/yyXieDaiMa/article/details/125371318
 */

import * as monaco from 'monaco-editor'
import {editor} from 'monaco-editor'
import {onMounted, ref} from "vue";
import {CodeEditorLanguage} from "@/components/global/code/CodeEditorLanguages.ts";
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
import IStandaloneEditorConstructionOptions = monaco.editor.IStandaloneEditorConstructionOptions;
import {useThemeStore} from "@/store/theme/ThemeStore.ts";

const themeStore = useThemeStore()

const textValue = defineModel<string>({
    required: true
})

const props = defineProps<{
	language?: CodeEditorLanguage,
	options?: Omit<Partial<IStandaloneEditorConstructionOptions>, 'language' | 'value'>
}>()

monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);

const editorContainer = ref<HTMLElement>()

const options: IStandaloneEditorConstructionOptions = {
	value: textValue.value, // 初始显示文字
	language: props.language, // 语言支持
	theme: themeStore.theme === "dark" ? "vs-dark" : "vs", // 主题色官方自带： vs, hc-black , vs-dark
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
}

// 参照该博客 https://blog.csdn.net/weixin_43977534/article/details/122365734，ref editor instance 可能造成性能问题
let editorInstance: IStandaloneCodeEditor

onMounted(() => {
	editorInstance = monaco.editor.create(editorContainer.value!, {...options, ...props.options})

	editorInstance.onDidChangeModelContent(() => {
		textValue.value = editorInstance.getValue()
	})
})
</script>

<template>
	<div ref="editorContainer" style="width: 100%; height: 100%; position: absolute !important;"/>
</template>
