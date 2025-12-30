<script setup lang="ts">
import ModelEditorBackground from "@/modelEditor/background/ModelEditorBackground.vue";
import {useModelEditor, VUE_FLOW_ID} from "@/modelEditor/useModelEditor.ts";
import {VueFlow} from "@vue-flow/core";
import EntityNode from "@/modelEditor/node/EntityNode.vue";
import MappedSuperClassNode from "@/modelEditor/node/MappedSuperClassNode.vue";
import EnumerationNode from "@/modelEditor/node/EnumerationNode.vue";
import EmbeddableTypeNode from "@/modelEditor/node/EmbeddableTypeNode.vue";
import {onBeforeUnmount, onMounted} from "vue";
import ModelEditorToolbar from "@/modelEditor/toolbar/ModelEditorToolbar.vue";
import {judgeTargetIsInteraction} from "@/utils/event/judgeEventTarget.ts";
import ConcreteAssociationEdge from "@/modelEditor/edge/ConcreteAssociationEdge.vue";
import AbstractAssociationEdge from "@/modelEditor/edge/AbstractAssociationEdge.vue";
import ModelEditorSelectionRect from "@/modelEditor/selectionRect/ModelEditorSelectionRect.vue";
import {useModelContextMenu} from "@/modelEditor/contextMenu/useModelContextMenu.ts";
import {subIdSetToSubIds} from "@/modelEditor/utils/ModelSubIds.ts";

const {
    initModelEditor,
    destroyModelEditor,
    viewport,

    undo,
    redo,
    saveModel,
    selectionRect,
    modelSelection,
    graphSelection,
    enableMultiSelect,
    disableMultiSelect,
    toggleDefaultMouseAction,
    copy,
    cut,
    paste,
    focus,
    remove,
} = useModelEditor()

onMounted(() => {
    initModelEditor()
})
onBeforeUnmount(() => {
    destroyModelEditor()
})

const {
    open: openContextMenu,
} = useModelContextMenu()

const handleKeyDown = async (e: KeyboardEvent) => {
    // 按下 Delete 键删除选中的节点和边
    if (e.key === "Delete" || e.key === "Backspace") {
        if (judgeTargetIsInteraction(e)) return

        e.preventDefault()
        remove(subIdSetToSubIds(modelSelection.selectedIdSets.value))
        focus()
    }

    // 按下 Ctrl 键进入多选模式，直到松开 Ctrl 键
    else if (e.key === "Control") {
        if (judgeTargetIsInteraction(e)) return

        enableMultiSelect()
        focus()
        document.documentElement.addEventListener('keyup', (e) => {
            if (e.key === "Control" || e.ctrlKey) {
                disableMultiSelect()
            }
        }, {once: true})
    }

    // 按下 Shift 键进入框选模式，直到松开 Shift 键
    else if (e.key === "Shift") {
        if (judgeTargetIsInteraction(e)) return

        toggleDefaultMouseAction()
        focus()
        document.documentElement.addEventListener('keyup', (e) => {
            if (e.key === "Shift" || e.shiftKey) {
                toggleDefaultMouseAction()
            }
        }, {once: true})
    }

    else if (e.ctrlKey || e.metaKey) {
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
            focus()
        } else if (e.key === 'y' || e.key === "Y") {
            if (judgeTargetIsInteraction(e)) return

            e.preventDefault()
            redo()
            focus()
        }

        // 按下 Ctrl + s 键，保存模型
        else if (e.key === "s" || e.key === "S") {
            e.preventDefault()
            await saveModel()
            focus()
        }

        // 剪切板快捷键
        else if (e.key === "c" || e.key === "C") {
            if (judgeTargetIsInteraction(e)) return
            if (graphSelection.selectedCount.value < 1) return

            e.preventDefault()
            await copy()
            focus()
        } else if (e.key === "x" || e.key === "X") {
            if (judgeTargetIsInteraction(e)) return
            if (graphSelection.selectedCount.value < 1) return

            e.preventDefault()
            await cut()
            focus()
        } else if (e.key === "v" || e.key === "V") {
            if (judgeTargetIsInteraction(e)) return

            e.preventDefault()
            await paste()
            focus()
        }

        // 全选
        else if (e.key === "a" || e.key === "A") {
            if (judgeTargetIsInteraction(e)) return

            e.preventDefault()

            graphSelection.selectAll()
            focus()
        }
    }
}
</script>

<template>
    <div
        tabindex="-1"
        class="model-editor-wrapper"
        @keydown="handleKeyDown"
        @mouseenter="focus"
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
            :edges-updatable="false"
            :multi-selection-key-code="null"
            :connect-on-click="false"
            :select-nodes-on-drag="false"
            :selection-key-code="false"
            :delete-key-code="() => false"

            no-drag-class-name="no-drag"
            no-wheel-class-name="no-wheel"
            :disable-keyboard-a11y="true"

            @contextmenu.capture="(e: MouseEvent) => {
                if (judgeTargetIsInteraction(e)) return
                e.preventDefault()
                openContextMenu(
                    {type: 'Model'},
                    {x: e.clientX, y: e.clientY}
                )
            }"
        >
            <template #node-ENTITY="nodeProps">
                <EntityNode
                    v-bind="nodeProps"
                    @contextmenu="(e: MouseEvent) => {
                        if (judgeTargetIsInteraction(e)) return
                        e.preventDefault()
                        modelSelection.unselectAll()
                        modelSelection.selectEntity(nodeProps.id)
                        openContextMenu(
                            {type: 'Entity', id: nodeProps.id},
                            {x: e.clientX, y: e.clientY}
                        )
                    }"
                />
            </template>
            <template #node-MAPPED_SUPER_CLASS="nodeProps">
                <MappedSuperClassNode
                    v-bind="nodeProps"
                    @contextmenu="(e: MouseEvent) => {
                        if (judgeTargetIsInteraction(e)) return
                        e.preventDefault()
                        modelSelection.unselectAll()
                        modelSelection.selectMappedSuperClass(nodeProps.id)
                        openContextMenu(
                            {type: 'MappedSuperClass', id: nodeProps.id},
                            {x: e.clientX, y: e.clientY}
                        )
                    }"
                />
            </template>
            <template #node-ENUMERATION="nodeProps">
                <EnumerationNode
                    v-bind="nodeProps"
                    @contextmenu="(e: MouseEvent) => {
                        if (judgeTargetIsInteraction(e)) return
                        e.preventDefault()
                        modelSelection.unselectAll()
                        modelSelection.selectEnumeration(nodeProps.id)
                        openContextMenu(
                            {type: 'Enumeration', id: nodeProps.id},
                            {x: e.clientX, y: e.clientY}
                        )
                    }"
                />
            </template>
            <template #node-EMBEDDABLE_TYPE="nodeProps">
                <EmbeddableTypeNode
                    v-bind="nodeProps"
                    @contextmenu="(e: MouseEvent) => {
                        modelSelection.unselectAll()
                        modelSelection.selectEmbeddableType(nodeProps.id)
                        openContextMenu(
                            {type: 'EmbeddableType', id: nodeProps.id},
                            {x: e.clientX, y: e.clientY}
                        )
                    }"
                />
            </template>
            <template #edge-CONCRETE_ASSOCIATION="edgeProps">
                <ConcreteAssociationEdge
                    v-bind="edgeProps"
                    @contextmenu="(e: MouseEvent) => {
                        if (judgeTargetIsInteraction(e)) return
                        e.preventDefault()
                        modelSelection.unselectAll()
                        modelSelection.selectAssociation(edgeProps.id)
                        openContextMenu(
                            {type: 'ConcreteAssociation', id: edgeProps.id},
                            {x: e.clientX, y: e.clientY}
                        )
                    }"
                />
            </template>
            <template #edge-ABSTRACT_ASSOCIATION="edgeProps">
                <AbstractAssociationEdge
                    v-bind="edgeProps"
                    @contextmenu="(e: MouseEvent) => {
                        if (judgeTargetIsInteraction(e)) return
                        e.preventDefault()
                        modelSelection.unselectAll()
                        modelSelection.selectAssociation(edgeProps.id)
                        openContextMenu(
                            {type: 'AbstractAssociation', id: edgeProps.id},
                            {x: e.clientX, y: e.clientY}
                        )
                    }"
                />
            </template>
        </VueFlow>

        <ModelEditorSelectionRect :rect="selectionRect"/>

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

:deep(.node-toolbar),
:deep(.edge-toolbar) {
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: center;
    gap: 0.5rem;
}

:deep(.node-toolbar) > button,
:deep(.edge-toolbar) > button {
    padding: 0.25rem;
    margin-right: 0.25rem;
    margin-top: 0.25rem;
    border-color: var(--background-color-hover);
    border-radius: 0.25rem;
}
</style>