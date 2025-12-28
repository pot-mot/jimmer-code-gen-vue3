<script setup lang="ts">
import AssociationEdge from "@/modelEditor/edge/AssociationEdge.vue";
import {type EdgeProps} from "@vue-flow/core";
import type {AbstractAssociationEdge} from "@/modelEditor/edge/AbstractAssociationEdge.ts";
import {computed, useTemplateRef} from "vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import MappedSuperClassViewer from "@/modelEditor/viewer/MappedSuperClassViewer.vue";
import EntityIdViewer from "@/modelEditor/viewer/EntityIdViewer.vue";
import LabelPositionEditor from "@/modelEditor/edge/tool/LabelPositionEditor.vue";
import DiagnoseViewer from "@/modelEditor/diagnostic/DiagnoseViewer.vue";
import {
    tmpl_mappedPropertyComment,
    tmpl_mappedPropertyName
} from "@/type/context/utils/AssociationTemplate.ts";
import {associationElementId, mappedPropertyElementId} from "@/modelEditor/edge/edgeElementId.ts";
import NameCommentTemplateOnlyEditor from "@/modelEditor/nameComment/NameCommentTemplateOnlyEditor.vue";
import {useIdViewNameComment} from "@/modelEditor/viewer/association/nameComment.ts";

const props = defineProps<EdgeProps<AbstractAssociationEdge["data"]>>()

const {contextData, edgeToFront, modelDiagnoseInfo} = useModelEditor()

const sourceAbstractEntity = computed(() => {
    return contextData.mappedSuperClassMap.get(props.data.edgedAssociation.association.sourceAbstractEntityId)
})
const sourceProperty = computed(() => {
    return sourceAbstractEntity.value?.properties.find(property => {
        return property.id === props.data.edgedAssociation.association.sourcePropertyId
    })
})

const associationEdgeRef = useTemplateRef("associationEdgeRef")
const getPath = computed(() => {
    return associationEdgeRef.value?.getPath ?? (() => {
        return undefined
    })
})

const associationNameCommentView = useIdViewNameComment(() => props.data.edgedAssociation.association)

const mappedPropertyNameCommentView = computed(() => {
    const mappedProperty = props.data.edgedAssociation.association.mappedProperty
    return {
        name: tmpl_mappedPropertyName(
            mappedProperty.nameTemplate,
            {name: sourceAbstractEntity.value ? `$${sourceAbstractEntity.value.name}$` : '[NOT_EXISTED]'},
            {name: sourceProperty.value ? `$${sourceProperty.value.name}$` : '[NOT_EXISTED]'}
        ),
        comment: tmpl_mappedPropertyComment(
            mappedProperty.commentTemplate,
            {comment: sourceAbstractEntity.value ? `$${sourceAbstractEntity.value.comment}$` : '[NOT_EXISTED]'},
            {comment: sourceProperty.value ? `$${sourceProperty.value.comment}$` : '[NOT_EXISTED]'}
        ),
    }
})
</script>

<template>
    <AssociationEdge
        v-bind.prop="props"
        ref="associationEdgeRef"
        class="abstract-association-edge"
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
                        <NameCommentTemplateOnlyEditor
                            v-model="data.edgedAssociation.association"
                            :name="associationNameCommentView?.name ?? '[Empty]'"
                            :comment="associationNameCommentView?.comment ?? '[Empty]'"
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
                        <NameCommentTemplateOnlyEditor
                            v-model="data.edgedAssociation.association.mappedProperty"
                            :name="mappedPropertyNameCommentView.name"
                            :comment="mappedPropertyNameCommentView.comment"
                            class="with-border-bg"
                            :font-size="12"
                        />
                        <span style="padding-right: 0.25rem;">:</span>
                        <span v-if="data.edgedAssociation.association.mappedProperty.typeIsList">List<</span>
                        <span style="color: var(--comment-color);">$</span>
                        <MappedSuperClassViewer :mapped-super-class="sourceAbstractEntity" hide-comment ctrl-focus/>
                        <span style="color: var(--comment-color);">$</span>
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
