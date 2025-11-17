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
    <div class="toolbar top-left">
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

    <div class="toolbar top-right">
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
</template>

<style scoped>
.toolbar {
    z-index: var(--toolbar-z-index);
    position: absolute;
}

.toolbar button {
    padding: 0 1rem;
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

.toolbar.top-left,
.toolbar.top-right {
    top: 0;
    height: 2rem;
    line-height: 2rem;
    display: flex;
    justify-content: space-around;
    border-bottom: var(--border);
    background-color: var(--background-color);
    max-width: 100%;
    overflow-x: auto;
}

.toolbar.top-left {
    left: 0;
    border-right: var(--border);
    border-color: var(--background-color-hover);
    border-bottom-right-radius: var(--border-radius);
}

.toolbar.top-right {
    right: 0;
    border-left: var(--border);
    border-color: var(--background-color-hover);
    border-bottom-left-radius: var(--border-radius);
}

.generate-option.selected {
    color: var(--primary-color);
}
</style>
