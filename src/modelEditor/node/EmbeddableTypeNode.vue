<script setup lang="ts">
import {type NodeProps} from "@vue-flow/core";
import type {EmbeddableTypeNode} from "@/modelEditor/node/EmbeddableTypeNode.ts";
import EditList from "@/components/list/selectableList/EditList.vue";
import {createId, getColorVar, getColorIsDark, useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {defaultScalarProperty} from "@/type/context/default/modelDefaults.ts";
import EmbeddableTypePropertyTypeSelect from "@/modelEditor/node/property/EmbeddableTypePropertyTypeSelect.vue";
import {validateEmbeddableTypeProperty} from "@/type/__generated/jsonSchema/items/EmbeddableTypeProperty.ts";
import {computed} from "vue";
import NameCommentEditor from "@/modelEditor/nameComment/NameCommentEditor.vue";
import {buildReadonlyNameSet} from "@/utils/name/nameSet.ts";

const props = defineProps<NodeProps<EmbeddableTypeNode["data"]>>()

const {groupItemNameSet} = useModelEditor()

const beforePaste = (properties: Property[]) => {
    for (const property of properties) {
        property.id = createId("Property")
    }
}

const groupColor = computed(() => {
    return getColorVar(props.data.embeddableType.groupId)
})
const groupTheme = computed(() => {
    return getColorIsDark(props.data.embeddableType.groupId) ? 'dark' : 'light'
})

const propertyNameSet = computed(() => {
    return buildReadonlyNameSet(props.data.embeddableType.properties.map(property => property.name))
})
</script>

<template>
    <div class="embeddable-type-node" :class="{selected}">
        <div class="embeddable-type-header">
            <NameCommentEditor
                v-model="data.embeddableType"
                :name-set="groupItemNameSet"
                :class="groupTheme"
                style="padding: 2px;"
            />
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
                    <div
                        class="embeddable-type-property-view"
                        v-if="data.embeddableType.properties[index]"
                    >
                        <NameCommentEditor
                            :font-size="14"
                            v-model="data.embeddableType.properties[index]"
                            :name-set="propertyNameSet"
                        />
                        <EmbeddableTypePropertyTypeSelect
                            class="noDrag noWheel"
                            style="font-size: 14px; line-height: 30px;"
                            v-model="data.embeddableType.properties[index]"
                        />
                    </div>
                </div>
            </template>
        </EditList>
    </div>
</template>

<style scoped>
.embeddable-type-node {
    position: relative;
    overflow: hidden;
    background-color: var(--background-color);
    border: var(--border);
    border-color: v-bind(groupColor);
    border-radius: var(--border-radius);
    transition: border-color 0.2s ease;
}

.embeddable-type-node:hover {
    border-width: 2px;
    top: -1px;
    left: -1px;
    border-color: var(--border-color);
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

.embeddable-type-property-list .line-container:first-child > .embeddable-type-property {
    padding-top: 0.5rem;
}

.embeddable-type-property-list :deep(.line-container.selected) .name-comment-editor input,
.embeddable-type-property-list :deep(.line-container.selected) .name-comment-editor .name,
.embeddable-type-property-list :deep(.line-container.selected) .name-comment-editor .comment {
    color: var(--text-color);
}

.embeddable-type-property-view {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
}
</style>
