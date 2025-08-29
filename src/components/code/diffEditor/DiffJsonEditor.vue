<script setup lang="ts">
import {useTemplateRef, computed, onUnmounted, watch} from 'vue';
import {Uri} from "monaco-editor";
import {v7} from "uuid"
import {
    addJsonSchemaFile,
    type JsonSchemaKey,
    removeJsonSchemaFile
} from "@/components/code/jsonEditor/JsonSchemaStore.ts";
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

const originValue = defineModel<string>('origin', {
    required: false,
    default: '',
})

const modifiedValue = defineModel<string>('modified', {
    required: false,
    default: '',
})

const props = defineProps<{
    jsonType: JsonSchemaKey,
}>()

const originFilePath = `${v7()}.json`
const originFileUri = Uri.parse(originFilePath)
const modifiedFilePath = `${v7()}.json`
const modifiedFileUri = Uri.parse(modifiedFilePath)

watch(() => props.jsonType, (value, oldValue) => {
    if (oldValue) {
        removeJsonSchemaFile(oldValue, [originFilePath, modifiedFilePath])
    }
    addJsonSchemaFile(value, [originFilePath, modifiedFilePath])
}, {immediate: true})

onUnmounted(() => {
    removeJsonSchemaFile(props.jsonType, [originFilePath, modifiedFilePath])
})

defineExpose({
    editorInstance,
    originModel,
    modifiedModel,
})
</script>

<template>
    <DiffEditor
        ref="diffEditorRef"
        v-model:origin="originValue"
        v-model:modified="modifiedValue"
        :language="'json'"
        :origin-model-uri="originFileUri"
        :modified-model-uri="modifiedFileUri"
    />
</template>
