<script setup lang="ts">
import {CreateType_CONSTANTS, useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed, nextTick, onBeforeMount, onUnmounted, ref, useTemplateRef} from "vue";
import {judgeTarget, judgeTargetIsInteraction} from "@/utils/event/judgeEventTarget.ts";
import SelectableTree from "@/components/tree/SelectableTree.vue";
import {menuItemToTree, type MenuItemTreeNode} from "@/modelEditor/menu/tree/MenuItemToTree.ts";
import GroupItem from "@/modelEditor/menu/item/GroupItem.vue";
import EntityItem from "@/modelEditor/menu/item/EntityItem.vue";
import MappedSuperClassItem from "@/modelEditor/menu/item/MappedSuperClassItem.vue";
import EmbeddableTypeItem from "@/modelEditor/menu/item/EmbeddableTypeItem.vue";
import EnumerationItem from "@/modelEditor/menu/item/EnumerationItem.vue";
import IconAdd from "@/components/icons/IconAdd.vue";
import DragContainer from "@/components/draggable/DragContainer.vue";
import DragTarget from "@/components/draggable/DragTarget.vue";
import DragSource from "@/components/draggable/DragSource.vue";
import {subIdSetToSubIds} from "@/type/context/utils/ModelSubIds.ts";

const {
    createType,
    waitChangeSync,

    menuMap,
    canMultiSelect,
    enableMultiSelect,
    disableMultiSelect,

    addGroup,
    toggleCurrentGroup,
    executeAsyncBatch,

    remove,
    undo,
    redo,
    saveModel,
    isModelSelectionNotEmpty,
    copy,
    cut,
    paste,

    modelSelection,
} = useModelEditor()

const treeRef = useTemplateRef("treeRef")
const selectedIdSet = computed(() => {
    return treeRef.value?.selectedIdSet
})

const filterKeyword = ref("")

const menuItemTrees = computed(() => {
    return Array.from(menuMap.value.values()).sort((o1, o2) => {
        return o1.group.name.localeCompare(o2.group.name)
    }).map(it => menuItemToTree(it, ({name, comment}) => {
        return name.includes(filterKeyword.value) || comment.includes(filterKeyword.value)
    }))
})

const handleKeyDown = async (e: KeyboardEvent) => {
    if (e.key === "Delete" || e.key === "Backspace") {
        if (judgeTargetIsInteraction(e)) return

        e.preventDefault()
        remove(subIdSetToSubIds(modelSelection.selectedIdSets.value))
    } else if (e.ctrlKey) {
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
            if (!isModelSelectionNotEmpty.value) return

            e.preventDefault()
            await copy()
        } else if (e.key === "x" || e.key === "X") {
            if (judgeTargetIsInteraction(e)) return
            if (!isModelSelectionNotEmpty.value) return

            e.preventDefault()
            await cut()
        } else if (e.key === "v" || e.key === "V") {
            if (judgeTargetIsInteraction(e)) return

            e.preventDefault()
            await paste()
        } else if (e.key === "a" || e.key === "A") {
            if (judgeTargetIsInteraction(e)) return

            e.preventDefault()
            modelSelection.selectAll()
        }
    }
}

const handleClick = (e: MouseEvent) => {
    if (!judgeTarget(e, (el) => el.classList.contains("tree-select"))) {
        if (!canMultiSelect.value) {
            modelSelection.unselectAll()
            selectedIdSet.value?.clear()
        }
    }
}

const handleSelect = ({selected, unselected}: { selected?: MenuItemTreeNode[], unselected?: MenuItemTreeNode[] }) => {
    const oldCanMultiSelect = canMultiSelect.value

    if (!oldCanMultiSelect) {
        enableMultiSelect()
    }

    for (const {data} of unselected ?? []) {
        if (data.type === "Group") {
            modelSelection.unselectGroup(data.group.id)
        } else if (data.type === "Entity") {
            modelSelection.unselectEntity(data.entity.id)
        } else if (data.type === "MappedSuperClass") {
            modelSelection.unselectMappedSuperClass(data.mappedSuperClass.id)
        } else if (data.type === "EmbeddableType") {
            modelSelection.unselectEmbeddableType(data.embeddableType.id)
        } else if (data.type === "Enumeration") {
            modelSelection.unselectEnumeration(data.enumeration.id)
        } else if (data.type === "Association") {
            modelSelection.unselectAssociation(data.association.id)
        }
    }

    for (const {data} of selected ?? []) {
        if (data.type === "Group") {
            modelSelection.selectGroup(data.group.id)
        } else if (data.type === "Entity") {
            modelSelection.selectEntity(data.entity.id)
        } else if (data.type === "MappedSuperClass") {
            modelSelection.selectMappedSuperClass(data.mappedSuperClass.id)
        } else if (data.type === "EmbeddableType") {
            modelSelection.selectEmbeddableType(data.embeddableType.id)
        } else if (data.type === "Enumeration") {
            modelSelection.selectEnumeration(data.enumeration.id)
        } else if (data.type === "Association") {
            modelSelection.selectAssociation(data.association.id)
        }
    }

    if (!oldCanMultiSelect) {
        disableMultiSelect()
    }
}

const handleSelectChange = ({id, selected}: { id: string, selected: boolean }) => {
    if (selected) {
        selectedIdSet.value?.add(id)
    } else {
        selectedIdSet.value?.delete(id)
    }
}

onBeforeMount(() => {
    modelSelection.eventBus.on("group", handleSelectChange)
    modelSelection.eventBus.on("entity", handleSelectChange)
    modelSelection.eventBus.on("mappedSuperClass", handleSelectChange)
    modelSelection.eventBus.on("embeddableType", handleSelectChange)
    modelSelection.eventBus.on("enumeration", handleSelectChange)
    modelSelection.eventBus.on("association", handleSelectChange)
})

onUnmounted(() => {
    modelSelection.eventBus.off("group", handleSelectChange)
    modelSelection.eventBus.off("entity", handleSelectChange)
    modelSelection.eventBus.off("mappedSuperClass", handleSelectChange)
    modelSelection.eventBus.off("embeddableType", handleSelectChange)
    modelSelection.eventBus.off("enumeration", handleSelectChange)
    modelSelection.eventBus.off("association", handleSelectChange)
})

const handleAddGroup = () => {
    const id = addGroup()
    toggleCurrentGroup({id})
}

const changeNodeGroup = (node: MenuItemTreeNode, groupId: string) => {
    if (node.data.type === "Entity") {
        node.data.entity.groupId = groupId
    } else if (node.data.type === "MappedSuperClass") {
        node.data.mappedSuperClass.groupId = groupId
    } else if (node.data.type === "EmbeddableType") {
        node.data.embeddableType.groupId = groupId
    } else if (node.data.type === "Enumeration") {
        node.data.enumeration.groupId = groupId
    }
}

const handleDragEnd = (sourceId: string, targetId: string | null | undefined) => {
    if (!targetId) return
    if (!treeRef.value) return
    const tree = treeRef.value
    const nodes = tree.flatNodes

    const targetNode = nodes.find(it => it.id === targetId)
    if (!targetNode) return
    if (targetNode.data.type !== "Group") return
    const groupId = targetNode.data.group.id
    const selectedIdSet = tree.selectedIdSet

    executeAsyncBatch(Symbol("group:move"), async () => {
        if (selectedIdSet.has(sourceId)) {
            for (const node of nodes) {
                if (selectedIdSet.has(node.id)) {
                    changeNodeGroup(node, groupId)
                }
            }
        } else {
            const sourceNode = nodes.find(it => it.id === sourceId)
            if (!sourceNode) return
            changeNodeGroup(sourceNode, groupId)
        }
        await nextTick()
        await waitChangeSync()
    })
}
</script>

<template>
    <div
        tabindex="-1"
        @keydown="handleKeyDown($event)"
        @click="handleClick($event)"
        class="model-editor-menu"
    >

        <div class="create-type-select">
            <button class="group-create-button" @click="handleAddGroup">
                <IconAdd/>
                <span>Group</span>
            </button>

            <div>
                <button
                    class="create-type-item"
                    :class="{selected: createType === 'Entity'}"
                    @click="createType = 'Entity'"
                >
                    Entity
                </button>
                <button
                    class="create-type-item"
                    :class="{selected: createType === 'Enumeration'}"
                    @click="createType = 'Enumeration'"
                >
                    Enum
                </button>
                <button
                    class="create-type-item"
                    :class="{selected: createType === 'MappedSuperClass'}"
                    @click="createType = 'MappedSuperClass'"
                >
                    AbstractEntity
                </button>
                <button
                    class="create-type-item"
                    :class="{selected: createType === 'EmbeddableType'}"
                    @click="createType = 'EmbeddableType'"
                >
                    Embeddable
                </button>
            </div>
        </div>

        <div class="filter-input">
            <input v-model="filterKeyword">
        </div>

        <DragContainer
            @drag-end="handleDragEnd"
        >
            <SelectableTree
                ref="treeRef"
                :data="menuItemTrees"
                @select="handleSelect"
            >
                <template #default="{data}">
                    <template v-if="data.type === 'Group'">
                        <DragTarget :id="data.group.id">
                            <GroupItem class="menu-item" v-model="data.group"/>
                        </DragTarget>
                    </template>
                    <template v-else-if="data.type === 'Entity'">
                        <DragSource :id="data.entity.id">
                            <EntityItem class="menu-item" v-model="data.entity"/>
                        </DragSource>
                    </template>
                    <template v-else-if="data.type === 'MappedSuperClass'">
                        <DragSource :id="data.mappedSuperClass.id">
                            <MappedSuperClassItem class="menu-item" v-model="data.mappedSuperClass"/>
                        </DragSource>
                    </template>
                    <template v-else-if="data.type === 'EmbeddableType'">
                        <DragSource :id="data.embeddableType.id">
                            <EmbeddableTypeItem class="menu-item" v-model="data.embeddableType"/>
                        </DragSource>
                    </template>
                    <template v-else-if="data.type === 'Enumeration'">
                        <DragSource :id="data.enumeration.id">
                            <EnumerationItem class="menu-item" v-model="data.enumeration"/>
                        </DragSource>
                    </template>
                </template>
            </SelectableTree>

            <template #dragView>
                <div class="drag-view-box"/>
            </template>
        </DragContainer>
    </div>
</template>

<style scoped>
.model-editor-menu {
    height: 100%;
    overflow-y: auto;
    padding-bottom: 5rem;
}

.group-create-button {
    margin: 0.5rem 0 0.2rem 0.5rem;
    padding: 0.2rem;
    cursor: pointer;
}

.create-type-select {
    padding-bottom: 0.5rem;
    border-bottom: 1px dashed var(--background-color-hover);
    margin-bottom: 0.5rem;
}

.create-type-item {
    border: none;
    background-color: transparent;
    padding-left: 0.5rem;
    cursor: pointer;
}

.create-type-item.selected {
    color: var(--primary-color);
}

.filter-input {
    padding: 0 1rem 0 0.5rem;
    margin-bottom: 0.5rem;
}

.filter-input > input {
    width: 100%;
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
}

.menu-item {
    width: 100%;
    min-height: 1.75rem;
    padding-bottom: 0.25rem;
}

.menu-item > :deep(.menu-label) {
    display: flex;
}

.menu-item > :deep(.menu-label) > * {
    flex-shrink: 0;
}

.menu-item > :deep(.menu-label) > .menu-icon {
    margin-right: 0.25rem;
    margin-top: 0.3rem;
}

.menu-item.selected :deep(.name-comment-editor) input,
.menu-item.selected :deep(.name-comment-editor) .name,
.menu-item.selected :deep(.name-comment-editor) .comment {
    color: var(--text-color);
}

.menu-item :deep(.tool) {
    display: none;
    margin-left: 0.5rem;
}

.menu-item:hover :deep(.tool) {
    display: flex;
    gap: 0.5rem;
}

.menu-item :deep(.tool > button) {
    border: none;
    background-color: transparent;
    --icon-color: var(--comment-color);
}

.drag-view-box {
    width: 1rem;
    height: 1rem;
    border: var(--border);
    border-color: var(--primary-color);
}
</style>
