<script setup lang="ts">
import {useModelGenerator} from "@/modelEditor/generator/useModelGenerator.ts";
import DragResizeDialog from "@/components/dialog/DragResizeDialog.vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {ref, watch} from "vue";
import FileTreeViewer from "@/components/file/FileTreeViewer.vue";
import {subIdSetToSubIds} from "@/modelEditor/utils/ModelSubIds.ts";
import {withLoading} from "@/components/loading/loadingApi.ts";
import {jsonPrettyFormat} from "@/utils/json/jsonStringify.ts";
import {useScriptDialog} from "@/modelEditor/script/useScriptDialog.ts";
import {translate} from "@/store/i18nStore.ts";
import IconRefresh from "@/components/icons/IconRefresh.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconDownload from "@/components/icons/IconDownload.vue";
import {downloadZip} from "@/utils/file/zipDownload.ts";
import {sendMessage} from "@/components/message/messageApi.ts";
import type {ModelGenerateError} from "@/modelEditor/generator/modelGenerate.ts";
import EntityViewer from "@/modelEditor/viewer/EntityViewer.vue";
import MappedSuperClassViewer from "@/modelEditor/viewer/MappedSuperClassViewer.vue";
import EmbeddableTypeViewer from "@/modelEditor/viewer/EmbeddableTypeViewer.vue";
import EnumerationViewer from "@/modelEditor/viewer/EnumerationViewer.vue";
import AssociationViewer from "@/modelEditor/viewer/AssociationViewer.vue";

const {
    getContext,
    selectedIdSets,
} = useModelEditor()

const {
    openState,
    generate,
} = useModelGenerator()

const {
    open: openGenerateScriptEditor,
} = useScriptDialog()

const generateFiles = ref<Record<string, string>>()
const generateErrors = ref<ModelGenerateError[] | undefined>()
const unexpectErrorMessage = ref<string>()

const receiveError = (error: any) => {
    if (typeof error === 'string') {
        unexpectErrorMessage.value = error
    } else if (error instanceof Error) {
        console.error(error)
        unexpectErrorMessage.value = error.message
    } else if (typeof error === 'object') {
        console.error(error)
        unexpectErrorMessage.value = jsonPrettyFormat(error)
    } else {
        unexpectErrorMessage.value = String(error)
    }
}


const handleGenerate = async () => {
    generateFiles.value = undefined
    generateErrors.value = undefined
    unexpectErrorMessage.value = undefined
    await withLoading("Generating...", async () => {
        try {
            const generateResult = generate(
                getContext(),
                subIdSetToSubIds(selectedIdSets.value)
            )
            generateFiles.value = generateResult?.files
            generateErrors.value = generateResult?.errors
        } catch (e) {
            receiveError(e)
            generateFiles.value = undefined
            generateErrors.value = undefined
        }
    })
}

const downloadFileName = "codes.zip"
const downloadScope = ref<"ALL" | "SELECTED">("ALL")
const handleDownloadFiles = (selectedPathSet?: Set<string>) => {
    try {
        withLoading(translate('download'), async () => {
            if (generateFiles.value === undefined || Object.keys(generateFiles.value).length === 0) {
                return
            }

            if (selectedPathSet !== undefined && selectedPathSet.size > 0) {
                const files: Record<string, string | undefined> = {}
                for (const path of selectedPathSet) {
                    files[path] = generateFiles.value[path]
                }
                await downloadZip(downloadFileName, files)
            } else {
                await downloadZip(downloadFileName, generateFiles.value)
            }
            sendMessage(translate({key: 'download_success', args: [downloadFileName]}), {type: 'success'})
        })
    } catch (e) {
        receiveError(e)
    }
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
            class="error-content no-drag"
            v-if="unexpectErrorMessage"
        >
            <div class="error-message">
                {{ unexpectErrorMessage }}
            </div>
            <button @click="openGenerateScriptEditor">
                <IconEdit/>
                {{ translate('script_dialog_button') }}
            </button>
        </div>

        <div
            class="error-content no-drag"
            v-if="generateErrors && generateErrors.length > 0"
        >
            <div
                v-for="(error, index) in generateErrors"
                :key="index"
                class="error-item"
            >
                <div class="error-script">{{ translate({key: 'script_execute_error', args: [error.scriptName]}) }}</div>
                <div class="error-type" v-if="error.target.type === 'Entity'">
                    <EntityViewer :entity="error.target.entity"/>
                </div>
                <div class="error-type" v-else-if="error.target.type === 'MappedSuperClass'">
                    <MappedSuperClassViewer :mapped-super-class="error.target.mappedSuperClass"/>
                </div>
                <div class="error-type" v-else-if="error.target.type === 'EmbeddableType'">
                    <EmbeddableTypeViewer :embeddable-type="error.target.embeddableType"/>
                </div>
                <div class="error-type" v-else-if="error.target.type === 'Enumeration'">
                    <EnumerationViewer :enumeration="error.target.enumeration"/>
                </div>
                <div class="error-type" v-else-if="error.target.type === 'Association'">
                    <AssociationViewer :association="error.target.association"/>
                </div>
                <div class="error-type" v-else>{{ error.target.type }}</div>
                <div class="error-message">{{ error.message }}</div>
            </div>
        </div>

        <FileTreeViewer
            v-if="generateFiles"
            :files="generateFiles"
        >
            <template #left-top="{selectedPathSet}">
                <div class="file-toolbar">
                    <button @click="handleGenerate">
                        <IconRefresh/>
                        {{ translate('generate') }}
                    </button>
                    <button @click="openGenerateScriptEditor">
                        <IconEdit/>
                        {{ translate('script_dialog_button') }}
                    </button>
                    <button @click="handleDownloadFiles(downloadScope === 'ALL' ? undefined : selectedPathSet)">
                        <IconDownload/>
                        {{ translate('download') }}
                        <span
                            class="download-option"
                            :class="{selected: downloadScope === 'ALL'}"
                            @click="downloadScope = 'ALL'"
                        >
                            {{ translate('all') }}
                        </span>
                        <span> | </span>
                        <span
                            class="download-option"
                            :class="{selected: downloadScope === 'SELECTED'}"
                            @click="downloadScope = 'SELECTED'"
                        >
                            {{ translate('selected') }}
                        </span>
                    </button>
                </div>
            </template>
        </FileTreeViewer>
    </DragResizeDialog>
</template>

<style scoped>
.error-content {
    padding: 1rem;
}

.error-item {
    border: var(--border);
    border-radius: var(--border-radius);
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    display: flex;
    gap: 0.5rem;
    align-items: flex-start;
    flex-wrap: nowrap;
    max-width: 100%;
    overflow-x: auto;
}

.error-item > * {
    flex-shrink: 0;
}

.error-script {
    width: 12rem;
}

.error-message {
    color: var(--danger-color);
    white-space: pre-line;
}

.file-toolbar {
    display: flex;
    gap: 0.5rem;
    width: calc(100% - 1rem);
    overflow-x: auto;
    margin: 0 0.5rem 0.25rem;
}

.file-toolbar > button {
    padding: 0.25rem;
    border-radius: 0.25rem;
    cursor: pointer;
    flex-shrink: 0;
}

.download-option.selected {
    color: var(--primary-color);
}
</style>
