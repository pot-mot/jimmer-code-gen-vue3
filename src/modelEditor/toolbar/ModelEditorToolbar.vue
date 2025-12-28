<script setup lang="ts">
import IconSave from "@/components/icons/IconSave.vue";
import IconUndo from "@/components/icons/IconUndo.vue";
import IconRedo from "@/components/icons/IconRedo.vue";
import IconFit from "@/components/icons/IconFit.vue";
import IconDrag from "@/components/icons/IconDrag.vue";
import IconSelectRect from "@/components/icons/IconSelectRect.vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import IconDownload from "@/components/icons/IconDownload.vue";
import {useModelGenerator} from "@/modelEditor/generator/useModelGenerator.ts";
import IconEdit from "@/components/icons/IconEdit.vue";
import {useModelEditDialog} from "@/modelEditor/modelForm/useModelEditDialog.ts";
import IconCode from "@/components/icons/IconCode.vue";
import {downloadJson} from "@/utils/file/jsonDownload.ts";
import IconDiagnostic from "@/components/icons/IconDiagnostic.vue";
import {translate} from "@/store/i18nStore.ts";
import {useDiagnoseDialog} from "@/modelEditor/diagnostic/useDiagnoseDialog.ts";
import {watch} from "vue";
import {sendMessage} from "@/components/message/messageApi.ts";

const {
    getModelGraphData,
    saveModel,
    canUndo,
    canRedo,
    undo,
    redo,
    fitView,
    defaultMouseAction,
    toggleDefaultMouseAction,
    modelSelectionCount,
    modelDiagnoseInfo,
    diagnose,
} = useModelEditor()

const {
    open: openGenerator,
    generateScope,
} = useModelGenerator()
watch(() => modelSelectionCount.value, (count) => {
    if (count === 0) {
        generateScope.value = 'ALL'
    }
})

const {
    open: openForm
} = useModelEditDialog()

const {
    open: openDiagnoseDialog
} = useDiagnoseDialog()

const handleGenerate = () => {
    diagnose()
    if (modelDiagnoseInfo.total > 0) {
        sendMessage(translate("generate_fail_because_of_some_checked_questions"), {type: "warning"})
        openDiagnoseDialog()
    } else {
        openGenerator()
    }
}

const exportModelJson = () => {
    const graphData = getModelGraphData()
    downloadJson<DeepReadonly<ModelGraphData>>({
        name: graphData.model.name + ".json",
        content: graphData
    })
}
</script>

<template>
    <div class="toolbar">
        <div class="left">
            <button @click="saveModel()">
                <IconSave/>
            </button>
            <button @click="openForm()">
                <IconEdit/>
            </button>

            <button :disabled="!canUndo" @click="undo()" :class="{disabled: !canUndo}">
                <IconUndo/>
            </button>
            <button :disabled="!canRedo" @click="redo()" :class="{disabled: !canRedo}">
                <IconRedo/>
            </button>
            <button @click="fitView()">
                <IconFit/>
            </button>
            <button @click="toggleDefaultMouseAction()" :class="{enable: defaultMouseAction === 'selectionRect'}">
                <IconDrag v-if="defaultMouseAction === 'panDrag'"/>
                <IconSelectRect v-else-if="defaultMouseAction === 'selectionRect'"/>
            </button>
        </div>

        <div class="right">
            <button @click="openDiagnoseDialog()">
                <IconDiagnostic/>
                {{ translate('diagnose_dialog_button') }}
                {{ modelDiagnoseInfo.total > 0 ? `(${modelDiagnoseInfo.total})` : '' }}
            </button>
            <button @click="exportModelJson()">
                <IconDownload/>
                {{ translate('export') }}
            </button>
            <button @click="handleGenerate()">
                <IconCode/>
                {{ translate('generate') }}
                <template v-if="modelSelectionCount > 0">
                <span
                    class="generate-option"
                    :class="{selected: generateScope === 'ALL'}"
                    @click="generateScope = 'ALL'"
                >
                    {{ translate('all') }}
                </span>
                    <span> | </span>
                    <span
                        class="generate-option"
                        :class="{selected: generateScope === 'SELECTED'}"
                        @click="generateScope = 'SELECTED'"
                    >
                    {{ translate('selected') }}
                </span>
                </template>
            </button>
        </div>
    </div>
</template>

<style scoped>
.toolbar {
    position: absolute;
    top: 0;
    z-index: var(--toolbar-z-index);
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    pointer-events: none;
}

.toolbar button {
    flex-shrink: 0;
    line-height: 1rem;
    background-color: var(--background-color);
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.toolbar button:hover {
    background-color: var(--background-color-hover);
}

.toolbar button.disabled {
    color: var(--background-color-hover);
    --icon-color: var(--background-color-hover);
    background-color: var(--background-color);
    cursor: not-allowed;
}

.toolbar button.enable {
    color: var(--background-color);
    --icon-color: var(--background-color);
    background-color: var(--primary-color-background);
}

.toolbar .left,
.toolbar .right {
    display: flex;
    justify-content: space-between;
    border-bottom: var(--border);
    background-color: var(--background-color);
    overflow-x: auto;
    pointer-events: auto;
}

.toolbar .left {
    border-right: var(--border);
    border-bottom-right-radius: var(--border-radius);
    border-color: var(--background-color-hover);
}

.toolbar .left > button {
    padding: 0 1rem;
}

.toolbar .right {
    border-left: var(--border);
    border-bottom-left-radius: var(--border-radius);
    border-color: var(--background-color-hover);
}

.toolbar .right > button {
    padding: 0 0.75rem;
}

.generate-option.selected {
    color: var(--primary-color);
}
</style>
