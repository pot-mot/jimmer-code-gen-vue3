<script setup lang="ts">
import {type NodeProps} from "@vue-flow/core";
import type {EnumerationNode} from "@/modelEditor/node/EnumerationNode.ts";
import EditList from "@/components/list/selectableList/EditList.vue";
import {createId, getColorVar, getColorIsDark, useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {defaultEnumerationItem} from "@/modelEditor/default/modelDefaults.ts";
import {validateEnumerationItem} from "@/type/__generated/jsonSchema/items/EnumerationItem.ts";
import {computed, onBeforeUnmount, onMounted, useTemplateRef} from "vue";
import NameCommentEditor from "@/modelEditor/nameComment/NameCommentEditor.vue";
import IconAim from "@/components/icons/IconAim.vue";
import {NodeToolbar} from "@vue-flow/node-toolbar";
import IconDelete from "@/components/icons/IconDelete.vue";
import {modelSubSelectEventBus} from "@/modelEditor/diagnostic/focusDiagnoseSource.ts";
import DiagnoseViewer from "@/modelEditor/diagnostic/DiagnoseViewer.vue";
import IconEnumeration from "@/components/icons/modelEditor/IconEnumeration.vue";
import FilterableSelect from "@/components/select/FilterableSelect.vue";
import {nodeSubElementId} from "@/modelEditor/node/nodeElementId.ts";

const props = defineProps<NodeProps<EnumerationNode["data"]>>()

const groupColor = computed(() => {
    return getColorVar(props.data.enumeration.groupId)
})
const groupTheme = computed(() => {
    return getColorIsDark(props.data.enumeration.groupId) ? 'dark' : 'light'
})

const createEnumItem = () => {
    const item = defaultEnumerationItem()
    item.ordinal = props.data.enumeration.items.length + 1
    while (props.data.enumeration.items.some(it => it.ordinal === item.ordinal)) {
        item.ordinal++
    }
    return item
}

const itemEditListRef = useTemplateRef("itemEditListRef")
const unselectAllItem = () => {
    if (itemEditListRef.value) itemEditListRef.value.selection.cleanSelection()
}
const selectItem = ({enumerationId, itemId}: {enumerationId: string, itemId: string}) => {
    if (enumerationId === props.data.enumeration.id && itemEditListRef.value) {
        const index = props.data.enumeration.items.findIndex(item => item.id === itemId)
        if (index !== -1) itemEditListRef.value.selection.resetSelection([index])
    }
}
onMounted(() => {
    modelSubSelectEventBus.on("unselectAll", unselectAllItem)
    modelSubSelectEventBus.on("selectEnumerationItem", selectItem)
})
onBeforeUnmount(() => {
    modelSubSelectEventBus.off("unselectAll", unselectAllItem)
    modelSubSelectEventBus.off("selectEnumerationItem", selectItem)
})

const {focusNode, focus, remove, modelDiagnoseInfo} = useModelEditor()

const beforePaste = (items: EnumerationItem[]) => {
    const ordinalSet = new Set<number>(props.data.enumeration.items.map(it => it.ordinal))
    for (const item of items) {
        item.id = createId("EnumerationItem")
        if (ordinalSet.has(item.ordinal)) {
            item.ordinal = props.data.enumeration.items.length + 1
            while (ordinalSet.has(item.ordinal)) {
                item.ordinal++
            }
            ordinalSet.add(item.ordinal)
        }
    }
}
</script>

<template>
    <div class="enumeration-node" :class="{selected}">
        <div class="enumeration-header">
            <div class="header-label">
                <IconEnumeration
                    class="header-label-icon"
                />
                <NameCommentEditor
                    v-model="data.enumeration"
                    :class="groupTheme"
                />

                <FilterableSelect
                    v-model="data.enumeration.strategy"
                    :get-id="(it) => it"
                    :options="['NAME', 'ORDINAL']"
                />
            </div>

            <DiagnoseViewer
                :messages="modelDiagnoseInfo.enumerationMap.get(id)?.enumeration"
            />
        </div>

        <EditList
            ref="itemEditListRef"
            class="enumeration-item-list"
            v-model:lines="data.enumeration.items"
            :default-line="createEnumItem"
            :json-schema-validate="validateEnumerationItem"
            :before-paste="beforePaste"
        >
            <template #line="{item, index}">
                <div class="enumeration-item">
                    <div
                        class="enumeration-item-view"
                        v-if="data.enumeration.items[index]"
                        :id="nodeSubElementId(data.enumeration.id, item.id)"
                    >
                        <NameCommentEditor
                            :font-size="14"
                            v-model="data.enumeration.items[index]"
                        />

                        <input
                            style="padding: 0.25rem; border-radius: 0.25rem; width: 3rem;"
                            v-model.number="data.enumeration.items[index].ordinal"
                        >
                    </div>
                    <DiagnoseViewer
                        :messages="modelDiagnoseInfo.enumerationMap.get(id)?.items.get(item.id)"
                    />
                </div>
            </template>
        </EditList>

        <NodeToolbar class="node-toolbar">
            <button @click="focusNode(id); focus()">
                <IconAim/>
            </button>

            <button @click="remove({enumerationIds: [id]}); focus()">
                <IconDelete/>
            </button>
        </NodeToolbar>
    </div>
</template>

<style scoped>
.enumeration-node {
    position: relative;
    overflow: hidden;
    background-color: var(--background-color);
    border: var(--border);
    border-color: var(--border-color-light);
    border-width: 2px;
    top: -1px;
    left: -1px;
    border-radius: var(--border-radius);
    transition: border-color 0.2s ease;
}

.enumeration-node:hover {
    border-color: var(--border-color);
}

.enumeration-node.selected {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}

.enumeration-header {
    padding: 0.5rem;
    background-color: v-bind(groupColor);
    line-height: 1.8rem;
}

.header-label {
    display: flex;
    gap: 0.3rem;
}

.header-label-icon {
    margin-top: 0.3rem;
    --icon-size: 1.2rem;
}

.enumeration-item-list {
    padding-bottom: 0.5rem;
}

.enumeration-item {
    position: relative;
    padding: 0.25rem 0.75rem;
}

.enumeration-item-list .line-container:first-child > .enumeration-item {
    padding-top: 0.5rem;
}

.enumeration-item-list :deep(.line-container.selected) .name-comment-editor input,
.enumeration-item-list :deep(.line-container.selected) .name-comment-editor .name,
.enumeration-item-list :deep(.line-container.selected) .name-comment-editor .comment {
    color: var(--text-color);
}

.enumeration-item-view {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    line-height: 1.8rem;
}
</style>
