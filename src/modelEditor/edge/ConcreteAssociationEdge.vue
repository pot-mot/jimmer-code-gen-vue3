<script setup lang="ts">
import AssociationEdge from "@/modelEditor/edge/AssociationEdge.vue";
import {type EdgeProps} from "@vue-flow/core";
import type {ConcreteAssociationEdge} from "@/modelEditor/edge/ConcreteAssociationEdge.ts";
import AssociationViewer from "@/modelEditor/viewer/AssociationViewer.vue";
import NameCommentEditor from "@/modelEditor/nameComment/NameCommentEditor.vue";
import EntityIdViewer from "@/modelEditor/viewer/EntityIdViewer.vue";
import {computed, ref, useTemplateRef} from "vue";
import LabelPositionEditor from "@/modelEditor/edge/labelPosition/LabelPositionEditor.vue";
import IconAim from "@/components/icons/IconAim.vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import IconDelete from "@/components/icons/IconDelete.vue";

const props = defineProps<EdgeProps<ConcreteAssociationEdge["data"]>>()

const {propertyNameSetMap, focusEdge, remove} = useModelEditor()

const associationEdgeRef = useTemplateRef("associationEdgeRef")
const getPath = computed(() => {
    return associationEdgeRef.value?.getPath ?? (() => { return undefined })
})

const associationEdit = ref(false)
</script>

<template>
    <AssociationEdge
        v-bind.prop="props"
        ref="associationEdgeRef"
        class="concrete-association-edge"
    >
        <template #label>
            <div style="display: flex; justify-content: center;">
                <AssociationViewer
                    v-if="!associationEdit"
                    :association="data.edgedAssociation.association"
                    @click.stop="associationEdit = true"
                />
                <NameCommentEditor
                    v-else
                    v-model="data.edgedAssociation.association"
                    class="with-border-bg"
                    auto-focus
                    @change="associationEdit = false"
                    @blur="associationEdit = false"
                    @click.stop
                />
            </div>

            <div v-if="data.edgedAssociation.association.withMappedProperty" class="mapped-property-info">
                <EntityIdViewer :id="data.edgedAssociation.association.referencedEntityId" hide-comment ctrl-focus/>
                <span>.</span>
                <NameCommentEditor
                    v-model="data.edgedAssociation.association.mappedProperty"
                    :name-set="propertyNameSetMap.get(data.edgedAssociation.association.referencedEntityId)"
                    class="with-border-bg"
                    @click.stop
                />
                <span style="padding-right: 0.5rem;">:</span>
                <span v-if="data.edgedAssociation.association.mappedProperty.typeIsList">List<</span>
                <EntityIdViewer :id="data.edgedAssociation.association.mappedProperty.referencedEntityId" hide-comment ctrl-focus/>
                <span v-if="data.edgedAssociation.association.mappedProperty.typeIsList">></span>
            </div>
        </template>

        <template #toolbar>
            <div class="edge-toolbar">
                <button @click="focusEdge(id)">
                    <IconAim/>
                </button>

                <button @click="remove({associationIds: [id]})">
                    <IconDelete/>
                </button>
            </div>

            <LabelPositionEditor v-model="data.edgedAssociation.labelPosition" :get-path="getPath"/>
        </template>
    </AssociationEdge>
</template>

<style scoped>
.with-border-bg :deep(input:focus) {
    border: var(--border);
    border-radius: 0.25rem;
    background-color: var(--background-color);
}

.mapped-property-info {
    display: flex;
    justify-content: center;
    line-height: 2rem;
}

.mapped-property-info :deep(.name-comment-editor) {
    line-height: 1em;
}
</style>
