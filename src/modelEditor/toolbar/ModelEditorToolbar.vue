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

const {
    saveModel,
    canUndo,
    canRedo,
    undo,
    redo,
    fitView,
    defaultMouseAction,
    toggleDefaultMouseAction,
} = useModelEditor()

const {
    open: openGenerator
} = useModelGenerator()

const {
    open: openForm
} = useModelEditDialog()
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
        <button @click="openGenerator()">
            <IconDownload/>
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
</style>
