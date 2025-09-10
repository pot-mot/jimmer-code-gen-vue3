<script setup lang="ts" generic="Name extends ScriptTypeName">
import {useTemplateRef, computed, watch} from 'vue';
import {
    type TsScriptExecuteResult,
    TsScriptExecutor,
    type TsScriptValidatedCompileResult
} from "@/components/code/scriptEditor/TsScriptExecutor.ts";
import DiffEditor from "@/components/code/diffEditor/DiffEditor.vue";
import {debounce} from "lodash-es";
import {editor} from "monaco-editor";
import setModelMarkers = editor.setModelMarkers
import type {ScriptTypeMap, ScriptTypeName} from "@/type/__generated/scriptTypeDeclare";

const diffEditorRef = useTemplateRef<InstanceType<typeof DiffEditor>>("diffEditorRef")
const editorInstance = computed(() => {
    return diffEditorRef.value?.editorInstance
})
const originModel = computed(() => {
    return diffEditorRef.value?.originModel
})
const modifiedModel = computed(() => {
    return diffEditorRef.value?.modifiedModel
})

const modifiedValue = defineModel<string>({
    required: false,
    default: ''
})

const props = defineProps<{
    executor: TsScriptExecutor<Name>,
    originValue: string,
}>()

// 验证代码
const validateAndCompile = async (): Promise<TsScriptValidatedCompileResult> => {
    const result = await props.executor.validateThenCompile(
        modifiedValue.value,
    )

    const model = modifiedModel.value
    if (!model) return result

    if (!result.valid && result.markers !== undefined) {
        setModelMarkers(model, 'ts-script-executor', result.markers)
    } else {
        setModelMarkers(model, 'ts-script-executor', [])
    }

    return result
}

// 执行代码
const executeCode = async (...params: Parameters<ScriptTypeMap[Name]>): Promise<TsScriptExecuteResult<Name>> => {
    return await props.executor.executeTsArrowFunctionScript(
        modifiedValue.value,
        params,
    )
}

watch(() => modifiedValue.value, debounce(async () => {
    await validateAndCompile()
}, 200), {immediate: true})

defineExpose({
    editorInstance,
    originModel,
    modifiedModel,
    validateAndCompile,
    executeCode,
})
</script>

<template>
    <DiffEditor
        ref="diffEditorRef"
        :origin-value="originValue"
        :original-editable="false"
        v-model:modified-value="modifiedValue"
        :language="'typescript'"
    />
</template>
