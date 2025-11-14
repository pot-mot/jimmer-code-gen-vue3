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
import IconRefresh from "@/components/icons/IconRefresh.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconDownload from "@/components/icons/IconDownload.vue";
import {downloadZip} from "@/utils/file/zipDownload.ts";
import {sendMessage} from "@/components/message/messageApi.ts";

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

const downloadFileName = "codes.zip"
const downloadAll = ref(true)
const handleDownloadFiles = (selectedPathSet?: Set<string>) => {
    try {
        withLoading(translate('download'), async () => {
            if (generateResult.value === undefined || Object.keys(generateResult.value).length === 0) {
                return
            }

            if (selectedPathSet !== undefined && selectedPathSet.size > 0) {
                const files: Record<string, string | undefined> = {}
                for (const path of selectedPathSet) {
                    files[path] = generateResult.value[path]
                }
                await downloadZip(downloadFileName, files)
            } else {
                await downloadZip(downloadFileName, generateResult.value)
            }
            sendMessage(translate({key: 'download_success', args: [downloadFileName]}))
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
            class="error-message-content no-drag"
            v-if="errorMessage"
        >
            {{ errorMessage }}
        </div>
        <FileTreeViewer
            v-if="generateResult"
            :files="generateResult"
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
                    <button @click="handleDownloadFiles(downloadAll ? undefined : selectedPathSet)">
                        <IconDownload/>
                        {{ translate('download') }}
                        <span
                            class="download-option"
                            :class="{selected: downloadAll}"
                            @click="downloadAll = true"
                        >
                            {{ translate('all') }}
                        </span>
                        <span> | </span>
                        <span
                            class="download-option"
                            :class="{selected: !downloadAll}"
                            @click="downloadAll = false"
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
.error-message-content {
    color: var(--danger-color);
}

.file-toolbar {
    display: flex;
    gap: 0.5rem;
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
