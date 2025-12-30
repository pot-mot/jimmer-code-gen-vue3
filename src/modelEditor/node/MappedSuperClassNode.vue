<script setup lang="ts">
import {Handle, type NodeProps, Position} from "@vue-flow/core";
import type {MappedSuperClassNode} from "@/modelEditor/node/MappedSuperClassNode.ts";
import EditList from "@/components/list/selectableList/EditList.vue";
import {createId, getColorVar, getColorIsDark, useModelEditor} from "@/modelEditor/useModelEditor.ts";
import ExtendsIdMultiSelect from "@/modelEditor/node/extendsId/ExtendsIdMultiSelect.vue";
import {defaultScalarProperty} from "@/modelEditor/default/modelDefaults.ts";
import {computed, onBeforeUnmount, onMounted, ref, useTemplateRef, watch} from "vue";
import NameCommentEditor from "@/modelEditor/nameComment/NameCommentEditor.vue";
import MappedSuperClassPropertyTypeEditor from "@/modelEditor/node/property/MappedSuperClassPropertyTypeEditor.vue";
import {validateMappedSuperClassProperty} from "@/type/__generated/jsonSchema/items/MappedSuperClassProperty.ts";
import {NOT_EXIST_ASSOCIATION_ID} from "@/modelEditor/node/EntityNode.ts";
import IconAim from "@/components/icons/IconAim.vue";
import {NodeToolbar} from "@vue-flow/node-toolbar";
import IconDelete from "@/components/icons/IconDelete.vue";
import {modelSubSelectEventBus} from "@/modelEditor/diagnostic/focusDiagnoseSource.ts";
import DiagnoseViewer from "@/modelEditor/diagnostic/DiagnoseViewer.vue";
import IconAbstractEntity from "@/components/icons/modelEditor/IconAbstractEntity.vue";
import EntityPropertyCategoryEditor from "@/modelEditor/node/property/EntityPropertyCategoryEditor.vue";
import {nodeSubElementId} from "@/modelEditor/node/nodeElementId.ts";

const props = defineProps<NodeProps<MappedSuperClassNode["data"]>>()

const groupColor = computed(() => {
    return getColorVar(props.data.mappedSuperClass.groupId)
})
const groupTheme = computed(() => {
    return getColorIsDark(props.data.mappedSuperClass.groupId) ? 'dark' : 'light'
})

const propertyEditListRef = useTemplateRef("propertyEditListRef")
const unselectAllProperty = () => {
    if (propertyEditListRef.value) propertyEditListRef.value.selection.cleanSelection()
}
const selectProperty = ({mappedSuperClassId, propertyId}: {mappedSuperClassId: string, propertyId: string}) => {
    if (mappedSuperClassId === props.data.mappedSuperClass.id && propertyEditListRef.value) {
        const index = props.data.mappedSuperClass.properties.findIndex(property => property.id === propertyId)
        if (index !== -1) propertyEditListRef.value.selection.resetSelection([index])
    }
}
onMounted(() => {
    modelSubSelectEventBus.on("unselectAll", unselectAllProperty)
    modelSubSelectEventBus.on("selectMappedSuperClassProperty", selectProperty)
})
onBeforeUnmount(() => {
    modelSubSelectEventBus.off("unselectAll", unselectAllProperty)
    modelSubSelectEventBus.off("selectMappedSuperClassProperty", selectProperty)
})

const {focusNode, focus, remove, modelDiagnoseInfo} = useModelEditor()

const beforeCopy = (properties: MappedSuperClassProperty[]) => {
    for (const property of properties) {
        if ("associationId" in property) {
            property.associationId = NOT_EXIST_ASSOCIATION_ID
        }
    }
}

const beforePaste = (properties: MappedSuperClassProperty[]) => {
    for (const property of properties) {
        property.id = createId("Property")
        if ("associationId" in property) {
            property.associationId = createId("Association")
        }
    }
}

const nodeElRef = useTemplateRef("nodeElRef")
const handleIndexMap = ref(new Map<number, string>())
const onHandleUpdate = (id: string, index: number) => {
    handleIndexMap.value.set(index, id)
}
const forceResize = (element: HTMLElement) => {
    const oldStyleWidth = element.style.width
    const currentWidth = element.offsetWidth
    element.style.width = currentWidth + 'px'
    window.setTimeout(() => {
        element.style.width = oldStyleWidth
    })
}
watch(() => handleIndexMap.value, () => {
    if (nodeElRef.value && nodeElRef.value.parentElement) {
        const parent = nodeElRef.value.parentElement
        forceResize(parent)
    }
}, {deep: true})
</script>

<template>
    <div class="mapped-super-class-node" ref="nodeElRef" :class="{selected}">
        <Handle :id="data.mappedSuperClass.id" type="target" :position="Position.Bottom"/>

        <div class="mapped-super-class-header">
            <div class="header-label">
                <IconAbstractEntity
                    class="header-label-icon"
                />
                <NameCommentEditor
                    v-model="data.mappedSuperClass"
                    :class="groupTheme"
                />
                <span :class="groupTheme" style="color: var(--text-color);">:</span>
                <ExtendsIdMultiSelect
                    style="font-size: 16px; line-height: 32px;"
                    v-model="data.mappedSuperClass.extendsIds"
                    type="Abstract"
                    :id="data.mappedSuperClass.id"
                />
            </div>

            <DiagnoseViewer
                :messages="modelDiagnoseInfo.mappedSuperClassMap.get(id)?.mappedSuperClass"
            />
        </div>

        <EditList
            ref="propertyEditListRef"
            class="mapped-super-class-property-list"
            v-model:lines="data.mappedSuperClass.properties"
            :default-line="defaultScalarProperty"
            :json-schema-validate="validateMappedSuperClassProperty"
            :before-copy="beforeCopy"
            :before-paste="beforePaste"
            @keydown.stop
        >
            <template #line="{item, index}">
                <div class="mapped-super-class-property">
                    <Handle
                        :ref="() => onHandleUpdate(item.id, index)"
                        :id="item.id" type="source"
                        :position="Position.Left"
                    />

                    <div
                        class="mapped-super-class-property-view"
                        v-if="data.mappedSuperClass.properties[index]"
                        :id="nodeSubElementId(data.mappedSuperClass.id, item.id)"
                    >
                        <div style="display: flex; gap: 0.5rem;">
                            <EntityPropertyCategoryEditor
                                v-model="data.mappedSuperClass.properties[index]"
                            />
                            <div>
                                <div>
                                    <NameCommentEditor
                                        :font-size="14"
                                        v-model="data.mappedSuperClass.properties[index]"
                                    />
                                </div>
                                <div
                                    v-if="'idViewName' in data.mappedSuperClass.properties[index]"
                                    class="mapped-super-class-property-id-view"
                                >
                                    {{ data.mappedSuperClass.properties[index].idViewName }}
                                </div>
                            </div>
                        </div>

                        <MappedSuperClassPropertyTypeEditor
                            class="no-drag no-wheel"
                            :mapped-super-class="data.mappedSuperClass"
                            :property-index="index"
                            v-model="data.mappedSuperClass.properties[index]"
                        />
                    </div>

                    <DiagnoseViewer
                        :messages="modelDiagnoseInfo.mappedSuperClassMap.get(id)?.properties.get(item.id)"
                    />
                </div>
            </template>
        </EditList>

        <NodeToolbar class="node-toolbar">
            <button @click="focusNode(id); focus()">
                <IconAim/>
            </button>

            <button @click="remove({mappedSuperClassIds: [id]}); focus()">
                <IconDelete/>
            </button>
        </NodeToolbar>
    </div>
</template>

<style scoped>
.mapped-super-class-node {
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

.mapped-super-class-node:hover {
    border-color: var(--border-color);
}

.mapped-super-class-node.selected {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}

.mapped-super-class-header {
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
    line-height: 1.8rem;
}

.mapped-super-class-property-id-view {
    font-size: 12px;
    color: var(--comment-color);
}

:deep(.vue-flow__handle) {
    min-width: 0;
    min-height: 0;
    width: 0;
    height: 0;
    border: none;
    overflow: visible;
}
</style>
