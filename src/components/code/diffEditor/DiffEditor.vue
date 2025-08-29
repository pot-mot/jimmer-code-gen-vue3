<script setup lang="ts">
import {editor, languages} from 'monaco-editor'
import {onMounted, onUnmounted, ref, shallowRef, watch} from "vue";
import {type CodeEditorLanguage} from "@/components/code/CodeEditorLanguages.ts";
import {defaultOptions} from "@/components/code/defaultOptions.ts";
type IDiffEditor = editor.IDiffEditor;
type ITextModel = editor.ITextModel;
type IStandaloneDiffEditorConstructionOptions = editor.IStandaloneDiffEditorConstructionOptions;

const originValue = defineModel<string>('origin', {
    required: false,
    default: '',
})

const modifiedValue = defineModel<string>('modified', {
    required: false,
    default: '',
})

const props = withDefaults(defineProps<{
    language?: CodeEditorLanguage | string,
    originalEditable?: boolean,
    options?: Omit<Partial<IStandaloneDiffEditorConstructionOptions>, 'language' | 'originalEditable'>,
}>(), {
    originalEditable: true
})

languages.typescript.typescriptDefaults.setEagerModelSync(true);

const editorContainer = ref<HTMLElement>()

const options: IStandaloneDiffEditorConstructionOptions = {
    ...defaultOptions,
    originalEditable: props.originalEditable,
}

const editorInstance = shallowRef<IDiffEditor>()
const originModel = shallowRef<ITextModel>()
const modifiedModel = shallowRef<ITextModel>()

watch(() => props.originalEditable, () => {
    editorInstance.value?.updateOptions({
        originalEditable: props.originalEditable
    })
})

onMounted(() => {
    if (!editorContainer.value) {
        throw new Error('editorContainer is null')
    }

    editorInstance.value = editor.createDiffEditor(editorContainer.value, {...options, ...props.options})

    // 设置左右两侧的模型
    const unwrapOriginModel = editor.createModel(originValue.value, props.language)
    const unwrapModifiedModel = editor.createModel(modifiedValue.value, props.language)

    editorInstance.value.setModel({
        original: unwrapOriginModel,
        modified: unwrapModifiedModel
    })

    unwrapOriginModel.onDidChangeContent(() => {
        if (editorInstance.value) {
            originValue.value = unwrapOriginModel.getValue()
        }
    })

    unwrapModifiedModel.onDidChangeContent(() => {
        if (editorInstance.value) {
            modifiedValue.value = unwrapModifiedModel.getValue()
        }
    })

    originModel.value = unwrapOriginModel
    modifiedModel.value = unwrapModifiedModel
})

watch(() => originValue.value, (newValue) => {
    if (originModel.value && originModel.value.getValue() !== newValue) {
        originModel.value.setValue(newValue)
    }
})

watch(() => modifiedValue.value, (newValue) => {
    if (modifiedModel.value && modifiedModel.value.getValue() !== newValue) {
        modifiedModel.value.setValue(newValue)
    }
})

onUnmounted(() => {
    if (originModel.value) {
        originModel.value.dispose()
    }
    if (modifiedModel.value) {
        modifiedModel.value.dispose()
    }
    if (editorInstance.value) {
        editorInstance.value.dispose();
    }
})

defineExpose({
    editorInstance,
    originModel,
    modifiedModel
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
