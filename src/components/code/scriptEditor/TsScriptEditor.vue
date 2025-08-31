<script setup lang="ts" generic="Fn extends TsScriptFunction">
import {useTemplateRef, computed, watch} from 'vue';
import {
    type TsScriptExecuteResult,
    TsScriptExecutor,
    type TsScriptFunction,
    type TsScriptValidatedCompileResult
} from "@/components/code/scriptEditor/TsScriptExecutor.ts";
import CodeEditor from "@/components/code/CodeEditor.vue";
import {debounce} from "lodash-es";
import {editor} from "monaco-editor";
import setModelMarkers = editor.setModelMarkers

const editorRef = useTemplateRef<InstanceType<typeof CodeEditor>>("editorRef")
const editorInstance = computed(() => {
    return editorRef.value?.editorInstance
})

const props = defineProps<{
    executor: TsScriptExecutor<Fn>,
}>()

const textValue = defineModel<string>({
    required: false,
    default: '',
})

// 验证代码
const validateAndCompile = async (): Promise<TsScriptValidatedCompileResult> => {
    const result = await props.executor.validateThenCompile(
        textValue.value,
    )

    const editor = editorInstance.value
    if (!editor) return result
    const model = editor.getModel()
    if (!model) return result

    if (!result.valid && result.markers !== undefined) {
        setModelMarkers(model, 'ts-script-executor', result.markers)
    }

    return result
}

// 执行代码
const executeCode = async (params: Parameters<Fn>): Promise<TsScriptExecuteResult<Fn>> => {
    return await props.executor.executeTsArrowFunctionScript(
        textValue.value,
        params,
    )
}

watch(() => textValue.value, debounce(async () => {
    await validateAndCompile()
}, 200), {immediate: true})

defineExpose({
    editorInstance,
    validateAndCompile,
    executeCode,
})
</script>

<template>
    <CodeEditor
        ref="editorRef"
        v-model="textValue"
        :language="'typescript'"
    />
</template>
