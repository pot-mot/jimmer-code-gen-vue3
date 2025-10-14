<script setup lang="ts">
import {Handle, type NodeProps, Position} from "@vue-flow/core";
import {type EntityNode, NOT_EXIST_ASSOCIATION_ID} from "@/modelEditor/node/EntityNode.ts";
import EntityPropertyTypeSelect from "@/modelEditor/node/property/EntityPropertyTypeSelect.vue";
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
import {modelSubFocusEventBus} from "@/modelEditor/diagnostic/ModelSubFocus.ts";

const props = defineProps<NodeProps<EntityNode["data"]>>()

const groupColor = computed(() => {
    return getColorVar(props.data.entity.groupId)
})
const groupTheme = computed(() => {
    return getColorIsDark(props.data.entity.groupId) ? 'dark' : 'light'
})

const propertyEditListRef = useTemplateRef("propertyEditListRef")
const focusProperty = ({entityId, propertyId}: {entityId: string, propertyId: string}) => {
    if (entityId === props.data.entity.id && propertyEditListRef.value) {
        const index = props.data.entity.properties.findIndex(property => property.id === propertyId)
        if (index !== -1) propertyEditListRef.value?.selection.resetSelection([index])
    }
}
onMounted(() => {
    modelSubFocusEventBus.on("focusEntityProperty", focusProperty)
})
onBeforeUnmount(() => {
    modelSubFocusEventBus.off("focusEntityProperty", focusProperty)
})

const {focusNode, remove, groupItemNameSet, propertyNameSetMap} = useModelEditor()

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

// TODO with existed info
const propertyNameSet = computed(() => {
    return propertyNameSetMap.value.get(props.data.entity.id)
})

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
            <NameCommentEditor
                v-model="data.entity"
                :name-set="groupItemNameSet"
                :class="groupTheme"
                style="padding: 2px;"
            />
            <span :class="groupTheme" style="color: var(--text-color);">:</span>
            <ExtendsIdMultiSelect
                style="font-size: 16px; line-height: 32px;"
                v-model="data.entity.extendsIds"
                type="Concrete"
                :id="data.entity.id"
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
                    >
                        <NameCommentEditor
                            :font-size="14"
                            v-model="data.entity.properties[index]"
                            :name-set="propertyNameSet"
                        />
                        <EntityPropertyTypeSelect
                            class="noDrag noWheel"
                            style="font-size: 14px; line-height: 30px;"
                            :entity="data.entity"
                            v-model="data.entity.properties[index]"
                        />
                    </div>
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
    border-color: v-bind(groupColor);
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
    display: flex;
    gap: 0.4rem;
    padding: 0.5rem;
    background-color: v-bind(groupColor);
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

