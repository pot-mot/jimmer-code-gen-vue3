<script setup lang="ts">
import {CreateType_CONSTANTS, useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed, onBeforeMount, onUnmounted, ref, useTemplateRef} from "vue";
import {judgeTarget} from "@/utils/event/judgeEventTarget.ts";
import SelectableTree from "@/components/tree/SelectableTree.vue";
import {menuItemToTree, type MenuItemTreeNode} from "@/modelEditor/menu/tree/MenuItemToTree.ts";
import GroupItem from "@/modelEditor/menu/item/GroupItem.vue";
import EntityItem from "@/modelEditor/menu/item/EntityItem.vue";
import MappedSuperClassItem from "@/modelEditor/menu/item/MappedSuperClassItem.vue";
import EmbeddableTypeItem from "@/modelEditor/menu/item/EmbeddableTypeItem.vue";
import EnumerationItem from "@/modelEditor/menu/item/EnumerationItem.vue";
import IconAdd from "@/components/icons/IconAdd.vue";

const {
    createType,

    menuMap,
    canMultiSelect,
    enableMultiSelect,
    disableMultiSelect,
    clearSelectedIdSets,

    addGroup,
    toggleCurrentGroup,
    remove,

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

const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Delete") {
        e.preventDefault()
        remove({})
    }
}

const handleClick = (e: MouseEvent) => {
    if (!judgeTarget(e, (el) => el.classList.contains("tree-select"))) {
        if (!canMultiSelect.value) {
            clearSelectedIdSets()
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
</script>

<template>
    <div
        tabindex="-1"
        @keydown="handleKeyDown($event)"
        @click="handleClick($event)"
        class="model-editor-menu"
    >

        <div class="create-type-select">
            <div>Create Type</div>
            <div
                v-for="item in CreateType_CONSTANTS"
            >
                <button
                    class="create-type-item"
                    :class="{selected: item === createType}"
                    @click="createType = item"
                >
                    {{ item }}
                </button>
            </div>
        </div>

        <button class="group-create-button" @click="handleAddGroup">
            <IconAdd/>
            <span>Group</span>
        </button>

        <div>
            <input v-model="filterKeyword">
        </div>

        <SelectableTree
            ref="treeRef"
            :data="menuItemTrees"
            @select="handleSelect"
        >
            <template #default="{data}">
                <template v-if="data.type === 'Group'">
                    <GroupItem class="menu-item" v-model="data.group"/>
                </template>
                <template v-else-if="data.type === 'Entity'">
                    <EntityItem class="menu-item" v-model="data.entity"/>
                </template>
                <template v-else-if="data.type === 'MappedSuperClass'">
                    <MappedSuperClassItem class="menu-item" v-model="data.mappedSuperClass"/>
                </template>
                <template v-else-if="data.type === 'EmbeddableType'">
                    <EmbeddableTypeItem class="menu-item" v-model="data.embeddableType"/>
                </template>
                <template v-else-if="data.type === 'Enumeration'">
                    <EnumerationItem class="menu-item" v-model="data.enumeration"/>
                </template>
            </template>
        </SelectableTree>
    </div>
</template>

<style scoped>
.model-editor-menu {
    height: 100%;
    overflow-y: auto;
    padding-bottom: 5rem;
}

.create-type-select {
    padding-bottom: 0.5rem;
    border-bottom: 1px dashed var(--comment-color);
}

.group-create-button {
    margin: 0.5rem 0 0.2rem 0.5rem;
    padding: 0.2rem;
    cursor: pointer;
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

.menu-item {
    display: flex;
    width: 100%;
    height: 1.5rem;
    font-size: 0.9rem;
}

.menu-item :deep(button) {
    border: none;
    background-color: transparent;
    --icon-color: var(--comment-color);
}
</style>
