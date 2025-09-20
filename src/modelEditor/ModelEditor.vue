<script setup lang="ts">
import ModelEditorBackground from "@/modelEditor/background/ModelEditorBackground.vue";
import {useModelEditor, VUE_FLOW_ID} from "@/modelEditor/useModelEditor.ts";
import {VueFlow} from "@vue-flow/core";
import EntityNode from "@/modelEditor/node/EntityNode.vue";
import MappedSuperClassNode from "@/modelEditor/node/MappedSuperClassNode.vue";
import EnumerationNode from "@/modelEditor/node/EnumerationNode.vue";
import EmbeddableTypeNode from "@/modelEditor/node/EmbeddableTypeNode.vue";
import {onMounted} from "vue";
import ModelEditorToolbar from "@/modelEditor/toolbar/ModelEditorToolbar.vue";
import {judgeTargetIsInteraction} from "@/utils/event/judgeEventTarget.ts";

const {
    initModelEditor,
    viewport,

    undo,
    redo,
    saveModel,
    isGraphSelectionNotEmpty,
    copy,
    cut,
    paste,
} = useModelEditor()

onMounted(() => {
    initModelEditor()
})

const handleKeyDown = async (e: KeyboardEvent) => {
    if (e.ctrlKey) {
        // 按下 Ctrl + z 键，进行历史记录的撤回重做
        if ((e.key === "z" || e.key === "Z")) {
            if (judgeTargetIsInteraction(e)) return

            if (e.shiftKey) {
                e.preventDefault()
                redo()
            } else {
                e.preventDefault()
                undo()
            }
        } else if (e.key === 'y' || e.key === "Y") {
            if (judgeTargetIsInteraction(e)) return

            e.preventDefault()
            redo()
        } else if (e.key === "s" || e.key === "S") {
            e.preventDefault()
            await saveModel()
        } else if (e.key === "c" || e.key === "C") {
            if (judgeTargetIsInteraction(e)) return
            if (!isGraphSelectionNotEmpty.value) return

            e.preventDefault()
            await copy()
        } else if (e.key === "x" || e.key === "X") {
            if (judgeTargetIsInteraction(e)) return
            if (!isGraphSelectionNotEmpty.value) return

            e.preventDefault()
            await cut()
        } else if (e.key === "v" || e.key === "V") {
            if (judgeTargetIsInteraction(e)) return

            e.preventDefault()
            await paste()
        }
    }
}
</script>

<template>
    <div
        tabindex="-1"
        @keydown="handleKeyDown"
        class="model-editor-wrapper"
    >
        <ModelEditorBackground :viewport="viewport"/>

        <VueFlow
            :id="VUE_FLOW_ID"
            class="model-editor-vue-flow"
            tabindex="-1"
            :min-zoom="0.1"
            :max-zoom="10"
            :edge-updater-radius="5"
            :zoom-on-pinch="false"
            :zoom-on-double-click="false"
            :edges-updatable="true"
            :multi-selection-key-code="null"
            :connect-on-click="false"
            :select-nodes-on-drag="false"
            :selection-key-code="false"

            no-drag-class-name="noDrag"
            no-wheel-class-name="noWheel"
        >
            <template #node-ENTITY="nodeProps">
                <EntityNode v-bind="nodeProps"/>
            </template>
            <template #node-MAPPED_SUPER_CLASS="nodeProps">
                <MappedSuperClassNode v-bind="nodeProps"/>
            </template>
            <template #node-ENUMERATION="nodeProps">
                <EnumerationNode v-bind="nodeProps"/>
            </template>
            <template #node-EMBEDDABLE_TYPE="nodeProps">
                <EmbeddableTypeNode v-bind="nodeProps"/>
            </template>
        </VueFlow>

        <ModelEditorToolbar/>
    </div>
</template>

<style scoped>
.model-editor-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
}

.model-editor-vue-flow {
    width: 100%;
    height: 100%;
    background-color: transparent;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
}

:deep(.vue-flow__nodesselection-rect) {
    box-sizing: content-box;
    border-radius: var(--border-radius);
    border-style: solid;
    border-color: var(--primary-color);
    padding: 1rem;
    transform: translateX(-1rem) translateY(-1rem);
}

:deep(.vue-flow__pane.draggable) {
    cursor: default;
}

:deep(.vue-flow__pane.dragged-view) {
    cursor: default;
}

:deep(.vue-flow__selection) {
    border: var(--border);
    border-color: var(--primary-color);
    background-color: var(--primary-color-opacity-background);
}
</style>