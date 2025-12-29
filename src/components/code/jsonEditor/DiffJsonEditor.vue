<script setup lang="ts">
import {useTemplateRef, computed, onUnmounted, watch} from 'vue';
import {editor, Uri} from "monaco-editor";
import {v7} from "uuid"
import {
    addJsonSchemaFile,
    removeJsonSchemaFile,
    validateJsonSchemaString
} from "@/components/code/jsonEditor/JsonSchemaStore.ts";
import DiffEditor from "@/components/code/diffEditor/DiffEditor.vue";
import type {JsonSchemaKey} from "@/type/__generated/jsonSchema";
type IStandaloneDiffEditorConstructionOptions = editor.IStandaloneDiffEditorConstructionOptions;

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
    default: '',
})

const props = withDefaults(defineProps<{
    jsonType: JsonSchemaKey,
    originValue: string,
    originalEditable?: boolean,
    options?: Omit<Partial<IStandaloneDiffEditorConstructionOptions>, 'language' | 'originalEditable'>,
}>(), {
    originalEditable: false
})

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

const validate = () => {
    return validateJsonSchemaString(props.jsonType, modifiedValue.value)
}

defineExpose({
    editorInstance,
    originModel,
    modifiedModel,
    validate,
})
</script>

<template>
    <DiffEditor
        ref="diffEditorRef"
        :origin-value="originValue"
        :original-editable="originalEditable"
        :options="options"
        v-model:modified-value="modifiedValue"
        :language="'json'"
        :origin-model-uri="originFileUri"
        :modified-model-uri="modifiedFileUri"
    />
</template>
