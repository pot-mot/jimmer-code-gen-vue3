<script setup lang="ts" generic="Fn extends TsScriptFunction">
import {useTemplateRef, computed} from 'vue';
import {TsScriptExecutor, type TsScriptFunction} from "@/components/code/scriptEditor/TsScriptExecutor.ts";
import CodeEditor from "@/components/code/CodeEditor.vue";

const editorRef = useTemplateRef<InstanceType<typeof CodeEditor>>("editorRef")
const editorInstance = computed(() => {
    return editorRef.value?.editorInstance
})

const props = defineProps<{
    executor: TsScriptExecutor<Fn>,
}>()

const data = defineModel<string>({
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

// 验证代码
const validateAndCompile = async () => {
    return await props.executor.validateThenCompile(
        data.value,
    );
}

// 执行代码
const executeCode = async (params: Parameters<Fn>) => {
    return await props.executor.executeTsArrowFunctionScript(
        data.value,
        params,
    )
}

defineExpose({
    editorInstance,
    validateAndCompile,
    executeCode,
})
</script>

<template>
    <CodeEditor
        ref="editorRef"
        v-model="data"
        :language="'typescript'"
    />
</template>
