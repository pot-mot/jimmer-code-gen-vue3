<script setup lang="ts">
import {type NodeProps} from "@vue-flow/core";
import type {EmbeddableTypeNode} from "@/modelEditor/node/EmbeddableTypeNode.ts";
import EditList from "@/components/list/selectableList/EditList.vue";
import {createId, getColorVar} from "@/modelEditor/useModelEditor.ts";
import {defaultScalarProperty} from "@/type/context/default/modelDefaults.ts";
import EmbeddableTypePropertySelect from "@/modelEditor/form/property/EmbeddableTypePropertySelect.vue";
import {validateEmbeddableTypeProperty} from "@/type/__generated/jsonSchema/items/EmbeddableTypeProperty.ts";
import {computed} from "vue";
import NameCommentEditor from "@/modelEditor/nameComment/NameCommentEditor.vue";

const props = defineProps<NodeProps<EmbeddableTypeNode["data"]>>()

const beforePaste = (properties: Property[]) => {
    for (const property of properties) {
        property.id = createId("Property")
    }
}

const groupColor = computed(() => {
    return getColorVar(props.data.embeddableType.groupId)
})
</script>

<template>
    <div class="embeddable-type-node" :class="{selected}">
        <div class="embeddable-type-header">
            <NameCommentEditor v-model="data.embeddableType" style="padding: 2px;"/>
        </div>

        <EditList
            class="embeddable-type-property-list"
            v-model:lines="data.embeddableType.properties"
            :default-line="defaultScalarProperty"
            :json-schema-validate="validateEmbeddableTypeProperty"
            :before-paste="beforePaste"
            @keydown.stop
        >
            <template #line="{index}">
                <div class="embeddable-type-property">
                    <div class="embeddable-type-property-view">
                        <NameCommentEditor :font-size="14" v-model="data.embeddableType.properties[index]"/>
                        <EmbeddableTypePropertySelect class="noDrag noWheel" style="font-size: 14px; line-height: 30px;" v-model="data.embeddableType.properties[index]"/>
                    </div>
                </div>
            </template>
        </EditList>
    </div>
</template>

<style scoped>
.embeddable-type-node {
    overflow: hidden;
    background-color: var(--background-color);
    border: var(--border);
    border-color: v-bind(groupColor);
    border-radius: var(--border-radius);
    border-style: dotted;
}

.embeddable-type-node.selected {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}

.embeddable-type-header {
    display: flex;
    gap: 0.4rem;
    padding: 0.5rem;
    background-color: v-bind(groupColor);
}

.embeddable-type-property-list {
    padding-bottom: 0.5rem;
}

.embeddable-type-property {
    position: relative;
    padding: 0.25rem 0.75rem;
}

.embeddable-type-property-list > .edit-list-body > .line-container:first-child > .embeddable-type-property {
    padding-top: 0.5rem;
}

.embeddable-type-property-view {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
}
</style>
