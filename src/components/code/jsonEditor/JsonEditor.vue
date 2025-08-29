<script setup lang="ts">
import {useTemplateRef, computed, onUnmounted, watch} from 'vue';
import CodeEditor from "@/components/code/CodeEditor.vue";
import {editor, Uri} from "monaco-editor";
import {v7} from "uuid"
import {
    addJsonSchemaFile,
    type JsonSchemaKey,
    removeJsonSchemaFile, validateJsonSchemaString
} from "@/components/code/jsonEditor/JsonSchemaStore.ts";

const editorRef = useTemplateRef<InstanceType<typeof CodeEditor>>("editorRef")
const editorInstance = computed(() => {
    return editorRef.value?.editorInstance
})

const textValue = defineModel<string>({
    required: false,
    default: ""
})

const props = defineProps<{
    jsonType: JsonSchemaKey,
}>()

const filePath = `${v7()}.json`
const fileUri = Uri.parse(filePath)

watch(() => props.jsonType, (value, oldValue) => {
    if (oldValue) {
        removeJsonSchemaFile(oldValue, filePath)
    }
    addJsonSchemaFile(value, filePath)
}, {immediate: true})

const model = editor.createModel(textValue.value, 'json', fileUri)

onUnmounted(() => {
    removeJsonSchemaFile(props.jsonType, filePath)
})

const validate = () => {
    return validateJsonSchemaString(props.jsonType, textValue.value)
}

defineExpose({
    editorInstance,
    validate,
})
</script>

<template>
    <CodeEditor
        ref="editorRef"
        v-model="textValue"
        :language="'json'"
        :options="{model}"
    />
</template>
