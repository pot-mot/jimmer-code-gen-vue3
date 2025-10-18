<script setup lang="ts">
import AssociationEdge from "@/modelEditor/edge/AssociationEdge.vue";
import {type EdgeProps} from "@vue-flow/core";
import type {ConcreteAssociationEdge} from "@/modelEditor/edge/ConcreteAssociationEdge.ts";
import NameCommentEditor from "@/modelEditor/nameComment/NameCommentEditor.vue";
import EntityIdViewer from "@/modelEditor/viewer/EntityIdViewer.vue";
import {computed, ref, useTemplateRef} from "vue";
import LabelPositionEditor from "@/modelEditor/edge/tool/LabelPositionEditor.vue";
import IconAim from "@/components/icons/IconAim.vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import IconDelete from "@/components/icons/IconDelete.vue";
import DiagnoseViewer from "@/modelEditor/diagnostic/DiagnoseViewer.vue";
import AssociationViewer from "@/modelEditor/viewer/AssociationViewer.vue";

const props = defineProps<EdgeProps<ConcreteAssociationEdge["data"]>>()

const {modelDiagnoseInfo, focusEdge, remove} = useModelEditor()

const associationEdgeRef = useTemplateRef("associationEdgeRef")
const getPath = computed(() => {
    return associationEdgeRef.value?.getPath ?? (() => {
        return undefined
    })
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
            <div
                class="association-label"
                :class="{selected}"
            >
                <div class="foreign-key-wrapper">
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
                    <div class="flex-center">
                        <DiagnoseViewer
                            :messages="modelDiagnoseInfo.associationMap.get(id)?.association"
                        />
                    </div>
                </div>

                <div
                    v-if="data.edgedAssociation.association.withMappedProperty"
                    class="mapped-property-wrapper"
                    :class="{selected}"
                >
                    <div class="mapped-property-info">
                        <EntityIdViewer
                            :id="data.edgedAssociation.association.referencedEntityId"
                            hide-comment
                            ctrl-focus
                        />
                        <span>.</span>
                        <NameCommentEditor
                            v-model="data.edgedAssociation.association.mappedProperty"
                            class="with-border-bg"
                            @click.stop
                        />
                        <span style="padding-right: 0.5rem;">:</span>
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

.mapped-property-info {
    display: flex;
    justify-content: center;
    line-height: 2rem;
}

.flex-center {
    display: flex;
    justify-content: center;
}
</style>
