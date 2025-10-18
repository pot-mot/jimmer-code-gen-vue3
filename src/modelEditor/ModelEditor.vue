<script setup lang="ts">
import ModelEditorBackground from "@/modelEditor/background/ModelEditorBackground.vue";
import {useModelEditor, VUE_FLOW_ID} from "@/modelEditor/useModelEditor.ts";
import {VueFlow} from "@vue-flow/core";
import EntityNode from "@/modelEditor/node/EntityNode.vue";
import MappedSuperClassNode from "@/modelEditor/node/MappedSuperClassNode.vue";
import EnumerationNode from "@/modelEditor/node/EnumerationNode.vue";
import EmbeddableTypeNode from "@/modelEditor/node/EmbeddableTypeNode.vue";
import {onBeforeUnmount, onMounted, ref} from "vue";
import ModelEditorToolbar from "@/modelEditor/toolbar/ModelEditorToolbar.vue";
import {judgeTargetIsInteraction} from "@/utils/event/judgeEventTarget.ts";
import ConcreteAssociationEdge from "@/modelEditor/edge/ConcreteAssociationEdge.vue";
import AbstractAssociationEdge from "@/modelEditor/edge/AbstractAssociationEdge.vue";
import ModelEditorSelectionRect from "@/modelEditor/selectionRect/ModelEditorSelectionRect.vue";
import ModelGenerator from "@/modelEditor/generator/ModelGenerator.vue";
import {defaultModelSubIds} from "@/type/context/utils/ModelSubIds.ts";
import {NodeType_Entity} from "@/modelEditor/node/EntityNode.ts";
import {NodeType_MappedSuperClass} from "@/modelEditor/node/MappedSuperClassNode.ts";
import {NodeType_EmbeddableType} from "@/modelEditor/node/EmbeddableTypeNode.ts";
import {NodeType_Enumeration} from "@/modelEditor/node/EnumerationNode.ts";
import {EdgeType_ConcreteAssociation} from "@/modelEditor/edge/ConcreteAssociationEdge.ts";
import {EdgeType_AbstractAssociation} from "@/modelEditor/edge/AbstractAssociationEdge.ts";

const {
    initModelEditor,
    viewport,

    undo,
    redo,
    saveModel,
    selectionRect,
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

const isPointerEnter = ref(false)

onMounted(() => {
    document.addEventListener("keydown", handleKeyDown)
})
onBeforeUnmount(() => {
    document.removeEventListener("keydown", handleKeyDown)
})
const handleKeyDown = async (e: KeyboardEvent) => {
    if (!isPointerEnter.value) return

    // 按下 Delete 键删除选中的节点和边
    if (e.key === "Delete" || e.key === "Backspace") {
        if (judgeTargetIsInteraction(e)) return

        e.preventDefault()
        const ids = defaultModelSubIds()
        const {nodes, edges} = graphSelection.get()
        for (const node of nodes) {
            if (node.type === NodeType_Entity) {
                ids.entityIds.push(node.id)
            } else if (node.type === NodeType_MappedSuperClass) {
                ids.mappedSuperClassIds.push(node.id)
            } else if (node.type === NodeType_EmbeddableType) {
                ids.embeddableTypeIds.push(node.id)
            } else if (node.type === NodeType_Enumeration) {
                ids.enumerationIds.push(node.id)
            }
        }
        for (const edge of edges) {
            if (edge.type === EdgeType_ConcreteAssociation) {
                ids.associationIds.push(edge.id)
            } else if (edge.type === EdgeType_AbstractAssociation) {
                ids.associationIds.push(edge.id)
            }
        }
        remove(ids)
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

    else if (e.ctrlKey) {
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
        @pointerenter="isPointerEnter = true"
        @pointerleave="isPointerEnter = false"
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

            no-drag-class-name="noDrag"
            no-wheel-class-name="noWheel"
            :disable-keyboard-a11y="true"
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
            <template #edge-CONCRETE_ASSOCIATION="edgeProps">
                <ConcreteAssociationEdge v-bind="edgeProps"/>
            </template>
            <template #edge-ABSTRACT_ASSOCIATION="edgeProps">
                <AbstractAssociationEdge v-bind="edgeProps"/>
            </template>
        </VueFlow>

        <ModelEditorSelectionRect :rect="selectionRect"/>

        <ModelEditorToolbar/>

        <ModelGenerator/>
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
    padding: 0.3rem;
    margin-right: 0.3rem;
    margin-top: 0.3rem;
    transition: background-color 0.3s ease;
}
</style>