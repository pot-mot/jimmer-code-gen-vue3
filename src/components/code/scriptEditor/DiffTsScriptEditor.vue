<script setup lang="ts" generic="Fn extends TsScriptFunction">
import {useTemplateRef, computed} from 'vue';
import {TsScriptExecutor, type TsScriptFunction} from "@/components/code/scriptEditor/TsScriptExecutor.ts";
import DiffEditor from "@/components/code/diffEditor/DiffEditor.vue";

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
    default(props: {
        executor: TsScriptExecutor<Fn>,
    }) {
        let params = ''
        if (props.executor.paramTypesLiteral.length > 0) {
            params = props.executor.paramTypesLiteral.map((type, index) => {
                return `\n\tparam${index}: ${type},`
            }).join('') + '\n'
        }
        return `(${params}): ${props.executor.returnTypeLiteral} => {
    // TODO
}`;
    }
})

const props = defineProps<{
    executor: TsScriptExecutor<Fn>,
    originValue: string,
}>()

// 验证代码
const validateAndCompile = async () => {
    return await props.executor.validateThenCompile(
        modifiedValue.value,
    );
}

// 执行代码
const executeCode = async (params: Parameters<Fn>) => {
    return await props.executor.executeTsArrowFunctionScript(
        modifiedValue.value,
        params,
    )
}

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
