<script setup lang="ts">
import {Handle, type NodeProps, Position} from "@vue-flow/core";
import {type EntityNode, NOT_EXIST_ASSOCIATION_ID} from "@/modelEditor/node/EntityNode.ts";
import EntityPropertyTypeEditor from "@/modelEditor/node/property/EntityPropertyTypeEditor.vue";
import EditList from "@/components/list/selectableList/EditList.vue";
import {createId, getColorIsDark, getColorVar, useModelEditor} from "@/modelEditor/useModelEditor.ts";
import ExtendsIdMultiSelect from "@/modelEditor/node/extendsId/ExtendsIdMultiSelect.vue";
import {defaultScalarProperty} from "@/type/context/default/modelDefaults.ts";
import {computed, onBeforeUnmount, onMounted, ref, useTemplateRef, watch} from "vue";
import NameCommentEditor from "@/modelEditor/nameComment/NameCommentEditor.vue";
import {validateEntityProperty} from "@/type/__generated/jsonSchema/items/EntityProperty.ts";
import IconAim from "@/components/icons/IconAim.vue";
import {NodeToolbar} from "@vue-flow/node-toolbar";
import IconDelete from "@/components/icons/IconDelete.vue";
import {modelSubSelectEventBus} from "@/modelEditor/diagnostic/focusDiagnoseSource.ts";
import DiagnoseViewer from "@/modelEditor/diagnostic/DiagnoseViewer.vue";
import IconEntity from "@/components/icons/modelEditor/IconEntity.vue";
import EntityPropertyCategoryEditor from "@/modelEditor/node/property/EntityPropertyCategoryEditor.vue";
import {nodeSubElementId} from "@/modelEditor/node/nodeElementId.ts";

const props = defineProps<NodeProps<EntityNode["data"]>>()

const groupColor = computed(() => {
    return getColorVar(props.data.entity.groupId)
})
const groupTheme = computed(() => {
    return getColorIsDark(props.data.entity.groupId) ? 'dark' : 'light'
})

const propertyEditListRef = useTemplateRef("propertyEditListRef")
const unselectAllProperty = () => {
    if (propertyEditListRef.value) propertyEditListRef.value.selection.cleanSelection()
}
const selectProperty = ({entityId, propertyId}: {entityId: string, propertyId: string}) => {
    if (entityId === props.data.entity.id && propertyEditListRef.value) {
        const index = props.data.entity.properties.findIndex(property => property.id === propertyId)
        if (index !== -1) propertyEditListRef.value.selection.resetSelection([index])
    }
}
onMounted(() => {
    modelSubSelectEventBus.on("unselectAll", unselectAllProperty)
    modelSubSelectEventBus.on("selectEntityProperty", selectProperty)
})
onBeforeUnmount(() => {
    modelSubSelectEventBus.off("unselectAll", unselectAllProperty)
    modelSubSelectEventBus.off("selectEntityProperty", selectProperty)
})

const {focusNode, remove, modelDiagnoseInfo} = useModelEditor()

const beforeCopy = (properties: EntityProperty[]) => {
    for (const property of properties) {
        if ("associationId" in property) {
            property.associationId = NOT_EXIST_ASSOCIATION_ID
        }
    }
}

const beforePaste = (properties: EntityProperty[]) => {
    for (const property of properties) {
        property.id = createId("Property")
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
    setTimeout(() => {
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
    <div class="entity-node" ref="nodeElRef" :class="{selected}">
        <Handle :id="data.entity.id" type="target" :position="Position.Bottom"/>

        <div class="entity-header">
            <div class="header-label">
                <IconEntity
                    class="header-label-icon"
                />
                <NameCommentEditor
                    v-model="data.entity"
                    :class="groupTheme"
                />
                <span :class="groupTheme" style="color: var(--text-color);">:</span>
                <ExtendsIdMultiSelect
                    style="font-size: 16px; line-height: 32px;"
                    v-model="data.entity.extendsIds"
                    type="Concrete"
                    :id="data.entity.id"
                />
            </div>

            <DiagnoseViewer
                :messages="modelDiagnoseInfo.entityMap.get(id)?.entity"
            />
        </div>

        <EditList
            ref="propertyEditListRef"
            class="entity-property-list"
            v-model:lines="data.entity.properties"
            :default-line="defaultScalarProperty"
            :json-schema-validate="validateEntityProperty"
            :before-copy="beforeCopy"
            :before-paste="beforePaste"
            @keydown.stop
        >
            <template #line="{item, index}">
                <div class="entity-property">
                    <Handle
                        :ref="() => onHandleUpdate(item.id, index)"
                        :id="item.id" type="source"
                        :position="Position.Left"
                    />

                    <div
                        class="entity-property-view"
                        v-if="data.entity.properties[index]"
                        :id="nodeSubElementId(data.entity.id, item.id)"
                    >
                        <div style="display: flex; gap: 0.5rem;">
                            <EntityPropertyCategoryEditor
                                v-model="data.entity.properties[index]"
                            />
                            <div>
                                <div>
                                    <NameCommentEditor
                                        :font-size="14"
                                        v-model="data.entity.properties[index]"
                                    />
                                </div>
                                <div
                                    v-if="'idViewName' in data.entity.properties[index]"
                                    class="entity-property-id-view"
                                >
                                    {{ data.entity.properties[index].idViewName }}
                                </div>
                            </div>
                        </div>

                        <EntityPropertyTypeEditor
                            class="no-drag no-wheel"
                            :entity="data.entity"
                            :property-index="index"
                            v-model="data.entity.properties[index]"
                        />
                    </div>

                    <DiagnoseViewer
                        :messages="modelDiagnoseInfo.entityMap.get(id)?.properties.get(item.id)"
                    />
                </div>
            </template>
        </EditList>

        <NodeToolbar class="node-toolbar">
            <button @click="focusNode(id)">
                <IconAim/>
            </button>

            <button @click="remove({entityIds: [id]})">
                <IconDelete/>
            </button>
        </NodeToolbar>
    </div>
</template>

<style scoped>
.entity-node {
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

.entity-node:hover {
    border-color: var(--border-color);
}

.entity-node.selected {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}

.entity-header {
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

.entity-property-list {
    padding-bottom: 0.5rem;
}

.entity-property {
    position: relative;
    padding: 0.25rem 0.75rem;
}

.entity-property-list .line-container:first-child > .entity-property {
    padding-top: 0.5rem;
}

.entity-property-list :deep(.line-container.selected) .name-comment-editor input,
.entity-property-list :deep(.line-container.selected) .name-comment-editor .name,
.entity-property-list :deep(.line-container.selected) .name-comment-editor .comment {
    color: var(--text-color);
}

.entity-property-view {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    line-height: 1.8rem;
}

.entity-property-id-view {
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

