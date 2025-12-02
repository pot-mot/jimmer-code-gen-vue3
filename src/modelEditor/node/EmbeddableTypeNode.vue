<script setup lang="ts">
import {type NodeProps} from "@vue-flow/core";
import type {EmbeddableTypeNode} from "@/modelEditor/node/EmbeddableTypeNode.ts";
import EditList from "@/components/list/selectableList/EditList.vue";
import {createId, getColorVar, getColorIsDark, useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {defaultScalarProperty} from "@/type/context/default/modelDefaults.ts";
import EmbeddableTypePropertyTypeEditor from "@/modelEditor/node/property/EmbeddableTypePropertyTypeEditor.vue";
import {validateEmbeddableTypeProperty} from "@/type/__generated/jsonSchema/items/EmbeddableTypeProperty.ts";
import {computed, onBeforeUnmount, onMounted, useTemplateRef} from "vue";
import NameCommentEditor from "@/modelEditor/nameComment/NameCommentEditor.vue";
import {NodeToolbar} from "@vue-flow/node-toolbar";
import IconAim from "@/components/icons/IconAim.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import {modelSubSelectEventBus} from "@/modelEditor/diagnostic/focusDiagnoseSource.ts";
import DiagnoseViewer from "@/modelEditor/diagnostic/DiagnoseViewer.vue";
import IconEmbeddableType from "@/components/icons/modelEditor/IconEmbeddableType.vue";
import {nodeSubElementId} from "@/modelEditor/node/nodeElementId.ts";

const props = defineProps<NodeProps<EmbeddableTypeNode["data"]>>()

const groupColor = computed(() => {
    return getColorVar(props.data.embeddableType.groupId)
})
const groupTheme = computed(() => {
    return getColorIsDark(props.data.embeddableType.groupId) ? 'dark' : 'light'
})

const propertyEditListRef = useTemplateRef("propertyEditListRef")
const unselectAllProperty = () => {
    if (propertyEditListRef.value) propertyEditListRef.value.selection.cleanSelection()
}
const selectProperty = ({embeddableTypeId, propertyId}: {embeddableTypeId: string, propertyId: string}) => {
    if (embeddableTypeId === props.data.embeddableType.id && propertyEditListRef.value) {
        const index = props.data.embeddableType.properties.findIndex(property => property.id === propertyId)
        if (index !== -1) propertyEditListRef.value.selection.resetSelection([index])
    }
}
onMounted(() => {
    modelSubSelectEventBus.on("unselectAll", unselectAllProperty)
    modelSubSelectEventBus.on("selectEmbeddableTypeProperty", selectProperty)
})
onBeforeUnmount(() => {
    modelSubSelectEventBus.off("unselectAll", unselectAllProperty)
    modelSubSelectEventBus.off("selectEmbeddableTypeProperty", selectProperty)
})

const {focusNode, focus, remove, modelDiagnoseInfo} = useModelEditor()

const beforePaste = (properties: Property[]) => {
    for (const property of properties) {
        property.id = createId("Property")
    }
}
</script>

<template>
    <div class="embeddable-type-node" :class="{selected}">
        <div class="embeddable-type-header">
            <div class="header-label">
                <IconEmbeddableType
                    class="header-label-icon"
                />
                <NameCommentEditor
                    v-model="data.embeddableType"
                    :class="groupTheme"
                />
            </div>

            <DiagnoseViewer
                :messages="modelDiagnoseInfo.embeddableTypeMap.get(id)?.embeddableType"
            />
        </div>

        <EditList
            ref="propertyEditListRef"
            class="embeddable-type-property-list"
            v-model:lines="data.embeddableType.properties"
            :default-line="defaultScalarProperty"
            :json-schema-validate="validateEmbeddableTypeProperty"
            :before-paste="beforePaste"
            @keydown.stop
        >
            <template #line="{item, index}">
                <div class="embeddable-type-property">
                    <div
                        class="embeddable-type-property-view"
                        v-if="data.embeddableType.properties[index]"
                        :id="nodeSubElementId(data.embeddableType.id, item.id)"
                    >
                        <NameCommentEditor
                            :font-size="14"
                            v-model="data.embeddableType.properties[index]"
                        />
                        <EmbeddableTypePropertyTypeEditor
                            class="no-drag no-wheel"
                            :embeddable-type="data.embeddableType"
                            v-model="data.embeddableType.properties[index]"
                        />
                    </div>
                    <DiagnoseViewer
                        :messages="modelDiagnoseInfo.embeddableTypeMap.get(id)?.properties.get(item.id)"
                    />
                </div>
            </template>
        </EditList>

        <NodeToolbar class="node-toolbar">
            <button @click="focusNode(id); focus()">
                <IconAim/>
            </button>

            <button @click="remove({embeddableTypeIds: [id]}); focus()">
                <IconDelete/>
            </button>
        </NodeToolbar>
    </div>
</template>

<style scoped>
.embeddable-type-node {
    position: relative;
    overflow: hidden;
    background-color: var(--background-color);
    border: var(--border);
    border-color: var(--border-color-light);
    border-width: 2px;
    top: -1px;
    left: -1px;
    border-radius: var(--border-radius);
    transition: border-color 0.2s ease;
}

.embeddable-type-node:hover {
    border-color: var(--border-color);
}

.embeddable-type-node.selected {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}

.embeddable-type-header {
    padding: 0.5rem;
    background-color: v-bind(groupColor);
    line-height: 1.8rem;
}

.header-label {
    display: flex;
    gap: 0.3rem;
}

.header-label-icon {
    margin-top: 0.3rem;
    --icon-size: 1.2rem;
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
    line-height: 1.8rem;
}
</style>
