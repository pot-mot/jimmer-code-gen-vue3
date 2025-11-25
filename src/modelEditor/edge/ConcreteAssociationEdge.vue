<script setup lang="ts">
import AssociationEdge from "@/modelEditor/edge/AssociationEdge.vue";
import {type EdgeProps} from "@vue-flow/core";
import type {ConcreteAssociationEdge} from "@/modelEditor/edge/ConcreteAssociationEdge.ts";
import EntityIdViewer from "@/modelEditor/viewer/EntityIdViewer.vue";
import {computed, useTemplateRef} from "vue";
import LabelPositionEditor from "@/modelEditor/edge/tool/LabelPositionEditor.vue";
import IconAim from "@/components/icons/IconAim.vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import IconDelete from "@/components/icons/IconDelete.vue";
import DiagnoseViewer from "@/modelEditor/diagnostic/DiagnoseViewer.vue";
import {associationElementId, mappedPropertyElementId} from "@/modelEditor/edge/edgeElementId.ts";
import NameCommentTemplateEditor from "@/modelEditor/nameComment/NameCommentTemplateEditor.vue";

const props = defineProps<EdgeProps<ConcreteAssociationEdge["data"]>>()

const {modelDiagnoseInfo, edgeToFront, focusEdge, remove} = useModelEditor()

const associationEdgeRef = useTemplateRef("associationEdgeRef")
const getPath = computed(() => {
    return associationEdgeRef.value?.getPath ?? (() => {
        return undefined
    })
})
</script>

<template>
    <AssociationEdge
        v-bind.prop="props"
        ref="associationEdgeRef"
        class="concrete-association-edge"
        @mousedown="edgeToFront(id)"
    >
        <template #label>
            <div
                class="association-label"
                :class="{selected}"
            >
                <div
                    class="association-info-wrapper"
                    :id="associationElementId(data.edgedAssociation.association.id)"
                >
                    <div class="foreign-key-info">
                        <NameCommentTemplateEditor
                            v-model="data.edgedAssociation.association"
                            class="with-border-bg"
                            :font-size="12"
                        />
                    </div>
                    <div class="flex-center">
                        <DiagnoseViewer
                            :messages="modelDiagnoseInfo.associationMap.get(id)?.association"
                        />
                    </div>
                </div>

                <div
                    v-if="data.edgedAssociation.association.withMappedProperty"
                    class="mapped-property-wrapper"
                    :id="mappedPropertyElementId(data.edgedAssociation.association.id)"
                >
                    <div class="mapped-property-info">
                        <EntityIdViewer
                            :id="data.edgedAssociation.association.referencedEntityId"
                            hide-comment
                            ctrl-focus
                        />
                        <span style="padding: 0 0.1rem;">.</span>
                        <NameCommentTemplateEditor
                            v-model="data.edgedAssociation.association.mappedProperty"
                            class="with-border-bg"
                            :font-size="12"
                        />
                        <span style="padding-right: 0.25rem;">:</span>
                        <span v-if="data.edgedAssociation.association.mappedProperty.typeIsList">List<</span>
                        <EntityIdViewer
                            :id="data.edgedAssociation.association.mappedProperty.referencedEntityId"
                            hide-comment
                            ctrl-focus
                        />
                        <span v-if="data.edgedAssociation.association.mappedProperty.typeIsList">></span>
                    </div>
                    <div class="flex-center">
                        <DiagnoseViewer
                            :messages="modelDiagnoseInfo.associationMap.get(id)?.mappedProperty"
                        />
                    </div>
                </div>
            </div>
        </template>

        <template #toolbar>
            <div class="edge-toolbar">
                <button @click.stop="focusEdge(id)">
                    <IconAim/>
                </button>

                <button @click.stop="remove({associationIds: [id]})">
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

.association-label {
    box-sizing: border-box;
    border: var(--border);
    border-color: var(--border-color-light);
    border-width: 2px;
    border-radius: 0.25rem;
    background-color: var(--background-color);
    padding: 0 0.5rem;
    transition: border-color 0.2s;
}

.association-label:hover {
    border-color: var(--border-color);
}

.association-label.selected {
    border-color: var(--primary-color);
}

.foreign-key-info {
    display: flex;
    justify-content: center;
    line-height: 1.25rem;
    font-size: 14px;
}

.mapped-property-info {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1.25rem;
    font-size: 12px;
}

.flex-center {
    display: flex;
    justify-content: center;
}
</style>
