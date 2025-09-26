<script setup lang="ts">
import {Handle, type NodeProps, Position} from "@vue-flow/core";
import type {MappedSuperClassNode} from "@/modelEditor/node/MappedSuperClassNode.ts";
import EditList from "@/components/list/selectableList/EditList.vue";
import {createId, getColorVar, getColorIsDark} from "@/modelEditor/useModelEditor.ts";
import MappedSuperClassIdMultiSelect from "@/modelEditor/form/entity/MappedSuperClassIdMultiSelect.vue";
import {defaultScalarProperty} from "@/type/context/default/modelDefaults.ts";
import {computed} from "vue";
import NameCommentEditor from "@/modelEditor/nameComment/NameCommentEditor.vue";
import MappedSuperClassPropertyTypeSelect from "@/modelEditor/form/property/MappedSuperClassPropertyTypeSelect.vue";
import {validateMappedSuperClassProperty} from "@/type/__generated/jsonSchema/items/MappedSuperClassProperty.ts";

const props = defineProps<NodeProps<MappedSuperClassNode["data"]>>()

const beforePaste = (properties: Property[]) => {
    for (const property of properties) {
        property.id = createId("Property")
    }
}

const groupColor = computed(() => {
    return getColorVar(props.data.mappedSuperClass.groupId)
})
const groupTheme = computed(() => {
    return getColorIsDark(props.data.mappedSuperClass.groupId) ? 'dark' : 'light'
})
</script>

<template>
    <div class="mapped-super-class-node" :class="{selected}">
        <Handle :id="data.mappedSuperClass.id" type="target" :position="Position.Bottom"/>

        <div class="mapped-super-class-header">
            <NameCommentEditor v-model="data.mappedSuperClass" :class="groupTheme" style="padding: 2px;"/>
            <span :class="groupTheme" style="color: var(--text-color);">:</span>
            <MappedSuperClassIdMultiSelect style="font-size: 16px; line-height: 32px;" v-model="data.mappedSuperClass.extendsIds"/>
        </div>

        <EditList
            class="mapped-super-class-property-list"
            v-model:lines="data.mappedSuperClass.properties"
            :default-line="defaultScalarProperty"
            :json-schema-validate="validateMappedSuperClassProperty"
            :before-paste="beforePaste"
            @keydown.stop
        >
            <template #line="{item, index}">
                <div class="mapped-super-class-property">
                    <Handle :id="item.id" type="source" :position="Position.Left"/>

                    <div class="mapped-super-class-property-view">
                        <NameCommentEditor :font-size="14" v-model="data.mappedSuperClass.properties[index]"/>
                        <MappedSuperClassPropertyTypeSelect
                            class="noDrag noWheel"
                            style="font-size: 14px; line-height: 30px;"
                            :mapped-super-class="data.mappedSuperClass"
                            v-model="data.mappedSuperClass.properties[index]"
                        />
                    </div>
                </div>
            </template>
        </EditList>
    </div>
</template>

<style scoped>
.mapped-super-class-node {
    overflow: hidden;
    background-color: var(--background-color);
    border: var(--border);
    border-color: v-bind(groupColor);
    border-radius: var(--border-radius);
    border-style: dashed;
}

.mapped-super-class-node.selected {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}

.mapped-super-class-header {
    display: flex;
    gap: 0.4rem;
    padding: 0.5rem;
    background-color: v-bind(groupColor);
}

.mapped-super-class-property-list {
    padding-bottom: 0.5rem;
}

.mapped-super-class-property {
    position: relative;
    padding: 0.25rem 0.75rem;
}

.mapped-super-class-property-list .line-container:first-child > .mapped-super-class-property {
    padding-top: 0.5rem;
}

.mapped-super-class-property-list :deep(.line-container.selected) .name-comment-editor input,
.mapped-super-class-property-list :deep(.line-container.selected) .name-comment-editor .name,
.mapped-super-class-property-list :deep(.line-container.selected) .name-comment-editor .comment {
    color: var(--text-color);
}

.mapped-super-class-property-view {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
}
</style>
