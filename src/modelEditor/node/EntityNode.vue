<script setup lang="ts">
import {Handle, type NodeProps} from "@vue-flow/core";
import type {EntityNode} from "@/modelEditor/node/EntityNode.ts";
import PropertyTypeSelect from "@/modelEditor/form/property/PropertyTypeSelect.vue";
import EditList from "@/components/list/selectableList/EditList.vue";
import {validateProperty} from "@/type/__generated/jsonSchema/items/Property.ts";
import {createId, getColorVar, getColorIsDark} from "@/modelEditor/useModelEditor.ts";
import MappedSuperClassIdMultiSelect from "@/modelEditor/form/entity/MappedSuperClassIdMultiSelect.vue";
import {defaultScalarProperty} from "@/type/context/default/modelDefaults.ts";
import {computed} from "vue";
import NameCommentEditor from "@/modelEditor/nameComment/NameCommentEditor.vue";

const props = defineProps<NodeProps<EntityNode["data"]>>()

const beforePaste = (properties: Property[]) => {
    for (const property of properties) {
        property.id = createId("Property")
    }
}

const groupColor = computed(() => {
    return getColorVar(props.data.entity.groupId)
})
const groupTheme = computed(() => {
    return getColorIsDark(props.data.entity.groupId) ? 'dark' : 'light'
})
</script>

<template>
    <div class="entity-node" :class="{selected}">
        <div class="entity-header">
            <NameCommentEditor v-model="data.entity" :class="groupTheme" style="padding: 2px;"/>
            <span :class="groupTheme" style="color: var(--text-color);">:</span>
            <MappedSuperClassIdMultiSelect style="font-size: 16px; line-height: 32px;" v-model="data.entity.extendsIds"/>
        </div>

        <EditList
            class="entity-property-list"
            v-model:lines="data.entity.properties"
            :default-line="defaultScalarProperty"
            :json-schema-validate="validateProperty"
            :before-paste="beforePaste"
            @keydown.stop
        >
            <template #line="{item, index}">
                <div class="entity-property">
                    <Handle :id="item.id" :style="{transform: 'translateY(-50%)', top: '50%', left: '50%'}"/>

                    <div class="entity-property-view">
                        <NameCommentEditor :font-size="14" v-model="data.entity.properties[index]"/>
                        <PropertyTypeSelect class="noDrag noWheel" style="font-size: 14px; line-height: 30px;" v-model="data.entity.properties[index]"/>
                    </div>
                </div>
            </template>
        </EditList>
    </div>
</template>

<style scoped>
.entity-node {
    overflow: hidden;
    background-color: var(--background-color);
    border: var(--border);
    border-color: v-bind(groupColor);
    border-radius: var(--border-radius);
}

.entity-node.selected {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}

.entity-header {
    display: flex;
    gap: 0.4rem;
    padding: 0.5rem;
    background-color: v-bind(groupColor);
}

.entity-property-list {
    padding-bottom: 0.5rem;
}

.entity-property {
    position: relative;
    padding: 0.25rem 0.75rem;
}

.entity-property-list .line-container:first-child > .entity-property {
    padding-top: 0.5rem;
}

.entity-property-list :deep(.line-container.selected) .name-comment-editor input,
.entity-property-list :deep(.line-container.selected) .name-comment-editor .name,
.entity-property-list :deep(.line-container.selected) .name-comment-editor .comment {
    color: var(--text-color);
}

.entity-property-view {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
}
</style>

