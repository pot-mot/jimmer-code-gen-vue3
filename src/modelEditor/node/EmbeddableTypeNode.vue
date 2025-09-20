<script setup lang="ts">
import {type NodeProps} from "@vue-flow/core";
import type {EmbeddableTypeNode} from "@/modelEditor/node/EmbeddableTypeNode.ts";
import FitSizeLineInput from "@/components/input/FitSizeLineInput.vue";
import EditList from "@/components/list/selectableList/EditList.vue";
import {createId} from "@/modelEditor/useModelEditor.ts";
import {defaultScalarProperty} from "@/type/context/default/modelDefaults.ts";
import EmbeddableTypePropertySelect from "@/modelEditor/form/property/EmbeddableTypePropertySelect.vue";
import {validateEmbeddableTypeProperty} from "@/type/__generated/jsonSchema/items/EmbeddableTypeProperty.ts";

defineProps<NodeProps<EmbeddableTypeNode["data"]>>()

const beforePaste = (properties: Property[]) => {
    for (const property of properties) {
        property.id = createId("Property")
    }
}
</script>

<template>
    <div class="embeddable-type-node" :class="{selected}">
        <div class="embeddable-type-header">
            <FitSizeLineInput class="noDrag" :line-height="16" :font-size="16" v-model="data.embeddableType.name"/>
            <FitSizeLineInput class="noDrag" :line-height="16" :font-size="16" v-model="data.embeddableType.comment"/>
        </div>

        <EditList
            v-model:lines="data.embeddableType.properties"
            :default-line="defaultScalarProperty"
            :json-schema-validate="validateEmbeddableTypeProperty"
            :before-paste="beforePaste"
            @keydown.stop
        >
            <template #line="{item, index}">
                <div class="embeddable-type-property">
                    <div class="embeddable-type-property-view">
                        <span>
                            <FitSizeLineInput class="noDrag" :line-height="14" :font-size="14" v-model="item.name"/>
                            <FitSizeLineInput class="noDrag" :line-height="14" :font-size="14" v-model="item.comment"/>
                        </span>
                        <EmbeddableTypePropertySelect class="noDrag noWheel" style="font-size: 14px; line-height: 30px;" v-model="data.embeddableType.properties[index]"/>
                    </div>
                </div>
            </template>
        </EditList>
    </div>
</template>

<style scoped>
.embeddable-type-node {
    background-color: var(--background-color);
    border: var(--border);
    border-radius: var(--border-radius);
    border-style: dotted;
}

.embeddable-type-node.selected {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}

.embeddable-type-header {
    display: flex;
    gap: 0.4em;
    padding: 0.75em 0.5em 0.25em;
}

.embeddable-type-property {
    position: relative;
    padding: 0.25em 0.75em;
}

.embeddable-type-property-view {
    display: flex;
    justify-content: space-between;
    gap: 0.5em;
}
</style>
