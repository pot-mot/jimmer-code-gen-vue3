<script setup lang="ts">
import {type NodeProps} from "@vue-flow/core";
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
            <FitSizeLineInput class="noDrag" v-model="data.entity.name"/>
            <FitSizeLineInput class="noDrag" v-model="data.entity.comment"/>
            <MappedSuperClassIdMultiSelect v-model="data.entity.extendsIds"/>
        </div>

        <EditList
            v-model:lines="data.entity.properties"
            :default-line="defaultScalarProperty"
            :json-schema-validate="validateProperty"
            :before-paste="beforePaste"
        >
            <template #line="{item, index}">
                <div class="entity-property">
                    <FitSizeLineInput class="noDrag" v-model="item.name"/>
                    <FitSizeLineInput class="noDrag" v-model="item.comment"/>
                    <PropertyTypeSelect class="noDrag" v-model="data.entity.properties[index]"/>
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
    padding: 0.5rem;
}

.entity-node.selected {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}

.entity-header {
    display: flex;
    gap: 0.2rem;
}

.entity-property {
    padding: 0.2rem 0;
    display: flex;
    gap: 0.2rem;
}
</style>
