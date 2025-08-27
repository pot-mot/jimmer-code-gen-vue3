<script setup lang="ts">
import {ref, onMounted, onUnmounted, useTemplateRef, computed} from 'vue';
import {TsTemplateFnExecutor} from "@/utils/script/ts-template-fn-executor.ts";
import {
    configureSecureMonacoEditor,
} from "@/components/code/templateEditor/monaco-config.ts";
import CodeEditor from "@/components/code/CodeEditor.vue";

const editorRef = useTemplateRef<InstanceType<typeof CodeEditor>>("editorRef")
const editor = computed(() => {
    return editorRef.value?.editorInstance
})
const executor = new TsTemplateFnExecutor();
const result = ref<string>();
const error = ref<string>();
const isExecuting = ref<boolean>(false);

const data = ref("")

onMounted(() => {
    if (!editorRef.value) throw new Error('editorContainer is null')
    if (!editor.value) throw new Error('editor is null')

    // 配置安全编辑器
    configureSecureMonacoEditor(editor.value)
});

onUnmounted(() => {
    if (editor.value) {
        editor.value.dispose();
    }
});

// 验证代码
const validateCode = async () => {
    if (!editor.value) return;

    const code = editor.value.getValue();
    const validation = await executor.validateThenCompile(code);

    if (validation.valid) {
        error.value = undefined;
        result.value = '代码验证通过';
    } else {
        error.value = validation.error || '代码验证失败';
        result.value = undefined;
    }
};

// 执行代码
const executeCode = async () => {
    if (!editor.value) return;

    isExecuting.value = true;
    error.value = undefined;
    result.value = undefined;

    try {
        const code = editor.value.getValue()
        result.value = await executor.executeTemplateFunction(code)
    } catch (err) {
        error.value = `${err}` || '执行失败'
    } finally {
        isExecuting.value = false;
    }
};
</script>

<template>
    <div class="secure-code-editor">
        <div class="editor-header">
            <h3>安全 JavaScript 编辑器</h3>
            <div class="controls">
                <button @click="executeCode" :disabled="isExecuting">执行代码</button>
                <button @click="validateCode">验证代码</button>
            </div>
        </div>

        <div class="editor-wrapper">
            <CodeEditor
                ref="editorRef"
                v-model="data"
                :language="'typescript'"
            />
        </div>

        <div class="result-panel">
            <div v-if="result !== undefined && result !== null" class="success">
                <h4>执行结果:</h4>
                <pre>{{ result }}</pre>
            </div>
            <div v-if="error !== undefined && error !== null" class="error">
                <h4>错误信息:</h4>
                <pre>{{ error }}</pre>
            </div>
        </div>
    </div>
</template>

<style scoped>
.secure-code-editor {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
}

.editor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
}

.controls button {
    margin-left: 10px;
    padding: 8px 16px;
    background-color: #007acc;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.controls button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.editor-wrapper {
    height: 60%;
}

.result-panel {
    padding: 10px;
    border-top: 1px solid #ddd;
}

.success pre {
    background-color: #f0fff0;
    padding: 10px;
    border-radius: 4px;
    white-space: pre-wrap;
}

.error pre {
    background-color: #fff0f0;
    padding: 10px;
    border-radius: 4px;
    white-space: pre-wrap;
    color: #d00;
}
</style>
