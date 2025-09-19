<script setup lang="ts">
import {Handle, type NodeProps} from "@vue-flow/core";
import type {EntityNode} from "@/modelEditor/node/EntityNode.ts";
import PropertyTypeSelect from "@/modelEditor/form/property/PropertyTypeSelect.vue";
import FitSizeLineInput from "@/components/input/FitSizeLineInput.vue";
import EditList from "@/components/list/selectableList/EditList.vue";
import {validateProperty} from "@/type/__generated/jsonSchema/items/Property.ts";
import {createId} from "@/modelEditor/useModelEditor.ts";
import MappedSuperClassIdMultiSelect from "@/modelEditor/form/entity/MappedSuperClassIdMultiSelect.vue";
import {defaultScalarProperty} from "@/type/context/default/modelDefaults.ts";

defineProps<NodeProps<EntityNode["data"]>>()

const beforePaste = (properties: Property[]) => {
    for (const property of properties) {
        property.id = createId("Property")
    }
}
</script>

<template>
    <div class="entity-node" :class="{selected}">
        <div class="entity-header">
            <FitSizeLineInput class="noDrag" :line-height="16" :font-size="16" v-model="data.entity.name"/>
            <FitSizeLineInput class="noDrag" :line-height="16" :font-size="16" v-model="data.entity.comment"/>
            <MappedSuperClassIdMultiSelect style="font-size: 16px; line-height: 32px;" v-model="data.entity.extendsIds"/>
        </div>

        <EditList
            v-model:lines="data.entity.properties"
            :default-line="defaultScalarProperty"
            :json-schema-validate="validateProperty"
            :before-paste="beforePaste"
        >
            <template #line="{item, index}">
                <div class="entity-property">
                    <Handle :id="item.id" :style="{transform: 'translateY(-50%)', top: '50%', left: '50%'}"/>

                    <div class="entity-property-view">
                        <span>
                            <FitSizeLineInput class="noDrag" :line-height="14" :font-size="14" v-model="item.name"/>
                            <FitSizeLineInput class="noDrag" :line-height="14" :font-size="14" v-model="item.comment"/>
                        </span>
                        <PropertyTypeSelect style="font-size: 14px; line-height: 30px;" v-model="data.entity.properties[index]"/>
                    </div>
                </div>
            </template>
        </EditList>
    </div>
</template>

<style scoped>
.entity-node {
    background-color: var(--background-color);
    border: var(--border);
    border-radius: var(--border-radius);
}

.entity-node.selected {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}

.entity-header {
    display: flex;
    gap: 0.4em;
    padding: 0.75em 0.5em 0.25em;
}

.entity-property {
    position: relative;
    padding: 0.25em 0.75em;
}

.entity-property-view {
    display: flex;
    justify-content: space-between;
    gap: 0.5em;
}
</style>
