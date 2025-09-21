<script setup lang="ts">
import {type NodeProps} from "@vue-flow/core";
import type {EnumerationNode} from "@/modelEditor/node/EnumerationNode.ts";
import FitSizeLineInput from "@/components/input/FitSizeLineInput.vue";
import EditList from "@/components/list/selectableList/EditList.vue";
import {createId, getColorVar} from "@/modelEditor/useModelEditor.ts";
import {defaultEnumerationItem} from "@/type/context/default/modelDefaults.ts";
import {validateEnumerationItem} from "@/type/__generated/jsonSchema/items/EnumerationItem.ts";
import {computed} from "vue";

const props = defineProps<NodeProps<EnumerationNode["data"]>>()

const beforePaste = (items: EnumerationItem[]) => {
    for (const item of items) {
        item.id = createId("EnumerationItem")
    }
}


const groupColor = computed(() => {
    return getColorVar(props.data.enumeration.groupId)
})
</script>

<template>
    <div class="enumeration-node" :class="{selected}">
        <div class="enumeration-header">
            <FitSizeLineInput class="noDrag" :line-height="16" :font-size="16" v-model="data.enumeration.name"/>
            <FitSizeLineInput class="noDrag" :line-height="16" :font-size="16" v-model="data.enumeration.comment"/>
        </div>

        <EditList
            v-model:lines="data.enumeration.items"
            :default-line="defaultEnumerationItem"
            :json-schema-validate="validateEnumerationItem"
            :before-paste="beforePaste"
            @keydown.stop
        >
            <template #line="{item}">
                <div class="enumeration-item">
                    <div class="enumeration-item-view">
                        <span>
                            <FitSizeLineInput class="noDrag" :line-height="14" :font-size="14" v-model="item.name"/>
                            <FitSizeLineInput class="noDrag" :line-height="14" :font-size="14" v-model="item.comment"/>
                        </span>
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
    gap: 0.4em;
    padding: 0.75em 0.5em 0.25em;
    background-color: v-bind(groupColor);
}

.enumeration-item {
    position: relative;
    padding: 0.25em 0.75em;
}

.enumeration-item-view {
    display: flex;
    justify-content: space-between;
    gap: 0.5em;
}
</style>
