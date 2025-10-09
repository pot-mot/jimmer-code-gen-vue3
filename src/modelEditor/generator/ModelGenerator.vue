<script setup lang="ts">
import ScriptsMenu from "@/modelEditor/generator/ScriptsMenu.vue";
import GeneratorScriptEditor from "@/modelEditor/generator/GeneratorScriptEditor.vue";
import {useModelGenerator} from "@/modelEditor/generator/useModelGenerator.ts";
import Splitpanes from "@/components/splitpanes/Splitpanes.vue";
import Pane from "@/components/splitpanes/Pane.vue";
import DragResizeDialog from "@/components/dialog/DragResizeDialog.vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {ref, watch} from "vue";
import type {ScriptInfo} from "@/modelEditor/generator/ScriptsStore.ts";
import FileTreeViewer from "@/components/file/FileTreeViewer.vue";
import {contextDataToSubIds, subIdSetToSubIds} from "@/type/context/utils/ModelSubIds.ts";
import {withLoading} from "@/components/loading/loadingApi.ts";
import {jsonPrettyFormat} from "@/utils/json/jsonStringify.ts";

const {
    contextData,
    getContext,
    isModelSelectionNotEmpty,
    selectedIdSets,
} = useModelEditor()

const {
    openState,
    scriptsStore,
    generate,
} = useModelGenerator()

const isScriptOpen = ref(false)
const currentScriptInfo = ref<ScriptInfo<any>>()

const handleScriptInfoSelect = (scriptInfo: ScriptInfo<any>) => {
    currentScriptInfo.value = scriptInfo
}

const handleScriptInfoSubmit = (scriptInfo: ScriptInfo<any>) => {
    scriptsStore.value.update(scriptInfo.key, scriptInfo)
}

const generateResult = ref<Record<string, string>>()
const errorMessage = ref<string>()

const receiveError = (error: any) => {
    if (typeof error === 'string') {
        errorMessage.value = error
    } else if (error instanceof Error) {
        errorMessage.value = error.message
    } else if (typeof error === 'object') {
        errorMessage.value = jsonPrettyFormat(error)
    } else {
        errorMessage.value = String(error)
    }
}


const handleGenerate = async () => {
    await withLoading("Generating...", async () => {
        try {
            generateResult.value = generate(
                getContext(),
                isModelSelectionNotEmpty.value ? subIdSetToSubIds(selectedIdSets.value) : contextDataToSubIds(contextData.value)
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
    >
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
                    <button @click="isScriptOpen = true">Edit Scripts</button>
                </div>
            </template>
        </FileTreeViewer>

        <DragResizeDialog
            v-model="isScriptOpen"
            @close="currentScriptInfo = undefined"
            can-resize
        >
            <Splitpanes>
                <Pane :size="20" class="left-pane">
                    <ScriptsMenu
                        :script-operator="scriptsStore"
                        :database-type="contextData.model.databaseType"
                        :jvm-language="contextData.model.jvmLanguage"
                        @select="handleScriptInfoSelect"
                    />
                </Pane>
                <Pane>
                    <GeneratorScriptEditor
                        v-if="currentScriptInfo"
                        :script-info="currentScriptInfo"
                        @submit="handleScriptInfoSubmit"
                    />
                </Pane>
            </Splitpanes>
        </DragResizeDialog>
    </DragResizeDialog>
</template>

<style scoped>
.left-pane {
    overflow: auto;
}

.error-message-content {
    color: var(--danger-color);
}
</style>
