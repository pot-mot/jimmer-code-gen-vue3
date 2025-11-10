<script setup lang="ts">
import {useModelGenerator} from "@/modelEditor/generator/useModelGenerator.ts";
import DragResizeDialog from "@/components/dialog/DragResizeDialog.vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {ref, watch} from "vue";
import FileTreeViewer from "@/components/file/FileTreeViewer.vue";
import {contextDataToSubIds, subIdSetToSubIds} from "@/type/context/utils/ModelSubIds.ts";
import {withLoading} from "@/components/loading/loadingApi.ts";
import {jsonPrettyFormat} from "@/utils/json/jsonStringify.ts";
import {useScriptDialog} from "@/modelEditor/script/useScriptDialog.ts";
import {translate} from "@/store/i18nStore.ts";

const {
    contextData,
    getContext,
    isModelSelectionNotEmpty,
    selectedIdSets,
} = useModelEditor()

const {
    openState,
    generate,
} = useModelGenerator()

const {
    open: openGenerateScriptEditor,
} = useScriptDialog()

const generateResult = ref<Record<string, string>>()
const errorMessage = ref<string>()

const receiveError = (error: any) => {
    if (typeof error === 'string') {
        errorMessage.value = error
    } else if (error instanceof Error) {
        console.error(error)
        errorMessage.value = error.message
    } else if (typeof error === 'object') {
        console.error(error)
        errorMessage.value = jsonPrettyFormat(error)
    } else {
        errorMessage.value = String(error)
    }
}


const handleGenerate = async () => {
    generateResult.value = undefined
    errorMessage.value = undefined
    await withLoading("Generating...", async () => {
        try {
            generateResult.value = generate(
                getContext(),
                isModelSelectionNotEmpty.value ? subIdSetToSubIds(selectedIdSets.value) : contextDataToSubIds(contextData)
            )
        } catch (e) {
            receiveError(e)
            generateResult.value = undefined
        }
    })
}

watch(() => openState.value, async () => {
    if (openState.value) {
        await handleGenerate()
    }
}, {immediate: true})
</script>

<template>
    <DragResizeDialog
        v-model="openState"
        can-resize
        modal
    >
        <template #title>
            {{ translate('generateResult') }}
        </template>
        <div
            class="error-message-content"
            v-if="errorMessage"
        >
            {{ errorMessage }}
        </div>
        <FileTreeViewer
            v-if="generateResult"
            :files="generateResult"
        >
            <template #left-top>
                <div>
                    <button @click="handleGenerate">Generate</button>
                    <button @click="openGenerateScriptEditor">Edit Scripts</button>
                </div>
            </template>
        </FileTreeViewer>
    </DragResizeDialog>
</template>

<style scoped>
.error-message-content {
    color: var(--danger-color);
}
</style>
