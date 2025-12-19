<script setup lang="ts">
/**
 * 参照以下博客实现
 * https://blog.csdn.net/yyXieDaiMa/article/details/125371318
 */

import {editor} from 'monaco-editor'
import {onMounted, onUnmounted, ref, shallowRef, watch} from "vue";
import {type CodeEditorLanguage} from "@/components/code/worker/CodeEditorWorkers.ts";
import {defaultOptions} from "@/components/code/defaultOptions.ts";
type IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
type IStandaloneEditorConstructionOptions = editor.IStandaloneEditorConstructionOptions;

const textValue = defineModel<string>({
    required: false,
    default: ''
})

const props = defineProps<{
	language?: CodeEditorLanguage | string,
	options?: Omit<Partial<IStandaloneEditorConstructionOptions>, 'language' | 'value'>
}>()

const editorContainer = ref<HTMLElement>()

const options: IStandaloneEditorConstructionOptions = {
    ...defaultOptions,
	value: textValue.value,
	language: props.language,
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
