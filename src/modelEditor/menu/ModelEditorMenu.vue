<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
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
import IconClose from "@/components/icons/IconClose.vue";
import IconSearch from "@/components/icons/IconSearch.vue";
import {translate} from "@/store/i18nStore.ts";
import {useDatabaseDialog} from "@/modelEditor/database/useDatabaseDialog.ts";
import IconDatabaseAdd from "@/components/icons/IconDatabaseAdd.vue";
import {useGroupCreateDialog} from "@/modelEditor/group/useGroupCreateDialog.ts";
import {useModelContextMenu} from "@/modelEditor/contextMenu/useModelContextMenu.ts";

const {
    createType,
    waitChangeSync,

    menuMap,
    canMultiSelect,
    enableMultiSelect,
    disableMultiSelect,

    executeAsyncBatch,

    remove,
    undo,
    redo,
    saveModel,
    copy,
    cut,
    paste,

    modelSelection,
    modelSelectionCount,
} = useModelEditor()

const {
    open: openContextMenu,
} = useModelContextMenu()

const treeRef = useTemplateRef("treeRef")
const selectedIdSet = ref(new Set<string>())

const filterVisible = ref(false)
const filterFocus = ref(false)
const filterInput = useTemplateRef("filterInput")
const filterKeyword = ref("")
const stopFilter = () => {
    filterVisible.value = false
    filterKeyword.value = ""
}

const pageRowTemplate = computed(() => {
    if (filterVisible.value) {
        return 'auto auto auto 1fr'
    } else {
        return 'auto auto 1fr'
    }
})

const menuItemTrees = computed(() => {
    if (filterKeyword.value.length === 0) {
        return Array.from(menuMap.value.values()).sort((o1, o2) => {
            return o1.group.name.localeCompare(o2.group.name)
        }).map(it => menuItemToTree(it))
    } else {
        return Array.from(menuMap.value.values()).sort((o1, o2) => {
            return o1.group.name.localeCompare(o2.group.name)
        }).map(it => menuItemToTree(it, ({name, comment}) => {
            return name.includes(filterKeyword.value) || comment.includes(filterKeyword.value)
        })).filter(it => it.children !== undefined && it.children.length > 0)
    }
})

const menuRef = useTemplateRef("menuRef")

const handleKeyDown = async (e: KeyboardEvent) => {
    if (e.key === "Delete" || e.key === "Backspace") {
        if (judgeTargetIsInteraction(e)) return

        e.preventDefault()
        remove(subIdSetToSubIds(modelSelection.selectedIdSets.value))
        menuRef.value?.focus()
    } else if (e.ctrlKey || e.metaKey) {
        if (e.key === "f" || e.key === "F") {
            e.preventDefault()
            filterVisible.value = true

            await nextTick()
            filterInput.value?.focus()
        } else if (e.key === "z" || e.key === "Z") {
            if (judgeTargetIsInteraction(e)) return

            if (e.shiftKey) {
                e.preventDefault()
                redo()
            } else {
                e.preventDefault()
                undo()
            }
            menuRef.value?.focus()
        } else if (e.key === 'y' || e.key === "Y") {
            if (judgeTargetIsInteraction(e)) return

            e.preventDefault()
            redo()
            menuRef.value?.focus()
        } else if (e.key === "s" || e.key === "S") {
            e.preventDefault()
            await saveModel()
            menuRef.value?.focus()
        } else if (e.key === "c" || e.key === "C") {
            if (judgeTargetIsInteraction(e)) return
            if (modelSelectionCount.value === 0) return

            e.preventDefault()
            await copy()
            menuRef.value?.focus()
        } else if (e.key === "x" || e.key === "X") {
            if (judgeTargetIsInteraction(e)) return
            if (modelSelectionCount.value === 0) return

            e.preventDefault()
            await cut()
            menuRef.value?.focus()
        } else if (e.key === "v" || e.key === "V") {
            if (judgeTargetIsInteraction(e)) return

            e.preventDefault()
            await paste()
            menuRef.value?.focus()
        } else if (e.key === "a" || e.key === "A") {
            if (judgeTargetIsInteraction(e)) return

            e.preventDefault()
            modelSelection.selectAll()
            menuRef.value?.focus()
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

const groupCreateDialog = useGroupCreateDialog()

const handleAddGroup = () => {
    groupCreateDialog.open()
}

const databaseDialog = useDatabaseDialog()
const handleLoadFromDatabase = () => {
    databaseDialog.open()
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

    executeAsyncBatch(Symbol("group:move"), async () => {
        if (selectedIdSet.value.has(sourceId)) {
            for (const node of nodes) {
                if (selectedIdSet.value.has(node.id)) {
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
        ref="menuRef"
        @keydown="handleKeyDown($event)"
        @click="handleClick($event)"
        class="model-editor-menu"

        @contextmenu.capture="(e) => {
            if (judgeTargetIsInteraction(e)) return
            e.preventDefault()
            openContextMenu(
                {type: 'Model'},
                {x: e.clientX, y: e.clientY}
            )
        }"
    >

        <div class="create-type-select">
            <button
                class="create-type-item"
                :class="{selected: createType === 'Entity'}"
                @click="createType = 'Entity'"
            >
                {{ translate('entity') }}
            </button>
            <button
                class="create-type-item"
                :class="{selected: createType === 'Enumeration'}"
                @click="createType = 'Enumeration'"
            >
                {{ translate('enumeration') }}
            </button>
            <button
                class="create-type-item"
                :class="{selected: createType === 'MappedSuperClass'}"
                @click="createType = 'MappedSuperClass'"
            >
                {{ translate('mappedSuperClass') }}
            </button>
            <button
                class="create-type-item"
                :class="{selected: createType === 'EmbeddableType'}"
                @click="createType = 'EmbeddableType'"
            >
                {{ translate('embeddableType') }}
            </button>
        </div>

        <div class="filter-input" :class="{focus: filterFocus}" v-show="filterVisible">
            <div class="filter-icon">
                <IconSearch/>
            </div>
            <input
                ref="filterInput"
                v-model="filterKeyword"
                @focus="filterFocus = true"
                @blur="filterFocus = false"
            >
            <button @click="stopFilter">
                <IconClose/>
            </button>
        </div>

        <div class="menu-operations">
            <button class="group-create-button" @click="handleAddGroup">
                <IconAdd/>
                <span>{{ translate('group_create_button') }}</span>
            </button>

            <button class="load-from-database-button" @click="handleLoadFromDatabase">
                <IconDatabaseAdd/>
                <span>{{ translate('load_from_database_button') }}</span>
            </button>
        </div>

        <DragContainer
            class="menu-item-tree-wrapper"
            @drag-end="handleDragEnd"
        >
            <SelectableTree
                class="menu-item-tree"
                ref="treeRef"
                :data="menuItemTrees"
                v-model:selected-id-set="selectedIdSet"
                @select="handleSelect"
            >
                <template #default="{data}">
                    <template v-if="data.type === 'Group'">
                        <DragTarget :id="data.group.id">
                            <GroupItem
                                class="menu-item"
                                v-model="data.group"
                                @contextmenu="(e: MouseEvent) => {
                                    if (judgeTargetIsInteraction(e)) return
                                    e.preventDefault()
                                    modelSelection.unselectAll()
                                    modelSelection.selectGroup(data.group.id)
                                    openContextMenu(
                                        {type: 'Group', id: data.group.id},
                                        {x: e.clientX, y: e.clientY}
                                    )
                                }"
                            />
                        </DragTarget>
                    </template>
                    <template v-else-if="data.type === 'Entity'">
                        <DragSource :id="data.entity.id">
                            <EntityItem
                                class="menu-item"
                                v-model="data.entity"
                                @contextmenu="(e: MouseEvent) => {
                                    if (judgeTargetIsInteraction(e)) return
                                    e.preventDefault()
                                    modelSelection.unselectAll()
                                    modelSelection.selectEntity(data.entity.id)
                                    openContextMenu(
                                        {type: 'Entity', id: data.entity.id},
                                        {x: e.clientX, y: e.clientY}
                                    )
                                }"
                            />
                        </DragSource>
                    </template>
                    <template v-else-if="data.type === 'MappedSuperClass'">
                        <DragSource :id="data.mappedSuperClass.id">
                            <MappedSuperClassItem
                                class="menu-item"
                                v-model="data.mappedSuperClass"
                                @contextmenu="(e: MouseEvent) => {
                                    if (judgeTargetIsInteraction(e)) return
                                    e.preventDefault()
                                    modelSelection.unselectAll()
                                    modelSelection.selectMappedSuperClass(data.mappedSuperClass.id)
                                    openContextMenu(
                                        {type: 'MappedSuperClass', id: data.mappedSuperClass.id},
                                        {x: e.clientX, y: e.clientY}
                                    )
                                }"
                            />
                        </DragSource>
                    </template>
                    <template v-else-if="data.type === 'EmbeddableType'">
                        <DragSource :id="data.embeddableType.id">
                            <EmbeddableTypeItem
                                class="menu-item"
                                v-model="data.embeddableType"
                                @contextmenu="(e: MouseEvent) => {
                                    if (judgeTargetIsInteraction(e)) return
                                    e.preventDefault()
                                    modelSelection.unselectAll()
                                    modelSelection.selectEmbeddableType(data.embeddableType.id)
                                    openContextMenu(
                                        {type: 'EmbeddableType', id: data.embeddableType.id},
                                        {x: e.clientX, y: e.clientY}
                                    )
                                }"
                            />
                        </DragSource>
                    </template>
                    <template v-else-if="data.type === 'Enumeration'">
                        <DragSource :id="data.enumeration.id">
                            <EnumerationItem
                                class="menu-item"
                                v-model="data.enumeration"
                                @contextmenu="(e: MouseEvent) => {
                                    if (judgeTargetIsInteraction(e)) return
                                    e.preventDefault()
                                    modelSelection.unselectAll()
                                    modelSelection.selectEnumeration(data.enumeration.id)
                                    openContextMenu(
                                        {type: 'Enumeration', id: data.enumeration.id},
                                        {x: e.clientX, y: e.clientY}
                                    )
                                }"
                            />
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
    overflow: hidden;
    display: grid;
    grid-template-rows: v-bind(pageRowTemplate);
    grid-gap: 0.5rem;
}

.create-type-select {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: 0.5rem;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 0.5rem;
    height: 3rem;
    border-bottom: 1px dashed var(--background-color-hover);
}

.create-type-item {
    flex-shrink: 0;
    background-color: transparent;
    padding: 0.25rem;
    border-radius: 0.25rem;
    cursor: pointer;
}

.create-type-item.selected {
    color: var(--primary-color);
}

.filter-input {
    margin: 0 0.5rem;
    display: flex;
    border-radius: 0.5rem;
    overflow: hidden;
    border: var(--border);
    border-color: var(--border-color-light);
}

.filter-input.focus {
    border-color: var(--border-color);
}

.filter-icon {
    padding: 0.25rem;
    line-height: 1rem;
}

.filter-input > input {
    width: 100%;
    padding: 0.25rem 0.5rem 0.25rem 0;
    border: none;
}

.filter-input > button {
    padding: 0.25rem 0.25rem;
    border: none;
}

.menu-operations {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: 0.5rem;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 0 0.5rem;
}

.group-create-button,
.load-from-database-button {
    display: flex;
    flex-wrap: nowrap;
    white-space: nowrap;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0.5rem;
    border-radius: var(--border-radius);
    cursor: pointer;
}

.menu-item-tree-wrapper {
    height: 100%;
    overflow-y: auto;
    width: 100%;
    overflow-x: auto;
    padding-bottom: 30vh;
    scrollbar-gutter: stable;
}

.menu-item {
    width: 100%;
    min-height: 1.75rem;
}

.menu-item > :deep(.menu-label) {
    display: flex;
    white-space: nowrap;
    flex-wrap: nowrap;
    align-items: center;
    position: relative;
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

.drag-view-box {
    width: 1rem;
    height: 1rem;
    border: var(--border);
    border-color: var(--primary-color);
}
</style>
