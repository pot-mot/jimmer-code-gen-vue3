<script setup lang="ts">
import {type NodeProps} from "@vue-flow/core";
import type {EnumerationNode} from "@/modelEditor/node/EnumerationNode.ts";
import EditList from "@/components/list/selectableList/EditList.vue";
import {createId, getColorVar, getColorIsDark} from "@/modelEditor/useModelEditor.ts";
import {defaultEnumerationItem} from "@/type/context/default/modelDefaults.ts";
import {validateEnumerationItem} from "@/type/__generated/jsonSchema/items/EnumerationItem.ts";
import {computed} from "vue";
import NameCommentEditor from "@/modelEditor/nameComment/NameCommentEditor.vue";

const props = defineProps<NodeProps<EnumerationNode["data"]>>()

const beforePaste = (items: EnumerationItem[]) => {
    for (const item of items) {
        item.id = createId("EnumerationItem")
    }
}

const groupColor = computed(() => {
    return getColorVar(props.data.enumeration.groupId)
})
const groupTheme = computed(() => {
    return getColorIsDark(props.data.enumeration.groupId) ? 'dark' : 'light'
})
</script>

<template>
    <div class="enumeration-node" :class="{selected}">
        <div class="enumeration-header">
            <NameCommentEditor v-model="data.enumeration" :class="groupTheme" style="padding: 2px;"/>
        </div>

        <EditList
            class="enumeration-item-list"
            v-model:lines="data.enumeration.items"
            :default-line="defaultEnumerationItem"
            :json-schema-validate="validateEnumerationItem"
            :before-paste="beforePaste"
            @keydown.stop
        >
            <template #line="{index}">
                <div class="enumeration-item">
                    <div class="enumeration-item-view">
                        <NameCommentEditor :font-size="14" v-model="data.enumeration.items[index]"/>
                    </div>
                </div>
            </template>
        </EditList>
    </div>
</template>

<style scoped>
.enumeration-node {
    overflow: hidden;
    background-color: var(--background-color);
    border: var(--border);
    border-color: v-bind(groupColor);
    border-radius: var(--border-radius);
}

.enumeration-node.selected {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}

.enumeration-header {
    display: flex;
    gap: 0.4rem;
    padding: 0.5rem;
    background-color: v-bind(groupColor);
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
}
</style>
