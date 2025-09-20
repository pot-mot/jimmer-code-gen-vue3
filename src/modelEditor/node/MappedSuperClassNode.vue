<script setup lang="ts">
import {Handle, type NodeProps} from "@vue-flow/core";
import type {MappedSuperClassNode} from "@/modelEditor/node/MappedSuperClassNode.ts";
import PropertyTypeSelect from "@/modelEditor/form/property/PropertyTypeSelect.vue";
import FitSizeLineInput from "@/components/input/FitSizeLineInput.vue";
import {validateProperty} from "@/type/__generated/jsonSchema/items/Property.ts";
import EditList from "@/components/list/selectableList/EditList.vue";
import {createId} from "@/modelEditor/useModelEditor.ts";
import MappedSuperClassIdMultiSelect from "@/modelEditor/form/entity/MappedSuperClassIdMultiSelect.vue";
import {defaultScalarProperty} from "@/type/context/default/modelDefaults.ts";

defineProps<NodeProps<MappedSuperClassNode["data"]>>()

const beforePaste = (properties: Property[]) => {
    for (const property of properties) {
        property.id = createId("Property")
    }
}
</script>

<template>
    <div class="mapped-super-class-node" :class="{selected}">
        <div class="mapped-super-class-header">
            <FitSizeLineInput class="noDrag" :line-height="16" :font-size="16" v-model="data.mappedSuperClass.name"/>
            <FitSizeLineInput class="noDrag" :line-height="16" :font-size="16" v-model="data.mappedSuperClass.comment"/>
            <MappedSuperClassIdMultiSelect style="font-size: 16px; line-height: 32px;" v-model="data.mappedSuperClass.extendsIds"/>
        </div>

        <EditList
            v-model:lines="data.mappedSuperClass.properties"
            :default-line="defaultScalarProperty"
            :json-schema-validate="validateProperty"
            :before-paste="beforePaste"
            @keydown.stop
        >
            <template #line="{item, index}">
                <div class="mapped-super-class-property">
                    <Handle :id="item.id" :style="{transform: 'translateY(-50%)', top: '50%', left: '50%'}"/>

                    <div class="mapped-super-class-property-view">
                        <span>
                            <FitSizeLineInput class="noDrag" :line-height="14" :font-size="14" v-model="item.name"/>
                            <FitSizeLineInput class="noDrag" :line-height="14" :font-size="14" v-model="item.comment"/>
                        </span>
                        <PropertyTypeSelect class="noDrag noWheel" style="font-size: 14px; line-height: 30px;" v-model="data.mappedSuperClass.properties[index]"/>
                    </div>
                </div>
            </template>
        </EditList>
    </div>
</template>

<style scoped>
.mapped-super-class-node {
    background-color: var(--background-color);
    border: var(--border);
    border-radius: var(--border-radius);
    border-style: dashed;
}

.mapped-super-class-node.selected {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}

.mapped-super-class-header {
    display: flex;
    gap: 0.4em;
    padding: 0.75em 0.5em 0.25em;
}

.mapped-super-class-property {
    position: relative;
    padding: 0.25em 0.75em;
}

.mapped-super-class-property-view {
    display: flex;
    justify-content: space-between;
    gap: 0.5em;
}
</style>
