<script setup lang="ts">
import {type NodeProps} from "@vue-flow/core";
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
            <FitSizeLineInput class="noDrag" v-model="data.mappedSuperClass.name"/>
            <FitSizeLineInput class="noDrag" v-model="data.mappedSuperClass.comment"/>
            <MappedSuperClassIdMultiSelect v-model="data.mappedSuperClass.extendsIds"/>
        </div>

        <EditList
            v-model:lines="data.mappedSuperClass.properties"
            :default-line="defaultScalarProperty"
            :json-schema-validate="validateProperty"
            :before-paste="beforePaste"
        >
            <template #line="{item, index}">
                <div class="mapped-super-class-property">
                    <FitSizeLineInput class="noDrag" v-model="item.name"/>
                    <FitSizeLineInput class="noDrag" v-model="item.comment"/>
                    <PropertyTypeSelect class="noDrag" v-model="data.mappedSuperClass.properties[index]"/>
                    <input type="checkbox" class="noDrag" v-model="item.nullable">
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
    padding: 0.5rem;
    border-style: dashed;
}

.mapped-super-class-node.selected {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}

.mapped-super-class-header {
    display: flex;
    gap: 0.2rem;
}

.mapped-super-class-property {
    padding: 0.2rem 0;
    display: flex;
    gap: 0.2rem;
}
</style>
