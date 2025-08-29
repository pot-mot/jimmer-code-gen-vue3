<script setup lang="ts" generic="Fn extends TsScriptFunction">
import {useTemplateRef, computed, watch} from 'vue';
import {
    type TsScriptExecuteResult,
    TsScriptExecutor,
    type TsScriptFunction, type TsScriptValidatedCompileResult
} from "@/components/code/scriptEditor/TsScriptExecutor.ts";
import DiffEditor from "@/components/code/diffEditor/DiffEditor.vue";
import {debounce} from "lodash-es";
import {editor} from "monaco-editor";
import setModelMarkers = editor.setModelMarkers
type IMarkerData = editor.IMarkerData

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
    executor: TsScriptExecutor<Fn>,
    originValue: string,
}>()

// 验证代码
const validateAndCompile = async (): Promise<TsScriptValidatedCompileResult> => {
    const result = await props.executor.validateThenCompile(
        modifiedValue.value,
    )

    const model = modifiedModel.value
    if (!model) return result

    const markers: IMarkerData[] = []
    if (!result.valid) {
        if (result.markers) {
            markers.push(...result.markers)
        }
    }
    setModelMarkers(model, 'ts-script-executor', markers)

    return result
}

// 执行代码
const executeCode = async (params: Parameters<Fn>): Promise<TsScriptExecuteResult<Fn>> => {
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
